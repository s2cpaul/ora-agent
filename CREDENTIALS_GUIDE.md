# 🔐 ORA AI AGENT - CREDENTIALS & SETUP GUIDE

This guide explains **exactly where all credentials are stored** and how to configure your project for production deployment.

---

## 📋 TABLE OF CONTENTS

1. [Quick Start](#quick-start)
2. [Credential Locations](#credential-locations)
3. [Service Setup Guides](#service-setup-guides)
4. [Files That Use Credentials](#files-that-use-credentials)
5. [Security Best Practices](#security-best-practices)
6. [Troubleshooting](#troubleshooting)

---

## 🚀 QUICK START

### Step 1: Create `.env` file

```bash
# Copy the example file
cp .env.example .env
```

### Step 2: Fill in credentials

Open `.env` and replace placeholder values with your actual credentials from each service.

### Step 3: Verify setup

```bash
# Start dev server - it will validate your credentials
npm run dev
```

You should see validation warnings/errors in the console if anything is missing.

---

## 📍 CREDENTIAL LOCATIONS

### ✅ WHERE CREDENTIALS ARE STORED

| Location | Purpose | Committed to Git? |
|----------|---------|-------------------|
| **`.env`** | **ALL secret credentials** | ❌ NO (in .gitignore) |
| **`/src/lib/config.ts`** | Loads & validates env vars | ✅ YES (no secrets) |
| **`.env.example`** | Template/documentation | ✅ YES (no secrets) |

### ❌ WHERE CREDENTIALS ARE NOT STORED

These files **DO NOT** contain hardcoded credentials anymore:

- ✅ `/src/lib/supabase.ts` - Now imports from `config.ts`
- ✅ `/src/app/utils/supabaseFeedback.ts` - Now imports from `config.ts`
- ✅ All React components - Should never access credentials directly

---

## 🔑 SERVICE SETUP GUIDES

### 1️⃣ SUPABASE (Required)

**What it's for:** Database, authentication, file storage, feedback tracking

**Get credentials:**
1. Go to [https://app.supabase.com](https://app.supabase.com)
2. Select your project (or create new one)
3. Go to **Settings** → **API**
4. Copy these values:

```env
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Files that use it:**
- `/src/lib/supabase.ts` - Main Supabase client
- `/src/app/utils/supabaseFeedback.ts` - Feedback tracking
- `/src/contexts/AuthContext.tsx` - Authentication
- `/src/hooks/useSubscription.ts` - Subscription management

---

### 2️⃣ GOOGLE OAUTH (Optional - for Google Sign-In)

**What it's for:** "Sign in with Google" button

**Get credentials:**
1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a new project or select existing
3. Go to **APIs & Services** → **Credentials**
4. Create **OAuth 2.0 Client ID**
5. Add authorized redirect URIs:
   - `http://localhost:5173` (development)
   - `https://agent.myora.now` (production)
   - Your Supabase callback URL

```env
VITE_GOOGLE_CLIENT_ID=123456789-xxxxx.apps.googleusercontent.com
VITE_ENABLE_GOOGLE_OAUTH=true
```

**Configure in Supabase:**
1. In Supabase: **Authentication** → **Providers**
2. Enable **Google**
3. Paste your Google Client ID and Secret

**Files that use it:**
- `/src/contexts/AuthContext.tsx` - Google OAuth flow
- `/src/app/components/AuthPage.tsx` - Sign-in UI

---

### 3️⃣ STRIPE (Required for Payments)

**What it's for:** Credit card payment processing

**Get credentials:**
1. Go to [https://dashboard.stripe.com](https://dashboard.stripe.com)
2. Get your API keys from **Developers** → **API Keys**
3. Use **test keys** for development (prefix: `pk_test_`, `sk_test_`)
4. Use **live keys** for production (prefix: `pk_live_`, `sk_live_`)

```env
# Client-side key (safe to expose)
VITE_STRIPE_PUBLIC_KEY=pk_test_xxxxx

# Server-side key (NEVER expose to client!)
STRIPE_SECRET_KEY=sk_test_xxxxx

# Webhook secret (from Stripe Dashboard → Webhooks)
STRIPE_WEBHOOK_SECRET=whsec_xxxxx
```

**Where to use them:**

| Key | Location | Exposed to Browser? |
|-----|----------|---------------------|
| `VITE_STRIPE_PUBLIC_KEY` | React components | ✅ YES (safe) |
| `STRIPE_SECRET_KEY` | Supabase Edge Functions only | ❌ NO (dangerous!) |
| `STRIPE_WEBHOOK_SECRET` | Supabase Edge Functions only | ❌ NO (dangerous!) |

**Files that use it:**
- `/src/app/components/CheckoutForm.tsx` - Payment form
- `/src/app/components/PricingPage.tsx` - Pricing display
- `(Future) Supabase Edge Function` - Create payment intent

**Next steps:**
- Create Supabase Edge Function for `create-payment-intent`
- Set up Stripe webhook endpoint
- Configure webhook in Stripe Dashboard

---

### 4️⃣ PAYPAL (Optional - Alternative Payment)

**What it's for:** PayPal payment processing

**Get credentials:**
1. Go to [PayPal Developer Dashboard](https://developer.paypal.com/dashboard)
2. Create a **REST API app**
3. Get **Client ID** and **Secret**
4. Use **Sandbox** for testing, **Live** for production

```env
VITE_PAYPAL_CLIENT_ID=xxxxx
PAYPAL_CLIENT_SECRET=xxxxx
VITE_PAYPAL_MODE=sandbox
```

**Files that use it:**
- `/src/app/components/CheckoutForm.tsx` - PayPal button integration

---

### 5️⃣ OPENAI (Optional - for AI Responses)

**What it's for:** GPT-powered AI responses when local keyword matching fails

**Get credentials:**
1. Go to [https://platform.openai.com/api-keys](https://platform.openai.com/api-keys)
2. Create new API key
3. **IMPORTANT:** Store in `.env` but **NEVER expose to client!**

```env
# ⚠️ NEVER use VITE_ prefix - keeps it server-side only!
OPENAI_API_KEY=sk-proj-xxxxx
OPENAI_ORG_ID=org-xxxxx (optional)

# Client-side config (safe)
VITE_OPENAI_MODEL=gpt-4-turbo-preview
VITE_ENABLE_OPENAI=true
```

**CRITICAL SECURITY:**
- ❌ **DO NOT** prefix with `VITE_` (would expose to client!)
- ✅ **DO** use in Supabase Edge Function only
- ✅ **DO** rate limit API calls
- ✅ **DO** monitor usage to prevent bill shock

**Implementation:**
Create a Supabase Edge Function to call OpenAI:

```typescript
// supabase/functions/ask-ai/index.ts
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'

serve(async (req) => {
  const { question } = await req.json()
  
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${Deno.env.get('OPENAI_API_KEY')}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'gpt-4-turbo-preview',
      messages: [{ role: 'user', content: question }],
    }),
  })
  
  const data = await response.json()
  return new Response(JSON.stringify(data), {
    headers: { 'Content-Type': 'application/json' },
  })
})
```

**Files that use it:**
- `(Future) Supabase Edge Function` - AI response generation
- `/src/app/components/AIAgentSidePanel.tsx` - Calls Edge Function

---

### 6️⃣ FIREBASE/FIRESTORE (Optional - Hybrid Setup)

**What it's for:** Alternative/additional database (if you want both Supabase + Firebase)

**Get credentials:**
1. Go to [Firebase Console](https://console.firebase.google.com)
2. Select project → **Project Settings** → **General**
3. Scroll to **Your apps** → **Web app** → **Config**

```env
VITE_FIREBASE_API_KEY=xxxxx
VITE_FIREBASE_AUTH_DOMAIN=xxxxx.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=xxxxx
VITE_FIREBASE_STORAGE_BUCKET=xxxxx.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=xxxxx
VITE_FIREBASE_APP_ID=xxxxx
```

**Note:** Currently not implemented. If you want Firebase, you'll need to:
1. Install Firebase SDK: `npm install firebase`
2. Create `/src/lib/firebase.ts` similar to `/src/lib/supabase.ts`
3. Implement Firebase authentication alongside Supabase

---

### 7️⃣ EMAIL SERVICE (Optional - for Confirmations)

**What it's for:** Sending data consent confirmations, payment receipts

**Option A: SendGrid**
1. Go to [SendGrid](https://sendgrid.com)
2. Create API key in **Settings** → **API Keys**

```env
SENDGRID_API_KEY=SG.xxxxx
VITE_SENDGRID_FROM_EMAIL=cara@oratf.info
```

**Option B: Resend** (Recommended - easier setup)
1. Go to [Resend](https://resend.com)
2. Create API key

```env
RESEND_API_KEY=re_xxxxx
VITE_RESEND_FROM_EMAIL=cara@oratf.info
```

**Files that use it:**
- `/src/app/components/DataConsentModal.tsx` - Send agreement emails
- `(Future) Supabase Edge Function` - Send receipt emails

---

## 📁 FILES THAT USE CREDENTIALS

### Core Configuration Files

| File | What it does | Imports from |
|------|--------------|--------------|
| **`/src/lib/config.ts`** | **CENTRAL CONFIG** - Loads all env vars | `.env` |
| `/src/lib/supabase.ts` | Creates Supabase client | `config.ts` |
| `/src/app/utils/supabaseFeedback.ts` | Feedback tracking | `config.ts` |

### Components That Need Credentials

| Component | What credentials | How it gets them |
|-----------|------------------|------------------|
| `CheckoutForm.tsx` | Stripe public key | `import { stripeConfig } from '@/lib/config'` |
| `AuthPage.tsx` | Google OAuth client ID | `import { googleConfig } from '@/lib/config'` |
| `AIAgentSidePanel.tsx` | OpenAI model name | `import { openaiConfig } from '@/lib/config'` |

### How to Use Config in Components

```typescript
// ✅ CORRECT - Import from config
import { stripeConfig, isStripeEnabled } from '@/lib/config';

function MyComponent() {
  if (!isStripeEnabled) {
    return <div>Stripe not configured</div>;
  }
  
  const stripe = await loadStripe(stripeConfig.publicKey);
  // ... use stripe
}
```

```typescript
// ❌ WRONG - Never access env vars directly in components
import.meta.env.VITE_STRIPE_PUBLIC_KEY // Don't do this!
```

---

## 🔒 SECURITY BEST PRACTICES

### ✅ DO:

1. **Use `.env` for ALL credentials**
   - Never hardcode keys in source files
   - Never commit `.env` to Git (it's in `.gitignore`)

2. **Use VITE_ prefix for client-safe values**
   - `VITE_STRIPE_PUBLIC_KEY` ✅ (safe to expose)
   - `STRIPE_SECRET_KEY` ✅ (not exposed to client)

3. **Rotate keys regularly**
   - Change keys every 90 days
   - Immediately after team member leaves
   - After any security incident

4. **Use test keys in development**
   - Stripe: `pk_test_`, `sk_test_`
   - PayPal: Sandbox mode
   - Keep production keys in separate `.env.production`

5. **Validate on startup**
   - The app checks required env vars when it loads
   - See console for missing/invalid credentials

### ❌ DON'T:

1. **Never expose server-side keys to client**
   - ❌ `VITE_STRIPE_SECRET_KEY` (would expose it!)
   - ❌ `VITE_OPENAI_API_KEY` (would expose it!)

2. **Never commit `.env` to Git**
   - Check `.gitignore` includes `.env`
   - Use `.env.example` for documentation

3. **Never share credentials in**
   - Slack messages
   - Email
   - Screenshots
   - Support tickets

4. **Never use production keys in development**
   - Keep them separate
   - Use `.env.development` and `.env.production`

---

## 🛠️ TROUBLESHOOTING

### "Missing required environment variable"

**Problem:** App won't start, shows error about missing env var

**Solution:**
1. Check `.env` file exists in project root
2. Check variable name matches `.env.example`
3. Restart dev server after changing `.env`

### "Supabase connection failed"

**Problem:** Can't connect to Supabase

**Solution:**
1. Verify `VITE_SUPABASE_URL` is correct (should end in `.supabase.co`)
2. Verify `VITE_SUPABASE_ANON_KEY` is your **anon** key (not service role key)
3. Check Supabase project is not paused
4. Check network/firewall isn't blocking Supabase

### "Stripe not configured" warning

**Problem:** See warning in console about Stripe

**Solution:**
- This is just a warning - payment features disabled
- Add `VITE_STRIPE_PUBLIC_KEY` to `.env` when ready
- Or ignore if you don't need payments yet

### Changes to `.env` not taking effect

**Problem:** Updated `.env` but app still uses old values

**Solution:**
1. **Restart dev server** (stop and `npm run dev` again)
2. Clear browser cache (Ctrl+Shift+R / Cmd+Shift+R)
3. Check you edited `.env` not `.env.example`

### "Cannot read property of undefined" in config.ts

**Problem:** Error when accessing config values

**Solution:**
1. Check the env var is defined in `.env`
2. Check you're accessing it correctly:
   ```typescript
   // ✅ Correct
   config.stripe?.publicKey
   
   // ❌ Wrong (will crash if stripe not configured)
   config.stripe.publicKey
   ```

---

## 📚 ADDITIONAL RESOURCES

### Official Documentation

- [Supabase Docs](https://supabase.com/docs)
- [Stripe API Reference](https://stripe.com/docs/api)
- [PayPal Developer Docs](https://developer.paypal.com/docs)
- [OpenAI API Docs](https://platform.openai.com/docs)
- [Google OAuth Setup](https://developers.google.com/identity/protocols/oauth2)

### ORA Project Documentation

- `/.env.example` - Complete list of all env vars
- `/src/lib/config.ts` - See how config is loaded/validated
- `/SUPABASE_SETUP_COMPLETE.md` - Supabase database setup
- `/SUPABASE_FEEDBACK_SETUP.md` - Feedback tracking setup

---

## 🎯 CHECKLIST FOR PRODUCTION DEPLOYMENT

Before deploying to production, verify:

- [ ] All required credentials in `.env`
- [ ] Using **production** API keys (not test keys)
- [ ] `.env` file is NOT committed to Git
- [ ] Supabase RLS policies configured
- [ ] Stripe webhook endpoint set up
- [ ] Google OAuth redirect URIs include production URL
- [ ] Environment variables set in hosting platform (Vercel/Netlify/etc)
- [ ] Tested payment flow with real (small) transaction
- [ ] OpenAI rate limiting configured
- [ ] Email service configured and tested

---

## 📞 NEED HELP?

If you're stuck:

1. Check console for validation errors (app checks config on load)
2. Review this guide's troubleshooting section
3. Check `.env.example` for variable format
4. Verify credentials in each service's dashboard
5. Contact: cara@oratf.info

---

**Last updated:** January 8, 2026  
**Version:** 1.0.0

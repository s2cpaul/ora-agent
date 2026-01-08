# 🔐 CREDENTIALS - QUICK REFERENCE

**Last Updated:** January 8, 2026

---

## 📍 WHERE ARE CREDENTIALS STORED?

| Location | Purpose | Git Tracked? |
|----------|---------|--------------|
| **`/.env`** | **ALL secret credentials** | ❌ NO |
| `/src/lib/config.ts` | Loads & validates env vars | ✅ YES (safe) |
| `/.env.example` | Template with placeholders | ✅ YES (safe) |

---

## 📂 FILE STRUCTURE

```
ora-project/
├── .env                          ← 🔒 YOUR CREDENTIALS (never commit!)
├── .env.example                  ← 📄 Template (safe to commit)
├── .gitignore                    ← Blocks .env from Git
│
├── src/
│   ├── lib/
│   │   ├── config.ts             ← 🎯 CENTRAL CONFIG (import this!)
│   │   └── supabase.ts           ← Uses config.ts
│   │
│   └── app/
│       ├── components/
│       │   ├── CheckoutForm.tsx  ← Uses stripeConfig from config.ts
│       │   ├── AuthPage.tsx      ← Uses googleConfig from config.ts
│       │   └── ...
│       │
│       └── utils/
│           └── supabaseFeedback.ts ← Uses config.ts
│
├── CREDENTIALS_GUIDE.md          ← 📖 Full setup guide
├── SETUP_CHECKLIST.md            ← ✅ Step-by-step checklist
└── CREDENTIALS_SUMMARY.md        ← 📋 This file (quick reference)
```

---

## 🔑 CREDENTIALS BY SERVICE

### 1. **Supabase** (REQUIRED)
```env
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGc...
```
**Where to get:** [app.supabase.com](https://app.supabase.com) → Settings → API

---

### 2. **Stripe** (Payment Processing)
```env
VITE_STRIPE_PUBLIC_KEY=pk_test_xxxxx     # Client-side (safe)
STRIPE_SECRET_KEY=sk_test_xxxxx          # Server-side ONLY
STRIPE_WEBHOOK_SECRET=whsec_xxxxx        # Webhook verification
```
**Where to get:** [dashboard.stripe.com](https://dashboard.stripe.com) → Developers → API Keys

---

### 3. **PayPal** (Optional Payment)
```env
VITE_PAYPAL_CLIENT_ID=xxxxx              # Client-side (safe)
PAYPAL_CLIENT_SECRET=xxxxx               # Server-side ONLY
VITE_PAYPAL_MODE=sandbox                 # or "live"
```
**Where to get:** [developer.paypal.com](https://developer.paypal.com) → Apps & Credentials

---

### 4. **Google OAuth** (Sign-in)
```env
VITE_GOOGLE_CLIENT_ID=xxxxx.apps.googleusercontent.com
VITE_ENABLE_GOOGLE_OAUTH=true
```
**Where to get:** [console.cloud.google.com](https://console.cloud.google.com) → APIs & Services → Credentials

---

### 5. **OpenAI** (AI Responses)
```env
OPENAI_API_KEY=sk-proj-xxxxx             # ⚠️ Server-side ONLY
VITE_OPENAI_MODEL=gpt-4-turbo-preview    # Client-side config (safe)
VITE_ENABLE_OPENAI=true
```
**Where to get:** [platform.openai.com](https://platform.openai.com) → API Keys

⚠️ **CRITICAL:** Never use `VITE_` prefix for API key!

---

### 6. **Firebase/Firestore** (Optional)
```env
VITE_FIREBASE_API_KEY=xxxxx
VITE_FIREBASE_AUTH_DOMAIN=xxxxx.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=xxxxx
VITE_FIREBASE_STORAGE_BUCKET=xxxxx.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=xxxxx
VITE_FIREBASE_APP_ID=xxxxx
```
**Where to get:** [console.firebase.google.com](https://console.firebase.google.com) → Project Settings

---

### 7. **Email Service** (Optional)
```env
# Option A: SendGrid
SENDGRID_API_KEY=SG.xxxxx
VITE_SENDGRID_FROM_EMAIL=cara@oratf.info

# Option B: Resend
RESEND_API_KEY=re_xxxxx
VITE_RESEND_FROM_EMAIL=cara@oratf.info
```

---

## 🎯 HOW TO USE IN CODE

### ✅ CORRECT - Import from config.ts

```typescript
// In any component
import { stripeConfig, isStripeEnabled } from '@/lib/config';

function CheckoutButton() {
  if (!isStripeEnabled) {
    return <div>Payments not available</div>;
  }
  
  const stripe = await loadStripe(stripeConfig.publicKey);
  // ...
}
```

### ❌ WRONG - Direct env access

```typescript
// DON'T DO THIS!
const key = import.meta.env.VITE_STRIPE_PUBLIC_KEY;
```

---

## 🔒 CLIENT VS SERVER

### Variables Exposed to Browser (VITE_* prefix)

✅ **SAFE** to expose:
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`
- `VITE_STRIPE_PUBLIC_KEY`
- `VITE_PAYPAL_CLIENT_ID`
- `VITE_GOOGLE_CLIENT_ID`
- `VITE_OPENAI_MODEL`
- All `VITE_ENABLE_*` flags

### Server-Only Variables (NO VITE_ prefix)

❌ **NEVER** expose:
- `STRIPE_SECRET_KEY` (use in Edge Functions only)
- `PAYPAL_CLIENT_SECRET` (use in Edge Functions only)
- `OPENAI_API_KEY` (use in Edge Functions only)
- `SENDGRID_API_KEY` (use in Edge Functions only)
- `STRIPE_WEBHOOK_SECRET` (use in Edge Functions only)

---

## 🚀 QUICK START

### 1. Create `.env` file
```bash
cp .env.example .env
```

### 2. Fill in minimum required credentials
```env
# Minimum to run app
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=your_key_here
```

### 3. Start dev server
```bash
npm install
npm run dev
```

### 4. Check console
App will show warnings for missing optional services (Stripe, PayPal, etc.)

---

## ⚠️ SECURITY RULES

### DO:
- ✅ Keep `.env` in `.gitignore`
- ✅ Use `VITE_` prefix for client-safe values
- ✅ Keep server keys (secret, private) without `VITE_` prefix
- ✅ Restart dev server after changing `.env`
- ✅ Use test keys in development
- ✅ Rotate keys regularly

### DON'T:
- ❌ Commit `.env` to Git
- ❌ Share credentials in Slack/email
- ❌ Use production keys in development
- ❌ Add `VITE_` prefix to secret keys
- ❌ Hardcode credentials in source files

---

## 🛠️ FILES THAT WERE CLEANED

These files previously had hardcoded credentials but now use `config.ts`:

| File | What changed |
|------|--------------|
| `/src/lib/supabase.ts` | Now imports from `config.ts` instead of hardcoded URL/key |
| `/src/app/utils/supabaseFeedback.ts` | Now imports from `config.ts` instead of placeholder key |
| `/src/app/components/CheckoutForm.tsx` | Will import Stripe key from `config.ts` when implemented |

---

## 📚 MORE INFO

- **Full Setup Guide:** `/CREDENTIALS_GUIDE.md`
- **Step-by-Step Checklist:** `/SETUP_CHECKLIST.md`
- **Environment Template:** `/.env.example`
- **Config Implementation:** `/src/lib/config.ts`

---

## 🆘 TROUBLESHOOTING

### "Missing required environment variable"
→ Check `.env` file exists and has the required variable

### "Stripe not configured"
→ Warning only - add `VITE_STRIPE_PUBLIC_KEY` when ready for payments

### Changes to `.env` not working
→ Restart dev server (stop and `npm run dev`)

### Can't find config values
→ Import from `/src/lib/config.ts`, not `import.meta.env` directly

---

**Need help?** See `/CREDENTIALS_GUIDE.md` or contact: cara@oratf.info

# ✅ ORA AI AGENT - SETUP CHECKLIST

Complete this checklist to get your ORA project ready for Visual Studio Code and production deployment.

---

## 🎯 PHASE 1: LOCAL DEVELOPMENT SETUP

### Step 1: Environment Variables

- [ ] **Copy `.env.example` to `.env`**
  ```bash
  cp .env.example .env
  ```

- [ ] **Fill in Supabase credentials** (REQUIRED)
  - [ ] `VITE_SUPABASE_URL` from [Supabase Dashboard](https://app.supabase.com)
  - [ ] `VITE_SUPABASE_ANON_KEY` from Settings → API

- [ ] **Test the app starts**
  ```bash
  npm install
  npm run dev
  ```
  - [ ] No errors in console about missing env vars
  - [ ] App loads at http://localhost:5173

### Step 2: Version Control

- [ ] **Verify `.gitignore` includes `.env`**
  ```bash
  cat .gitignore | grep ".env"
  ```

- [ ] **Initialize Git (if not already)**
  ```bash
  git init
  git add .
  git commit -m "Initial commit - clean credential setup"
  ```

- [ ] **Verify `.env` is NOT tracked**
  ```bash
  git status
  # Should NOT see .env in list
  ```

### Step 3: VS Code Setup

- [ ] **Open project in VS Code**
  ```bash
  code .
  ```

- [ ] **Install recommended extensions:**
  - [ ] ESLint
  - [ ] Prettier
  - [ ] TypeScript and JavaScript Language Features
  - [ ] Tailwind CSS IntelliSense
  - [ ] ES7+ React/Redux/React-Native snippets

- [ ] **Test IntelliSense works**
  - [ ] Open `/src/lib/config.ts`
  - [ ] Type `config.` and verify autocomplete works
  - [ ] Hover over variables - should show types

---

## 🔐 PHASE 2: SERVICE INTEGRATIONS

### Supabase Setup (REQUIRED)

- [ ] **Create Supabase project** at [app.supabase.com](https://app.supabase.com)

- [ ] **Run feedback table SQL**
  - [ ] Go to SQL Editor in Supabase
  - [ ] Copy SQL from `/src/app/utils/supabaseFeedback.ts` (lines 186-233)
  - [ ] Run to create `feedback` table
  - [ ] Verify table exists in Table Editor

- [ ] **Enable Row Level Security**
  - [ ] Check RLS is enabled on `feedback` table
  - [ ] Verify policies exist (insert for public, read for authenticated)

- [ ] **Test Supabase connection**
  - [ ] Run app, open AI Agent
  - [ ] Click thumbs up/down on a response
  - [ ] Check Supabase Table Editor - feedback should appear

### Google OAuth Setup (OPTIONAL)

- [ ] **Create Google OAuth credentials**
  - [ ] Go to [Google Cloud Console](https://console.cloud.google.com)
  - [ ] APIs & Services → Credentials → Create OAuth Client ID
  - [ ] Add redirect URIs:
    - [ ] `http://localhost:5173`
    - [ ] `https://[YOUR-PROJECT].supabase.co/auth/v1/callback`
  - [ ] Copy Client ID

- [ ] **Configure in Supabase**
  - [ ] Supabase → Authentication → Providers
  - [ ] Enable Google
  - [ ] Paste Google Client ID and Secret

- [ ] **Add to `.env`**
  ```env
  VITE_GOOGLE_CLIENT_ID=your-id.apps.googleusercontent.com
  VITE_ENABLE_GOOGLE_OAUTH=true
  ```

- [ ] **Test Google Sign-In**
  - [ ] Restart dev server
  - [ ] Click "Sign in with Google"
  - [ ] Should redirect to Google auth

### Stripe Setup (REQUIRED for Payments)

- [ ] **Create Stripe account** at [stripe.com](https://stripe.com)

- [ ] **Get test API keys**
  - [ ] Dashboard → Developers → API keys
  - [ ] Copy Publishable key (starts with `pk_test_`)
  - [ ] Copy Secret key (starts with `sk_test_`)

- [ ] **Add to `.env`**
  ```env
  VITE_STRIPE_PUBLIC_KEY=pk_test_xxxxx
  STRIPE_SECRET_KEY=sk_test_xxxxx
  ```

- [ ] **Create Stripe products** (for pricing tiers)
  - [ ] Dashboard → Products
  - [ ] Create product for each tier:
    - [ ] Solo - $24/month
    - [ ] Buddy - $60/month
    - [ ] Team - $250/month
    - [ ] Enterprise - $1500/month
  - [ ] Save Price IDs

- [ ] **Set up webhook endpoint**
  - [ ] Dashboard → Developers → Webhooks
  - [ ] Add endpoint (will be Supabase Edge Function URL)
  - [ ] Listen for: `checkout.session.completed`, `customer.subscription.updated`, `customer.subscription.deleted`
  - [ ] Copy webhook signing secret

- [ ] **Create Supabase Edge Function for Stripe** (see Phase 3)

### PayPal Setup (OPTIONAL)

- [ ] **Create PayPal Developer account** at [developer.paypal.com](https://developer.paypal.com)

- [ ] **Create REST API app**
  - [ ] Dashboard → Apps & Credentials
  - [ ] Create App
  - [ ] Copy Client ID and Secret

- [ ] **Add to `.env`**
  ```env
  VITE_PAYPAL_CLIENT_ID=xxxxx
  PAYPAL_CLIENT_SECRET=xxxxx
  VITE_PAYPAL_MODE=sandbox
  ```

### OpenAI Setup (OPTIONAL)

- [ ] **Create OpenAI account** at [platform.openai.com](https://platform.openai.com)

- [ ] **Create API key**
  - [ ] Settings → API keys → Create new secret key
  - [ ] Copy key (starts with `sk-proj-`)

- [ ] **Add to `.env`**
  ```env
  OPENAI_API_KEY=sk-proj-xxxxx
  VITE_OPENAI_MODEL=gpt-4-turbo-preview
  VITE_ENABLE_OPENAI=true
  ```
  ⚠️ **Note:** Do NOT use `VITE_` prefix for the API key!

- [ ] **Set up billing**
  - [ ] Add payment method
  - [ ] Set spending limits
  - [ ] Enable usage notifications

---

## ⚙️ PHASE 3: SUPABASE EDGE FUNCTIONS

Edge Functions are serverless functions that run on Supabase. They're needed for:
- Stripe payment processing (needs secret key)
- OpenAI API calls (needs secret key)
- Email sending (needs API keys)

### Install Supabase CLI

- [ ] **Install CLI**
  ```bash
  npm install -g supabase
  ```

- [ ] **Login to Supabase**
  ```bash
  supabase login
  ```

- [ ] **Link project**
  ```bash
  supabase link --project-ref [YOUR-PROJECT-REF]
  ```

### Create Stripe Payment Function

- [ ] **Create function**
  ```bash
  supabase functions new create-checkout-session
  ```

- [ ] **Edit `supabase/functions/create-checkout-session/index.ts`**
  ```typescript
  import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
  import Stripe from 'https://esm.sh/stripe@14.3.0?target=deno'
  
  const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY') || '', {
    apiVersion: '2023-10-16',
  })
  
  serve(async (req) => {
    const { priceId, customerEmail, successUrl, cancelUrl } = await req.json()
    
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      customer_email: customerEmail,
      line_items: [{ price: priceId, quantity: 1 }],
      mode: 'subscription',
      success_url: successUrl,
      cancel_url: cancelUrl,
    })
    
    return new Response(JSON.stringify({ sessionId: session.id }), {
      headers: { 'Content-Type': 'application/json' },
    })
  })
  ```

- [ ] **Set environment variables in Supabase**
  ```bash
  supabase secrets set STRIPE_SECRET_KEY=sk_test_xxxxx
  ```

- [ ] **Deploy function**
  ```bash
  supabase functions deploy create-checkout-session
  ```

- [ ] **Test function**
  - [ ] Get function URL from Supabase dashboard
  - [ ] Update `CheckoutForm.tsx` to call this function

### Create OpenAI Function (Optional)

- [ ] **Create function**
  ```bash
  supabase functions new ask-ai
  ```

- [ ] **Add OpenAI API key**
  ```bash
  supabase secrets set OPENAI_API_KEY=sk-proj-xxxxx
  ```

- [ ] **Deploy function**
  ```bash
  supabase functions deploy ask-ai
  ```

### Create Stripe Webhook Handler

- [ ] **Create function**
  ```bash
  supabase functions new stripe-webhook
  ```

- [ ] **Add webhook secret**
  ```bash
  supabase secrets set STRIPE_WEBHOOK_SECRET=whsec_xxxxx
  ```

- [ ] **Deploy function**
  ```bash
  supabase functions deploy stripe-webhook
  ```

- [ ] **Update Stripe webhook URL** to point to this function

---

## 🚀 PHASE 4: PRODUCTION DEPLOYMENT

### Prepare for Deployment

- [ ] **Switch to production API keys**
  - [ ] Create `.env.production`
  - [ ] Use production keys from all services
  - [ ] Stripe: `pk_live_`, `sk_live_`
  - [ ] PayPal: Set `VITE_PAYPAL_MODE=live`
  - [ ] OpenAI: Use production API key

- [ ] **Build and test locally**
  ```bash
  npm run build
  npm run preview
  ```
  - [ ] No build errors
  - [ ] App works in preview mode

### Deploy to Hosting Platform

Choose one:

#### Option A: Vercel

- [ ] **Install Vercel CLI**
  ```bash
  npm install -g vercel
  ```

- [ ] **Deploy**
  ```bash
  vercel
  ```

- [ ] **Add environment variables**
  - [ ] Go to Vercel dashboard → Settings → Environment Variables
  - [ ] Add all variables from `.env.production`
  - [ ] Redeploy

#### Option B: Netlify

- [ ] **Install Netlify CLI**
  ```bash
  npm install -g netlify-cli
  ```

- [ ] **Deploy**
  ```bash
  netlify deploy --prod
  ```

- [ ] **Add environment variables**
  - [ ] Go to Netlify dashboard → Site settings → Environment
  - [ ] Add all variables from `.env.production`

#### Option C: Custom Server

- [ ] **Build app**
  ```bash
  npm run build
  ```

- [ ] **Set environment variables on server**
  - [ ] Upload `.env.production` to server
  - [ ] Rename to `.env`
  - [ ] Set file permissions: `chmod 600 .env`

- [ ] **Serve with web server** (nginx, Apache, etc.)

### Post-Deployment Checks

- [ ] **Test production URL**
  - [ ] App loads without errors
  - [ ] No console errors about missing env vars

- [ ] **Test authentication**
  - [ ] Google OAuth works
  - [ ] Supabase auth works

- [ ] **Test payments**
  - [ ] Stripe checkout works
  - [ ] Use Stripe test card: `4242 4242 4242 4242`
  - [ ] Verify webhook received in Stripe dashboard

- [ ] **Update OAuth redirect URIs**
  - [ ] Google Cloud Console → Add production URL
  - [ ] Supabase → Authentication → URL Configuration

- [ ] **Update CORS settings**
  - [ ] Supabase → Settings → API → CORS
  - [ ] Add production domain

---

## 🔒 PHASE 5: SECURITY CHECKLIST

- [ ] **Verify `.env` is NOT in Git**
  ```bash
  git ls-files | grep ".env"
  # Should return nothing
  ```

- [ ] **Rotate all test keys to production keys**
  - [ ] Stripe
  - [ ] PayPal
  - [ ] OpenAI
  - [ ] Google OAuth

- [ ] **Set up rate limiting**
  - [ ] Configure in Supabase or hosting platform
  - [ ] Limit API calls per user/IP

- [ ] **Enable Supabase RLS on all tables**
  - [ ] Check each table has RLS enabled
  - [ ] Test policies with different user roles

- [ ] **Set up monitoring**
  - [ ] Stripe: Enable email notifications for failed payments
  - [ ] OpenAI: Set up usage alerts
  - [ ] Supabase: Enable database backups

- [ ] **Add CSP headers** (Content Security Policy)
  - [ ] In hosting platform settings
  - [ ] Or in `vercel.json`/`netlify.toml`

---

## 📊 PHASE 6: TESTING

### Manual Testing

- [ ] **Test full user flow**
  - [ ] Sign up (free tier)
  - [ ] Ask questions
  - [ ] Upgrade to paid tier
  - [ ] Verify subscription active
  - [ ] Test multi-agent connections (Team+ tier)

- [ ] **Test payment flows**
  - [ ] Stripe credit card
  - [ ] PayPal (if enabled)
  - [ ] Verify receipt email sent
  - [ ] Verify subscription recorded in database

- [ ] **Test feedback system**
  - [ ] Thumbs up/down
  - [ ] Check data in Supabase `feedback` table
  - [ ] Verify admin can see feedback

### Cross-Browser Testing

- [ ] Chrome
- [ ] Firefox
- [ ] Safari
- [ ] Edge
- [ ] Mobile browsers (iOS Safari, Chrome Android)

### Performance Testing

- [ ] **Run Lighthouse audit**
  - [ ] Performance score > 90
  - [ ] Accessibility score > 90
  - [ ] Best Practices score > 90
  - [ ] SEO score > 90

---

## 📚 DOCUMENTATION

- [ ] **Update README.md**
  - [ ] Project description
  - [ ] Setup instructions
  - [ ] Link to `CREDENTIALS_GUIDE.md`

- [ ] **Document custom Edge Functions**
  - [ ] How to deploy
  - [ ] Required env vars
  - [ ] Example requests/responses

- [ ] **Create runbook for common issues**
  - [ ] Payment failures
  - [ ] Auth errors
  - [ ] Database connection issues

---

## 🎉 YOU'RE DONE!

Your ORA AI Agent is now:

✅ Properly configured with environment variables  
✅ Credentials securely managed  
✅ Integrated with Supabase, Stripe, PayPal, OpenAI, Google OAuth  
✅ Deployed to production  
✅ Secure and monitored  

### Next Steps:

1. **Monitor usage** in first week
2. **Gather user feedback**
3. **Iterate on features**
4. **Scale infrastructure** as needed

---

## 🆘 NEED HELP?

- **Documentation:** See `/CREDENTIALS_GUIDE.md`
- **Supabase Issues:** [supabase.com/docs](https://supabase.com/docs)
- **Stripe Issues:** [stripe.com/docs](https://stripe.com/docs)
- **Contact:** cara@oratf.info

---

**Good luck with your launch! 🚀**

# 🚀 Quick Start Guide - Supabase Authentication

## ✅ Setup Complete!

Your ORA app now has **full authentication** powered by Supabase!

---

## 🎯 What to Do Right Now

### **Step 1: Start Your Dev Server**

In your VS Code terminal, run:

```bash
npm run dev
```

### **Step 2: You'll See the Login Screen**

The app will now show the **AuthPage** instead of jumping straight to the content.

### **Step 3: Create Your First Account**

1. Click **"Don't have an account? Sign up"**
2. Fill in:
   - **Full Name:** Your name
   - **Email:** Your email
   - **Password:** At least 6 characters
3. Click **"Sign Up"**

### **Step 4: Check Your Email**

- You'll receive a verification email from Supabase
- Click the verification link
- (Optional for testing - you can skip this and still use the app)

### **Step 5: Sign In**

1. Go back to the app
2. Enter your email and password
3. Click **"Sign In"**
4. **You're in!** 🎉

---

## 👀 What You'll See

### **When Logged Out:**
- Clean login/signup screen
- "Free Tier Includes" section showing:
  - Limited AI content access
  - 25 AI questions/month
  - Progress tracking
  - Agent interaction tracking

### **When Logged In:**
- Full ORA app interface
- Your username in the top-left header
- Click your username to **sign out**

---

## 🗄️ Check Your Database

### **Supabase Dashboard:**
1. Go to: https://supabase.com/dashboard/project/naskxuojfdqcunotdjzi
2. Click **"Table Editor"** in the left sidebar
3. Click **"users"** table
4. You'll see your new user account!

### **What Got Created Automatically:**

When you signed up, the system automatically created:

1. **User Profile** (in `users` table)
   - Your ID, email, full name
   - Subscription tier: "free"

2. **Subscription Record** (in `subscriptions` table)
   - Tier: "free"
   - Status: "active"
   - Period: 1 year from signup

3. **Usage Tracking** (in `usage_tracking` table)
   - Month: Current month (YYYY-MM format)
   - Questions asked: 0
   - Questions limit: 25

---

## 🔐 Security Features Active

Your app now has:

✅ **Password Protection** - Must create account to access  
✅ **Email Verification** - Confirms real users  
✅ **Row-Level Security** - Users only see their own data  
✅ **Auto Session Management** - Stays logged in, auto-refreshes  
✅ **Secure API Keys** - Stored in .env (gitignored)

---

## 🎮 Try These Features

### **1. Sign Out**
- Click your username in the top header
- You'll be logged out and see the AuthPage again

### **2. Sign Back In**
- Enter your credentials
- Your progress and data are still there!

### **3. Create Another Account**
- Sign out
- Click "Sign up"
- Use a different email
- Each account has its own data

---

## 📊 Your Subscription Tiers (Ready for Phase 2)

| Tier | Price | Questions/Month | Users | Status |
|------|-------|-----------------|-------|--------|
| **Free** | $0 | 25 | 1 | ✅ Active |
| **Solo** | $15 | Unlimited | 1 | 🔄 Coming Soon |
| **Buddy** | $30 | Unlimited | 2 | 🔄 Coming Soon |
| **Team** | $90 | Unlimited | 10+ | 🔄 Coming Soon |

---

## 🐛 Common Issues & Fixes

### **"Missing Supabase environment variables"**

**Fix:**
1. Check that `.env` file exists in your project root
2. Open `.env` and verify these lines exist:
   ```
   VITE_SUPABASE_URL=https://naskxuojfdqcunotdjzi.supabase.co
   VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   ```
3. Restart your dev server: `Ctrl+C` then `npm run dev`

### **Can't Sign In**

**Possible causes:**
- Email not verified (check your email inbox/spam)
- Wrong password (try resetting)
- Dev server not running (run `npm run dev`)

**Fix:**
- Try creating a new account with a different email
- Check Supabase dashboard to see if user exists

### **"Network Error" when signing up**

**Fix:**
- Check your internet connection
- Verify Supabase project is active (visit dashboard)
- Check browser console for detailed error

### **Stuck on Loading Screen**

**Fix:**
- Hard refresh: `Ctrl + Shift + R` (Windows) or `Cmd + Shift + R` (Mac)
- Clear browser cache
- Check browser console for errors

---

## 📁 Files Created/Modified

### **New Files:**
- ✅ `/src/app/components/AuthPage.tsx` - Login/Signup UI
- ✅ `/src/contexts/AuthContext.tsx` - Auth state management
- ✅ `/src/lib/supabase.ts` - Supabase client config
- ✅ `/src/hooks/useSubscription.ts` - Subscription hooks
- ✅ `/src/hooks/useUsageTracking.ts` - Usage tracking hooks
- ✅ `/SUPABASE_SETUP_COMPLETE.md` - Detailed setup docs
- ✅ `/QUICK_START_GUIDE.md` - This guide!

### **Modified Files:**
- ✅ `/src/app/App.tsx` - Wrapped with AuthProvider, added auth checks
- ✅ `/.env` - Added Supabase credentials (cleaned up)

### **Database (Supabase):**
- ✅ Created 4 tables with RLS policies
- ✅ Set up auto-triggers for user creation
- ✅ Configured indexes for performance

---

## 🎯 Next Features to Add (Phase 2)

After you verify authentication works:

1. **Wire Up Subscription Management**
   - Use `useSubscription` hook in PricingPage
   - Allow users to see their current tier
   - Add upgrade buttons

2. **Enforce Usage Limits**
   - Use `useUsageTracking` hook in AI Agent
   - Show "X/25 questions used this month"
   - Block questions when limit reached
   - Show upgrade prompt

3. **Add Stripe Payment**
   - Integrate Stripe Checkout
   - Handle subscription webhooks
   - Update subscription status in database

4. **Team Features**
   - Add team member invitation
   - Share content across team
   - Admin/member roles

---

## 💡 Pro Tips

1. **Test with Multiple Accounts**
   - Create 2-3 test accounts
   - Verify data isolation (can't see each other's data)

2. **Check Supabase Dashboard Often**
   - Monitor user signups
   - Check subscription status
   - View usage tracking

3. **Use Browser DevTools**
   - Open Console (F12) to see auth errors
   - Check Network tab for API calls
   - Inspect Application → Local Storage to see session

4. **Keep .env Safe**
   - Never commit to Git
   - Already in your backup: `Desktop/ORA-KEYS.txt`
   - Add to `.gitignore` (already done)

---

## ✅ Verification Checklist

Run through this to confirm everything works:

- [ ] Dev server starts without errors
- [ ] AuthPage displays on first load
- [ ] Can create a new account
- [ ] Receives verification email
- [ ] Can sign in with credentials
- [ ] Sees full ORA app when logged in
- [ ] Username shows in header
- [ ] Can sign out successfully
- [ ] Can sign back in
- [ ] User data appears in Supabase dashboard

---

## 🎊 You're Ready!

Run this command and start testing:

```bash
npm run dev
```

**Enjoy your authenticated ORA app!** 🚀

---

## 📚 More Resources

- **Supabase Docs:** https://supabase.com/docs
- **Supabase Dashboard:** https://supabase.com/dashboard
- **Your Project:** https://supabase.com/dashboard/project/naskxuojfdqcunotdjzi

---

**Questions?** Check `/SUPABASE_SETUP_COMPLETE.md` for detailed technical docs!

# 🚀 ORA - Quick Start Setup Guide

## ⚡ Get Started in 5 Minutes

This guide will get your ORA AI Leadership Agent app running locally in just a few steps.

---

## 📋 Prerequisites

Before you begin, make sure you have:

- ✅ **Node.js** (v18 or higher) - [Download here](https://nodejs.org/)
- ✅ **npm** or **yarn** package manager
- ✅ **Git** installed
- ✅ **VS Code** (recommended editor)
- ✅ **OpenAI API Key** - [Get one here](https://platform.openai.com/api-keys)
- ✅ **Supabase Account** - [Sign up here](https://supabase.com)
- ✅ **Firebase Account** (optional) - [Sign up here](https://firebase.google.com)

---

## 🔧 Step 1: Clone the Repository

```bash
# Clone from GitHub
git clone https://github.com/s2cpaul/ora-agent.git

# Navigate into the directory
cd ora-agent

# Install dependencies
npm install
```

---

## 🔐 Step 2: Set Up Environment Variables

### **A. Create Your `.env` File**

The repository includes a template (`.env.example`). Copy it to create your local `.env`:

```bash
# Copy the template
cp .env.example .env
```

**OR** in VS Code:
1. Press `Ctrl + P` (Windows) or `Cmd + P` (Mac)
2. Type `.env.example`
3. Press `Enter` to open
4. Copy all contents
5. Press `Ctrl + P` / `Cmd + P` again
6. Type `.env` and press `Enter`
7. Paste the contents

### **B. Get Your API Credentials**

#### **🔑 OpenAI API Key** (Required)

1. Go to https://platform.openai.com/api-keys
2. Click **"Create new secret key"**
3. Name it: `ORA-Dev`
4. Copy the key (starts with `sk-proj-...`)
5. Paste into `.env`:
   ```bash
   VITE_OPENAI_API_KEY=sk-proj-YOUR_KEY_HERE
   ```

#### **🔑 Supabase Credentials** (Required for Auth)

1. Go to https://supabase.com/dashboard
2. Create a new project (or use existing)
3. Go to **Settings** → **API**
4. Copy **Project URL** and **anon public** key
5. Paste into `.env`:
   ```bash
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key-here
   ```

#### **🔑 Firebase Credentials** (Optional)

1. Go to https://console.firebase.google.com
2. Create a new project (or use existing: `ora-platform-2681b`)
3. Go to **Project Settings** → **General**
4. Scroll to **"Your apps"** → Select web app
5. Copy the config values and paste into `.env`:
   ```bash
   VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your-project-id
   VITE_FIREBASE_STORAGE_BUCKET=your-project.firebasestorage.app
   VITE_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
   VITE_FIREBASE_APP_ID=your-app-id
   ```

### **C. Verify Your `.env` File**

Open `.env` and make sure it looks like this:

```bash
# OpenAI (REQUIRED)
VITE_OPENAI_API_KEY=sk-proj-YOUR_ACTUAL_KEY_HERE
VITE_OPENAI_MODEL=gpt-3.5-turbo
VITE_OPENAI_MAX_TOKENS=1000
VITE_OPENAI_TEMPERATURE=0.7

# Supabase (REQUIRED)
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-actual-anon-key-here

# Firebase (OPTIONAL)
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
VITE_FIREBASE_APP_ID=your-app-id

# Build Config (Leave as-is)
BUILD_TARGET=dist
BUILD_SOURCEMAP=false
BUILD_MINIFY=true

# Dev Config (Leave as-is)
DEV_PORT=3000
DEV_HOST=localhost
DEV_OPEN=true
```

---

## 🗄️ Step 3: Set Up Supabase Database

### **A. Create Database Tables**

1. Go to your Supabase project: https://supabase.com/dashboard
2. Click **SQL Editor** in the left sidebar
3. Click **"New Query"**
4. Copy and paste this SQL:

```sql
-- Users table
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  subscription_tier TEXT DEFAULT 'free',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Subscriptions table
CREATE TABLE IF NOT EXISTS subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  tier TEXT NOT NULL DEFAULT 'free',
  status TEXT DEFAULT 'active',
  period_start TIMESTAMPTZ DEFAULT NOW(),
  period_end TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Usage tracking table
CREATE TABLE IF NOT EXISTS usage_tracking (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  month TEXT NOT NULL,
  questions_asked INTEGER DEFAULT 0,
  questions_limit INTEGER DEFAULT 25,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, month)
);

-- Feedback table
CREATE TABLE IF NOT EXISTS feedback (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  content_id TEXT,
  rating INTEGER,
  feedback_text TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE usage_tracking ENABLE ROW LEVEL SECURITY;
ALTER TABLE feedback ENABLE ROW LEVEL SECURITY;

-- Create RLS Policies (Users can only access their own data)
CREATE POLICY "Users can view own data" ON users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own data" ON users
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can view own subscriptions" ON subscriptions
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can view own usage" ON usage_tracking
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own usage" ON usage_tracking
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own usage" ON usage_tracking
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own feedback" ON feedback
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view own feedback" ON feedback
  FOR SELECT USING (auth.uid() = user_id);
```

5. Click **"Run"**
6. Verify tables were created in **Table Editor**

### **B. Enable Email Auth**

1. In Supabase Dashboard, go to **Authentication** → **Providers**
2. Make sure **Email** is enabled
3. Configure email templates (optional)

---

## 🚀 Step 4: Start the Development Server

```bash
# Start the dev server
npm run dev
```

The app will open at: **http://localhost:3000**

---

## ✅ Step 5: Verify Everything Works

### **Test 1: App Loads**
- ✅ Browser opens to `http://localhost:3000`
- ✅ See ORA login/signup page
- ✅ No console errors (press F12 to check)

### **Test 2: Create Account**
1. Click **"Don't have an account? Sign up"**
2. Enter:
   - Full Name: `Your Name`
   - Email: `your-email@example.com`
   - Password: `test123456`
3. Click **"Sign Up"**
4. ✅ Should see success message

### **Test 3: Sign In**
1. Enter your email and password
2. Click **"Sign In"**
3. ✅ Should see the main ORA interface
4. ✅ Your name appears in the header

### **Test 4: AI Agent Works**
1. Click **"Try Mobile AI Agent"** button
2. Type a message: `"What compliance requirements for AI?"`
3. ✅ Should see AI response
4. ✅ Multi-agent system activates (Legal Advisor)

### **Test 5: Check Database**
1. Go to Supabase Dashboard → **Table Editor**
2. Click **"users"** table
3. ✅ Should see your user account
4. Click **"subscriptions"** table
5. ✅ Should see your free subscription

---

## 🔐 Security Checklist

Before committing any code, verify:

```bash
# 1. Check .env is NOT tracked
git status

# Should NOT show .env in the list
# If it does, run:
git rm --cached .env

# 2. Verify .gitignore exists
cat .gitignore | grep .env

# Should show:
# .env
# .env.local
# .env.*.local

# 3. Never commit credentials
git log --all -- .env

# Should return nothing (good!)
```

---

## 📱 Step 6: Try Key Features

### **🤖 Multi-Agent System**
1. Click **"Try Mobile AI Agent"**
2. Ask: `"What are the legal requirements for AI compliance?"`
3. Watch the **Legal Advisor** agent activate
4. See multi-agent collaboration indicator

### **⚙️ Agent Manager**
1. Click the purple **⚙️ Settings** icon in AI panel
2. Browse available specialist agents:
   - ⚖️ Legal Advisor
   - 👥 HR Strategist
   - 💰 Financial Analyst
   - 🔧 Tech Architect
   - 📊 Data Scientist
   - 📈 Marketing Maven

### **💎 Pricing Tiers**
1. Click **"Pricing"** in navigation
2. See 5 subscription tiers:
   - Free ($0)
   - Pro ($29/mo)
   - Team ($99/mo)
   - Enterprise ($299/mo)
   - Custom (Contact)

### **📚 Training Modules**
1. Click **"Training"** in navigation
2. See **AI Accelerator** modules
3. 🔒 Premium modules show lock icons

### **🛠️ Configuration** (Restricted Access)
1. Click **"Configuration"** in navigation
2. Viewable by all users
3. File management restricted to: `carapaulson1@gmail.com`

---

## 🐛 Troubleshooting

### **"Missing Supabase environment variables"**

**Fix:**
```bash
# 1. Check .env file exists
ls -la .env

# 2. Verify contents
cat .env | grep SUPABASE

# Should show:
# VITE_SUPABASE_URL=https://...
# VITE_SUPABASE_ANON_KEY=eyJ...

# 3. Restart dev server
# Press Ctrl+C, then:
npm run dev
```

### **"OpenAI API Error"**

**Fix:**
1. Check your API key is valid: https://platform.openai.com/api-keys
2. Verify billing is set up in OpenAI account
3. Check `.env` has correct key (starts with `sk-proj-`)
4. Restart dev server

### **Can't Sign In**

**Fix:**
1. Check Supabase project is active
2. Verify tables exist in Supabase Table Editor
3. Try creating a new account with different email
4. Check browser console (F12) for errors

### **App Not Loading**

**Fix:**
```bash
# Clear Vite cache
rm -rf node_modules/.vite
rm -rf dist

# Reinstall dependencies
npm ci

# Rebuild and start
npm run build
npm run dev
```

### **Build Errors**

**Fix:**
```bash
# Clear all caches
rm -rf node_modules/.vite
rm -rf dist
rm -rf node_modules

# Fresh install
npm install

# Try again
npm run dev
```

---

## 📁 Project Structure

```
ora-agent/
├── .env                    # 🔐 Your credentials (gitignored)
├── .env.example            # Template for .env
├── .gitignore              # Git ignore rules
├── LICENSE                 # MIT License
├── README.md               # Project overview
├── package.json            # Dependencies
├── vite.config.ts          # Vite configuration
├── tsconfig.json           # TypeScript config
│
├── src/
│   ├── app/
│   │   ├── App.tsx                    # Main app component
│   │   ├── components/                # All React components
│   │   │   ├── AIAgentSidePanel.tsx  # AI chat interface
│   │   │   ├── AuthPage.tsx          # Login/signup
│   │   │   ├── PricingPage.tsx       # Pricing tiers
│   │   │   ├── TrainingPage.tsx      # Training modules
│   │   │   ├── ConfigurationPage.tsx # Config (restricted)
│   │   │   ├── MissionPage.tsx       # Mission statement
│   │   │   ├── GlobalNavigation.tsx  # Navigation bar
│   │   │   ├── GlobalFooter.tsx      # Footer
│   │   │   └── ...                   # 50+ components
│   │   ├── data/
│   │   │   └── content.ts            # App content/data
│   │   └── utils/
│   │       ├── analytics.ts          # Analytics tracking
│   │       └── adminPermissions.ts   # Access control
│   │
│   ├── contexts/
│   │   └── AuthContext.tsx           # Authentication state
│   │
│   ├── hooks/
│   │   ├── useSubscription.ts        # Subscription hooks
│   │   └── useUsageTracking.ts       # Usage tracking
│   │
│   ├── lib/
│   │   ├── supabase.ts               # Supabase client
│   │   └── config.ts                 # App configuration
│   │
│   ├── styles/
│   │   ├── index.css                 # Global styles
│   │   ├── theme.css                 # Theme variables
│   │   ├── tailwind.css              # Tailwind imports
│   │   └── fonts.css                 # Font imports
│   │
│   └── main.tsx                       # App entry point
│
├── public/
│   ├── manifest.json                  # PWA manifest
│   └── sw.js                          # Service worker
│
└── docs/
    ├── QUICK_START_SETUP.md          # This guide
    ├── QUICK_START.md                # Multi-agent quick start
    ├── QUICK_START_GUIDE.md          # Supabase auth guide
    ├── SUPABASE_SETUP_COMPLETE.md    # Detailed Supabase docs
    ├── MULTI_AGENT_SYSTEM.md         # Multi-agent architecture
    ├── CREDENTIALS_GUIDE.md          # Security best practices
    └── ...                           # 20+ documentation files
```

---

## 🚀 Deployment

### **Deploy to Vercel (Recommended)**

```bash
# 1. Install Vercel CLI
npm i -g vercel

# 2. Login
vercel login

# 3. Deploy
vercel

# 4. Add environment variables in Vercel Dashboard:
# Settings → Environment Variables → Add:
# - VITE_OPENAI_API_KEY
# - VITE_SUPABASE_URL
# - VITE_SUPABASE_ANON_KEY
# - (all other VITE_* variables)

# 5. Redeploy
vercel --prod
```

### **Deploy to Firebase Hosting**

```bash
# 1. Install Firebase CLI
npm install -g firebase-tools

# 2. Login
firebase login

# 3. Initialize
firebase init hosting

# 4. Build
npm run build

# 5. Deploy
firebase deploy --only hosting
```

---

## 🎯 Next Steps

Now that your app is running:

1. **✅ Explore Features**
   - Try the multi-agent system
   - Browse training modules
   - Check out pricing tiers

2. **✅ Customize Content**
   - Edit `/src/app/data/content.ts`
   - Update training modules
   - Modify pricing tiers

3. **✅ Add Integrations**
   - Connect Google Drive
   - Connect SharePoint
   - Add Stripe payments

4. **✅ Deploy to Production**
   - Choose hosting platform
   - Set up environment variables
   - Configure custom domain

---

## 📚 Additional Resources

### **Documentation**
- [Multi-Agent System Guide](./MULTI_AGENT_SYSTEM.md)
- [Supabase Setup Complete](./SUPABASE_SETUP_COMPLETE.md)
- [Credentials Security Guide](./CREDENTIALS_GUIDE.md)
- [Testing Multi-Agent](./TESTING_MULTI_AGENT.md)

### **External Resources**
- [OpenAI API Docs](https://platform.openai.com/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Firebase Documentation](https://firebase.google.com/docs)
- [Vite Documentation](https://vitejs.dev)
- [React Documentation](https://react.dev)

### **ORA Links**
- **GitHub:** https://github.com/s2cpaul/ora-agent
- **Website:** https://agent.myora.now
- **Contact:** cara@oratf.info

---

## ✨ You're All Set!

Your ORA AI Leadership Agent is ready to use!

```bash
# Start developing:
npm run dev

# Build for production:
npm run build

# Preview production build:
npm run preview
```

**Happy building!** 🎉

---

## 📞 Support

**Questions or Issues?**

- 📧 Email: carapaulson1@gmail.com
- 🐛 Report bugs: https://github.com/s2cpaul/ora-agent/issues
- 💬 Discussions: https://github.com/s2cpaul/ora-agent/discussions

---

**Last Updated:** January 8, 2026  
**Version:** 2.0  
**License:** MIT

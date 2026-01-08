# 📦 GitHub Repository Setup - Phase 2

## ⏸️ **We Deliberately Skipped This For Now**

You asked: *"Can I start a clean new GitHub repository?"*

**Answer: YES - But AFTER we test the Supabase integration!**

---

## 🤔 Why We Waited

### **Current Situation:**
- ✅ Supabase installed and configured
- ✅ Database tables created
- ✅ Authentication system integrated
- ✅ Code is working (needs testing)
- ❌ Haven't tested signup/login yet
- ❌ Not committed to Git yet

### **The Right Order:**

1. **FIRST: Test the Integration** ← **YOU ARE HERE**
   - Run `npm run dev`
   - Test signup/login
   - Verify database connection
   - Fix any bugs

2. **THEN: Create Clean GitHub Repo**
   - After everything works
   - Commit working code
   - Clean git history
   - No broken commits

### **Why This Order Matters:**

❌ **Bad:** Commit broken code → Fix bugs → More commits → Messy history  
✅ **Good:** Fix bugs → Test → Commit working code → Clean history

---

## 📋 When You're Ready for GitHub

### **After You've Tested and Everything Works:**

### **Step 1: Create .gitignore**

Create a `.gitignore` file in your project root:

```
# Environment variables (NEVER commit these!)
.env
.env.local
.env*.local

# Dependencies
node_modules/
.pnpm-store/

# Build output
dist/
build/
.vite/

# Cache
.cache/
*.log
npm-debug.log*

# IDE
.vscode/*
!.vscode/extensions.json
.idea/
*.swp
*.swo

# OS
.DS_Store
Thumbs.db

# Firebase
.firebase/
firebase-debug.log

# Python (if using)
.venv/
__pycache__/
*.pyc

# Backup files
*-backup.*
*.bak

# Your key backup (don't commit!)
ORA-KEYS.txt
```

### **Step 2: Create New GitHub Repository**

1. **Go to GitHub:**
   - https://github.com/new

2. **Repository Settings:**
   - **Name:** `ora-ai-platform`
   - **Description:** "ORA - AI Leadership Training Platform with Supabase Auth"
   - **Visibility:** Private (recommended) or Public
   - **Don't** initialize with README (you already have code)

3. **Click "Create repository"**

### **Step 3: Initialize Git & Push**

In VS Code terminal:

```bash
# Initialize git (if not already)
git init

# Add all files (respecting .gitignore)
git add .

# Create first commit with working code
git commit -m "Initial commit: ORA platform with Supabase authentication

Features:
- User authentication (signup/login/logout)
- Supabase PostgreSQL database
- Subscription tier system (free/solo/buddy/team)
- Usage tracking (25 questions/month for free tier)
- Row-level security policies
- Auto user profile creation
- Learning content modules
- AI Agent integration
- Progress tracking
- Analytics dashboard

Tech stack:
- React + TypeScript + Vite
- Supabase (Auth + PostgreSQL + Storage)
- Tailwind CSS
- Shadcn/ui components
- Firebase Hosting
"

# Add your GitHub remote
git remote add origin https://github.com/YOUR-USERNAME/ora-ai-platform.git

# Push to GitHub
git branch -M main
git push -u origin main
```

### **Step 4: Protect Your Secrets**

**CRITICAL:** Make sure `.env` is in `.gitignore` before committing!

**Verify with:**
```bash
git status
```

You should **NOT** see `.env` in the list of files to commit.

If you see it, run:
```bash
# Remove from staging
git reset .env

# Make sure it's in .gitignore
echo ".env" >> .gitignore

# Recommit
git add .gitignore
git commit --amend
```

---

## 🔐 Environment Variables on Deployment

### **When You Deploy (Netlify/Vercel/etc):**

You'll need to set these environment variables in your hosting platform:

```
VITE_SUPABASE_URL=https://naskxuojfdqcunotdjzi.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
VITE_OPENAI_API_KEY=sk-proj-...
VITE_OPENAI_MODEL=gpt-3.5-turbo
VITE_OPENAI_MAX_TOKENS=1000
VITE_OPENAI_TEMPERATURE=0.7
VITE_FIREBASE_AUTH_DOMAIN=ora-platform-2681b.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=ora-platform-2681b
VITE_FIREBASE_STORAGE_BUCKET=ora-platform-2681b.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=29796275922
VITE_FIREBASE_APP_ID=1:29796275922:web:b2ca1d564d7ac5c365bf0b
```

### **Where to Set Them:**

**Netlify:**
- Site Settings → Build & Deploy → Environment variables

**Vercel:**
- Project Settings → Environment Variables

**Firebase Hosting:**
- Use `firebase functions:config:set` for Cloud Functions
- For client-side, they're bundled at build time

---

## 🚀 GitHub Actions CI/CD (Optional - Phase 3)

### **After GitHub is Set Up:**

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Firebase Hosting

on:
  push:
    branches:
      - main

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          
      - name: Install dependencies
        run: npm ci
        
      - name: Build
        env:
          VITE_SUPABASE_URL: ${{ secrets.VITE_SUPABASE_URL }}
          VITE_SUPABASE_ANON_KEY: ${{ secrets.VITE_SUPABASE_ANON_KEY }}
          VITE_OPENAI_API_KEY: ${{ secrets.VITE_OPENAI_API_KEY }}
        run: npm run build
        
      - name: Deploy to Firebase
        uses: FirebaseExtended/action-hosting-deploy@v0
        with:
          repoToken: ${{ secrets.GITHUB_TOKEN }}
          firebaseServiceAccount: ${{ secrets.FIREBASE_SERVICE_ACCOUNT }}
          channelId: live
          projectId: ora-platform-2681b
```

Then add secrets to GitHub:
- Settings → Secrets and variables → Actions → New repository secret

---

## 📊 Recommended Branches Strategy

### **Main Branch:**
- Production-ready code only
- Protected (require PR reviews)

### **Development Branch:**
- Active development
- Merge to main when tested

### **Feature Branches:**
- `feature/stripe-integration`
- `feature/team-collaboration`
- `feature/google-drive-sync`

---

## ✅ Pre-Commit Checklist

Before creating your first commit:

- [ ] All Supabase integration tested and working
- [ ] Can sign up successfully
- [ ] Can log in successfully
- [ ] Can log out successfully
- [ ] User data appears in Supabase dashboard
- [ ] `.env` is in `.gitignore`
- [ ] No API keys in code (all in .env)
- [ ] No console errors
- [ ] App builds without errors (`npm run build`)
- [ ] Documentation is up to date

---

## 🎯 Current Git Status

You mentioned seeing **96+ uncommitted files** - that's normal!

### **What to Do Now:**

1. **FIRST:** Test the Supabase integration
2. **Fix any bugs** that come up
3. **Verify everything works**
4. **THEN:** Follow this guide to create GitHub repo

---

## 💡 Why This Approach is Better

### **Old Approach (Messy):**
```
Commit 1: "Initial code"
Commit 2: "Add Supabase"
Commit 3: "Fix auth error"
Commit 4: "Fix database error"
Commit 5: "Fix .env issue"
Commit 6: "Actually fix .env"
Commit 7: "Remove API keys from code"
Commit 8: "Finally working"
```

### **New Approach (Clean):**
```
Commit 1: "Initial commit: ORA platform with Supabase authentication"
↓
Working code from the start!
```

---

## 📞 Next Steps Summary

### **RIGHT NOW:**
1. ✅ Test Supabase integration (see `/QUICK_START_GUIDE.md`)
2. ✅ Fix any bugs
3. ✅ Verify everything works

### **AFTER TESTING:**
1. 🔲 Create `.gitignore` file
2. 🔲 Create new GitHub repository
3. 🔲 Initialize git and push
4. 🔲 Set up environment variables on hosting
5. 🔲 Configure CI/CD (optional)

---

## 🎊 You're Almost There!

Run this to start testing:

```bash
npm run dev
```

Once everything works, come back to this guide and create your clean GitHub repo!

**Clean code → Clean git history → Happy developers** 😊

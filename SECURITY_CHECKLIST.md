# 🔐 Security Checklist - Before Pushing to GitHub

## ⚠️ CRITICAL - Run This Before Every Git Push

Before you commit and push your code to GitHub, **ALWAYS** verify these security items:

---

## ✅ **1. Environment Variables are Gitignored**

```bash
# Check if .env is in Git status
git status

# ❌ BAD - If you see .env listed:
#    Changes not staged for commit:
#        modified:   .env

# ✅ GOOD - .env should NOT appear in git status
```

**If .env appears, run:**
```bash
git rm --cached .env
git commit -m "Remove .env from Git tracking"
```

---

## ✅ **2. .gitignore is Configured Correctly**

```bash
# Verify .gitignore contains .env
cat .gitignore | grep .env
```

**Should show:**
```
.env
.env.local
.env.development.local
.env.test.local
.env.production.local
.env.*.local
```

---

## ✅ **3. No Credentials in Git History**

```bash
# Check if .env was ever committed
git log --all --full-history -- .env
```

**✅ GOOD:** No results (empty output)  
**❌ BAD:** Shows commit history

**If credentials were committed:**
```bash
# WARNING: This rewrites Git history - use with caution
git filter-branch --force --index-filter \
  "git rm --cached --ignore-unmatch .env" \
  --prune-empty --tag-name-filter cat -- --all

# Force push (only if you're the only contributor)
git push origin --force --all
```

---

## ✅ **4. No API Keys in Source Code**

```bash
# Search for common API key patterns
grep -r "sk-proj-" src/
grep -r "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9" src/
grep -r "AKIA" src/  # AWS keys
grep -r "AIza" src/  # Google keys
```

**✅ GOOD:** No results  
**❌ BAD:** Any matches found

**If found, replace with environment variables:**
```typescript
// ❌ BAD
const apiKey = "sk-proj-abc123...";

// ✅ GOOD
const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
```

---

## ✅ **5. .env.example Has No Real Credentials**

```bash
# Check .env.example content
cat .env.example | grep "sk-proj-"
```

**✅ GOOD:** No real API keys (only placeholders)  
**❌ BAD:** Contains real credentials

**.env.example should have:**
```bash
VITE_OPENAI_API_KEY=sk-proj-YOUR_KEY_HERE
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

**NOT:**
```bash
VITE_OPENAI_API_KEY=sk-proj-jO72AIBWeEvA9ab2G6Tr...  # ❌ Real key!
```

---

## ✅ **6. Verify Files Being Committed**

```bash
# See what will be committed
git diff --cached --name-only
```

**Check for:**
- ❌ `.env` (should NEVER be committed)
- ❌ `node_modules/` (should be gitignored)
- ❌ `dist/` (should be gitignored)
- ❌ Any files with credentials

---

## ✅ **7. Check for Hardcoded Secrets**

```bash
# Search for common secret patterns
grep -r "password.*=.*['\"]" src/
grep -r "secret.*=.*['\"]" src/
grep -r "token.*=.*['\"]" src/
grep -r "key.*=.*['\"]" src/
```

**✅ GOOD:** Only finds `import.meta.env.VITE_*` references  
**❌ BAD:** Finds hardcoded values like `password = "abc123"`

---

## ✅ **8. Verify All Secrets Use Environment Variables**

All credentials should be loaded from environment variables:

```typescript
// ✅ GOOD - Using environment variables
import { config } from './lib/config';

const openaiKey = config.openai.apiKey;  // Reads from import.meta.env
const supabaseUrl = config.supabase.url;

// ❌ BAD - Hardcoded credentials
const openaiKey = "sk-proj-abc123...";
const supabaseUrl = "https://myproject.supabase.co";
```

---

## ✅ **9. Review Files Changed**

```bash
# See all changes
git diff

# See staged changes
git diff --cached
```

**Look for:**
- API keys
- Passwords
- Auth tokens
- Database URLs with credentials
- Email addresses (if sensitive)

---

## ✅ **10. Pre-Commit Checklist**

Before running `git commit`, verify:

- [ ] `.env` is NOT in `git status`
- [ ] `.gitignore` includes `.env`
- [ ] `.env.example` has placeholders only
- [ ] No API keys in source code
- [ ] All secrets use environment variables
- [ ] No credentials in commit message
- [ ] Reviewed all changed files

---

## 🚀 **Safe Commit Workflow**

```bash
# 1. Check status
git status

# 2. Add files (excluding .env)
git add .

# 3. Verify what's staged
git diff --cached --name-only

# 4. If .env is staged, remove it
git reset HEAD .env

# 5. Run security checks
cat .gitignore | grep .env
git log --all -- .env

# 6. Commit
git commit -m "Your commit message"

# 7. Push
git push origin main
```

---

## 🔑 **Credential Rotation Schedule**

Rotate credentials regularly:

| Credential | Frequency | Where to Rotate |
|------------|-----------|-----------------|
| OpenAI API Key | Every 90 days | https://platform.openai.com/api-keys |
| Supabase Anon Key | Every 180 days | Supabase Dashboard → Settings → API |
| Firebase Config | Rarely | Firebase Console (usually safe) |
| Stripe Keys | Every 180 days | Stripe Dashboard → Developers → API Keys |

**After rotation:**
1. Update local `.env` file
2. Update deployment platform secrets (Vercel/Firebase)
3. **DO NOT** commit the new keys

---

## 🛡️ **What to Do If Credentials Are Exposed**

### **1. Immediate Actions (within 5 minutes)**

```bash
# Revoke exposed credentials immediately:
# - OpenAI: https://platform.openai.com/api-keys → Delete key
# - Supabase: Dashboard → Settings → API → Rotate key
# - Firebase: Console → Project settings → Service accounts
```

### **2. Create New Credentials**

Generate new API keys from respective platforms.

### **3. Update Local .env**

Replace old credentials with new ones.

### **4. Update Deployment**

Update environment variables in:
- Vercel Dashboard
- Firebase Hosting
- GitHub Secrets
- Any other deployment platforms

### **5. Remove from Git History**

```bash
# Remove .env from all Git history
git filter-branch --force --index-filter \
  "git rm --cached --ignore-unmatch .env" \
  --prune-empty --tag-name-filter cat -- --all

git push origin --force --all
```

### **6. Monitor for Unauthorized Usage**

Check API usage dashboards:
- OpenAI: Usage page
- Supabase: Database activity
- Check for unusual spikes

---

## 📋 **Security Best Practices**

### **DO:**
- ✅ Use `.env` for all secrets
- ✅ Add `.env` to `.gitignore`
- ✅ Use `.env.example` with placeholders
- ✅ Store deployment secrets in platform UIs
- ✅ Rotate credentials every 90-180 days
- ✅ Review `git status` before committing
- ✅ Use environment variable validation
- ✅ Document required environment variables

### **DON'T:**
- ❌ Commit `.env` to Git
- ❌ Share credentials in chat/email
- ❌ Hardcode API keys in source code
- ❌ Use production keys in development
- ❌ Screenshot files containing secrets
- ❌ Store credentials in comments
- ❌ Commit API keys to public repos
- ❌ Reuse the same key across projects

---

## 🔍 **Quick Security Audit**

Run this one-liner to check for common issues:

```bash
# Full security check
echo "=== Checking .gitignore ===" && \
cat .gitignore | grep .env && \
echo "=== Checking git status ===" && \
git status | grep .env && \
echo "=== Checking for API keys in code ===" && \
grep -r "sk-proj-" src/ && \
echo "=== Checking .env.example ===" && \
cat .env.example | head -n 20
```

**Expected output:**
- `.gitignore` shows `.env` entries ✅
- `git status` does NOT show `.env` ✅
- No API keys found in code ✅
- `.env.example` has placeholders ✅

---

## 📞 **Questions?**

**Not sure if something is safe to commit?**

**ASK FIRST!** It's better to be safe than sorry.

- Review this checklist
- Check with team lead
- Use `git diff` to inspect changes
- When in doubt, don't commit

---

## ✅ **Final Pre-Push Command**

Run this before every push:

```bash
# Ultimate security check
git diff --cached --name-only | grep -E "\.env$|\.env\..*$" && \
echo "❌ ERROR: .env file is staged! Remove it with: git reset HEAD .env" || \
echo "✅ Safe to push!"
```

---

**Last Updated:** January 8, 2026  
**Maintainer:** s2cpaul  
**License:** MIT

---

## 🎯 Remember

**The most important rule:**

> **If you're not 100% sure it's safe, DON'T push it.**

Take 30 seconds to review. It could save hours of credential rotation and security incidents.

**Happy (and secure) coding!** 🔐

# 🚀 Git Workflow Guide - ORA Project

## 📋 Quick Reference

This guide shows you the **recommended Git workflow** for the ORA project, from initial setup to pushing to GitHub.

---

## 🎯 Two Options: VS Code vs GitHub Web

### **✅ RECOMMENDED: VS Code + Git (Option 1)**

**Why this is better:**
- Full version control
- Local testing before push
- Proper Git history
- Easy rollback
- Branch management
- Professional workflow

### **❌ NOT RECOMMENDED: GitHub Web Upload (Option 2)**

**Why to avoid:**
- No local version control
- Can't test before uploading
- Harder to track changes
- No branch support
- Loses Git history
- Unprofessional

---

## 🛠️ Initial Setup (One-Time)

### **Step 1: Resolve LICENSE Conflict**

You have both `/LICENSE` (file) and `/LICENSE/` (directory). Fix this first:

```bash
# RECOMMENDED: Delete the LICENSE directory
# (It contains .tsx files that are actually license text, not React components)
rm -rf /LICENSE

# The main /LICENSE file should remain (it's the proper MIT License file)
```

### **Step 2: Verify .gitignore**

```bash
# Check .gitignore exists and contains .env
cat .gitignore | grep .env

# Should show:
# .env
# .env.local
# .env.*.local
```

✅ **Already done!** You have a proper `.gitignore` file.

### **Step 3: Check Git Status**

```bash
# See what will be committed
git status
```

**Look for:**
- ❌ `.env` should NOT appear (it's gitignored)
- ✅ `.env.example` should appear (safe to commit)
- ✅ `.gitignore` should appear (safe to commit)

---

## 🔐 Security Pre-Flight Check

**BEFORE committing, run this:**

```bash
# Quick security check
echo "=== Checking if .env is tracked ===" && \
git status | grep -q "\.env" && \
echo "❌ WARNING: .env is in git status! Do NOT commit!" || \
echo "✅ Safe: .env is not tracked"

# Check .gitignore
echo "=== Checking .gitignore ===" && \
cat .gitignore | grep .env && \
echo "✅ .env is in .gitignore" || \
echo "❌ WARNING: Add .env to .gitignore!"

# Check for API keys in code
echo "=== Checking for exposed API keys ===" && \
grep -r "sk-proj-" src/ && \
echo "❌ WARNING: API key found in code!" || \
echo "✅ No API keys in source code"
```

**Expected output:**
```
✅ Safe: .env is not tracked
✅ .env is in .gitignore
✅ No API keys in source code
```

---

## 📝 Standard Git Workflow

### **1. Check Current Status**

```bash
# See what changed
git status

# See detailed changes
git diff
```

### **2. Stage Files for Commit**

```bash
# Stage all changes (recommended for first commit)
git add .

# OR stage specific files
git add README.md
git add .gitignore
git add .env.example
git add src/app/App.tsx
```

### **3. Review Staged Changes**

```bash
# See what will be committed
git diff --cached

# See file names only
git diff --cached --name-only
```

**Verify:**
- ✅ `.env` is NOT in the list
- ✅ Only source files, not build artifacts
- ✅ No sensitive data

### **4. Commit Changes**

```bash
# Commit with a clear message
git commit -m "Add security improvements: .gitignore, .env.example, security checklist"

# OR commit with detailed description
git commit -m "Add comprehensive security setup

- Created .gitignore with .env exclusion
- Added .env.example template with placeholders
- Created SECURITY_CHECKLIST.md for team reference
- Updated README.md with setup instructions
- Added QUICK_START_SETUP.md guide"
```

### **5. Push to GitHub**

```bash
# If this is your first push to a new repo
git remote add origin https://github.com/s2cpaul/ora-agent.git
git branch -M main
git push -u origin main

# If repo already exists
git push origin main

# If you need to force push (BE CAREFUL)
git push origin main --force
```

---

## 🌿 Working with Branches

### **Create a Feature Branch**

```bash
# Create and switch to new branch
git checkout -b feature/security-improvements

# Make changes, then commit
git add .
git commit -m "Add security improvements"

# Push branch to GitHub
git push origin feature/security-improvements
```

### **Merge Branch Back to Main**

```bash
# Switch to main
git checkout main

# Merge feature branch
git merge feature/security-improvements

# Push to GitHub
git push origin main

# Delete feature branch (optional)
git branch -d feature/security-improvements
git push origin --delete feature/security-improvements
```

---

## 🔄 Common Workflows

### **Workflow 1: Quick Fix**

```bash
# 1. Make changes to files
# 2. Check status
git status

# 3. Stage and commit
git add .
git commit -m "Fix: Update pricing tiers"

# 4. Push
git push origin main
```

### **Workflow 2: Feature Development**

```bash
# 1. Create feature branch
git checkout -b feature/new-agent-integration

# 2. Make changes
# 3. Commit frequently
git add .
git commit -m "Add Google Drive integration"

# 4. Push branch
git push origin feature/new-agent-integration

# 5. Create Pull Request on GitHub
# 6. Review and merge via GitHub UI
```

### **Workflow 3: Fixing a Committed Mistake**

```bash
# Undo last commit but keep changes
git reset --soft HEAD~1

# Undo last commit and discard changes (CAREFUL!)
git reset --hard HEAD~1

# Undo a specific file
git checkout HEAD -- path/to/file.tsx
```

---

## 🚨 Emergency: .env Was Committed!

If you accidentally committed `.env` with real credentials:

### **Immediate Actions:**

```bash
# 1. Remove .env from Git tracking
git rm --cached .env

# 2. Commit the removal
git commit -m "Remove .env from Git tracking"

# 3. Push the change
git push origin main
```

### **If Already Pushed:**

```bash
# 1. REVOKE ALL CREDENTIALS IMMEDIATELY
# - OpenAI: https://platform.openai.com/api-keys
# - Supabase: Dashboard → Settings → API

# 2. Remove from Git history (DANGEROUS)
git filter-branch --force --index-filter \
  "git rm --cached --ignore-unmatch .env" \
  --prune-empty --tag-name-filter cat -- --all

# 3. Force push (only if you're the only contributor)
git push origin --force --all

# 4. Create new credentials
# 5. Update local .env with new credentials
```

---

## 📊 Git Status Cheat Sheet

### **Understanding `git status` Output:**

```bash
$ git status

On branch main
Your branch is up to date with 'origin/main'.

Changes to be committed:
  (use "git restore --staged <file>..." to unstage)
        modified:   README.md          # ✅ Staged (will be committed)
        new file:   .gitignore          # ✅ Staged (will be committed)

Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git restore <file>..." to discard changes)
        modified:   src/app/App.tsx    # ⚠️ Modified but not staged

Untracked files:
  (use "git add <file>..." to include in what will be committed)
        .env.example                   # ⚠️ New file, not tracked yet
```

**File States:**
- **Staged** → Will be committed with `git commit`
- **Not staged** → Changed but won't be committed
- **Untracked** → New file Git doesn't know about

---

## 🎨 VS Code Git Interface

### **Using VS Code's Built-In Git:**

1. **Open Source Control Panel**
   - Click Source Control icon (left sidebar)
   - OR press `Ctrl+Shift+G` (Windows) or `Cmd+Shift+G` (Mac)

2. **Stage Changes**
   - Hover over file
   - Click `+` icon to stage

3. **Commit Changes**
   - Type commit message in text box
   - Press `Ctrl+Enter` or click checkmark ✓

4. **Push to GitHub**
   - Click `...` (more actions)
   - Select "Push"

---

## 🔍 Verify Before Push

### **Pre-Push Checklist:**

```bash
# 1. Check status
git status

# 2. Review staged changes
git diff --cached

# 3. Check for .env
git status | grep .env

# 4. Verify .gitignore
cat .gitignore | grep .env

# 5. Check for API keys in code
grep -r "sk-proj-" src/ || echo "✅ No API keys found"

# 6. Review commit message
git log -1

# 7. Push!
git push origin main
```

---

## 📁 Files to ALWAYS Commit

✅ **Safe to commit:**
- Source code files (`src/**/*.tsx`, `src/**/*.ts`)
- Configuration files (`vite.config.ts`, `tsconfig.json`)
- Package manifests (`package.json`, `package-lock.json`)
- Documentation (`README.md`, `*.md`)
- `.gitignore`
- `.env.example` (with placeholders)
- Public assets (`public/**/*`)

❌ **NEVER commit:**
- `.env` (contains real credentials)
- `node_modules/` (dependency folder)
- `dist/` (build output)
- `.vscode/` (editor settings - optional)
- IDE files (`.idea/`, `*.swp`, etc.)
- OS files (`.DS_Store`, `Thumbs.db`)

---

## 🌐 GitHub Web Interface (If Needed)

### **When to use GitHub Web:**
- Editing README.md
- Creating/editing documentation
- Small typo fixes
- Reviewing Pull Requests

### **How to edit on GitHub:**
1. Navigate to file on GitHub
2. Click pencil icon (✏️ Edit)
3. Make changes
4. Scroll down to "Commit changes"
5. Write commit message
6. Click "Commit changes"

**Note:** This bypasses local Git, so be careful!

---

## 🎯 Recommended First Commit

Here's what to commit first:

```bash
# 1. Remove LICENSE directory
rm -rf /LICENSE

# 2. Check status
git status

# 3. Stage security files
git add .gitignore
git add .env.example
git add SECURITY_CHECKLIST.md
git add QUICK_START_SETUP.md
git add GIT_WORKFLOW.md

# 4. Stage updated docs
git add README.md

# 5. Review what's staged
git status

# 6. Commit
git commit -m "Add comprehensive security and setup documentation

- Created .gitignore with .env protection
- Added .env.example template (no real credentials)
- Created SECURITY_CHECKLIST.md for team reference
- Created QUICK_START_SETUP.md for new developers
- Created GIT_WORKFLOW.md for Git best practices
- Updated README.md with setup instructions
- Removed LICENSE directory (contained incorrectly named files)"

# 7. Push to GitHub
git push origin main
```

---

## 🆘 Troubleshooting

### **"Permission denied (publickey)"**

**Fix:**
```bash
# Generate SSH key
ssh-keygen -t ed25519 -C "carapaulson1@gmail.com"

# Add to SSH agent
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/id_ed25519

# Copy public key
cat ~/.ssh/id_ed25519.pub

# Add to GitHub: Settings → SSH and GPG keys → New SSH key
```

### **"Failed to push some refs"**

**Fix:**
```bash
# Pull latest changes first
git pull origin main

# If conflicts, resolve them, then:
git add .
git commit -m "Merge remote changes"

# Push again
git push origin main
```

### **"Your branch is behind 'origin/main'"**

**Fix:**
```bash
# Pull latest changes
git pull origin main

# OR rebase
git pull --rebase origin main
```

---

## 📞 Getting Help

### **Git Commands Help:**
```bash
git help <command>
git help commit
git help push
```

### **VS Code Git Help:**
- Press `F1`
- Type "Git:"
- See all Git commands

### **GitHub Help:**
- https://docs.github.com
- https://github.com/s2cpaul/ora-agent/issues

---

## 🎓 Learn More

### **Git Basics:**
- [Git Documentation](https://git-scm.com/doc)
- [GitHub Guides](https://guides.github.com/)
- [Pro Git Book](https://git-scm.com/book/en/v2)

### **VS Code Git:**
- [VS Code Git Guide](https://code.visualstudio.com/docs/sourcecontrol/overview)

---

## ✅ Summary

**Your recommended workflow:**

1. ✅ Fix LICENSE conflict: `rm -rf /LICENSE`
2. ✅ Verify security: Check `.gitignore` and `.env` status
3. ✅ Stage files: `git add .`
4. ✅ Review: `git diff --cached`
5. ✅ Commit: `git commit -m "Clear message"`
6. ✅ Push: `git push origin main`

**Always use VS Code + Git, not GitHub web upload!**

---

**Last Updated:** January 8, 2026  
**Maintainer:** s2cpaul  
**License:** MIT

**Questions?** Open an issue on GitHub or contact carapaulson1@gmail.com

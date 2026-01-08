# 🔒 SECURITY REMINDER - CREDENTIAL MANAGEMENT

**READ THIS BEFORE CODING!**

---

## ⚠️ CRITICAL RULES

### ✅ ALWAYS DO:

1. **Store credentials in `/.env`**
   ```env
   VITE_SUPABASE_URL=https://xxx.supabase.co
   VITE_STRIPE_PUBLIC_KEY=pk_test_xxx
   STRIPE_SECRET_KEY=sk_test_xxx  # NO VITE_ prefix!
   ```

2. **Import from `/src/lib/config.ts`**
   ```typescript
   import { stripeConfig } from '@/lib/config';
   const stripe = await loadStripe(stripeConfig.publicKey);
   ```

3. **Use `VITE_` prefix for client-safe values**
   - `VITE_STRIPE_PUBLIC_KEY` ✅ (safe to expose)
   - `VITE_SUPABASE_ANON_KEY` ✅ (safe to expose)

4. **Keep secrets WITHOUT `VITE_` prefix**
   - `STRIPE_SECRET_KEY` ✅ (server-side only)
   - `OPENAI_API_KEY` ✅ (server-side only)

---

### ❌ NEVER DO:

1. **Hardcode credentials**
   ```typescript
   // ❌ WRONG!
   const apiKey = "sk_test_12345";
   const stripeSecret = "pk_live_67890";
   ```

2. **Use `import.meta.env` directly**
   ```typescript
   // ❌ WRONG!
   const key = import.meta.env.VITE_STRIPE_PUBLIC_KEY;
   ```

3. **Commit `.env` to Git**
   ```bash
   # Check before commit:
   git status  # Should NOT see .env
   ```

4. **Add `VITE_` to secret keys**
   ```env
   # ❌ WRONG - Exposes secret to browser!
   VITE_STRIPE_SECRET_KEY=sk_test_xxx
   
   # ✅ CORRECT - Server-side only
   STRIPE_SECRET_KEY=sk_test_xxx
   ```

5. **Log credentials to console**
   ```typescript
   // ❌ WRONG!
   console.log('API Key:', apiKey);
   ```

---

## 🚨 IF YOU ACCIDENTALLY COMMIT CREDENTIALS

**THIS IS A CRITICAL SECURITY INCIDENT!**

### Immediate Actions:

1. **Stop immediately** - Don't push to remote

2. **Remove from Git**
   ```bash
   git rm --cached .env
   git commit -m "Remove accidentally committed .env"
   ```

3. **Rotate ALL exposed credentials**
   - Go to each service (Stripe, Supabase, OpenAI, etc.)
   - Delete the exposed keys
   - Generate new keys
   - Update `.env` with new keys
   - **NEVER** use the old keys again

4. **Check Git history**
   ```bash
   git log --all --full-history -- .env
   ```
   If `.env` appears in history, you MUST rotate credentials

5. **If already pushed to GitHub:**
   - Credentials are permanently exposed in Git history
   - Rotate immediately
   - Consider the old credentials compromised forever
   - Optional: Use [BFG Repo-Cleaner](https://rtyley.github.io/bfg-repo-cleaner/) to remove from history

---

## 📋 PRE-COMMIT CHECKLIST

**Run these commands before EVERY commit:**

```bash
# 1. Check Git status (should NOT see .env)
git status

# 2. Search for hardcoded Stripe keys
grep -r "sk_test" src/
grep -r "sk_live" src/
grep -r "pk_test" src/
grep -r "pk_live" src/

# 3. Search for hardcoded Supabase keys
grep -r "eyJhbG" src/

# 4. Search for OpenAI keys
grep -r "sk-proj" src/

# 5. Check for import.meta.env usage
grep -r "import.meta.env" src/

# 6. Verify .env is in .gitignore
cat .gitignore | grep ".env"
```

**If ANY of these find results, FIX IMMEDIATELY before committing!**

---

## 🔍 VS Code Extensions That Help

These extensions are recommended in `.vscode/extensions.json`:

1. **GitHub Copilot** - Knows to never suggest hardcoded credentials
2. **GitLens** - Shows file history (verify .env not committed)
3. **DotEnv** - Syntax highlighting for .env files
4. **ESLint** - Can detect security issues

---

## 📖 WHERE CREDENTIALS ARE STORED

| File | Purpose | Git Tracked? | Contains Secrets? |
|------|---------|--------------|-------------------|
| `/.env` | **All credentials** | ❌ NO | ✅ YES |
| `/src/lib/config.ts` | Loads credentials | ✅ YES | ❌ NO |
| `/.env.example` | Template | ✅ YES | ❌ NO |
| `/.gitignore` | Blocks .env | ✅ YES | ❌ NO |

---

## 🎯 CORRECT PATTERNS

### Loading Stripe

```typescript
// ✅ CORRECT
import { stripeConfig, isStripeEnabled } from '@/lib/config';

if (!isStripeEnabled) {
  return <div>Stripe not configured</div>;
}

const stripe = await loadStripe(stripeConfig.publicKey);
```

### Using OpenAI (Server-Side)

```typescript
// ✅ CORRECT - In Supabase Edge Function
const apiKey = Deno.env.get('OPENAI_API_KEY');

const response = await fetch('https://api.openai.com/v1/chat/completions', {
  headers: {
    'Authorization': `Bearer ${apiKey}`,
  },
  // ...
});
```

### Checking Config Availability

```typescript
// ✅ CORRECT
import { config } from '@/lib/config';

if (!config.stripe) {
  console.warn('Stripe not configured');
  return;
}

// Use config.stripe.publicKey
```

---

## 🛡️ CLIENT vs SERVER

### Client-Safe (VITE_ prefix):
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`
- `VITE_STRIPE_PUBLIC_KEY`
- `VITE_PAYPAL_CLIENT_ID`
- `VITE_GOOGLE_CLIENT_ID`

### Server-Only (NO VITE_ prefix):
- `STRIPE_SECRET_KEY`
- `STRIPE_WEBHOOK_SECRET`
- `PAYPAL_CLIENT_SECRET`
- `OPENAI_API_KEY`
- `SENDGRID_API_KEY`

**Rule:** If it contains "secret", "private", or is an API key, do NOT use `VITE_` prefix!

---

## 📞 HELP & RESOURCES

- **Full Guide:** `/CREDENTIALS_GUIDE.md`
- **Setup Checklist:** `/SETUP_CHECKLIST.md`
- **Copilot Instructions:** `/.github/copilot-instructions.md`

---

## 🎓 TRAINING CHECKLIST

Before you start coding, verify you understand:

- [ ] Where to store credentials (/.env)
- [ ] How to access credentials (import from config.ts)
- [ ] What VITE_ prefix means (client-safe)
- [ ] What to do if you commit credentials (rotate immediately)
- [ ] How to check before commit (git status, grep commands)
- [ ] Why hardcoding is dangerous (permanent exposure)

---

## 💡 QUICK REFERENCE

**Q: Where do I put my Stripe secret key?**  
A: In `/.env` as `STRIPE_SECRET_KEY=sk_test_xxx` (no VITE_ prefix)

**Q: How do I access it in code?**  
A: You don't! Use a Supabase Edge Function for server-side operations.

**Q: What about the public key?**  
A: In `/.env` as `VITE_STRIPE_PUBLIC_KEY=pk_test_xxx`, access via `import { stripeConfig } from '@/lib/config'`

**Q: Can I hardcode a key "just for testing"?**  
A: Absolutely not! Even test keys can be abused. Always use `.env`.

**Q: What if I see a key in Git history?**  
A: That key is compromised forever. Rotate it immediately.

---

**🔒 Security is not optional. Protect your credentials like you protect your password. 🔒**

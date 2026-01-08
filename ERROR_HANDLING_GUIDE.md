# 🔧 ERROR HANDLING & LINTING GUIDE

**Complete guide to preventing, detecting, and fixing TypeScript and JSX errors in ORA**

---

## 📋 TABLE OF CONTENTS

1. [VS Code Setup](#vs-code-setup)
2. [ESLint Configuration](#eslint-configuration)
3. [TypeScript Configuration](#typescript-configuration)
4. [Common Errors & Fixes](#common-errors--fixes)
5. [Pre-Deployment Checklist](#pre-deployment-checklist)
6. [Auto-Fix Commands](#auto-fix-commands)
7. [Error Prevention](#error-prevention)

---

## 🎯 VS CODE SETUP

### Required Extensions

Install these extensions (already in `.vscode/extensions.json`):

1. **ESLint** (`dbaeumer.vscode-eslint`) - JavaScript/TypeScript linting
2. **TypeScript** (`ms-vscode.vscode-typescript-next`) - TypeScript support
3. **Error Lens** (`usernamehm.errorlens`) - Inline error display
4. **Prettier** (`esbenp.prettier-vscode`) - Code formatting

**Install All:**
```bash
# VS Code will prompt you automatically when you open the project
# Or manually: Cmd+Shift+P → "Extensions: Show Recommended Extensions"
```

### VS Code Settings (Already Configured)

Your `.vscode/settings.json` includes:

```json
{
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit",
    "source.organizeImports": "explicit"
  },
  "typescript.tsdk": "node_modules/typescript/lib",
  "eslint.validate": [
    "javascript",
    "javascriptreact",
    "typescript",
    "typescriptreact"
  ]
}
```

**What This Does:**
- ✅ Auto-formats on save (Prettier)
- ✅ Auto-fixes ESLint errors on save
- ✅ Organizes imports automatically
- ✅ Uses project's TypeScript version
- ✅ Validates all JS/TS/JSX/TSX files

---

## 🔍 ESLINT CONFIGURATION

### Install ESLint Dependencies

```bash
npm install --save-dev \
  eslint \
  @typescript-eslint/parser \
  @typescript-eslint/eslint-plugin \
  eslint-plugin-react \
  eslint-plugin-react-hooks \
  eslint-plugin-jsx-a11y \
  eslint-plugin-import
```

### Configuration File

Create `.eslintrc.json` (see next section for full config)

### What ESLint Catches

- ❌ **Unused variables** - `const x = 5; // never used`
- ❌ **Missing dependencies** - `useEffect(() => {}, [])` with external deps
- ❌ **Type errors** - Wrong prop types
- ❌ **Accessibility issues** - Missing alt text, ARIA labels
- ❌ **React best practices** - Keys in lists, hooks rules
- ❌ **Import errors** - Missing modules, circular dependencies

---

## ⚙️ TYPESCRIPT CONFIGURATION

### Strict Mode (Recommended)

Your `tsconfig.json` should have:

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,

    /* Bundler mode */
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",

    /* Linting */
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true,
    "strictBindCallApply": true,
    "strictPropertyInitialization": true,
    "noImplicitThis": true,
    "alwaysStrict": true,
    
    /* Path Mapping */
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

### What These Settings Do

| Setting | What It Catches |
|---------|-----------------|
| `strict: true` | All strict checks enabled |
| `noUnusedLocals` | Unused variables |
| `noUnusedParameters` | Unused function parameters |
| `noImplicitAny` | Variables without type annotations |
| `strictNullChecks` | Possible null/undefined errors |
| `strictFunctionTypes` | Function type mismatches |

---

## 🚨 COMMON ERRORS & FIXES

### 1. **"Cannot find module" Errors**

**Error:**
```typescript
Cannot find module './components/MyComponent' or its corresponding type declarations.
```

**Causes:**
- File doesn't exist
- Wrong import path
- Missing file extension

**Fixes:**
```typescript
// ❌ WRONG
import { MyComponent } from './components/MyComponent.tsx';

// ✅ CORRECT
import { MyComponent } from './components/MyComponent';

// ❌ WRONG (relative path error)
import { MyComponent } from '../components/MyComponent';

// ✅ CORRECT (from /src/app/App.tsx)
import { MyComponent } from './components/MyComponent';
```

**Auto-Fix in VS Code:**
1. Hover over the error
2. Click "Quick Fix" (Cmd+.)
3. Select "Update import from..."

---

### 2. **"Property does not exist on type" Errors**

**Error:**
```typescript
Property 'name' does not exist on type '{}'.
```

**Cause:** Missing type definition

**Fix:**
```typescript
// ❌ WRONG
function MyComponent(props) {
  return <div>{props.name}</div>;
}

// ✅ CORRECT
interface MyComponentProps {
  name: string;
}

function MyComponent({ name }: MyComponentProps) {
  return <div>{name}</div>;
}

// OR use type inference
function MyComponent(props: { name: string }) {
  return <div>{props.name}</div>;
}
```

---

### 3. **"JSX element implicitly has type 'any'" Errors**

**Error:**
```typescript
JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
```

**Cause:** Missing React import or type definitions

**Fix:**
```typescript
// ❌ WRONG (missing React types)
export function MyComponent() {
  return <div>Hello</div>;
}

// ✅ CORRECT
import { ReactNode } from 'react';

interface MyComponentProps {
  children?: ReactNode;
}

export function MyComponent({ children }: MyComponentProps) {
  return <div>{children}</div>;
}
```

---

### 4. **"Argument of type 'X' is not assignable to parameter of type 'Y'"**

**Error:**
```typescript
Argument of type 'string' is not assignable to parameter of type 'number'.
```

**Cause:** Type mismatch

**Fix:**
```typescript
// ❌ WRONG
const age: number = "25";

// ✅ CORRECT
const age: number = 25;

// OR parse if coming from input
const age: number = parseInt(ageString, 10);

// OR use union types if both are valid
const age: number | string = "25";
```

---

### 5. **"Object is possibly 'null' or 'undefined'"**

**Error:**
```typescript
Object is possibly 'null'. TS2531
```

**Cause:** Strict null checks enabled (good!)

**Fix:**
```typescript
// ❌ WRONG
function MyComponent({ user }) {
  return <div>{user.name}</div>; // user might be null!
}

// ✅ CORRECT - Option 1: Optional chaining
function MyComponent({ user }: { user: User | null }) {
  return <div>{user?.name ?? 'Guest'}</div>;
}

// ✅ CORRECT - Option 2: Null check
function MyComponent({ user }: { user: User | null }) {
  if (!user) return <div>Loading...</div>;
  return <div>{user.name}</div>;
}

// ✅ CORRECT - Option 3: Non-null assertion (use sparingly!)
function MyComponent({ user }: { user: User | null }) {
  return <div>{user!.name}</div>; // Only if you're 100% sure
}
```

---

### 6. **"React Hook useEffect has a missing dependency"**

**Error:**
```
React Hook useEffect has a missing dependency: 'fetchData'. 
Either include it or remove the dependency array.
```

**Cause:** ESLint detects missing dependency in useEffect

**Fix:**
```typescript
// ❌ WRONG
const [data, setData] = useState(null);

useEffect(() => {
  fetchData(); // fetchData not in dependency array!
}, []);

// ✅ CORRECT - Option 1: Add dependency
useEffect(() => {
  fetchData();
}, [fetchData]);

// ✅ CORRECT - Option 2: Use useCallback
const fetchData = useCallback(() => {
  // fetch logic
}, []);

useEffect(() => {
  fetchData();
}, [fetchData]);

// ✅ CORRECT - Option 3: Inline function
useEffect(() => {
  const fetchData = async () => {
    // fetch logic
  };
  fetchData();
}, []); // Now fetchData is defined inside useEffect
```

---

### 7. **"Type 'Element' is not assignable to type 'ReactNode'"**

**Error:**
```typescript
Type 'Element' is not assignable to type 'ReactNode'.
```

**Cause:** Return type mismatch

**Fix:**
```typescript
// ❌ WRONG
function MyComponent(): Element {
  return <div>Hello</div>;
}

// ✅ CORRECT
function MyComponent(): JSX.Element {
  return <div>Hello</div>;
}

// OR (most common)
function MyComponent() {
  return <div>Hello</div>; // Type inferred automatically
}

// For components that return ReactNode (includes null, arrays, etc.)
function MyComponent(): ReactNode {
  if (loading) return null;
  return <div>Hello</div>;
}
```

---

### 8. **"Expected 0 arguments, but got 1"**

**Error:**
```typescript
Expected 0 arguments, but got 1. TS2554
```

**Cause:** Function signature mismatch

**Fix:**
```typescript
// ❌ WRONG
function greet() {
  return "Hello";
}
greet("World"); // Error!

// ✅ CORRECT
function greet(name: string) {
  return `Hello ${name}`;
}
greet("World");

// OR with optional parameter
function greet(name?: string) {
  return name ? `Hello ${name}` : "Hello";
}
greet(); // OK
greet("World"); // Also OK
```

---

### 9. **"Cannot use JSX unless the '--jsx' flag is provided"**

**Error:**
```typescript
Cannot use JSX unless the '--jsx' flag is provided.
```

**Cause:** File extension is `.ts` instead of `.tsx`

**Fix:**
1. Rename file from `.ts` to `.tsx`
2. Or update `tsconfig.json` to include JSX

```bash
# Rename file
mv MyComponent.ts MyComponent.tsx
```

---

### 10. **"Module has no default export"**

**Error:**
```typescript
Module '"./MyComponent"' has no default export. TS1192
```

**Cause:** Import/export mismatch

**Fix:**
```typescript
// ❌ WRONG
// MyComponent.tsx
export function MyComponent() { ... }

// App.tsx
import MyComponent from './MyComponent'; // Error!

// ✅ CORRECT - Option 1: Named import
import { MyComponent } from './MyComponent';

// ✅ CORRECT - Option 2: Default export
// MyComponent.tsx
export default function MyComponent() { ... }

// App.tsx
import MyComponent from './MyComponent';
```

---

## ✅ PRE-DEPLOYMENT CHECKLIST

### Run These Commands Before Deploy

```bash
# 1. Install dependencies
npm install

# 2. Run TypeScript check
npm run type-check
# OR
npx tsc --noEmit

# 3. Run ESLint
npm run lint
# OR
npx eslint src/ --ext .ts,.tsx

# 4. Fix auto-fixable issues
npm run lint:fix
# OR
npx eslint src/ --ext .ts,.tsx --fix

# 5. Run build (catches production errors)
npm run build

# 6. Preview production build
npm run preview
```

### Add These Scripts to `package.json`

```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview",
    "lint": "eslint src/ --ext .ts,.tsx",
    "lint:fix": "eslint src/ --ext .ts,.tsx --fix",
    "type-check": "tsc --noEmit",
    "format": "prettier --write \"src/**/*.{ts,tsx,js,jsx,json,css,md}\"",
    "format:check": "prettier --check \"src/**/*.{ts,tsx,js,jsx,json,css,md}\"",
    "validate": "npm run type-check && npm run lint && npm run format:check"
  }
}
```

### CI/CD Integration

Add to `.github/workflows/ci.yml`:

```yaml
name: CI

on: [push, pull_request]

jobs:
  validate:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Type check
        run: npm run type-check
      
      - name: Lint
        run: npm run lint
      
      - name: Format check
        run: npm run format:check
      
      - name: Build
        run: npm run build
```

---

## 🔧 AUTO-FIX COMMANDS

### Fix All Auto-Fixable Issues

```bash
# Fix ESLint issues
npm run lint:fix

# Format all files
npm run format

# Fix both
npm run lint:fix && npm run format
```

### VS Code Keyboard Shortcuts

| Action | Shortcut (Mac) | Shortcut (Windows) |
|--------|----------------|-------------------|
| Quick Fix | `Cmd + .` | `Ctrl + .` |
| Format Document | `Shift + Option + F` | `Shift + Alt + F` |
| Organize Imports | `Shift + Option + O` | `Shift + Alt + O` |
| Rename Symbol | `F2` | `F2` |
| Go to Definition | `F12` | `F12` |
| Find References | `Shift + F12` | `Shift + F12` |

### Fix on Save (Already Enabled)

Your `.vscode/settings.json` already includes:

```json
{
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit",
    "source.organizeImports": "explicit"
  }
}
```

**Every time you save:**
- ✅ Prettier formats the file
- ✅ ESLint fixes auto-fixable errors
- ✅ Imports are organized

---

## 🛡️ ERROR PREVENTION

### 1. **Use Type Inference**

```typescript
// ❌ AVOID (unnecessary type annotation)
const name: string = "John";

// ✅ PREFER (TypeScript infers the type)
const name = "John"; // type: string
```

### 2. **Define Interfaces Early**

```typescript
// ✅ GOOD
interface User {
  id: string;
  name: string;
  email: string;
}

function getUser(): User {
  // TypeScript will enforce return type
  return { id: '1', name: 'John', email: 'john@example.com' };
}
```

### 3. **Use Enums for Constants**

```typescript
// ❌ AVOID
const tier = "free"; // Could be any string

// ✅ PREFER
enum Tier {
  Free = 'free',
  Solo = 'solo',
  Buddy = 'buddy',
  Team = 'team',
  Enterprise = 'enterprise',
}

const tier: Tier = Tier.Free; // Type-safe
```

### 4. **Use Union Types for Multiple Options**

```typescript
// ✅ GOOD
type Theme = 'light' | 'dark';
type Status = 'idle' | 'loading' | 'success' | 'error';

function setTheme(theme: Theme) {
  // theme can only be 'light' or 'dark'
}
```

### 5. **Use Optional Chaining**

```typescript
// ❌ AVOID
if (user && user.profile && user.profile.name) {
  console.log(user.profile.name);
}

// ✅ PREFER
console.log(user?.profile?.name ?? 'Guest');
```

### 6. **Use Nullish Coalescing**

```typescript
// ❌ AVOID (0, false, "" are also falsy)
const value = input || 'default';

// ✅ PREFER (only null/undefined)
const value = input ?? 'default';
```

### 7. **Destructure with Types**

```typescript
// ✅ GOOD
interface Props {
  name: string;
  age: number;
  isActive?: boolean;
}

function MyComponent({ name, age, isActive = false }: Props) {
  return <div>{name}, {age}, {isActive ? 'Active' : 'Inactive'}</div>;
}
```

---

## 🚀 QUICK FIXES CHEAT SHEET

| Error | Quick Fix |
|-------|-----------|
| Unused variable | Remove or prefix with `_` |
| Missing import | Hover → Quick Fix → Add import |
| Type mismatch | Add type annotation or cast |
| Missing dependency | Add to dependency array |
| Null/undefined | Use `?.` or null check |
| Wrong prop type | Update interface |
| Missing key | Add `key={uniqueId}` to list items |
| Missing alt text | Add `alt="description"` to images |

---

## 📊 ERROR SEVERITY LEVELS

### VS Code Error Colors

| Color | Severity | Action Required |
|-------|----------|-----------------|
| 🔴 Red | **Error** | Must fix before deploy |
| 🟡 Yellow | **Warning** | Should fix (best practice) |
| 🔵 Blue | **Info** | Optional improvement |

### Treat Warnings as Errors (Production)

In `tsconfig.json`:

```json
{
  "compilerOptions": {
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true
  }
}
```

In `.eslintrc.json`:

```json
{
  "rules": {
    "no-console": "warn", // Warning in dev, remove in production
    "@typescript-eslint/no-unused-vars": "error", // Error, not warning
    "react-hooks/exhaustive-deps": "error"
  }
}
```

---

## 🎯 DEVELOPMENT WORKFLOW

### Daily Development

1. **Write code** → VS Code shows errors inline
2. **Save file** → Auto-format + auto-fix
3. **Check Problems panel** → View all errors (Cmd+Shift+M)
4. **Fix errors** → Use Quick Fix (Cmd+.)
5. **Commit** → Pre-commit hook runs lint

### Before Pull Request

```bash
# Full validation
npm run validate

# If all pass:
git add .
git commit -m "Your message"
git push
```

### Before Deploy

```bash
# Full check
npm run type-check
npm run lint
npm run build

# If successful:
npm run preview  # Test production build
```

---

## 🔍 DEBUGGING TOOLS

### VS Code Extensions

1. **Error Lens** - Shows errors inline (highly recommended!)
2. **TypeScript Error Translator** - Explains TS errors in plain English
3. **Console Ninja** - Better console.log debugging
4. **ES7+ React/Redux snippets** - Fast component creation

### Browser DevTools

1. **React Developer Tools** - Inspect React components
2. **Redux DevTools** - Debug state (if using Redux)
3. **Network tab** - Debug API calls
4. **Console** - Check for runtime errors

---

## 📝 COMMON PATTERNS

### Component Template

```typescript
import { useState } from 'react';

interface MyComponentProps {
  title: string;
  onSubmit?: (value: string) => void;
  isLoading?: boolean;
}

export function MyComponent({ 
  title, 
  onSubmit,
  isLoading = false 
}: MyComponentProps) {
  const [value, setValue] = useState('');

  const handleSubmit = () => {
    if (onSubmit) {
      onSubmit(value);
    }
  };

  return (
    <div>
      <h2>{title}</h2>
      <input 
        value={value} 
        onChange={(e) => setValue(e.target.value)}
        disabled={isLoading}
      />
      <button onClick={handleSubmit} disabled={isLoading}>
        {isLoading ? 'Loading...' : 'Submit'}
      </button>
    </div>
  );
}
```

### API Call with Types

```typescript
interface User {
  id: string;
  name: string;
  email: string;
}

async function fetchUser(id: string): Promise<User> {
  const response = await fetch(`/api/users/${id}`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch user');
  }
  
  const data: User = await response.json();
  return data;
}

// Usage
try {
  const user = await fetchUser('123');
  console.log(user.name); // TypeScript knows user has a name property
} catch (error) {
  console.error('Error:', error);
}
```

---

## 🎓 LEARNING RESOURCES

### TypeScript
- [Official Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
- [TypeScript Cheatsheet](https://www.typescriptlang.org/cheatsheets)
- [React + TypeScript Cheatsheet](https://react-typescript-cheatsheet.netlify.app/)

### ESLint
- [ESLint Rules](https://eslint.org/docs/latest/rules/)
- [React ESLint Plugin](https://github.com/jsx-eslint/eslint-plugin-react)
- [TypeScript ESLint](https://typescript-eslint.io/)

---

## ✅ SUCCESS CHECKLIST

Your ORA project is error-free when:

- [ ] `npm run type-check` passes with no errors
- [ ] `npm run lint` passes with no errors
- [ ] `npm run build` succeeds
- [ ] No red squiggles in VS Code
- [ ] All warnings addressed or justified
- [ ] Browser console shows no errors
- [ ] React DevTools shows no warnings

---

**🎯 Remember:** Errors are caught early = Bugs prevented in production!

**💡 Tip:** Use GitHub Copilot to explain errors. Just select the error and ask: "What does this error mean and how do I fix it?"

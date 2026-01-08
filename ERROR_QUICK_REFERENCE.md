# ⚡ ERROR HANDLING QUICK REFERENCE

**Quick commands and shortcuts for fixing TypeScript and JSX errors**

---

## 🚀 QUICK START

### 1. Install Dependencies
```bash
npm install --save-dev \
  eslint \
  @typescript-eslint/parser \
  @typescript-eslint/eslint-plugin \
  eslint-plugin-react \
  eslint-plugin-react-hooks \
  eslint-plugin-jsx-a11y \
  eslint-plugin-import \
  prettier \
  typescript
```

### 2. Run Validation
```bash
npm run validate
```

### 3. Auto-Fix Everything
```bash
npm run lint:fix && npm run format
```

---

## ⌨️ VS CODE SHORTCUTS

| Action | Mac | Windows/Linux |
|--------|-----|---------------|
| **Quick Fix** | `Cmd + .` | `Ctrl + .` |
| **Format Document** | `Shift + Option + F` | `Shift + Alt + F` |
| **Organize Imports** | `Shift + Option + O` | `Shift + Alt + O` |
| **Rename Symbol** | `F2` | `F2` |
| **Go to Definition** | `F12` | `F12` |
| **Find All References** | `Shift + F12` | `Shift + F12` |
| **Show Problems** | `Cmd + Shift + M` | `Ctrl + Shift + M` |
| **Run Task** | `Cmd + Shift + B` | `Ctrl + Shift + B` |

---

## 🔧 NPM SCRIPTS

```bash
# Development
npm run dev              # Start dev server

# Type Checking
npm run type-check       # Check TypeScript errors

# Linting
npm run lint             # Show ESLint errors
npm run lint:fix         # Auto-fix ESLint errors

# Formatting
npm run format           # Format all files
npm run format:check     # Check formatting

# Validation (All checks)
npm run validate         # Type + Lint + Format checks

# Build
npm run build            # Build for production
npm run preview          # Preview production build
```

---

## 🎯 COMMON FIXES

### Missing Import
```typescript
// ❌ ERROR: 'useState' is not defined
const [value, setValue] = useState('');

// ✅ FIX: Add import
import { useState } from 'react';
```

### Missing Type
```typescript
// ❌ ERROR: Parameter 'props' implicitly has an 'any' type
function MyComponent(props) { ... }

// ✅ FIX: Add type
interface Props {
  name: string;
}
function MyComponent(props: Props) { ... }
```

### Null/Undefined Error
```typescript
// ❌ ERROR: Object is possibly 'null'
const name = user.name;

// ✅ FIX: Optional chaining
const name = user?.name ?? 'Guest';
```

### Unused Variable
```typescript
// ❌ ERROR: 'x' is declared but never used
const x = 5;

// ✅ FIX 1: Remove it
// (delete the line)

// ✅ FIX 2: Prefix with underscore
const _x = 5; // Indicates intentionally unused
```

### Missing Key in List
```typescript
// ❌ ERROR: Each child should have a unique "key" prop
items.map(item => <div>{item}</div>)

// ✅ FIX: Add key
items.map((item, idx) => <div key={item.id || idx}>{item}</div>)
```

### Missing Dependency
```typescript
// ❌ ERROR: React Hook useEffect has a missing dependency
useEffect(() => {
  fetchData();
}, []);

// ✅ FIX: Add to dependency array
useEffect(() => {
  fetchData();
}, [fetchData]);
```

---

## 🎨 AUTO-FIX ON SAVE

Already configured in `.vscode/settings.json`:

```json
{
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit",
    "source.organizeImports": "explicit"
  }
}
```

**Every time you save (Cmd+S / Ctrl+S):**
- ✅ Prettier formats the code
- ✅ ESLint fixes errors
- ✅ Imports are organized

---

## 📝 COMPONENT TEMPLATE

Copy-paste this error-free template:

```typescript
import { useState } from 'react';

interface MyComponentProps {
  title: string;
  onSubmit?: (value: string) => void;
}

export function MyComponent({ title, onSubmit }: MyComponentProps) {
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
      />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}
```

---

## 🛠️ VS CODE TASKS

Press `Cmd+Shift+B` (Mac) or `Ctrl+Shift+B` (Windows) and select:

- **🔍 Type Check** - Check TypeScript errors
- **🔧 Lint** - Show ESLint errors
- **🔧 Lint Fix** - Auto-fix ESLint errors
- **💅 Format** - Format all files
- **✅ Validate All** - Run all checks (default)
- **🏗️ Build** - Build for production
- **🚀 Dev Server** - Start dev server

---

## ⚠️ BEFORE DEPLOYMENT

Run these commands in order:

```bash
# 1. Type check
npm run type-check

# 2. Lint
npm run lint

# 3. Format check
npm run format:check

# 4. Build
npm run build

# 5. Preview (optional)
npm run preview
```

**Or run all at once:**
```bash
npm run validate && npm run build
```

---

## 🔍 FIND ERRORS

### In VS Code
1. Press `Cmd+Shift+M` (Mac) or `Ctrl+Shift+M` (Windows)
2. View "Problems" panel
3. Click error to jump to location

### In Terminal
```bash
# Show all TypeScript errors
npm run type-check

# Show all ESLint errors
npm run lint

# Show formatting issues
npm run format:check
```

---

## 🎯 ERROR SEVERITY

| Symbol | Severity | Action |
|--------|----------|--------|
| 🔴 | **Error** | Must fix |
| 🟡 | **Warning** | Should fix |
| 🔵 | **Info** | Optional |

---

## 🚨 EMERGENCY FIXES

### "Everything is broken!"
```bash
# 1. Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# 2. Clear VS Code cache
# Close VS Code
# Delete: ~/.vscode (Mac) or %APPDATA%/Code (Windows)
# Reopen VS Code

# 3. Restart TypeScript server
# In VS Code: Cmd+Shift+P → "TypeScript: Restart TS Server"
```

### "Import paths not working"
```bash
# Check tsconfig.json has correct paths
cat tsconfig.json | grep -A 10 "paths"

# Restart VS Code
```

### "ESLint not working"
```bash
# Reinstall ESLint
npm install --save-dev eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin

# Check .eslintrc.json exists
ls -la .eslintrc.json

# Restart ESLint server
# In VS Code: Cmd+Shift+P → "ESLint: Restart ESLint Server"
```

---

## 📚 LEARN MORE

| Topic | Document |
|-------|----------|
| **Full Guide** | `/ERROR_HANDLING_GUIDE.md` |
| **TypeScript Docs** | https://www.typescriptlang.org/docs/ |
| **ESLint Rules** | https://eslint.org/docs/rules/ |
| **React+TS** | https://react-typescript-cheatsheet.netlify.app/ |

---

## ✅ DAILY WORKFLOW

1. **Start dev server**: `npm run dev`
2. **Write code** (VS Code shows errors inline)
3. **Save file** (auto-format + auto-fix)
4. **Check Problems panel** (`Cmd+Shift+M`)
5. **Use Quick Fix** (`Cmd+.`) for remaining errors
6. **Before commit**: `npm run validate`

---

**💡 Pro Tip:** Enable "Error Lens" VS Code extension to see errors inline as you type!

**🎯 Goal:** Zero errors in Problems panel = Production-ready code!

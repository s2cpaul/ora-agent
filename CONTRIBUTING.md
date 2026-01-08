# Contributing to ORA Agent

Thank you for your interest in contributing to ORA! We welcome contributions from the community.

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Pull Request Process](#pull-request-process)
- [Code Standards](#code-standards)
- [Commit Guidelines](#commit-guidelines)
- [Testing](#testing)

---

## 🤝 Code of Conduct

By participating in this project, you agree to maintain a respectful and inclusive environment. Please:

- ✅ Be respectful and constructive
- ✅ Welcome newcomers
- ✅ Focus on what's best for the community
- ❌ No harassment or discriminatory language
- ❌ No spam or self-promotion

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- Git
- VS Code (recommended)
- GitHub account

### Setup

1. **Fork the repository**
   ```bash
   # Click "Fork" on https://github.com/s2cpaul/ora-agent
   ```

2. **Clone your fork**
   ```bash
   git clone https://github.com/YOUR_USERNAME/ora-agent.git
   cd ora-agent
   ```

3. **Add upstream remote**
   ```bash
   git remote add upstream https://github.com/s2cpaul/ora-agent.git
   ```

4. **Install dependencies**
   ```bash
   npm install
   ```

5. **Copy environment file**
   ```bash
   cp .env.example .env
   # Fill in your credentials (see CREDENTIALS_GUIDE.md)
   ```

6. **Start development server**
   ```bash
   npm run dev
   ```

---

## 💻 Development Workflow

### 1. Create a Feature Branch

```bash
# Update main branch
git checkout main
git pull upstream main

# Create feature branch
git checkout -b feature/amazing-feature
# Or: git checkout -b fix/bug-description
# Or: git checkout -b docs/documentation-update
```

### 2. Make Your Changes

- Write clean, readable code
- Follow existing patterns
- Add comments for complex logic
- Update documentation if needed

### 3. Validate Your Code

```bash
# Run all checks
npm run validate

# Or individually:
npm run type-check   # TypeScript errors
npm run lint         # ESLint errors
npm run format       # Code formatting
npm run build        # Production build
```

### 4. Commit Your Changes

```bash
git add .
git commit -m "feat: add amazing feature"
# See Commit Guidelines below
```

### 5. Push to Your Fork

```bash
git push origin feature/amazing-feature
```

### 6. Create Pull Request

1. Go to https://github.com/s2cpaul/ora-agent
2. Click "New Pull Request"
3. Select your fork and branch
4. Fill in the PR template
5. Submit!

---

## 🔄 Pull Request Process

### PR Checklist

Before submitting, ensure:

- [ ] Code passes `npm run validate`
- [ ] Code follows project standards
- [ ] Commit messages follow guidelines
- [ ] Documentation updated (if needed)
- [ ] No sensitive data (API keys, secrets)
- [ ] PR description explains changes
- [ ] Linked to related issue (if applicable)

### PR Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Documentation update
- [ ] Code refactor
- [ ] Performance improvement

## Testing
How to test these changes

## Screenshots (if applicable)
Add screenshots for UI changes

## Checklist
- [ ] Code passes `npm run validate`
- [ ] Documentation updated
- [ ] No breaking changes
```

### Review Process

1. **Automated checks** - GitHub Actions runs validation
2. **Code review** - Maintainer reviews your code
3. **Feedback** - Address any requested changes
4. **Approval** - Maintainer approves PR
5. **Merge** - PR merged to main branch

---

## 📝 Code Standards

### TypeScript

- **Strict mode enabled** - No `any` types
- **Type everything** - Interfaces for all props
- **No unused variables** - Clean up imports

```typescript
// ✅ GOOD
interface ButtonProps {
  label: string;
  onClick: () => void;
}

export function Button({ label, onClick }: ButtonProps) {
  return <button onClick={onClick}>{label}</button>;
}

// ❌ BAD
export function Button(props: any) {
  return <button onClick={props.onClick}>{props.label}</button>;
}
```

### React Components

- **Functional components** - Use hooks, not classes
- **Named exports** - Easier to refactor
- **Props destructuring** - Cleaner code

```typescript
// ✅ GOOD
import { useState } from 'react';

interface MyComponentProps {
  title: string;
}

export function MyComponent({ title }: MyComponentProps) {
  const [count, setCount] = useState(0);
  return <div>{title}: {count}</div>;
}

// ❌ BAD
export default function MyComponent(props) {
  const [count, setCount] = useState(0);
  return <div>{props.title}: {count}</div>;
}
```

### File Naming

- **Components:** PascalCase - `MyComponent.tsx`
- **Utilities:** camelCase - `analytics.ts`
- **Styles:** kebab-case - `theme.css`

### Imports

- **Absolute imports** - Use `@/` for src files
- **Organized** - Auto-organized on save

```typescript
// ✅ GOOD
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { trackEvent } from '@/utils/analytics';

// ❌ BAD
import { useState } from 'react';
import { trackEvent } from '../../utils/analytics';
import { Button } from '../ui/button';
```

### Tailwind CSS

- **Use utility classes** - No inline styles
- **Responsive design** - Mobile-first
- **Dark mode support** - Use dark: prefix

```tsx
// ✅ GOOD
<div className="px-4 py-2 bg-card text-foreground dark:bg-black">
  Content
</div>

// ❌ BAD
<div style={{ padding: '8px 16px', backgroundColor: 'white' }}>
  Content
</div>
```

---

## 📜 Commit Guidelines

### Commit Message Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- **feat:** New feature
- **fix:** Bug fix
- **docs:** Documentation only
- **style:** Code style (formatting, no code change)
- **refactor:** Code refactor
- **perf:** Performance improvement
- **test:** Add/update tests
- **chore:** Build process, dependencies

### Examples

```bash
# Feature
git commit -m "feat(ai-agent): add multi-agent connectivity"

# Bug fix
git commit -m "fix(pricing): correct tier pricing display"

# Documentation
git commit -m "docs(readme): add deployment instructions"

# Refactor
git commit -m "refactor(app): simplify routing logic"

# Performance
git commit -m "perf(analytics): optimize event batching"
```

### Scope (Optional)

- `ai-agent` - AI Agent components
- `pricing` - Pricing/payment
- `auth` - Authentication
- `analytics` - Analytics/tracking
- `ui` - UI components
- `docs` - Documentation
- `config` - Configuration

---

## 🧪 Testing

### Manual Testing

Before submitting PR:

1. **Test on desktop** - Chrome, Firefox, Safari
2. **Test on mobile** - iPhone, Android (or DevTools)
3. **Test light/dark mode** - Toggle theme
4. **Test all routes** - Navigate between pages
5. **Test error states** - Invalid inputs, network errors

### Automated Testing

```bash
# Type check
npm run type-check

# Lint check
npm run lint

# Format check
npm run format:check

# Build check
npm run build

# All checks
npm run validate
```

### Future: Unit Tests

```bash
# When implemented:
npm test                  # Run tests
npm run test:watch        # Watch mode
npm run test:coverage     # Coverage report
```

---

## 🎨 Design Guidelines

### Mobile-First

- Design for iPhone 16 (393px × 852px) first
- Scale up for tablet/desktop
- Use responsive breakpoints: sm (640px), md (768px), lg (1024px)

### Accessibility

- ✅ Alt text for images
- ✅ ARIA labels for interactive elements
- ✅ Keyboard navigation support
- ✅ Color contrast ratios (WCAG AA)

### Performance

- ✅ Lazy load components
- ✅ Optimize images
- ✅ Minimize bundle size
- ✅ Use React.memo for expensive components

---

## 📖 Documentation

### When to Update Docs

Update documentation when you:

- Add new features
- Change existing behavior
- Add new components
- Update configuration
- Fix bugs that affect usage

### Docs to Update

- `README.md` - Main documentation
- `PROJECT_OVERVIEW.md` - Component inventory
- Component comments - JSDoc style
- Inline code comments - Complex logic

### Documentation Style

```typescript
/**
 * Track user question and AI response
 * 
 * @param question - User's question text
 * @param response - AI's response text
 * @param sentiment - User sentiment (positive/negative/neutral)
 * @returns Promise<void>
 */
export async function trackUserQuestion(
  question: string,
  response: string,
  sentiment?: string
): Promise<void> {
  // Implementation...
}
```

---

## 🚫 What NOT to Commit

### Never Commit

- ❌ `.env` file (contains secrets)
- ❌ `node_modules/` (dependencies)
- ❌ `dist/` or `build/` (build artifacts)
- ❌ `.DS_Store` (macOS files)
- ❌ API keys or secrets
- ❌ Personal information

### Check Before Commit

```bash
# Review changes
git diff

# Check staged files
git status

# If .env is staged:
git reset .env
```

---

## 💡 Tips for Success

### VS Code Setup

1. Install recommended extensions (see `.vscode/extensions.json`)
2. Enable format on save (already configured)
3. Use Error Lens for inline errors
4. Use GitHub Copilot for assistance

### Use GitHub Copilot

```
# Ask Copilot for help:
"Explain this TypeScript error"
"How do I implement feature X?"
"Refactor this component for better performance"
```

### Keep PRs Small

- ✅ One feature per PR
- ✅ Small, focused changes
- ✅ Easy to review
- ❌ Avoid massive PRs with unrelated changes

### Stay Updated

```bash
# Regularly sync with upstream
git fetch upstream
git checkout main
git merge upstream/main
```

---

## 🏆 Recognition

Contributors will be:

- Listed in project credits
- Acknowledged in release notes
- Invited to join ORA community Discord

---

## 📞 Need Help?

### Questions?

- **GitHub Issues:** https://github.com/s2cpaul/ora-agent/issues
- **Email:** carapaulson1@gmail.com
- **Calendly:** https://calendly.com/caraz007

### Resources

- `README.md` - Getting started
- `PROJECT_OVERVIEW.md` - Complete docs
- `ERROR_HANDLING_GUIDE.md` - TypeScript help
- `.github/copilot-instructions.md` - Copilot tips

---

**Thank you for contributing to ORA! 🎉**

Every contribution, no matter how small, helps make ORA better for everyone.

# ⚡ QUICK COPILOT SETUP FOR ORA

**For Visual Studio Code with GitHub Copilot**

---

## 🚀 INSTANT SETUP (5 Minutes)

### 1. Open in VS Code

```bash
code .
```

### 2. Install Recommended Extensions

When VS Code opens, you'll see a notification:

> "This workspace has extension recommendations"

**Click "Install All"** - This installs:
- ✅ GitHub Copilot
- ✅ GitHub Copilot Chat
- ✅ ESLint
- ✅ Prettier
- ✅ Tailwind CSS IntelliSense
- ✅ Supabase VS Code
- ✅ Path IntelliSense
- ✅ React/TypeScript snippets

### 3. Copilot Will Automatically Read Instructions

Copilot is configured to read from:
- `/.github/copilot-instructions.md` (project guidelines)
- `/.vscode/settings.json` (editor config)

**No additional setup needed!**

---

## 🎯 HOW TO USE COPILOT IN THIS PROJECT

### Quick Commands

Type these in Copilot Chat to get instant code:

#### **"Add analytics to [component name]"**
Copilot will:
- Import `trackEvent` from `@/app/utils/analytics`
- Add tracking to all user interactions
- Follow ORA's analytics patterns

#### **"Create a new component for [feature]"**
Copilot will:
- Use functional components with TypeScript
- Include Tailwind CSS styling
- Add proper analytics tracking
- Follow mobile-first design

#### **"Track user action in [component]"**
Copilot will:
- Identify the action to track
- Use the correct tracking function
- Include all required metadata

#### **"Add Stripe payment to [component]"**
Copilot will:
- Use Edge Function (not client-side)
- Import from config.ts
- Add payment event tracking

#### **"Create Supabase query for [data]"**
Copilot will:
- Use supabase client from `/src/lib/supabase.ts`
- Add error handling
- Track database performance

---

## 💡 COPILOT CHAT EXAMPLES

### Example 1: Add Analytics to Button

**You type:**
```
Add analytics tracking when user clicks the "Ask AI" button
```

**Copilot suggests:**
```typescript
import { trackEvent } from '@/app/utils/analytics';

const handleAskClick = async () => {
  await trackEvent({
    event_type: 'button_clicked',
    event_data: {
      button_name: 'Ask AI',
      category: selectedCategory,
    }
  });
  
  // ... rest of logic
};
```

### Example 2: Create Tracked Component

**You type:**
```
Create a VideoPlayer component that tracks play, pause, and completion
```

**Copilot generates:**
```typescript
import { useState, useRef } from 'react';
import { trackVideoPlay, trackVideoComplete } from '@/app/utils/analytics';

interface VideoPlayerProps {
  videoUrl: string;
  videoTitle: string;
}

export function VideoPlayer({ videoUrl, videoTitle }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [startTime] = useState(Date.now());
  
  const handlePlay = () => {
    trackVideoPlay({ videoUrl, videoTitle });
  };
  
  const handleEnded = () => {
    const watchDuration = Date.now() - startTime;
    trackVideoComplete({
      videoUrl,
      watchDurationMs: watchDuration,
      completionPercentage: 100,
    });
  };
  
  return (
    <video
      ref={videoRef}
      src={videoUrl}
      onPlay={handlePlay}
      onEnded={handleEnded}
      className="w-full rounded-lg"
      controls
    />
  );
}
```

### Example 3: Supabase Query with Tracking

**You type:**
```
Fetch user's analytics events from last 7 days
```

**Copilot suggests:**
```typescript
import { supabase } from '@/lib/supabase';
import { trackPerformance } from '@/app/utils/analytics';

const fetchUserAnalytics = async (userId: string) => {
  const startTime = Date.now();
  
  const { data, error } = await supabase
    .from('analytics_events')
    .select('*')
    .eq('user_id', userId)
    .gte('timestamp', new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString())
    .order('timestamp', { ascending: false });
  
  // Track query performance
  await trackPerformance({
    metric: 'analytics_query_duration',
    value: Date.now() - startTime,
    unit: 'ms',
  });
  
  if (error) {
    console.error('Error fetching analytics:', error);
    return null;
  }
  
  return data;
};
```

---

## 🔥 POWER TIPS

### 1. Inline Suggestions

As you type, Copilot suggests code. Press:
- **Tab** - Accept suggestion
- **Esc** - Dismiss suggestion
- **Alt+]** - Next suggestion
- **Alt+[** - Previous suggestion

### 2. Context-Aware Completions

Copilot knows:
- ✅ Your analytics tracking patterns
- ✅ Your component structure
- ✅ Your Tailwind CSS patterns
- ✅ Your Supabase schema
- ✅ Your freemium tier logic

### 3. Multi-Line Completions

Start typing a function and Copilot will suggest the entire implementation:

```typescript
// Type this:
const trackUserSubscription = async (

// Copilot completes with:
const trackUserSubscription = async (
  oldTier: string,
  newTier: string,
  paymentMethod: string
) => {
  await trackSubscriptionChange({
    oldTier,
    newTier,
    paymentMethod,
  });
  
  // Update local storage
  localStorage.setItem('userTier', newTier);
};
```

### 4. Comment-Driven Development

Write a comment describing what you want, Copilot writes the code:

```typescript
// Track when user clicks a pill button and updates the category
```

Copilot suggests:
```typescript
// Track when user clicks a pill button and updates the category
const handlePillClick = async (label: string, category: string) => {
  await trackPillButtonClick({
    buttonLabel: label,
    category,
  });
  
  setSelectedCategory(category);
};
```

---

## 📚 PROJECT-SPECIFIC KNOWLEDGE

Copilot knows these patterns from `.github/copilot-instructions.md`:

### ✅ Always Use:
- Functional components
- TypeScript interfaces for props
- Tailwind CSS (no inline styles)
- `import from '@/lib/config'` for credentials
- Analytics tracking on all interactions
- Mobile-first responsive design

### ❌ Never Use:
- Class components
- Inline styles
- `import.meta.env` directly
- White text for thought bubbles
- Hardcoded API keys

---

## 🛠️ TROUBLESHOOTING

### Copilot Not Suggesting?

1. **Check Copilot is Active**
   - Look for Copilot icon in status bar (bottom right)
   - Should show checkmark when active

2. **Reload Window**
   - Cmd/Ctrl + Shift + P
   - Type "Reload Window"
   - Press Enter

3. **Check Extensions Installed**
   - View → Extensions
   - Search for "GitHub Copilot"
   - Should be installed and enabled

### Suggestions Not Matching ORA Patterns?

1. **Open Copilot Instructions**
   - File: `.github/copilot-instructions.md`
   - Make sure it's in the workspace

2. **Clear Copilot Cache**
   - Cmd/Ctrl + Shift + P
   - Type "Copilot: Clear Completions Cache"

3. **Add More Context**
   - Open related files (Copilot reads open tabs)
   - Add comments explaining what you want

---

## 🎓 LEARNING MODE

### Watch Copilot Work

1. **Open Copilot Chat** (Cmd/Ctrl + Shift + I)

2. **Ask Questions:**
   - "How do I track a user action in ORA?"
   - "Show me how to create a new component with analytics"
   - "How do I access Stripe config safely?"
   - "What's the pattern for Supabase queries?"

3. **Get Explanations:**
   - "Explain this code: [paste code]"
   - "Why are we using trackEvent here?"
   - "What's the difference between VITE_ and non-VITE_ env vars?"

---

## 🚀 PRODUCTIVITY HACKS

### 1. Bulk Component Generation

**Open Copilot Chat, type:**
```
Create 3 components: UserProfile, UserSettings, UserAnalytics.
Each should fetch data from Supabase and track analytics.
Use TypeScript and Tailwind.
```

Copilot generates all 3 components following ORA patterns.

### 2. Test Generation

**Type:**
```
Create tests for the analytics.ts utility functions
```

Copilot generates comprehensive tests.

### 3. Documentation

**Type:**
```
Add JSDoc comments to all functions in analytics.ts
```

Copilot adds proper documentation.

### 4. Refactoring

**Type:**
```
Refactor this component to use our analytics tracking pattern
```

Copilot adds tracking to all interactions.

---

## 📋 DAILY WORKFLOW

### Morning Routine

1. **Open VS Code**
   ```bash
   code .
   ```

2. **Pull Latest Changes**
   ```bash
   git pull
   ```

3. **Start Dev Server**
   ```bash
   npm run dev
   ```

4. **Open Copilot Chat**
   - Ask: "What should I work on today?"
   - Review project TODOs

### Coding with Copilot

1. **Write a Comment**
   ```typescript
   // Create a button that tracks clicks and shows upgrade modal for free users
   ```

2. **Let Copilot Suggest**
   - Press Enter
   - Copilot generates implementation

3. **Review & Accept**
   - Check code matches ORA patterns
   - Press Tab to accept
   - Test functionality

4. **Iterate**
   - Ask Copilot: "Add error handling to this"
   - Ask Copilot: "Make this mobile-responsive"

---

## 🎯 KEY SHORTCUTS

| Action | Shortcut |
|--------|----------|
| Accept suggestion | Tab |
| Dismiss suggestion | Esc |
| Next suggestion | Alt + ] |
| Previous suggestion | Alt + [ |
| Open Copilot Chat | Cmd/Ctrl + Shift + I |
| Inline Copilot | Cmd/Ctrl + I |
| Show all suggestions | Cmd/Ctrl + Enter |

---

## ✅ SETUP COMPLETE!

You're ready to build with Copilot! Key points:

1. ✅ Copilot reads project instructions automatically
2. ✅ All suggestions follow ORA patterns
3. ✅ Analytics tracking included by default
4. ✅ TypeScript + Tailwind enforced
5. ✅ Credentials managed safely

**Start coding and let Copilot help!** 🚀

---

## 📖 MORE RESOURCES

- **Full Copilot Instructions:** `/.github/copilot-instructions.md`
- **Analytics Setup:** `/ANALYTICS_SETUP.md`
- **Credentials Guide:** `/CREDENTIALS_GUIDE.md`
- **Full Checklist:** `/SETUP_CHECKLIST.md`

---

**Happy coding with Copilot!** 🎉

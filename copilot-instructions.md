# GitHub Copilot Instructions for ORA AI Agent

## Project Overview

**ORA** is a freemium AI Agent learning platform with seat-based pricing that allows users to connect Google Drive/SharePoint libraries. The app features comprehensive data tracking and analytics to build a context data model for user behavior analysis and AI response optimization.

## Core Architecture

### Technology Stack
- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS v4
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth + Google OAuth
- **Payments**: Stripe + PayPal
- **AI**: OpenAI GPT-4 (via Supabase Edge Functions)
- **Analytics**: Custom tracking system with Supabase storage
- **Routing**: React Router v6

### File Structure
```
/src
  /app
    /components         - All React components
    /utils             - Helper functions, analytics
    /data              - Static content, mock data
  /contexts            - React Context providers (Auth, etc.)
  /hooks               - Custom React hooks
  /lib                 - Core utilities (config, supabase)
  /styles              - Global CSS, Tailwind config
```

## Coding Standards

### React Components

**ALWAYS:**
- Use functional components with hooks
- Export named exports for components: `export function ComponentName() {}`
- Use TypeScript interfaces for props
- Import types from React: `import { useState, useEffect } from 'react'`
- Use Tailwind CSS classes for styling (NO inline styles)
- Follow mobile-first responsive design

**Example:**
```typescript
import { useState } from 'react';
import { Button } from './ui/button';

interface MyComponentProps {
  title: string;
  onSubmit: (data: string) => void;
}

export function MyComponent({ title, onSubmit }: MyComponentProps) {
  const [value, setValue] = useState('');
  
  return (
    <div className="flex flex-col gap-4 p-4">
      <h2 className="text-2xl font-bold">{title}</h2>
      <Button onClick={() => onSubmit(value)}>Submit</Button>
    </div>
  );
}
```

### Styling Rules

**NEVER:**
- Use white text for thought bubbles/AI responses
- Use inline styles or custom CSS modules
- Create new Tailwind config files (we use v4 in theme.css)

**ALWAYS:**
- Use dark gray text for thought bubbles in light mode
- Use white text for thought bubbles in dark mode
- Use underline + dark blue for web links
- Use Tailwind utility classes exclusively
- Check `/src/styles/theme.css` for existing design tokens

### Credentials & Configuration

**ALWAYS:**
- Import config from `/src/lib/config.ts`
- NEVER access `import.meta.env` directly in components
- Use `VITE_` prefix for client-safe environment variables
- Keep secrets (API keys, secret keys) WITHOUT `VITE_` prefix

**Example:**
```typescript
// ✅ CORRECT
import { stripeConfig, isStripeEnabled } from '@/lib/config';

if (isStripeEnabled) {
  const stripe = await loadStripe(stripeConfig.publicKey);
}

// ❌ WRONG
const key = import.meta.env.VITE_STRIPE_PUBLIC_KEY;
```

## Data Tracking & Analytics

### CRITICAL: Data tracking is a core feature for building context models

**ALL user interactions MUST be tracked:**
- Question submissions
- AI response views
- Pill button clicks
- Video plays
- Feedback (thumbs up/down)
- Navigation patterns
- Time spent per section
- Multi-agent connections
- Subscription tier changes
- Feature usage patterns

### Analytics Implementation

**Location:** `/src/app/utils/`

**Track these events:**
1. **User Actions**
   - `user_question_asked` - Question text, timestamp, category
   - `ai_response_viewed` - Response text, tokens used, time to respond
   - `pill_button_clicked` - Button label, context, sequence
   - `video_played` - Video URL, duration watched, completion %
   - `feedback_submitted` - Type (thumbs up/down), message ID
   
2. **Session Data**
   - `session_started` - User tier, device info, location
   - `session_ended` - Duration, questions asked, features used
   - `page_view` - Route, referrer, time spent
   
3. **Feature Usage**
   - `multi_agent_connected` - Agent type, connection success
   - `document_uploaded` - File type, size, source (Drive/SharePoint)
   - `subscription_changed` - Old tier, new tier, payment method

4. **Context Building**
   - User journey paths (sequence of actions)
   - Question-answer-feedback loops
   - Topic clustering (which topics lead to engagement)
   - Time-to-value metrics
   - Churn indicators

### Data Structure

**All tracked events should include:**
```typescript
interface AnalyticsEvent {
  event_type: string;
  user_id: string | null;
  session_id: string;
  timestamp: string;
  user_tier: string;
  
  // Event-specific data
  event_data: {
    [key: string]: any;
  };
  
  // Context data
  context: {
    route: string;
    device_type: 'mobile' | 'tablet' | 'desktop';
    viewport_width: number;
    viewport_height: number;
    user_agent: string;
    referrer: string | null;
  };
  
  // For ML/context model
  metadata: {
    conversation_depth: number;
    time_since_last_action: number;
    cumulative_session_time: number;
    features_used: string[];
  };
}
```

### Supabase Tables for Analytics

```sql
-- Main events table
CREATE TABLE analytics_events (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  event_type TEXT NOT NULL,
  user_id UUID REFERENCES auth.users(id),
  session_id TEXT NOT NULL,
  timestamp TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  user_tier TEXT,
  event_data JSONB,
  context JSONB,
  metadata JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for fast queries
CREATE INDEX idx_analytics_user ON analytics_events(user_id);
CREATE INDEX idx_analytics_session ON analytics_events(session_id);
CREATE INDEX idx_analytics_timestamp ON analytics_events(timestamp);
CREATE INDEX idx_analytics_event_type ON analytics_events(event_type);

-- User journey table (for sequence analysis)
CREATE TABLE user_journeys (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  session_id TEXT NOT NULL,
  journey_sequence TEXT[], -- Array of event types
  timestamps TIMESTAMPTZ[], -- Corresponding timestamps
  outcomes JSONB, -- Conversion, churn, upgrade, etc.
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

### When to Track

**ALWAYS track when:**
- User asks a question → `trackUserQuestion()`
- AI responds → `trackAIResponse()`
- User provides feedback → `trackFeedback()`
- User clicks any interactive element → `trackInteraction()`
- User navigates → `trackNavigation()`
- Session starts/ends → `trackSession()`
- Error occurs → `trackError()`

**Example tracking call:**
```typescript
import { trackEvent } from '@/app/utils/analytics';

// In component
const handleQuestionSubmit = async (question: string) => {
  await trackEvent({
    event_type: 'user_question_asked',
    event_data: {
      question,
      category: selectedCategory,
      character_count: question.length,
    },
    metadata: {
      conversation_depth: messages.length,
      time_since_last_action: Date.now() - lastActionTime,
    }
  });
  
  // ... rest of logic
};
```

## Component Guidelines

### AI Agent Components

**Main components:**
- `AIAgentSidePanel.tsx` - Main AI chat interface
- `AIAgentModal.tsx` - Modal version
- Tracks ALL interactions for context building

**Required tracking:**
```typescript
// Track question
trackEvent({ event_type: 'user_question_asked', ... });

// Track response
trackEvent({ event_type: 'ai_response_viewed', ... });

// Track feedback
trackEvent({ event_type: 'feedback_submitted', ... });
```

### Freemium Flow

**Tiers:**
- **Free**: No login required, 10 questions/month
- **Solo**: $24/mo, 50 questions/month
- **Buddy**: $60/mo, 100 questions/month
- **Team**: $250/mo, 200 questions/month, multi-agent
- **Enterprise**: $1500/mo, 1000 questions/month, full features

**Tracking requirements:**
- Track feature access attempts
- Track upgrade prompts shown
- Track conversion funnel
- Track usage limits hit

### Multi-Agent System

**Premium feature (Team+ only)**

When implementing multi-agent features:
```typescript
// Always check tier
import { useSubscription } from '@/hooks/useSubscription';

const { tier, hasFeature } = useSubscription();

if (!hasFeature('multi-agent')) {
  // Track feature gate
  trackEvent({ 
    event_type: 'feature_blocked', 
    event_data: { feature: 'multi-agent', tier } 
  });
  
  return <UpgradePrompt feature="Multi-Agent" />;
}

// Track usage
trackEvent({ 
  event_type: 'multi_agent_accessed',
  event_data: { agent_count: connections.length }
});
```

## Supabase Integration

### Database Operations

**ALWAYS:**
- Use the supabase client from `/src/lib/supabase.ts`
- Handle errors gracefully
- Track database operations for performance monitoring

```typescript
import { supabase } from '@/lib/supabase';
import { trackEvent } from '@/app/utils/analytics';

const startTime = Date.now();

const { data, error } = await supabase
  .from('table_name')
  .select('*')
  .eq('user_id', userId);

// Track performance
trackEvent({
  event_type: 'database_query',
  event_data: {
    table: 'table_name',
    duration_ms: Date.now() - startTime,
    success: !error,
    row_count: data?.length || 0,
  }
});

if (error) {
  trackEvent({
    event_type: 'database_error',
    event_data: { error: error.message, table: 'table_name' }
  });
}
```

### Edge Functions

**For OpenAI calls, Stripe, PayPal:**

Create Edge Functions in `supabase/functions/` directory:
```typescript
// supabase/functions/ask-ai/index.ts
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'

serve(async (req) => {
  const { question, userId, sessionId } = await req.json();
  
  // Track Edge Function call
  await trackToSupabase({
    event_type: 'edge_function_called',
    function_name: 'ask-ai',
    user_id: userId,
    session_id: sessionId,
  });
  
  // ... OpenAI logic
});
```

## Payment Integration

### Stripe

**NEVER expose secret key to client**

```typescript
// ❌ WRONG
const stripe = new Stripe(import.meta.env.STRIPE_SECRET_KEY);

// ✅ CORRECT - Use Edge Function
const response = await fetch('/functions/v1/create-checkout-session', {
  method: 'POST',
  body: JSON.stringify({ priceId, customerEmail }),
});
```

**Track all payment events:**
- Payment initiated
- Payment successful
- Payment failed
- Subscription created
- Subscription cancelled

## UI/UX Rules

### Mobile-First Design

**ALWAYS:**
- Design for mobile first (320px+)
- Test on iPhone 16 dimensions
- Use responsive Tailwind classes: `sm:`, `md:`, `lg:`

### Accessibility

**ALWAYS:**
- Include ARIA labels
- Ensure keyboard navigation works
- Maintain color contrast ratios
- Provide focus indicators

### Loading States

**ALWAYS show loading indicators:**
```typescript
const [isLoading, setIsLoading] = useState(false);

// Track loading time
const startTime = Date.now();
setIsLoading(true);

try {
  await fetchData();
  trackEvent({
    event_type: 'data_loaded',
    event_data: { duration_ms: Date.now() - startTime }
  });
} finally {
  setIsLoading(false);
}
```

## Error Handling

**ALWAYS:**
- Catch and log all errors
- Track errors in analytics
- Show user-friendly messages
- Include retry mechanisms

```typescript
try {
  await riskyOperation();
} catch (error) {
  // Track error
  trackEvent({
    event_type: 'error_occurred',
    event_data: {
      error_message: error.message,
      error_stack: error.stack,
      component: 'ComponentName',
      action: 'riskyOperation',
    }
  });
  
  // Show user message
  toast.error('Something went wrong. Please try again.');
}
```

## Testing Checklist

When implementing features:

- [ ] Mobile responsive (test on 320px, 375px, 768px, 1024px)
- [ ] Analytics tracking implemented
- [ ] Error handling in place
- [ ] Loading states shown
- [ ] Accessibility tested
- [ ] Credentials use config.ts
- [ ] No hardcoded values
- [ ] TypeScript types defined
- [ ] Component exported properly
- [ ] Supabase RLS policies considered

## Common Patterns

### Fetching Data with Analytics

```typescript
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { trackEvent } from '@/app/utils/analytics';

export function useDataWithTracking(table: string, query: any) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchData = async () => {
      const startTime = Date.now();
      setLoading(true);
      
      try {
        const { data, error } = await supabase
          .from(table)
          .select('*')
          .match(query);
        
        if (error) throw error;
        
        setData(data);
        
        trackEvent({
          event_type: 'data_fetch_success',
          event_data: {
            table,
            duration_ms: Date.now() - startTime,
            row_count: data.length,
          }
        });
      } catch (err) {
        setError(err);
        trackEvent({
          event_type: 'data_fetch_error',
          event_data: { table, error: err.message }
        });
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [table, JSON.stringify(query)]);
  
  return { data, loading, error };
}
```

### Form Submission with Tracking

```typescript
const handleSubmit = async (formData: FormData) => {
  const startTime = Date.now();
  
  trackEvent({
    event_type: 'form_submission_started',
    event_data: { form_name: 'checkout' }
  });
  
  try {
    const result = await submitToAPI(formData);
    
    trackEvent({
      event_type: 'form_submission_success',
      event_data: {
        form_name: 'checkout',
        duration_ms: Date.now() - startTime,
      }
    });
    
    return result;
  } catch (error) {
    trackEvent({
      event_type: 'form_submission_error',
      event_data: {
        form_name: 'checkout',
        error: error.message,
        duration_ms: Date.now() - startTime,
      }
    });
    throw error;
  }
};
```

## Context Data Model Goals

The analytics system should enable:

1. **User Behavior Prediction**
   - Predict churn risk based on usage patterns
   - Predict upgrade likelihood
   - Predict feature adoption

2. **Content Optimization**
   - Identify most engaging topics
   - Optimize AI response quality
   - Improve video content based on completion rates

3. **Personalization**
   - Recommend relevant content based on history
   - Customize AI responses to user preferences
   - Suggest optimal upgrade paths

4. **Business Intelligence**
   - Calculate customer lifetime value
   - Identify conversion bottlenecks
   - Measure feature ROI

## Quick Commands

When asked to:

**"Add analytics to [component]"**
→ Import trackEvent, add tracking to all user interactions

**"Create new component"**
→ Use functional component, TypeScript, Tailwind, add analytics

**"Integrate API"**
→ Use Supabase Edge Function, never expose secrets, add tracking

**"Add payment feature"**
→ Use Stripe via Edge Function, track all payment events

**"Build data model"**
→ Create Supabase table with JSONB fields, add indexes, track operations

## File Naming Conventions

- Components: `PascalCase.tsx` (e.g., `AIAgentSidePanel.tsx`)
- Utilities: `camelCase.ts` (e.g., `analytics.ts`)
- Hooks: `use + PascalCase.ts` (e.g., `useSubscription.ts`)
- Types: `types.ts` or inline interfaces
- Constants: `SCREAMING_SNAKE_CASE`

## Import Organization

```typescript
// 1. React imports
import { useState, useEffect } from 'react';

// 2. Third-party libraries
import { toast } from 'sonner';

// 3. Internal utilities
import { supabase } from '@/lib/supabase';
import { config } from '@/lib/config';

// 4. Components
import { Button } from './ui/button';

// 5. Types
import type { User } from '@/types';

// 6. Analytics (always include if component has interactions)
import { trackEvent } from '@/app/utils/analytics';
```

---

**Remember:** Every user interaction is a data point. Track everything to build the context model that makes ORA intelligent and adaptive.

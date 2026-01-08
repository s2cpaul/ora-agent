# 📊 ORA ANALYTICS & DATA TRACKING SETUP

**Purpose:** Build a comprehensive context data model to enable AI-powered personalization, behavior prediction, and business intelligence.

---

## 🎯 WHAT WE'RE TRACKING

### Core Metrics

1. **User Actions**
   - Questions asked (text, category, context)
   - AI responses viewed (content, tokens, timing)
   - Feedback submitted (thumbs up/down)
   - Video plays & completions
   - Pill button clicks
   - Navigation patterns
   - Feature usage

2. **Session Data**
   - Session duration
   - Actions per session
   - Features used per session
   - Device & browser info
   - Referral source

3. **Business Metrics**
   - Subscription tier changes
   - Payment events
   - Upgrade prompts shown
   - Feature gates hit
   - Conversion funnel

4. **Context Building**
   - User journey sequences
   - Question-answer-feedback loops
   - Topic clustering
   - Time-to-value metrics
   - Churn indicators

---

## 🗄️ DATABASE SETUP

### Step 1: Create Analytics Table in Supabase

Go to Supabase SQL Editor and run:

```sql
-- Main analytics events table
CREATE TABLE IF NOT EXISTS public.analytics_events (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  event_type TEXT NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  session_id TEXT NOT NULL,
  timestamp TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  user_tier TEXT,
  
  -- Event-specific data (flexible JSON)
  event_data JSONB DEFAULT '{}'::jsonb,
  
  -- Context for ML model
  context JSONB DEFAULT '{}'::jsonb,
  
  -- Metadata for analysis
  metadata JSONB DEFAULT '{}'::jsonb,
  
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for fast queries
CREATE INDEX idx_analytics_user_id ON public.analytics_events(user_id);
CREATE INDEX idx_analytics_session_id ON public.analytics_events(session_id);
CREATE INDEX idx_analytics_timestamp ON public.analytics_events(timestamp DESC);
CREATE INDEX idx_analytics_event_type ON public.analytics_events(event_type);
CREATE INDEX idx_analytics_user_tier ON public.analytics_events(user_tier);

-- Composite indexes for common queries
CREATE INDEX idx_analytics_user_time ON public.analytics_events(user_id, timestamp DESC);
CREATE INDEX idx_analytics_type_time ON public.analytics_events(event_type, timestamp DESC);

-- GIN indexes for JSONB queries
CREATE INDEX idx_analytics_event_data ON public.analytics_events USING GIN (event_data);
CREATE INDEX idx_analytics_context ON public.analytics_events USING GIN (context);
CREATE INDEX idx_analytics_metadata ON public.analytics_events USING GIN (metadata);

-- Row Level Security
ALTER TABLE public.analytics_events ENABLE ROW LEVEL SECURITY;

-- Policy: Allow public inserts (for tracking)
CREATE POLICY "Allow public analytics inserts" ON public.analytics_events
  FOR INSERT
  TO public
  WITH CHECK (true);

-- Policy: Allow users to read their own data
CREATE POLICY "Users can read own analytics" ON public.analytics_events
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Policy: Allow admins to read all analytics
CREATE POLICY "Admins can read all analytics" ON public.analytics_events
  FOR SELECT
  TO authenticated
  USING (
    auth.jwt() ->> 'email' IN (
      SELECT email FROM public.users WHERE role = 'admin'
    )
  );
```

### Step 2: Create User Journey Table

```sql
-- User journey sequences for ML analysis
CREATE TABLE IF NOT EXISTS public.user_journeys (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  session_id TEXT NOT NULL,
  
  -- Sequence of events
  journey_sequence TEXT[] DEFAULT ARRAY[]::TEXT[],
  
  -- Corresponding timestamps
  timestamps TIMESTAMPTZ[] DEFAULT ARRAY[]::TIMESTAMPTZ[],
  
  -- Outcomes (conversion, churn, upgrade, etc.)
  outcomes JSONB DEFAULT '{}'::jsonb,
  
  -- Journey metadata
  started_at TIMESTAMPTZ DEFAULT NOW(),
  ended_at TIMESTAMPTZ,
  duration_ms INTEGER,
  total_events INTEGER DEFAULT 0,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_journeys_user_id ON public.user_journeys(user_id);
CREATE INDEX idx_journeys_session_id ON public.user_journeys(session_id);
CREATE INDEX idx_journeys_started_at ON public.user_journeys(started_at DESC);
CREATE INDEX idx_journeys_outcomes ON public.user_journeys USING GIN (outcomes);

-- RLS
ALTER TABLE public.user_journeys ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own journeys" ON public.user_journeys
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Allow public journey inserts" ON public.user_journeys
  FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Allow public journey updates" ON public.user_journeys
  FOR UPDATE
  TO public
  USING (true);
```

### Step 3: Create Analytics Views (for easy querying)

```sql
-- Daily active users
CREATE OR REPLACE VIEW public.daily_active_users AS
SELECT 
  DATE(timestamp) as date,
  COUNT(DISTINCT user_id) as active_users,
  COUNT(DISTINCT session_id) as sessions,
  COUNT(*) as total_events
FROM public.analytics_events
GROUP BY DATE(timestamp)
ORDER BY date DESC;

-- Popular content
CREATE OR REPLACE VIEW public.popular_content AS
SELECT 
  event_data->>'video_url' as content_url,
  event_data->>'button_label' as button_label,
  COUNT(*) as views,
  COUNT(DISTINCT user_id) as unique_users,
  COUNT(DISTINCT session_id) as unique_sessions
FROM public.analytics_events
WHERE event_type IN ('video_played', 'pill_button_clicked')
  AND timestamp > NOW() - INTERVAL '7 days'
GROUP BY content_url, button_label
ORDER BY views DESC
LIMIT 50;

-- User engagement metrics
CREATE OR REPLACE VIEW public.user_engagement AS
SELECT 
  user_id,
  user_tier,
  COUNT(DISTINCT session_id) as total_sessions,
  COUNT(*) as total_events,
  COUNT(CASE WHEN event_type = 'user_question_asked' THEN 1 END) as questions_asked,
  COUNT(CASE WHEN event_type = 'feedback_submitted' THEN 1 END) as feedback_given,
  COUNT(DISTINCT DATE(timestamp)) as active_days,
  MIN(timestamp) as first_seen,
  MAX(timestamp) as last_seen
FROM public.analytics_events
WHERE user_id IS NOT NULL
GROUP BY user_id, user_tier;

-- Conversion funnel
CREATE OR REPLACE VIEW public.conversion_funnel AS
SELECT 
  DATE(timestamp) as date,
  COUNT(DISTINCT CASE WHEN event_type = 'page_view' THEN user_id END) as visitors,
  COUNT(DISTINCT CASE WHEN event_type = 'user_question_asked' THEN user_id END) as asked_question,
  COUNT(DISTINCT CASE WHEN event_type = 'feature_blocked' THEN user_id END) as hit_paywall,
  COUNT(DISTINCT CASE WHEN event_type = 'subscription_changed' THEN user_id END) as subscribed
FROM public.analytics_events
GROUP BY DATE(timestamp)
ORDER BY date DESC;
```

---

## 💻 CODE IMPLEMENTATION

### Step 1: Import Analytics in Components

```typescript
import { 
  trackEvent,
  trackUserQuestion,
  trackAIResponse,
  trackFeedback,
  trackVideoPlay,
  trackPillButtonClick,
} from '@/app/utils/analytics';
```

### Step 2: Track User Actions

#### Example: Track Question Submission

```typescript
const handleQuestionSubmit = async (question: string) => {
  // Track the question
  await trackUserQuestion({
    question,
    category: selectedCategory,
    pillButtonContext: activePillButton,
  });
  
  // Get AI response
  const startTime = Date.now();
  const response = await getAIResponse(question);
  const responseTime = Date.now() - startTime;
  
  // Track the response
  await trackAIResponse({
    question,
    response,
    category: selectedCategory,
    tokensUsed: estimateTokens(question + response),
    responseTimeMs: responseTime,
  });
  
  // Update UI
  setMessages([...messages, { question, response }]);
};
```

#### Example: Track Feedback

```typescript
const handleFeedback = async (messageId: string, type: 'thumbs_up' | 'thumbs_down') => {
  const message = messages.find(m => m.id === messageId);
  
  await trackFeedback({
    feedbackType: type,
    messageId,
    question: message.question,
    response: message.response,
  });
  
  // Update UI
  setFeedback({ [messageId]: type });
};
```

#### Example: Track Video Play

```typescript
const handleVideoPlay = (videoUrl: string, videoTitle: string) => {
  const startTime = Date.now();
  
  trackVideoPlay({
    videoUrl,
    videoTitle,
    category: selectedCategory,
  });
  
  // Track completion when video ends
  videoRef.current.addEventListener('ended', () => {
    const watchDuration = Date.now() - startTime;
    trackVideoComplete({
      videoUrl,
      watchDurationMs: watchDuration,
      completionPercentage: 100,
    });
  });
};
```

#### Example: Track Feature Access

```typescript
const handleMultiAgentClick = () => {
  const { tier, hasFeature } = useSubscription();
  
  if (!hasFeature('multi-agent')) {
    // Track blocked access
    trackFeatureAccess({
      feature: 'multi-agent',
      allowed: false,
      userTier: tier,
      requiredTier: 'team',
    });
    
    // Show upgrade prompt
    setShowUpgradeModal(true);
    return;
  }
  
  // Track successful access
  trackFeatureAccess({
    feature: 'multi-agent',
    allowed: true,
    userTier: tier,
  });
  
  // Open multi-agent panel
  setShowMultiAgent(true);
};
```

---

## 📈 ANALYTICS DASHBOARD

### Create Admin Dashboard Component

```typescript
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

export function AnalyticsDashboard() {
  const [metrics, setMetrics] = useState(null);
  
  useEffect(() => {
    fetchMetrics();
  }, []);
  
  const fetchMetrics = async () => {
    // Get daily active users
    const { data: dau } = await supabase
      .from('daily_active_users')
      .select('*')
      .limit(30);
    
    // Get popular content
    const { data: popular } = await supabase
      .from('popular_content')
      .select('*');
    
    // Get user engagement
    const { data: engagement } = await supabase
      .from('user_engagement')
      .select('*')
      .order('total_events', { ascending: false })
      .limit(100);
    
    setMetrics({ dau, popular, engagement });
  };
  
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Analytics Dashboard</h1>
      
      {/* Display metrics */}
      {/* ... */}
    </div>
  );
}
```

---

## 🤖 CONTEXT DATA MODEL USAGE

### Use Cases for Analytics Data

1. **Churn Prediction**
   - Identify users with declining activity
   - Predict churn risk based on engagement patterns
   - Trigger retention campaigns

2. **Content Optimization**
   - Identify most/least engaging topics
   - Optimize AI response quality based on feedback
   - Improve video content based on completion rates

3. **Personalization**
   - Recommend content based on user history
   - Customize AI responses to user preferences
   - Suggest optimal learning paths

4. **Conversion Optimization**
   - Identify where users drop off
   - Optimize upgrade prompts timing
   - Test different pricing strategies

5. **Product Development**
   - Prioritize features based on usage
   - Identify feature gaps
   - Validate new feature ideas

---

## 🔍 EXAMPLE QUERIES

### Get User's Recent Activity

```typescript
const { data } = await supabase
  .from('analytics_events')
  .select('*')
  .eq('user_id', userId)
  .gte('timestamp', new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString())
  .order('timestamp', { ascending: false })
  .limit(100);
```

### Find High-Engagement Users

```typescript
const { data } = await supabase
  .from('user_engagement')
  .select('*')
  .gte('questions_asked', 10)
  .gte('active_days', 5)
  .order('total_events', { ascending: false });
```

### Analyze Conversion Funnel

```typescript
const { data } = await supabase
  .from('conversion_funnel')
  .select('*')
  .order('date', { ascending: false })
  .limit(30);

// Calculate conversion rates
const conversions = data.map(day => ({
  date: day.date,
  visit_to_question: (day.asked_question / day.visitors * 100).toFixed(1),
  question_to_paywall: (day.hit_paywall / day.asked_question * 100).toFixed(1),
  paywall_to_subscribe: (day.subscribed / day.hit_paywall * 100).toFixed(1),
}));
```

---

## ✅ IMPLEMENTATION CHECKLIST

- [ ] Create `analytics_events` table in Supabase
- [ ] Create `user_journeys` table in Supabase
- [ ] Create analytics views (DAU, popular content, etc.)
- [ ] Set up RLS policies
- [ ] Import `analytics.ts` in main components
- [ ] Track user questions in `AIAgentSidePanel`
- [ ] Track AI responses
- [ ] Track feedback (thumbs up/down)
- [ ] Track video plays/completions
- [ ] Track pill button clicks
- [ ] Track navigation events
- [ ] Track feature access (especially blocked)
- [ ] Track subscription changes
- [ ] Track multi-agent connections
- [ ] Create admin analytics dashboard
- [ ] Set up automatic local sync (offline support)
- [ ] Test analytics in dev environment
- [ ] Verify data appears in Supabase
- [ ] Create data export functionality (for ML training)

---

## 🚀 QUICK START

1. **Run SQL in Supabase:**
   - Copy table creation SQL from Step 1
   - Run in Supabase SQL Editor

2. **Enable Analytics:**
   - Check `.env`: `VITE_ENABLE_ANALYTICS=true`
   - Check `.env`: `VITE_ENABLE_FEEDBACK_TRACKING=true`

3. **Add to Components:**
   ```typescript
   import { trackUserQuestion } from '@/app/utils/analytics';
   
   // In your event handler
   await trackUserQuestion({ question, category });
   ```

4. **Verify:**
   - Open browser console
   - Submit a question
   - Should see: "📊 Analytics Event: ..."
   - Check Supabase table for new rows

---

## 📊 NEXT STEPS

1. **Build ML Model**
   - Export analytics data
   - Train prediction models (churn, upgrade likelihood)
   - Deploy models to Supabase Edge Functions

2. **Create Dashboards**
   - Build admin analytics dashboard
   - Add real-time metrics
   - Create user-facing "My Progress" page

3. **Implement Personalization**
   - Recommend content based on history
   - Customize AI responses
   - Optimize user journey

---

**Analytics is CORE to ORA's value. Track everything.** 🎯

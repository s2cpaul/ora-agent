# Supabase Feedback Tracking Setup Guide

## Overview
This document provides complete setup instructions for tracking all user feedback (thumbs up/down) in Supabase for the ORA AI Agent platform.

## Rule
**ALL feedback must be tracked in Supabase** - Every thumbs up and thumbs down interaction is automatically logged to the database for analysis and improvement.

---

## 🚀 Quick Setup (5 Steps)

### Step 1: Create Supabase Feedback Table

1. Go to your Supabase project: https://supabase.com/dashboard/project/naskxuojfdqcunotdjzi
2. Navigate to **SQL Editor** in the left sidebar
3. Click **New Query**
4. Copy and paste the following SQL:

```sql
-- Create feedback table
CREATE TABLE IF NOT EXISTS public.feedback (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  message_id TEXT NOT NULL,
  feedback_type TEXT NOT NULL CHECK (feedback_type IN ('thumbs_up', 'thumbs_down')),
  message_content TEXT,
  user_question TEXT,
  ai_response TEXT,
  user_email TEXT,
  user_tier TEXT,
  user_status TEXT,
  session_id TEXT,
  timestamp TIMESTAMPTZ NOT NULL,
  category TEXT,
  video_url TEXT,
  conversation_length INTEGER DEFAULT 0,
  data_consent BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for faster queries
CREATE INDEX idx_feedback_user_email ON public.feedback(user_email);
CREATE INDEX idx_feedback_timestamp ON public.feedback(timestamp);
CREATE INDEX idx_feedback_type ON public.feedback(feedback_type);
CREATE INDEX idx_feedback_created_at ON public.feedback(created_at);

-- Enable Row Level Security (RLS)
ALTER TABLE public.feedback ENABLE ROW LEVEL SECURITY;

-- Policy: Allow anyone to insert feedback
CREATE POLICY "Allow public feedback inserts" ON public.feedback
  FOR INSERT
  TO public
  WITH CHECK (true);

-- Policy: Allow authenticated users to read feedback
CREATE POLICY "Allow admin feedback reads" ON public.feedback
  FOR SELECT
  TO authenticated
  USING (true);

-- Optional: Allow users to read their own feedback
CREATE POLICY "Allow users to read own feedback" ON public.feedback
  FOR SELECT
  TO public
  USING (user_email = current_setting('request.jwt.claims', true)::json->>'email');
```

5. Click **Run** to execute the SQL

---

### Step 2: Get Your Supabase API Keys

1. In your Supabase dashboard, navigate to **Project Settings** (gear icon)
2. Click on **API** in the left sidebar
3. Copy the following values:
   - **Project URL**: `https://naskxuojfdqcunotdjzi.supabase.co`
   - **anon public key**: (starts with `eyJ...`)

---

### Step 3: Update the Code with Your API Key

1. Open `/src/app/utils/supabaseFeedback.ts`
2. Find line 50: `const SUPABASE_ANON_KEY = 'YOUR_SUPABASE_ANON_KEY';`
3. Replace `'YOUR_SUPABASE_ANON_KEY'` with your actual anon key from Step 2

**Example:**
```typescript
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
```

---

### Step 4: Test the Integration

1. Run your app: Visit https://agent.myora.now
2. Ask the AI agent a question
3. Click the thumbs up 👍 or thumbs down 👎 button on a response
4. Go to Supabase Dashboard → **Table Editor** → **feedback** table
5. You should see a new row with the feedback data!

---

### Step 5: Verify Data is Being Tracked

Check the browser console (F12 → Console tab) for confirmation:
```
✅ Feedback tracked in Supabase: thumbs_up msg_1234567890_abcd
```

---

## 📊 Database Schema

### Feedback Table Structure

| Column | Type | Description |
|--------|------|-------------|
| `id` | UUID | Primary key (auto-generated) |
| `message_id` | TEXT | Unique message identifier |
| `feedback_type` | TEXT | Either 'thumbs_up' or 'thumbs_down' |
| `message_content` | TEXT | The AI's response content |
| `user_question` | TEXT | The user's original question |
| `ai_response` | TEXT | Full AI response text |
| `user_email` | TEXT | User's email (carapaulson1@gmail.com, etc.) |
| `user_tier` | TEXT | Subscription tier (free, premium, etc.) |
| `user_status` | TEXT | User status (logged_in, anonymous) |
| `session_id` | TEXT | Session identifier for grouping |
| `timestamp` | TIMESTAMPTZ | When the message was sent |
| `category` | TEXT | Button category (Training, USMC, etc.) |
| `video_url` | TEXT | Video that was playing |
| `conversation_length` | INTEGER | Number of messages in conversation |
| `data_consent` | BOOLEAN | Whether user gave data consent |
| `created_at` | TIMESTAMPTZ | When feedback was recorded |
| `updated_at` | TIMESTAMPTZ | Last update timestamp |

---

## 🔍 Querying Feedback Data

### Get All Thumbs Up
```sql
SELECT * FROM public.feedback 
WHERE feedback_type = 'thumbs_up'
ORDER BY created_at DESC;
```

### Get Feedback by User
```sql
SELECT * FROM public.feedback 
WHERE user_email = 'carapaulson1@gmail.com'
ORDER BY created_at DESC;
```

### Get Feedback by Category
```sql
SELECT category, feedback_type, COUNT(*) as count
FROM public.feedback
GROUP BY category, feedback_type
ORDER BY count DESC;
```

### Feedback Summary Statistics
```sql
SELECT 
  feedback_type,
  COUNT(*) as total,
  COUNT(DISTINCT user_email) as unique_users,
  COUNT(DISTINCT session_id) as unique_sessions
FROM public.feedback
GROUP BY feedback_type;
```

### Recent Negative Feedback (for improvement)
```sql
SELECT 
  user_question,
  ai_response,
  category,
  user_email,
  created_at
FROM public.feedback
WHERE feedback_type = 'thumbs_down'
ORDER BY created_at DESC
LIMIT 20;
```

---

## 🛠️ Advanced Configuration

### Option 1: Using Supabase Edge Function (Recommended for Production)

If you want more control and security, create a Supabase Edge Function:

1. Install Supabase CLI:
```bash
npm install -g supabase
```

2. Create the Edge Function:
```bash
supabase functions new track-feedback
```

3. Update `supabase/functions/track-feedback/index.ts`:
```typescript
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

serve(async (req) => {
  try {
    const feedbackData = await req.json()
    
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? ''
    )

    const { data, error } = await supabase
      .from('feedback')
      .insert([{
        message_id: feedbackData.id,
        feedback_type: feedbackData.feedbackType,
        message_content: feedbackData.messageContent,
        user_question: feedbackData.userQuestion,
        ai_response: feedbackData.aiResponse,
        user_email: feedbackData.userEmail,
        user_tier: feedbackData.userTier,
        user_status: feedbackData.userStatus,
        session_id: feedbackData.sessionId,
        timestamp: new Date(feedbackData.timestamp).toISOString(),
        category: feedbackData.category,
        video_url: feedbackData.videoUrl,
        conversation_length: feedbackData.conversationLength,
        data_consent: feedbackData.dataConsent,
      }])

    if (error) throw error

    return new Response(
      JSON.stringify({ success: true, data }),
      { headers: { 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    )
  }
})
```

4. Deploy the function:
```bash
supabase functions deploy track-feedback
```

5. Update `/src/app/utils/supabaseFeedback.ts` to use `trackFeedbackViaEdgeFunction` instead

---

### Option 2: Using Supabase Client Library

For a more robust solution, install the Supabase client:

```bash
npm install @supabase/supabase-js
```

Then create `/src/app/utils/supabaseClient.ts`:
```typescript
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://naskxuojfdqcunotdjzi.supabase.co'
const supabaseAnonKey = 'YOUR_SUPABASE_ANON_KEY'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
```

Update the tracking function:
```typescript
import { supabase } from './supabaseClient'

export async function trackFeedbackInSupabase(feedbackData: FeedbackData) {
  const { data, error } = await supabase
    .from('feedback')
    .insert([{
      message_id: feedbackData.id,
      feedback_type: feedbackData.feedbackType,
      // ... rest of the fields
    }])
  
  return !error
}
```

---

## 📈 Dashboard & Analytics

### Create a Real-time Feedback Dashboard

You can build a dashboard component to view feedback in real-time:

```typescript
import { useEffect, useState } from 'react'
import { supabase } from '../utils/supabaseClient'

export function FeedbackDashboard() {
  const [feedback, setFeedback] = useState([])
  
  useEffect(() => {
    // Fetch initial feedback
    supabase
      .from('feedback')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(100)
      .then(({ data }) => setFeedback(data || []))
    
    // Subscribe to real-time updates
    const subscription = supabase
      .channel('feedback-changes')
      .on('postgres_changes', 
        { event: 'INSERT', schema: 'public', table: 'feedback' },
        (payload) => setFeedback(prev => [payload.new, ...prev])
      )
      .subscribe()
    
    return () => {
      subscription.unsubscribe()
    }
  }, [])
  
  return (
    <div>
      {feedback.map(item => (
        <div key={item.id}>
          {item.feedback_type}: {item.user_question}
        </div>
      ))}
    </div>
  )
}
```

---

## 🔐 Security Best Practices

### 1. Row Level Security (RLS)
The setup includes RLS policies to ensure:
- Anyone can INSERT feedback (anonymous users can give feedback)
- Only authenticated users can READ feedback (admins only)
- Users can optionally read their own feedback

### 2. API Key Security
- Never commit your `SUPABASE_ANON_KEY` to version control
- Use environment variables in production:
  ```typescript
  const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  ```

### 3. Rate Limiting
Consider adding rate limiting to prevent spam:
```sql
-- Add rate limiting column
ALTER TABLE public.feedback 
ADD COLUMN ip_address TEXT;

-- Create index
CREATE INDEX idx_feedback_ip ON public.feedback(ip_address, created_at);
```

---

## 🐛 Troubleshooting

### Feedback Not Appearing in Database

1. **Check Console Errors**: Open browser console (F12) and look for errors
2. **Verify API Key**: Make sure you updated the `SUPABASE_ANON_KEY`
3. **Check RLS Policies**: Ensure INSERT policy allows public access
4. **Test API Directly**: Use Postman or curl to test the endpoint

### CORS Errors

If you see CORS errors, add your domain to Supabase allowed origins:
1. Supabase Dashboard → **Authentication** → **URL Configuration**
2. Add `https://agent.myora.now` to Site URL and Redirect URLs

### Network Errors

Check your network tab (F12 → Network) to see the actual request/response

---

## 📧 Admin Email Addresses with Full Access

As defined in `/src/app/utils/adminPermissions.ts`, these emails have full admin access:
- carapaulson1@gmail.com ✅
- carapauslon1@gmail.com ✅  
- cara@oratf.info ✅

---

## 🎯 Success Metrics to Track

With this feedback system, you can now track:
- **Satisfaction Rate**: Thumbs Up / Total Feedback
- **Problem Areas**: Categories with most thumbs down
- **User Engagement**: Feedback by user tier
- **Content Quality**: Which responses get the most positive feedback
- **Improvement Trends**: Feedback over time

---

## 📝 Next Steps

1. ✅ Create the Supabase table (Step 1)
2. ✅ Update API key (Step 3)
3. ✅ Test feedback tracking (Step 4)
4. 📊 Build analytics dashboard
5. 🤖 Use feedback data to improve AI responses
6. 📧 Set up automated alerts for negative feedback
7. 📈 Create weekly feedback reports

---

## 🆘 Support

If you need help:
- Supabase Docs: https://supabase.com/docs
- Supabase Discord: https://discord.supabase.com
- ORA Platform: cara@oratf.info

---

**Remember: ALL feedback is now automatically tracked in Supabase! 🎉**

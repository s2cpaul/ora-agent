/**
 * ============================================================================
 * SUPABASE FEEDBACK TRACKING SYSTEM
 * ============================================================================
 * 
 * This module handles all feedback tracking to Supabase database.
 * All thumbs up/down interactions are automatically logged for analysis.
 * 
 * CREDENTIALS: Now managed via centralized config (see /src/lib/config.ts)
 * 
 * Feedback data includes:
 * - Message ID and content
 * - Feedback type (thumbs_up / thumbs_down)
 * - User information (email, tier, status)
 * - Session context
 * - Timestamp
 * - Conversation metadata
 * 
 * ============================================================================
 */

import { supabaseConfig } from '../../lib/config';

export interface FeedbackData {
  id: string; // Message ID
  feedbackType: 'thumbs_up' | 'thumbs_down';
  messageContent: string;
  userQuestion: string;
  aiResponse: string;
  userEmail: string | null;
  userTier: string | null;
  userStatus: string | null;
  sessionId: string;
  timestamp: number;
  category?: string | null;
  videoUrl?: string | null;
  conversationLength?: number;
  dataConsent?: boolean;
}

/**
 * Send feedback to Supabase
 * This function tracks all user feedback (thumbs up/down) in the database
 * 
 * @param feedbackData - Complete feedback information
 * @returns Promise with success status
 */
export async function trackFeedbackInSupabase(feedbackData: FeedbackData): Promise<boolean> {
  try {
    // TODO: Replace with your actual Supabase endpoint
    // This should point to a Supabase Edge Function or direct table insert
    const SUPABASE_FEEDBACK_ENDPOINT = 'https://naskxuojfdqcunotdjzi.supabase.co/rest/v1/feedback';
    const SUPABASE_ANON_KEY = supabaseConfig.anonKey;
    
    const payload = {
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
      category: feedbackData.category || null,
      video_url: feedbackData.videoUrl || null,
      conversation_length: feedbackData.conversationLength || 0,
      data_consent: feedbackData.dataConsent || false,
      created_at: new Date().toISOString(),
    };

    const response = await fetch(SUPABASE_FEEDBACK_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
        'Prefer': 'return=minimal'
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      console.error('Failed to track feedback in Supabase:', response.statusText);
      return false;
    }

    console.log('✅ Feedback tracked in Supabase:', feedbackData.feedbackType, feedbackData.id);
    return true;
  } catch (error) {
    console.error('Error tracking feedback in Supabase:', error);
    return false;
  }
}

/**
 * Alternative: Send feedback via Supabase Edge Function
 * Use this if you prefer a serverless function approach
 * 
 * @param feedbackData - Complete feedback information
 * @returns Promise with success status
 */
export async function trackFeedbackViaEdgeFunction(feedbackData: FeedbackData): Promise<boolean> {
  try {
    // TODO: Replace with your Supabase Edge Function URL
    const EDGE_FUNCTION_URL = 'https://naskxuojfdqcunotdjzi.supabase.co/functions/v1/track-feedback';
    const SUPABASE_ANON_KEY = supabaseConfig.anonKey;
    
    const response = await fetch(EDGE_FUNCTION_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
      },
      body: JSON.stringify(feedbackData)
    });

    if (!response.ok) {
      console.error('Failed to track feedback via Edge Function:', response.statusText);
      return false;
    }

    const result = await response.json();
    console.log('✅ Feedback tracked via Edge Function:', result);
    return true;
  } catch (error) {
    console.error('Error tracking feedback via Edge Function:', error);
    return false;
  }
}

/**
 * Batch track multiple feedback entries
 * Useful for syncing localStorage feedback to Supabase
 * 
 * @param feedbackEntries - Array of feedback data
 * @returns Promise with count of successfully tracked items
 */
export async function batchTrackFeedback(feedbackEntries: FeedbackData[]): Promise<number> {
  let successCount = 0;
  
  for (const feedback of feedbackEntries) {
    const success = await trackFeedbackInSupabase(feedback);
    if (success) successCount++;
  }
  
  return successCount;
}

/**
 * Sync localStorage feedback to Supabase
 * Call this to migrate existing feedback data to database
 */
export async function syncLocalFeedbackToSupabase(): Promise<void> {
  try {
    const stored = localStorage.getItem('conversationLogs');
    if (!stored) return;
    
    const logs = JSON.parse(stored);
    const feedbackLogs = logs.filter((log: any) => log.feedback !== null);
    
    const feedbackData: FeedbackData[] = feedbackLogs.map((log: any) => ({
      id: log.id,
      feedbackType: log.feedback,
      messageContent: log.aiResponse,
      userQuestion: log.userQuestion,
      aiResponse: log.aiResponse,
      userEmail: localStorage.getItem('userEmail'),
      userTier: log.userTier,
      userStatus: localStorage.getItem('userStatus'),
      sessionId: log.sessionId,
      timestamp: log.timestamp,
      category: log.pillButtonContext,
      conversationLength: log.conversationLength,
      dataConsent: log.dataConsent,
    }));
    
    const synced = await batchTrackFeedback(feedbackData);
    console.log(`✅ Synced ${synced} feedback entries to Supabase`);
  } catch (error) {
    console.error('Error syncing local feedback to Supabase:', error);
  }
}

/**
 * SQL Schema for Supabase Feedback Table
 * Run this in your Supabase SQL Editor to create the table:
 * 
 * ```sql
 * CREATE TABLE IF NOT EXISTS public.feedback (
 *   id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
 *   message_id TEXT NOT NULL,
 *   feedback_type TEXT NOT NULL CHECK (feedback_type IN ('thumbs_up', 'thumbs_down')),
 *   message_content TEXT,
 *   user_question TEXT,
 *   ai_response TEXT,
 *   user_email TEXT,
 *   user_tier TEXT,
 *   user_status TEXT,
 *   session_id TEXT,
 *   timestamp TIMESTAMPTZ NOT NULL,
 *   category TEXT,
 *   video_url TEXT,
 *   conversation_length INTEGER DEFAULT 0,
 *   data_consent BOOLEAN DEFAULT FALSE,
 *   created_at TIMESTAMPTZ DEFAULT NOW(),
 *   updated_at TIMESTAMPTZ DEFAULT NOW()
 * );
 * 
 * -- Create index for faster queries
 * CREATE INDEX idx_feedback_user_email ON public.feedback(user_email);
 * CREATE INDEX idx_feedback_timestamp ON public.feedback(timestamp);
 * CREATE INDEX idx_feedback_type ON public.feedback(feedback_type);
 * CREATE INDEX idx_feedback_created_at ON public.feedback(created_at);
 * 
 * -- Enable Row Level Security (RLS)
 * ALTER TABLE public.feedback ENABLE ROW LEVEL SECURITY;
 * 
 * -- Create policy to allow inserts (adjust based on your auth requirements)
 * CREATE POLICY "Allow public feedback inserts" ON public.feedback
 *   FOR INSERT
 *   TO public
 *   WITH CHECK (true);
 * 
 * -- Create policy to allow admins to read all feedback
 * CREATE POLICY "Allow admin feedback reads" ON public.feedback
 *   FOR SELECT
 *   TO authenticated
 *   USING (true);
 * ```
 * 
 * After creating the table, update the SUPABASE_ANON_KEY constant above
 * with your actual Supabase anon key from Project Settings > API.
 */
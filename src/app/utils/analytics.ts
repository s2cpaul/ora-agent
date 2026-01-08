/**
 * ==============================================================================
 * COMPREHENSIVE ANALYTICS & DATA TRACKING SYSTEM
 * ==============================================================================
 * 
 * This is a CORE FEATURE for building ORA's context data model.
 * 
 * PURPOSE:
 * - Track ALL user interactions for ML/AI context building
 * - Enable user behavior prediction
 * - Optimize content and AI responses
 * - Build personalized user experiences
 * - Generate business intelligence
 * 
 * USAGE:
 * Import and call trackEvent() from ANY component with user interactions.
 * 
 * ==============================================================================
 */

import { supabase } from '../../lib/supabase';
import { appConfig } from '../../lib/config';

// ------------------------------------------------------------------------------
// TYPES
// ------------------------------------------------------------------------------

export interface AnalyticsEvent {
  event_type: string;
  user_id?: string | null;
  session_id: string;
  timestamp: string;
  user_tier?: string | null;
  
  // Event-specific data
  event_data: {
    [key: string]: any;
  };
  
  // Context data for ML model
  context: {
    route: string;
    device_type: 'mobile' | 'tablet' | 'desktop';
    viewport_width: number;
    viewport_height: number;
    user_agent: string;
    referrer: string | null;
  };
  
  // Metadata for context building
  metadata: {
    conversation_depth?: number;
    time_since_last_action?: number;
    cumulative_session_time?: number;
    features_used?: string[];
    [key: string]: any;
  };
}

export interface SessionData {
  session_id: string;
  started_at: number;
  last_action_at: number;
  events_count: number;
  features_used: Set<string>;
}

// ------------------------------------------------------------------------------
// SESSION MANAGEMENT
// ------------------------------------------------------------------------------

let currentSession: SessionData | null = null;

/**
 * Get or create current session
 */
function getSession(): SessionData {
  if (!currentSession) {
    const sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    currentSession = {
      session_id: sessionId,
      started_at: Date.now(),
      last_action_at: Date.now(),
      events_count: 0,
      features_used: new Set(),
    };
    
    // Store in localStorage for persistence across page reloads
    localStorage.setItem('current_session', JSON.stringify({
      ...currentSession,
      features_used: Array.from(currentSession.features_used),
    }));
    
    // Track session start
    trackSessionEvent('session_started');
  }
  
  return currentSession;
}

/**
 * Load session from localStorage if exists
 */
function loadSession() {
  try {
    const stored = localStorage.getItem('current_session');
    if (stored) {
      const data = JSON.parse(stored);
      currentSession = {
        ...data,
        features_used: new Set(data.features_used || []),
      };
    }
  } catch (error) {
    console.error('Error loading session:', error);
  }
}

// Load session on module initialization
loadSession();

/**
 * Update session with new action
 */
function updateSession(feature?: string) {
  const session = getSession();
  session.last_action_at = Date.now();
  session.events_count += 1;
  
  if (feature) {
    session.features_used.add(feature);
  }
  
  // Update localStorage
  localStorage.setItem('current_session', JSON.stringify({
    ...session,
    features_used: Array.from(session.features_used),
  }));
}

/**
 * End current session
 */
export function endSession() {
  if (currentSession) {
    trackSessionEvent('session_ended', {
      duration_ms: Date.now() - currentSession.started_at,
      events_count: currentSession.events_count,
      features_used: Array.from(currentSession.features_used),
    });
    
    currentSession = null;
    localStorage.removeItem('current_session');
  }
}

// End session on page unload
if (typeof window !== 'undefined') {
  window.addEventListener('beforeunload', endSession);
}

// ------------------------------------------------------------------------------
// DEVICE & CONTEXT DETECTION
// ------------------------------------------------------------------------------

function getDeviceType(): 'mobile' | 'tablet' | 'desktop' {
  const width = window.innerWidth;
  if (width < 768) return 'mobile';
  if (width < 1024) return 'tablet';
  return 'desktop';
}

function getContext(): AnalyticsEvent['context'] {
  return {
    route: window.location.pathname,
    device_type: getDeviceType(),
    viewport_width: window.innerWidth,
    viewport_height: window.innerHeight,
    user_agent: navigator.userAgent,
    referrer: document.referrer || null,
  };
}

// ------------------------------------------------------------------------------
// CORE TRACKING FUNCTION
// ------------------------------------------------------------------------------

/**
 * Track an analytics event
 * 
 * @param params - Event parameters
 * @returns Promise that resolves when event is tracked
 */
export async function trackEvent(params: {
  event_type: string;
  event_data?: { [key: string]: any };
  metadata?: { [key: string]: any };
  user_id?: string | null;
}): Promise<boolean> {
  // Skip if analytics disabled
  if (!appConfig.enableAnalytics) {
    if (appConfig.debugMode) {
      console.log('📊 Analytics disabled, skipping event:', params.event_type);
    }
    return false;
  }
  
  try {
    const session = getSession();
    updateSession(params.event_type);
    
    // Get user info from localStorage
    const userId = params.user_id || localStorage.getItem('userId') || null;
    const userTier = localStorage.getItem('userTier') || 'free';
    
    // Calculate time since last action
    const timeSinceLastAction = Date.now() - session.last_action_at;
    const cumulativeSessionTime = Date.now() - session.started_at;
    
    // Build event object
    const event: AnalyticsEvent = {
      event_type: params.event_type,
      user_id: userId,
      session_id: session.session_id,
      timestamp: new Date().toISOString(),
      user_tier: userTier,
      event_data: params.event_data || {},
      context: getContext(),
      metadata: {
        conversation_depth: params.metadata?.conversation_depth || 0,
        time_since_last_action: timeSinceLastAction,
        cumulative_session_time: cumulativeSessionTime,
        features_used: Array.from(session.features_used),
        ...params.metadata,
      },
    };
    
    // Log to console in debug mode
    if (appConfig.debugMode) {
      console.log('📊 Analytics Event:', event);
    }
    
    // Store locally first (for offline support)
    storeEventLocally(event);
    
    // Send to Supabase (if enabled)
    if (appConfig.enableFeedbackTracking) {
      await sendToSupabase(event);
    }
    
    return true;
  } catch (error) {
    console.error('Error tracking event:', error);
    return false;
  }
}

// ------------------------------------------------------------------------------
// STORAGE FUNCTIONS
// ------------------------------------------------------------------------------

/**
 * Store event locally for offline support and backup
 */
function storeEventLocally(event: AnalyticsEvent) {
  try {
    const stored = localStorage.getItem('analytics_events') || '[]';
    const events = JSON.parse(stored);
    events.push(event);
    
    // Keep last 100 events locally
    if (events.length > 100) {
      events.shift();
    }
    
    localStorage.setItem('analytics_events', JSON.stringify(events));
  } catch (error) {
    console.error('Error storing event locally:', error);
  }
}

/**
 * Send event to Supabase
 */
async function sendToSupabase(event: AnalyticsEvent): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('analytics_events')
      .insert([{
        event_type: event.event_type,
        user_id: event.user_id,
        session_id: event.session_id,
        timestamp: event.timestamp,
        user_tier: event.user_tier,
        event_data: event.event_data,
        context: event.context,
        metadata: event.metadata,
      }]);
    
    if (error) {
      console.error('Supabase analytics error:', error);
      return false;
    }
    
    return true;
  } catch (error) {
    console.error('Error sending to Supabase:', error);
    return false;
  }
}

/**
 * Sync locally stored events to Supabase
 * Call this when connection is restored or periodically
 */
export async function syncLocalEvents(): Promise<number> {
  try {
    const stored = localStorage.getItem('analytics_events') || '[]';
    const events: AnalyticsEvent[] = JSON.parse(stored);
    
    if (events.length === 0) return 0;
    
    let synced = 0;
    for (const event of events) {
      const success = await sendToSupabase(event);
      if (success) synced++;
    }
    
    // Clear synced events
    if (synced > 0) {
      localStorage.setItem('analytics_events', '[]');
      console.log(`✅ Synced ${synced} analytics events to Supabase`);
    }
    
    return synced;
  } catch (error) {
    console.error('Error syncing local events:', error);
    return 0;
  }
}

// ------------------------------------------------------------------------------
// CONVENIENCE TRACKING FUNCTIONS
// ------------------------------------------------------------------------------

function trackSessionEvent(event_type: string, event_data?: any) {
  trackEvent({
    event_type,
    event_data,
  });
}

/**
 * Track user question
 */
export function trackUserQuestion(params: {
  question: string;
  category?: string;
  pillButtonContext?: string;
}) {
  return trackEvent({
    event_type: 'user_question_asked',
    event_data: {
      question: params.question,
      category: params.category || null,
      pill_button_context: params.pillButtonContext || null,
      character_count: params.question.length,
      word_count: params.question.split(' ').length,
    },
  });
}

/**
 * Track AI response
 */
export function trackAIResponse(params: {
  question: string;
  response: string;
  category?: string;
  tokensUsed?: number;
  responseTimeMs?: number;
}) {
  return trackEvent({
    event_type: 'ai_response_viewed',
    event_data: {
      question: params.question,
      response: params.response,
      category: params.category || null,
      tokens_used: params.tokensUsed || 0,
      response_time_ms: params.responseTimeMs || 0,
      response_length: params.response.length,
    },
  });
}

/**
 * Track feedback (thumbs up/down)
 */
export function trackFeedback(params: {
  feedbackType: 'thumbs_up' | 'thumbs_down';
  messageId: string;
  question: string;
  response: string;
}) {
  return trackEvent({
    event_type: 'feedback_submitted',
    event_data: {
      feedback_type: params.feedbackType,
      message_id: params.messageId,
      question: params.question,
      response: params.response,
    },
  });
}

/**
 * Track video play
 */
export function trackVideoPlay(params: {
  videoUrl: string;
  videoTitle?: string;
  category?: string;
}) {
  return trackEvent({
    event_type: 'video_played',
    event_data: {
      video_url: params.videoUrl,
      video_title: params.videoTitle || null,
      category: params.category || null,
    },
  });
}

/**
 * Track video completion
 */
export function trackVideoComplete(params: {
  videoUrl: string;
  watchDurationMs: number;
  completionPercentage: number;
}) {
  return trackEvent({
    event_type: 'video_completed',
    event_data: {
      video_url: params.videoUrl,
      watch_duration_ms: params.watchDurationMs,
      completion_percentage: params.completionPercentage,
    },
  });
}

/**
 * Track pill button click
 */
export function trackPillButtonClick(params: {
  buttonLabel: string;
  category?: string;
  sequence?: number;
}) {
  return trackEvent({
    event_type: 'pill_button_clicked',
    event_data: {
      button_label: params.buttonLabel,
      category: params.category || null,
      sequence: params.sequence || null,
    },
  });
}

/**
 * Track navigation
 */
export function trackNavigation(params: {
  fromRoute: string;
  toRoute: string;
  method?: 'click' | 'back' | 'forward' | 'direct';
}) {
  return trackEvent({
    event_type: 'page_view',
    event_data: {
      from_route: params.fromRoute,
      to_route: params.toRoute,
      navigation_method: params.method || 'click',
    },
  });
}

/**
 * Track multi-agent connection
 */
export function trackMultiAgentConnection(params: {
  agentType: string;
  agentName: string;
  success: boolean;
  errorMessage?: string;
}) {
  return trackEvent({
    event_type: 'multi_agent_connected',
    event_data: {
      agent_type: params.agentType,
      agent_name: params.agentName,
      success: params.success,
      error_message: params.errorMessage || null,
    },
  });
}

/**
 * Track subscription change
 */
export function trackSubscriptionChange(params: {
  oldTier: string;
  newTier: string;
  paymentMethod?: string;
  amount?: number;
}) {
  return trackEvent({
    event_type: 'subscription_changed',
    event_data: {
      old_tier: params.oldTier,
      new_tier: params.newTier,
      payment_method: params.paymentMethod || null,
      amount: params.amount || null,
    },
  });
}

/**
 * Track feature access (especially when blocked by tier)
 */
export function trackFeatureAccess(params: {
  feature: string;
  allowed: boolean;
  userTier: string;
  requiredTier?: string;
}) {
  return trackEvent({
    event_type: params.allowed ? 'feature_accessed' : 'feature_blocked',
    event_data: {
      feature: params.feature,
      user_tier: params.userTier,
      required_tier: params.requiredTier || null,
    },
  });
}

/**
 * Track document upload
 */
export function trackDocumentUpload(params: {
  source: 'device' | 'google-drive' | 'sharepoint';
  fileType: string;
  fileSize: number;
  success: boolean;
}) {
  return trackEvent({
    event_type: 'document_uploaded',
    event_data: {
      source: params.source,
      file_type: params.fileType,
      file_size_bytes: params.fileSize,
      success: params.success,
    },
  });
}

/**
 * Track error
 */
export function trackError(params: {
  errorMessage: string;
  errorStack?: string;
  component?: string;
  action?: string;
}) {
  return trackEvent({
    event_type: 'error_occurred',
    event_data: {
      error_message: params.errorMessage,
      error_stack: params.errorStack || null,
      component: params.component || null,
      action: params.action || null,
    },
  });
}

/**
 * Track performance metric
 */
export function trackPerformance(params: {
  metric: string;
  value: number;
  unit: 'ms' | 'bytes' | 'count';
}) {
  return trackEvent({
    event_type: 'performance_metric',
    event_data: {
      metric: params.metric,
      value: params.value,
      unit: params.unit,
    },
  });
}

// ------------------------------------------------------------------------------
// ANALYTICS DASHBOARD QUERIES
// ------------------------------------------------------------------------------

/**
 * Get user's activity summary
 */
export async function getUserActivitySummary(userId: string, days: number = 30) {
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - days);
  
  const { data, error } = await supabase
    .from('analytics_events')
    .select('*')
    .eq('user_id', userId)
    .gte('timestamp', startDate.toISOString())
    .order('timestamp', { ascending: false });
  
  if (error) {
    console.error('Error fetching user activity:', error);
    return null;
  }
  
  return {
    total_events: data.length,
    questions_asked: data.filter(e => e.event_type === 'user_question_asked').length,
    videos_watched: data.filter(e => e.event_type === 'video_played').length,
    feedback_given: data.filter(e => e.event_type === 'feedback_submitted').length,
    features_used: new Set(data.map(e => e.event_type)).size,
    sessions: new Set(data.map(e => e.session_id)).size,
  };
}

/**
 * Get popular content
 */
export async function getPopularContent(days: number = 7) {
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - days);
  
  const { data, error } = await supabase
    .from('analytics_events')
    .select('event_data')
    .in('event_type', ['video_played', 'pill_button_clicked'])
    .gte('timestamp', startDate.toISOString());
  
  if (error) {
    console.error('Error fetching popular content:', error);
    return null;
  }
  
  // Count frequency
  const counts: { [key: string]: number } = {};
  data.forEach(event => {
    const key = event.event_data.video_url || event.event_data.button_label;
    if (key) {
      counts[key] = (counts[key] || 0) + 1;
    }
  });
  
  // Sort by frequency
  return Object.entries(counts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 10);
}

// ------------------------------------------------------------------------------
// INITIALIZATION
// ------------------------------------------------------------------------------

// Sync local events on load
if (typeof window !== 'undefined') {
  window.addEventListener('load', () => {
    setTimeout(() => syncLocalEvents(), 2000);
  });
}

export default {
  trackEvent,
  trackUserQuestion,
  trackAIResponse,
  trackFeedback,
  trackVideoPlay,
  trackVideoComplete,
  trackPillButtonClick,
  trackNavigation,
  trackMultiAgentConnection,
  trackSubscriptionChange,
  trackFeatureAccess,
  trackDocumentUpload,
  trackError,
  trackPerformance,
  endSession,
  syncLocalEvents,
  getUserActivitySummary,
  getPopularContent,
};

/**
 * ORA - AI Leadership Agent
 * Copyright (c) 2024-2026 s2cpaul
 * Licensed under MIT License
 * Repository: https://github.com/s2cpaul/ora-agent
 */

import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';

export interface UsageStats {
  questionsAskedThisMonth: number;
  questionsRemaining: number;
  hasReachedLimit: boolean;
  resetDate: Date;
}

export function useUsageTracking() {
  const { user } = useAuth();
  const [usageStats, setUsageStats] = useState<UsageStats>({
    questionsAskedThisMonth: 0,
    questionsRemaining: 0,
    hasReachedLimit: false,
    resetDate: new Date(),
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    loadUsageStats();

    // Subscribe to real-time changes
    const channel = supabase
      .channel('usage-changes')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'usage_tracking',
          filter: `user_id=eq.${user.id}`,
        },
        () => {
          loadUsageStats();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user]);

  async function loadUsageStats() {
    if (!user) return;

    try {
      setLoading(true);

      // Get the start of the current month
      const now = new Date();
      const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
      const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);

      const { data, error } = await supabase
        .from('usage_tracking')
        .select('*')
        .eq('user_id', user.id)
        .gte('created_at', startOfMonth.toISOString())
        .lt('created_at', endOfMonth.toISOString());

      if (error) throw error;

      const questionsAskedThisMonth = data?.length || 0;
      const questionsRemaining = Infinity;
      const hasReachedLimit = false;

      setUsageStats({
        questionsAskedThisMonth,
        questionsRemaining: questionsRemaining === Infinity ? -1 : questionsRemaining,
        hasReachedLimit,
        resetDate: endOfMonth,
      });
    } catch (err) {
      console.error('Error loading usage stats:', err);
    } finally {
      setLoading(false);
    }
  }

  async function trackQuestion(question: string, context?: string) {
    if (!user) return false;

    // Check if user has reached limit
    if (usageStats.hasReachedLimit) {
      return false;
    }

    try {
      const { error } = await supabase
        .from('usage_tracking')
        .insert({
          user_id: user.id,
          event_type: 'question_asked',
          metadata: {
            question,
            context,
          },
        });

      if (error) throw error;

      await loadUsageStats();
      return true;
    } catch (err) {
      console.error('Error tracking question:', err);
      return false;
    }
  }

  async function trackEvent(eventType: string, metadata?: any) {
    if (!user) return;

    try {
      await supabase
        .from('usage_tracking')
        .insert({
          user_id: user.id,
          event_type: eventType,
          metadata,
        });
    } catch (err) {
      console.error('Error tracking event:', err);
    }
  }

  return {
    usageStats,
    loading,
    trackQuestion,
    trackEvent,
    refreshUsage: loadUsageStats,
  };
}
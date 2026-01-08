/**
 * ORA - AI Leadership Agent
 * Copyright (c) 2024-2026 s2cpaul
 * Licensed under MIT License
 * Repository: https://github.com/s2cpaul/ora-agent
 */

import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';

export type SubscriptionTier = 'free' | 'solo' | 'avatar' | 'buddy' | 'team';

export interface Subscription {
  id: string;
  user_id: string;
  tier: SubscriptionTier;
  status: 'active' | 'cancelled' | 'past_due';
  stripe_subscription_id: string | null;
  stripe_customer_id: string | null;
  current_period_start: string;
  current_period_end: string;
  created_at: string;
  updated_at: string;
}

export interface SubscriptionLimits {
  questionsPerMonth: number;
  canUploadDocuments: boolean;
  canIntegrateGoogleDrive: boolean;
  canIntegrateSharePoint: boolean;
  seats: number;
  hasAnalytics: boolean;
  hasPrioritySupport: boolean;
  hasAvatarCreation?: boolean;
  hasAvatarIntegration?: boolean;
  hasSocialMediaIntegration?: boolean;
}

const TIER_LIMITS: Record<SubscriptionTier, SubscriptionLimits> = {
  free: {
    questionsPerMonth: 25,
    canUploadDocuments: false,
    canIntegrateGoogleDrive: false,
    canIntegrateSharePoint: false,
    seats: 1,
    hasAnalytics: false,
    hasPrioritySupport: false,
  },
  solo: {
    questionsPerMonth: -1, // unlimited
    canUploadDocuments: true,
    canIntegrateGoogleDrive: true,
    canIntegrateSharePoint: true,
    seats: 1,
    hasAnalytics: true,
    hasPrioritySupport: true,
  },
  avatar: {
    questionsPerMonth: -1, // unlimited
    canUploadDocuments: true,
    canIntegrateGoogleDrive: true,
    canIntegrateSharePoint: true,
    seats: 1,
    hasAnalytics: true,
    hasPrioritySupport: true,
    hasAvatarCreation: true,
    hasAvatarIntegration: true,
    hasSocialMediaIntegration: true,
  },
  buddy: {
    questionsPerMonth: -1, // unlimited
    canUploadDocuments: true,
    canIntegrateGoogleDrive: true,
    canIntegrateSharePoint: true,
    seats: 2,
    hasAnalytics: true,
    hasPrioritySupport: true,
  },
  team: {
    questionsPerMonth: -1, // unlimited
    canUploadDocuments: true,
    canIntegrateGoogleDrive: true,
    canIntegrateSharePoint: true,
    seats: -1, // unlimited
    hasAnalytics: true,
    hasPrioritySupport: true,
  },
};

export function useSubscription() {
  const { user } = useAuth();
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user) {
      setSubscription(null);
      setLoading(false);
      return;
    }

    loadSubscription();

    // Subscribe to real-time changes
    const channel = supabase
      .channel('subscription-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'subscriptions',
          filter: `user_id=eq.${user.id}`,
        },
        () => {
          loadSubscription();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user]);

  async function loadSubscription() {
    try {
      setLoading(true);
      setError(null);

      const { data, error: fetchError } = await supabase
        .from('subscriptions')
        .select('*')
        .eq('user_id', user!.id)
        .single();

      if (fetchError && fetchError.code !== 'PGRST116') {
        // PGRST116 = no rows returned
        throw fetchError;
      }

      if (!data) {
        // Create a free tier subscription if none exists
        const { data: newSub, error: createError } = await supabase
          .from('subscriptions')
          .insert({
            user_id: user!.id,
            tier: 'free',
            status: 'active',
          })
          .select()
          .single();

        if (createError) throw createError;
        setSubscription(newSub);
      } else {
        setSubscription(data);
      }
    } catch (err: any) {
      console.error('Error loading subscription:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function upgradeTier(newTier: SubscriptionTier, stripeData?: { 
    customerId: string; 
    subscriptionId: string;
  }) {
    if (!user || !subscription) return;

    try {
      setError(null);

      const updateData: any = {
        tier: newTier,
        status: 'active',
        updated_at: new Date().toISOString(),
      };

      if (stripeData) {
        updateData.stripe_customer_id = stripeData.customerId;
        updateData.stripe_subscription_id = stripeData.subscriptionId;
      }

      const { error: updateError } = await supabase
        .from('subscriptions')
        .update(updateData)
        .eq('id', subscription.id);

      if (updateError) throw updateError;

      // TODO: SEND EMAIL NOTIFICATIONS
      // When a new user signs up or upgrades to a paid tier:
      // 1. Send confirmation/welcome email to the user (user.email)
      // 2. Send a copy to cara@oratf.info (BCC or separate email)
      // This should be implemented when backend email service (e.g., SendGrid, AWS SES) is integrated
      // Email should include: plan details, billing info, and welcome message

      await loadSubscription();
    } catch (err: any) {
      console.error('Error upgrading tier:', err);
      setError(err.message);
      throw err;
    }
  }

  async function cancelSubscription() {
    if (!user || !subscription) return;

    try {
      setError(null);

      const { error: updateError } = await supabase
        .from('subscriptions')
        .update({
          status: 'cancelled',
          updated_at: new Date().toISOString(),
        })
        .eq('id', subscription.id);

      if (updateError) throw updateError;

      await loadSubscription();
    } catch (err: any) {
      console.error('Error cancelling subscription:', err);
      setError(err.message);
      throw err;
    }
  }

  const tier = subscription?.tier || 'free';
  const limits = TIER_LIMITS[tier];

  return {
    subscription,
    tier,
    limits,
    loading,
    error,
    upgradeTier,
    cancelSubscription,
    refreshSubscription: loadSubscription,
  };
}
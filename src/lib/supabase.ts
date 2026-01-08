/**
 * ORA - AI Leadership Agent
 * Copyright (c) 2024-2026 s2cpaul
 * Licensed under MIT License
 * Repository: https://github.com/s2cpaul/ora-agent
 */

import { createClient } from '@supabase/supabase-js';
import { supabaseConfig } from './config';

// Create and export Supabase client using centralized config
export const supabase = createClient(supabaseConfig.url, supabaseConfig.anonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
});

// Database Types (we'll expand these as we create tables)
export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          email: string;
          full_name: string | null;
          subscription_tier: 'free' | 'solo' | 'buddy' | 'team';
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email: string;
          full_name?: string | null;
          subscription_tier?: 'free' | 'solo' | 'buddy' | 'team';
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          full_name?: string | null;
          subscription_tier?: 'free' | 'solo' | 'buddy' | 'team';
          created_at?: string;
          updated_at?: string;
        };
      };
      subscriptions: {
        Row: {
          id: string;
          user_id: string;
          tier: 'free' | 'solo' | 'buddy' | 'team';
          status: 'active' | 'cancelled' | 'expired';
          stripe_subscription_id: string | null;
          current_period_start: string;
          current_period_end: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          tier: 'free' | 'solo' | 'buddy' | 'team';
          status?: 'active' | 'cancelled' | 'expired';
          stripe_subscription_id?: string | null;
          current_period_start: string;
          current_period_end: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          tier?: 'free' | 'solo' | 'buddy' | 'team';
          status?: 'active' | 'cancelled' | 'expired';
          stripe_subscription_id?: string | null;
          current_period_start?: string;
          current_period_end?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
      usage_tracking: {
        Row: {
          id: string;
          user_id: string;
          month: string; // YYYY-MM format
          questions_asked: number;
          questions_limit: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          month: string;
          questions_asked?: number;
          questions_limit: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          month?: string;
          questions_asked?: number;
          questions_limit?: number;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
  };
}
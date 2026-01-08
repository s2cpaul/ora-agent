/**
 * ORA - AI Leadership Agent
 * Copyright (c) 2024-2026 s2cpaul
 * Licensed under MIT License
 * Repository: https://github.com/s2cpaul/ora-agent
 * 
 * ==============================================================================
 * CENTRALIZED CONFIGURATION & CREDENTIALS
 * ==============================================================================
 * 
 * This file is the SINGLE SOURCE OF TRUTH for all environment variables
 * and application configuration.
 * 
 * IMPORTANT:
 * - All components should import config from this file
 * - Never access import.meta.env directly in components
 * - This provides type safety and validation
 * 
 * ==============================================================================
 */

// ------------------------------------------------------------------------------
// ENVIRONMENT VALIDATION
// ------------------------------------------------------------------------------

interface EnvConfig {
  // Supabase
  supabase: {
    url: string;
    anonKey: string;
  };
  
  // Firebase (optional)
  firebase: {
    apiKey: string;
    authDomain: string;
    projectId: string;
    storageBucket: string;
    messagingSenderId: string;
    appId: string;
  } | null;
  
  // Google OAuth
  google: {
    clientId: string;
    clientSecret?: string; // Only available server-side
  } | null;
  
  // Stripe
  stripe: {
    publicKey: string;
  } | null;
  
  // PayPal
  paypal: {
    clientId: string;
    mode: 'sandbox' | 'live';
  } | null;
  
  // OpenAI (client-safe config only)
  openai: {
    model: string;
    enabled: boolean;
  };
  
  // Email
  email: {
    fromAddress: string;
  };
  
  // Application
  app: {
    env: 'development' | 'staging' | 'production';
    baseUrl: string;
    enableAnalytics: boolean;
    enableFeedbackTracking: boolean;
    enableMultiAgent: boolean;
    enableGoogleOAuth: boolean;
    debugMode: boolean;
  };
  
  // Admin
  admin: {
    emails: string[];
  };
  
  // Rate Limits
  rateLimits: {
    free: number;
    solo: number;
    buddy: number;
    team: number;
    enterprise: number;
  };
}

// ------------------------------------------------------------------------------
// HELPER FUNCTIONS
// ------------------------------------------------------------------------------

function getEnvVar(key: string, required: boolean = true, defaultValue?: string): string {
  const value = import.meta.env[key] || defaultValue;
  
  if (required && !value) {
    // In development, provide helpful defaults instead of throwing
    if (import.meta.env.DEV) {
      console.warn(
        `⚠️  Missing environment variable: ${key}\n` +
        `Using default value for development. Add to .env file for production.`
      );
      
      // Provide safe defaults for development
      if (key === 'VITE_SUPABASE_URL') {
        return 'https://naskxuojfdqcunotdjzi.supabase.co';
      }
      if (key === 'VITE_SUPABASE_ANON_KEY') {
        return 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5hc2t4dW9qZmRxY3Vub3RkanppIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzUyMTU5MTQsImV4cCI6MjA1MDc5MTkxNH0.HvgxB6L2_Hb6Kx-FxA0L-k_1gB1JQ9MOTJnjTOpOxBU';
      }
      
      return '';
    }
    
    // In production, throw error
    throw new Error(
      `❌ Missing required environment variable: ${key}\n\n` +
      `Please check your .env file. If you don't have one:\n` +
      `1. Copy .env.example to .env\n` +
      `2. Fill in the required values\n` +
      `3. Restart your dev server\n`
    );
  }
  
  return value || '';
}

function getEnvBool(key: string, defaultValue: boolean = false): boolean {
  const value = import.meta.env[key];
  if (value === undefined) return defaultValue;
  return value === 'true' || value === '1';
}

function getEnvNumber(key: string, defaultValue: number): number {
  const value = import.meta.env[key];
  if (value === undefined) return defaultValue;
  const parsed = parseInt(value, 10);
  return isNaN(parsed) ? defaultValue : parsed;
}

// ------------------------------------------------------------------------------
// CONFIGURATION OBJECT
// ------------------------------------------------------------------------------

export const config: EnvConfig = {
  // Supabase (REQUIRED)
  supabase: {
    url: getEnvVar('VITE_SUPABASE_URL', true),
    anonKey: getEnvVar('VITE_SUPABASE_ANON_KEY', true),
  },
  
  // Firebase (OPTIONAL - for hybrid setup)
  firebase: (() => {
    const apiKey = getEnvVar('VITE_FIREBASE_API_KEY', false);
    if (!apiKey) return null;
    
    return {
      apiKey,
      authDomain: getEnvVar('VITE_FIREBASE_AUTH_DOMAIN', true),
      projectId: getEnvVar('VITE_FIREBASE_PROJECT_ID', true),
      storageBucket: getEnvVar('VITE_FIREBASE_STORAGE_BUCKET', true),
      messagingSenderId: getEnvVar('VITE_FIREBASE_MESSAGING_SENDER_ID', true),
      appId: getEnvVar('VITE_FIREBASE_APP_ID', true),
    };
  })(),
  
  // Google OAuth (OPTIONAL)
  google: (() => {
    const clientId = getEnvVar('VITE_GOOGLE_CLIENT_ID', false);
    if (!clientId) return null;
    
    return {
      clientId,
      // clientSecret is only available in server-side functions
    };
  })(),
  
  // Stripe (OPTIONAL)
  stripe: (() => {
    const publicKey = getEnvVar('VITE_STRIPE_PUBLIC_KEY', false);
    if (!publicKey) return null;
    
    return {
      publicKey,
    };
  })(),
  
  // PayPal (OPTIONAL)
  paypal: (() => {
    const clientId = getEnvVar('VITE_PAYPAL_CLIENT_ID', false);
    if (!clientId) return null;
    
    return {
      clientId,
      mode: (getEnvVar('VITE_PAYPAL_MODE', false, 'sandbox') as 'sandbox' | 'live'),
    };
  })(),
  
  // OpenAI (Model selection only - API key should be server-side)
  openai: {
    model: getEnvVar('VITE_OPENAI_MODEL', false, 'gpt-4-turbo-preview'),
    enabled: getEnvBool('VITE_ENABLE_OPENAI', false),
  },
  
  // Email
  email: {
    fromAddress: getEnvVar('VITE_SENDGRID_FROM_EMAIL', false, 'cara@oratf.info'),
  },
  
  // Application
  app: {
    env: getEnvVar('VITE_APP_ENV', false, 'development') as 'development' | 'staging' | 'production',
    baseUrl: getEnvVar('VITE_API_BASE_URL', false, 'http://localhost:5173'),
    enableAnalytics: getEnvBool('VITE_ENABLE_ANALYTICS', true),
    enableFeedbackTracking: getEnvBool('VITE_ENABLE_FEEDBACK_TRACKING', true),
    enableMultiAgent: getEnvBool('VITE_ENABLE_MULTI_AGENT', true),
    enableGoogleOAuth: getEnvBool('VITE_ENABLE_GOOGLE_OAUTH', false),
    debugMode: getEnvBool('VITE_DEBUG_MODE', false),
  },
  
  // Admin
  admin: {
    emails: getEnvVar('VITE_ADMIN_EMAILS', false, 'cara@oratf.info')
      .split(',')
      .map(email => email.trim()),
  },
  
  // Rate Limits
  rateLimits: {
    free: getEnvNumber('VITE_RATE_LIMIT_FREE', 10),
    solo: getEnvNumber('VITE_RATE_LIMIT_SOLO', 50),
    buddy: getEnvNumber('VITE_RATE_LIMIT_BUDDY', 100),
    team: getEnvNumber('VITE_RATE_LIMIT_TEAM', 200),
    enterprise: getEnvNumber('VITE_RATE_LIMIT_ENTERPRISE', 1000),
  },
};

// ------------------------------------------------------------------------------
// VALIDATION ON LOAD
// ------------------------------------------------------------------------------

export function validateConfig() {
  const errors: string[] = [];
  
  // Check required Supabase
  if (!config.supabase.url.startsWith('https://')) {
    errors.push('VITE_SUPABASE_URL must be a valid HTTPS URL');
  }
  
  if (config.supabase.anonKey.length < 20) {
    errors.push('VITE_SUPABASE_ANON_KEY appears to be invalid (too short)');
  }
  
  // Warn about optional services
  if (!config.stripe) {
    console.warn('⚠️  Stripe not configured - payment features will be disabled');
  }
  
  if (!config.paypal) {
    console.warn('⚠️  PayPal not configured - PayPal payment option will be disabled');
  }
  
  if (!config.google) {
    console.warn('⚠️  Google OAuth not configured - Google sign-in will be disabled');
  }
  
  if (!config.firebase) {
    console.info('ℹ️  Firebase not configured - using Supabase only');
  }
  
  if (errors.length > 0) {
    throw new Error(
      `❌ Configuration validation failed:\n\n${errors.join('\n')}\n\n` +
      `Please check your .env file and fix the issues above.`
    );
  }
  
  if (config.app.debugMode) {
    console.log('🔧 Debug Mode Enabled - Current Configuration:', {
      supabase: { url: config.supabase.url, keyLength: config.supabase.anonKey.length },
      stripe: config.stripe ? 'Configured' : 'Not configured',
      paypal: config.paypal ? 'Configured' : 'Not configured',
      google: config.google ? 'Configured' : 'Not configured',
      firebase: config.firebase ? 'Configured' : 'Not configured',
      openai: config.openai.enabled ? 'Enabled' : 'Disabled',
      environment: config.app.env,
    });
  }
}

// Run validation immediately
validateConfig();

// ------------------------------------------------------------------------------
// CONVENIENCE EXPORTS
// ------------------------------------------------------------------------------

// Export specific configs for easy importing
export const supabaseConfig = config.supabase;
export const firebaseConfig = config.firebase;
export const googleConfig = config.google;
export const stripeConfig = config.stripe;
export const paypalConfig = config.paypal;
export const openaiConfig = config.openai;
export const appConfig = config.app;
export const adminConfig = config.admin;

// Check if services are enabled
export const isStripeEnabled = !!config.stripe;
export const isPayPalEnabled = !!config.paypal;
export const isGoogleOAuthEnabled = !!config.google && config.app.enableGoogleOAuth;
export const isFirebaseEnabled = !!config.firebase;
export const isOpenAIEnabled = config.openai.enabled;

// Helper to check if user is admin
export function isAdminEmail(email: string | null): boolean {
  if (!email) return false;
  return config.admin.emails.includes(email.toLowerCase());
}

// Get rate limit for tier
export function getRateLimitForTier(tier: string): number {
  switch (tier) {
    case 'free': return config.rateLimits.free;
    case 'solo': return config.rateLimits.solo;
    case 'buddy': return config.rateLimits.buddy;
    case 'team': return config.rateLimits.team;
    case 'enterprise': return config.rateLimits.enterprise;
    default: return config.rateLimits.free;
  }
}

// Export default
export default config;
/**
 * ORA - AI Leadership Agent
 * Copyright (c) 2024-2026 s2cpaul
 * Licensed under MIT License
 * Repository: https://github.com/s2cpaul/ora-agent
 */

import { Crown, Users, Building2, Sparkles, TrendingUp, Calendar, CreditCard } from 'lucide-react';
import { useSubscription } from '../../hooks/useSubscription';
import { useUsageTracking } from '../../hooks/useUsageTracking';

interface SubscriptionStatusProps {
  onUpgradeClick: () => void;
}

export function SubscriptionStatus({ onUpgradeClick }: SubscriptionStatusProps) {
  const { subscription, tier, limits, loading } = useSubscription();
  const { usageStats } = useUsageTracking();

  if (loading) {
    return (
      <div className="animate-pulse bg-gray-100 rounded-xl p-6 h-48"></div>
    );
  }

  const tierIcons = {
    free: Sparkles,
    solo: Crown,
    buddy: Users,
    team: Building2,
  };

  const tierColors = {
    free: 'bg-gray-100 text-gray-700',
    solo: 'bg-blue-100 text-blue-700',
    buddy: 'bg-purple-100 text-purple-700',
    team: 'bg-green-100 text-green-700',
  };

  const TierIcon = tierIcons[tier];
  const tierColor = tierColors[tier];

  return (
    <div className="bg-white rounded-xl border-2 border-gray-200 overflow-hidden">
      {/* Header */}
      <div className={`${tierColor} p-4 flex items-center justify-between`}>
        <div className="flex items-center gap-3">
          <div className="bg-white/20 p-2 rounded-lg">
            <TierIcon className="size-6" />
          </div>
          <div>
            <h3 className="font-bold text-lg capitalize">{tier} Plan</h3>
            <p className="text-xs opacity-80">
              {tier === 'free' ? 'Forever Free' : 'Paid Subscription'}
            </p>
          </div>
        </div>
        {tier !== 'team' && (
          <button
            onClick={onUpgradeClick}
            className="bg-white/90 hover:bg-white text-black px-4 py-2 rounded-lg text-xs font-semibold transition-colors flex items-center gap-2"
          >
            <TrendingUp className="size-4" />
            {tier === 'free' ? 'Upgrade' : 'Change Plan'}
          </button>
        )}
      </div>

      {/* Content */}
      <div className="p-6 space-y-6">
        {/* Usage Stats */}
        <div>
          <h4 className="font-bold text-sm text-black mb-3">Monthly Usage</h4>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Questions Asked</span>
              <span className="font-bold text-black">
                {usageStats.questionsAskedThisMonth}
                {limits.questionsPerMonth !== -1 && ` / ${limits.questionsPerMonth}`}
              </span>
            </div>
            {limits.questionsPerMonth !== -1 && (
              <div className="bg-gray-100 rounded-full h-2 overflow-hidden">
                <div
                  className="bg-blue-600 h-full transition-all"
                  style={{
                    width: `${Math.min(
                      (usageStats.questionsAskedThisMonth / limits.questionsPerMonth) * 100,
                      100
                    )}%`,
                  }}
                />
              </div>
            )}
          </div>
        </div>

        {/* Features */}
        <div>
          <h4 className="font-bold text-sm text-black mb-3">Plan Features</h4>
          <div className="grid grid-cols-2 gap-3">
            <FeatureItem
              label="Questions"
              value={limits.questionsPerMonth === -1 ? 'Unlimited' : `${limits.questionsPerMonth}/mo`}
            />
            <FeatureItem
              label="Seats"
              value={limits.seats === -1 ? 'Unlimited' : limits.seats}
            />
            <FeatureItem
              label="Custom Uploads"
              value={limits.canUploadDocuments ? 'Yes' : 'No'}
            />
            <FeatureItem
              label="Drive Integration"
              value={limits.canIntegrateGoogleDrive ? 'Yes' : 'No'}
            />
            <FeatureItem
              label="Analytics"
              value={limits.hasAnalytics ? 'Yes' : 'No'}
            />
            <FeatureItem
              label="Priority Support"
              value={limits.hasPrioritySupport ? 'Yes' : 'No'}
            />
          </div>
        </div>

        {/* Subscription Details */}
        {subscription && (
          <div className="pt-4 border-t border-gray-200">
            <div className="flex items-center gap-2 text-xs text-gray-600">
              <Calendar className="size-4" />
              <span>
                Member since{' '}
                {new Date(subscription.created_at).toLocaleDateString('en-US', {
                  month: 'long',
                  year: 'numeric',
                })}
              </span>
            </div>
            {subscription.stripe_customer_id && (
              <div className="flex items-center gap-2 text-xs text-gray-600 mt-2">
                <CreditCard className="size-4" />
                <span>Managed via Stripe</span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function FeatureItem({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="bg-gray-50 rounded-lg p-3">
      <p className="text-xs text-gray-600 mb-1">{label}</p>
      <p className="font-bold text-sm text-black">{value}</p>
    </div>
  );
}

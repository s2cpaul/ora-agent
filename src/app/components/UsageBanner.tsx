import { AlertCircle, Zap, TrendingUp } from 'lucide-react';
import { useSubscription } from '../../hooks/useSubscription';
import { useUsageTracking } from '../../hooks/useUsageTracking';

interface UsageBannerProps {
  onUpgradeClick: () => void;
}

export function UsageBanner({ onUpgradeClick }: UsageBannerProps) {
  const { tier, limits } = useSubscription();
  const { usageStats, loading } = useUsageTracking();

  if (loading) return null;
  
  // Don't show banner for unlimited plans
  if (limits.questionsPerMonth === -1) return null;

  const percentUsed = (usageStats.questionsAskedThisMonth / limits.questionsPerMonth) * 100;
  const isNearLimit = percentUsed >= 80;
  const hasReachedLimit = usageStats.hasReachedLimit;

  if (!isNearLimit && !hasReachedLimit) return null;

  return (
    <div
      className={`mx-4 mt-4 rounded-xl border-2 p-4 ${
        hasReachedLimit
          ? 'bg-red-50 border-red-500'
          : 'bg-amber-50 border-amber-500'
      }`}
    >
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0">
          {hasReachedLimit ? (
            <AlertCircle className="size-6 text-red-600" />
          ) : (
            <Zap className="size-6 text-amber-600" />
          )}
        </div>
        <div className="flex-1">
          <h3 className="font-bold text-sm text-black mb-1">
            {hasReachedLimit
              ? '🚫 Monthly Question Limit Reached'
              : '⚠️ Approaching Monthly Limit'}
          </h3>
          <p className="text-xs text-gray-700 mb-3">
            {hasReachedLimit ? (
              <>
                You've used all <strong>{limits.questionsPerMonth} questions</strong> this month.
                Upgrade to continue learning or wait until{' '}
                <strong>{usageStats.resetDate.toLocaleDateString()}</strong> for reset.
              </>
            ) : (
              <>
                You've used <strong>{usageStats.questionsAskedThisMonth}</strong> of{' '}
                <strong>{limits.questionsPerMonth} questions</strong> this month (
                {Math.round(percentUsed)}%). Resets on{' '}
                <strong>{usageStats.resetDate.toLocaleDateString()}</strong>.
              </>
            )}
          </p>
          <button
            onClick={onUpgradeClick}
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-xs font-semibold transition-colors"
          >
            <TrendingUp className="size-4" />
            Upgrade for Unlimited Questions
          </button>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mt-3 bg-white/50 rounded-full h-2 overflow-hidden">
        <div
          className={`h-full transition-all ${
            hasReachedLimit ? 'bg-red-600' : 'bg-amber-600'
          }`}
          style={{ width: `${Math.min(percentUsed, 100)}%` }}
        />
      </div>
    </div>
  );
}

/**
 * ORA - AI Leadership Agent
 * Copyright (c) 2024-2026 s2cpaul
 * Licensed under MIT License
 * Repository: https://github.com/s2cpaul/ora-agent
 */

import { Check, X, Sparkles, Users, Building2, Crown, Brain } from 'lucide-react';
import { useSubscription } from '../../hooks/useSubscription';
import { useState } from 'react';
import { CheckoutForm } from './CheckoutForm';

interface PricingPageProps {
  onClose: () => void;
}

export function PricingPage({ onClose }: PricingPageProps) {
  const { subscription, tier, upgradeTier, loading } = useSubscription();
  const [isUpgrading, setIsUpgrading] = useState(false);
  const [expandedPlan, setExpandedPlan] = useState<string | null>(null);
  const [checkoutPlan, setCheckoutPlan] = useState<{
    name: string;
    price: number;
    description: string;
    tierKey: string;
  } | null>(null);

  const plans = [
    {
      name: 'Free',
      price: 0,
      period: 'forever',
      icon: Sparkles,
      description: 'Perfect for trying ORA',
      features: [
        'Limited AI leadership content',
        '10 questions per month',
        'Basic learning modules',
        'Community Q&A (1 session)',
        'Data used for AI training',
      ],
      limitations: [
        'No custom uploads',
        'No direct support',
        'Limited content access',
      ],
      buttonText: tier === 'free' ? 'Current Plan' : 'Downgrade to Free',
      buttonStyle: tier === 'free' ? 'bg-gray-200 text-gray-700 cursor-not-allowed' : 'bg-gray-200 hover:bg-gray-300 text-gray-700',
      recommended: false,
      current: tier === 'free',
      tierKey: 'free' as const,
    },
    {
      name: 'Solo',
      price: 15,
      period: 'month',
      icon: Crown,
      description: 'For individual leaders',
      features: [
        'Integrated AI leadership video library',
        'Shareable link with unlimited sharing',
        'Custom AI avatar creation (15 seconds Intro)',
        'Unlimited questions',
        'Google Drive / SharePoint integration',
        '1 free live consultation per month',
        'Complete data privacy',
        'Advanced analytics',
        'Option to Upgrade and build your own integrated AI persona!',
      ],
      limitations: [],
      buttonText: tier === 'solo' ? 'Current Plan' : 'Upgrade to Solo',
      buttonStyle: tier === 'solo' ? 'bg-gray-200 text-gray-700 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 text-white',
      recommended: true,
      current: tier === 'solo',
      tierKey: 'solo' as const,
    },
    {
      name: 'AI Avatar',
      price: 24,
      period: 'month',
      icon: Brain,
      description: 'Create your digital persona',
      features: [
        'Everything in Solo',
        'Custom AI avatar creation (15 seconds Intro)',
        'Seamless agent integration',
        'Social media integration',
        'Your Persona Video (60 seconds)',
        'Multi-platform deployment',
      ],
      limitations: [],
      buttonText: tier === 'avatar' ? 'Current Plan' : 'Upgrade to AI Avatar',
      buttonStyle: tier === 'avatar' ? 'bg-gray-200 text-gray-700 cursor-not-allowed' : 'bg-purple-600 hover:bg-purple-700 text-white',
      recommended: false,
      current: tier === 'avatar',
      tierKey: 'avatar' as const,
    },
    {
      name: 'Buddy',
      price: 30,
      period: 'month',
      icon: Users,
      description: '2 collaborating users',
      features: [
        'Everything in Solo',
        '2 user seats included',
        'Shared knowledge base',
        'Collaboration features',
        'Connected Agent Collaboration',
        'Shared document library',
        'Joint analytics dashboard',
      ],
      limitations: [],
      buttonText: tier === 'buddy' ? 'Current Plan' : 'Upgrade to Buddy',
      buttonStyle: tier === 'buddy' ? 'bg-gray-200 text-gray-700 cursor-not-allowed' : 'bg-black hover:bg-gray-800 text-white',
      recommended: false,
      current: tier === 'buddy',
      tierKey: 'buddy' as const,
    },
    {
      name: 'Team',
      price: 90,
      period: 'month',
      icon: Building2,
      description: 'For larger organizations',
      features: [
        'Everything in Buddy',
        '10 User seats',
        'Advanced team features',
        'Custom integrations',
        'Dedicated account manager',
        'Priority phone support',
        'Custom training sessions',
        'SLA guarantees',
        'White-label options',
      ],
      limitations: [],
      buttonText: tier === 'team' ? 'Current Plan' : 'Upgrade to Team',
      buttonStyle: tier === 'team' ? 'bg-gray-200 text-gray-700 cursor-not-allowed' : 'bg-black hover:bg-gray-800 text-white',
      recommended: false,
      current: tier === 'team',
      tierKey: 'team' as const,
    },
  ];

  const handleUpgrade = async (planTierKey: typeof plans[number]['tierKey']) => {
    if (planTierKey === tier) return;
    
    if (planTierKey === 'free') {
      // Downgrade to free - just update the tier
      setIsUpgrading(true);
      try {
        await upgradeTier('free');
        alert('Successfully downgraded to Free tier');
      } catch (error: any) {
        alert(`Downgrade failed: ${error.message}`);
      } finally {
        setIsUpgrading(false);
      }
    } else {
      // For paid tiers, open checkout form
      const plan = plans.find(p => p.tierKey === planTierKey);
      if (plan) {
        setCheckoutPlan({
          name: plan.name,
          price: plan.price,
          description: plan.description,
          tierKey: plan.tierKey,
        });
      }
    }
  };

  const handleCheckoutSuccess = async (tierKey: string) => {
    // Update the tier after successful payment
    try {
      await upgradeTier(tierKey as any);
    } catch (error) {
      console.error('Failed to update tier:', error);
    }
  };

  if (loading) {
    return (
      <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
        <div className="bg-white rounded-2xl p-8">
          <p className="text-gray-700">Loading subscription details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-2 overflow-y-auto">
      {/* Checkout Form Modal */}
      {checkoutPlan && (
        <CheckoutForm
          planName={checkoutPlan.name}
          planPrice={checkoutPlan.price}
          planDescription={checkoutPlan.description}
          onClose={() => setCheckoutPlan(null)}
          onSuccess={handleCheckoutSuccess}
        />
      )}
      
      <div className="bg-white rounded-lg max-w-sm w-full shadow-2xl border border-gray-300 my-2 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-black p-3 rounded-t-lg relative sticky top-0 z-10">
          <button
            onClick={onClose}
            className="absolute top-2 right-2 text-white hover:bg-white/20 p-1 rounded-lg transition-colors"
          >
            <X className="size-4" />
          </button>
          <div className="text-center">
            <h1 className="text-base font-bold text-white mb-1">Upgrade ORA</h1>
            <p className="text-blue-100 text-xs">
              Choose your plan
            </p>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="p-3 space-y-3">
          {plans.map((plan, index) => {
            const Icon = plan.icon;
            return (
              <>
                <div
                  key={plan.name}
                  className={`relative rounded-lg border-2 p-3 ${
                    plan.recommended
                      ? 'border-blue-600 shadow-lg bg-blue-50'
                      : 'border-gray-300 bg-white'
                  }`}
                >
                  {plan.recommended && (
                    <div className="absolute -top-2 left-1/2 -translate-x-1/2 bg-blue-600 text-white px-2 py-0.5 rounded-full text-[9px] font-bold">
                      POPULAR
                    </div>
                  )}

                  {/* Plan Header - Single Line */}
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <Icon className="size-3 text-black" />
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-black">{plan.name}</h3>
                        <p className="text-[9px] text-gray-600">{plan.description}</p>
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <div className="text-lg font-bold text-black">${plan.price}</div>
                      <div className="text-[9px] text-gray-600">/{plan.period}</div>
                    </div>
                  </div>

                  {/* Features - Compact */}
                  <ul className="space-y-1 mb-2">
                    {(expandedPlan === plan.name ? plan.features : plan.features.slice(0, 3)).map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-1.5 text-[10px]">
                        <Check className="size-2.5 text-green-600 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700 leading-tight">{feature}</span>
                      </li>
                    ))}
                    {plan.features.length > 3 && (
                      <li>
                        <button
                          onClick={() => setExpandedPlan(expandedPlan === plan.name ? null : plan.name)}
                          className="text-[9px] text-blue-600 hover:text-blue-800 font-medium italic ml-3.5 underline"
                        >
                          {expandedPlan === plan.name ? 'Show less' : `+${plan.features.length - 3} more features`}
                        </button>
                      </li>
                    )}
                  </ul>

                  {/* CTA Button */}
                  <button
                    onClick={() => handleUpgrade(plan.tierKey)}
                    disabled={plan.current || isUpgrading}
                    className={`w-full py-1.5 px-3 rounded-lg font-semibold transition-all text-[10px] ${plan.buttonStyle}`}
                  >
                    {plan.buttonText}
                  </button>
                </div>

                {/* Premium Add-Ons after Free plan */}
                {plan.name === 'Free' && (
                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-400 rounded-lg p-3">
                    <h3 className="font-bold text-xs mb-2 text-black text-center">Premium Add-Ons</h3>
                    
                    <div className="flex items-start gap-2 mb-2">
                      <div className="flex-shrink-0 w-6 h-6 bg-green-600 rounded-full flex items-center justify-center">
                        <Brain className="size-3 text-white" />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="font-bold text-xs text-black">🎓 Training Content</h4>
                          <div className="text-sm font-bold text-green-700">$29<span className="text-[9px] text-gray-600">/mo</span></div>
                        </div>
                        
                        <p className="text-[9px] text-gray-700 mb-2">
                          6 custom training video slots (~1 min each)
                        </p>
                        
                        <div className="flex gap-1.5">
                          <button
                            onClick={() => {
                              alert('To activate Premium Training Content:\\n\\n1. Get paid subscription\\n2. Type "enable training package" in chat\\n3. Start uploading videos!');
                            }}
                            className="flex-1 px-2 py-1.5 bg-green-600 hover:bg-green-700 text-white rounded text-[9px] font-semibold transition-colors"
                          >
                            Activate
                          </button>
                          <button
                            onClick={() => {
                              window.open('https://calendly.com/caraz007', '_blank');
                            }}
                            className="px-2 py-1.5 bg-white hover:bg-gray-100 text-green-700 border border-green-400 rounded text-[9px] font-semibold transition-colors"
                          >
                            Learn More
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </>
            );
          })}
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 p-3 bg-gray-50 rounded-b-lg">
          <p className="text-[9px] text-gray-600 text-center">
            All plans include 30-day money-back guarantee
          </p>
        </div>
      </div>
    </div>
  );
}
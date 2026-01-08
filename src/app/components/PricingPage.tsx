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
        '25 questions per month',
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
        'Option to Upgrade and build your own integrated AI persona!',
        'Unlimited questions',
        'Google Drive / SharePoint integration',
        'Custom document uploads',
        '1 free live consultation per month',
        'Complete data privacy',
        'Advanced analytics',
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
        'Avatar analytics dashboard',
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
        'Team chat support',
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
        'Unlimited user seats',
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
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-2 sm:p-4 overflow-y-auto">
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
      
      <div className="bg-white rounded-xl sm:rounded-2xl max-w-6xl w-full shadow-2xl border border-gray-300 my-4 sm:my-8">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-black p-3 sm:p-6 rounded-t-xl sm:rounded-t-2xl relative">
          <button
            onClick={onClose}
            className="absolute top-2 right-2 sm:top-4 sm:right-4 text-white hover:bg-white/20 p-1.5 sm:p-2 rounded-lg transition-colors"
          >
            <X className="size-4 sm:size-6" />
          </button>
          <div className="text-center">
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-1 sm:mb-2">Upgrade Your ORA Experience</h1>
            <p className="text-blue-100 text-sm sm:text-base lg:text-lg">
              Choose the perfect plan for your leadership journey
            </p>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="p-3 sm:p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-6">
            {plans.map((plan) => {
              const Icon = plan.icon;
              return (
                <div
                  key={plan.name}
                  className={`relative rounded-lg sm:rounded-xl border-2 p-3 sm:p-6 flex flex-col ${
                    plan.recommended
                      ? 'border-blue-600 shadow-lg bg-blue-50'
                      : 'border-gray-300 bg-white'
                  }`}
                >
                  {plan.recommended && (
                    <div className="absolute -top-2 sm:-top-3 left-1/2 -translate-x-1/2 bg-blue-600 text-white px-1.5 sm:px-3 py-0.5 sm:py-1 rounded-full text-[8px] sm:text-[10px] font-bold whitespace-nowrap">
                      POPULAR
                    </div>
                  )}

                  {/* Plan Header */}
                  <div className="text-center mb-3 sm:mb-4">
                    <div className="inline-flex items-center justify-center w-8 h-8 sm:w-12 sm:h-12 bg-gray-100 rounded-full mb-2 sm:mb-3">
                      <Icon className="size-4 sm:size-6 text-black" />
                    </div>
                    <h3 className="text-base sm:text-xl font-bold text-black mb-1">{plan.name}</h3>
                    <p className="text-[10px] sm:text-xs text-gray-600 mb-2 sm:mb-3">{plan.description}</p>
                    <div className="flex items-baseline justify-center gap-1">
                      <span className="text-2xl sm:text-4xl font-bold text-black">${plan.price}</span>
                      <span className="text-xs sm:text-base text-gray-600">/{plan.period}</span>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="flex-1 mb-3 sm:mb-4">
                    <ul className="space-y-1 sm:space-y-2">
                      {plan.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-1.5 sm:gap-2 text-[11px] sm:text-sm">
                          <Check className="size-3 sm:size-4 text-green-600 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      ))}
                      {plan.limitations.map((limitation, idx) => (
                        <li key={idx} className="flex items-start gap-1.5 sm:gap-2 text-[11px] sm:text-sm">
                          <X className="size-3 sm:size-4 text-red-500 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-500 line-through">{limitation}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* CTA Button */}
                  <button
                    onClick={() => handleUpgrade(plan.tierKey)}
                    disabled={plan.current || isUpgrading}
                    className={`w-full py-2 sm:py-3 px-3 sm:px-4 rounded-lg font-semibold transition-all text-xs sm:text-sm ${plan.buttonStyle}`}
                  >
                    {plan.buttonText}
                  </button>
                </div>
              );
            })}
          </div>

          {/* Premium Add-Ons */}
          <div className="mt-6 sm:mt-10 border-t border-gray-300 pt-6 sm:pt-8">
            <h3 className="font-bold text-lg sm:text-xl mb-2 text-black text-center">Premium Add-On Packages</h3>
            <p className="text-xs sm:text-sm text-gray-600 text-center mb-4 sm:mb-6">
              Enhance your subscription with specialized content packages
            </p>
            
            <div className="bg-gradient-to-br from-yellow-50 to-orange-50 border-2 border-orange-300 rounded-xl p-4 sm:p-6 max-w-3xl mx-auto">
              <div className="flex items-start gap-3 sm:gap-4">
                <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-orange-500 rounded-full flex items-center justify-center">
                  <Brain className="size-5 sm:size-6 text-white" />
                </div>
                
                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3">
                    <div>
                      <h4 className="font-bold text-base sm:text-lg text-black">🎓 Premium Training Content</h4>
                      <p className="text-xs sm:text-sm text-gray-700">Add-on for paid subscribers</p>
                    </div>
                    <div className="text-left sm:text-right">
                      <div className="text-2xl sm:text-3xl font-bold text-orange-600">$29<span className="text-sm sm:text-base text-gray-600">/month</span></div>
                    </div>
                  </div>
                  
                  <p className="text-xs sm:text-sm text-gray-700 mb-3">
                    Perfect for annual compliance training, summer safety programs, and seasonal onboarding materials.
                  </p>
                  
                  <div className="bg-white/80 rounded-lg p-3 mb-3">
                    <h5 className="font-semibold text-xs sm:text-sm mb-2 text-black">What's Included:</h5>
                    <ul className="space-y-1.5">
                      <li className="flex items-start gap-2 text-xs sm:text-sm">
                        <Check className="size-4 text-green-600 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700"><strong>Unlock 6 custom training video slots</strong> (~1 minute each)</span>
                      </li>
                      <li className="flex items-start gap-2 text-xs sm:text-sm">
                        <Check className="size-4 text-green-600 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">Upload from device or link from Google drive/Supabase/SharePoint</span>
                      </li>
                      <li className="flex items-start gap-2 text-xs sm:text-sm">
                        <Check className="size-4 text-green-600 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">Your training videos play <strong>first</strong> when users tap "Training" button</span>
                      </li>
                      <li className="flex items-start gap-2 text-xs sm:text-sm">
                        <Check className="size-4 text-green-600 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">Ideal for safety protocols, compliance updates, seasonal prep</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-2">
                    <button
                      onClick={() => {
                        alert('To activate Premium Training Content:\n\n1. Make sure you have a paid subscription (Solo or higher)\n2. Type "enable training package" in the AI chat\n3. Start uploading your training videos!\n\nCommands:\n• "set training video 1 to [URL]" for web videos\n• "upload training video 1" for local files');
                      }}
                      className="flex-1 px-4 py-2.5 bg-orange-600 hover:bg-orange-700 text-white rounded-lg font-semibold text-xs sm:text-sm transition-colors"
                    >
                      Learn More & Activate
                    </button>
                    <button
                      onClick={() => {
                        window.open('https://calendly.com/caraz007', '_blank');
                      }}
                      className="px-4 py-2.5 bg-white hover:bg-gray-100 text-orange-600 border border-orange-300 rounded-lg font-semibold text-xs sm:text-sm transition-colors"
                    >
                      Request free consultation
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Info */}
          <div className="mt-4 sm:mt-8 space-y-3 sm:space-y-4">
            <div className="bg-gray-50 border border-gray-300 rounded-lg p-3 sm:p-4">
              <h4 className="font-bold text-xs sm:text-sm mb-1 sm:mb-2 text-black">💳 Payment & Security</h4>
              <p className="text-[10px] sm:text-xs text-gray-700">
                All payments are securely processed through Stripe with 256-bit SSL encryption. 
                Cancel anytime, no questions asked. Your data privacy is our top priority.
              </p>
            </div>

            <div className="bg-blue-50 border border-blue-300 rounded-lg p-3 sm:p-4">
              <h4 className="font-bold text-xs sm:text-sm mb-1 sm:mb-2 text-black">🔒 Privacy Guarantee</h4>
              <p className="text-[10px] sm:text-xs text-gray-700">
                <strong>Paid subscribers' data is NEVER used for AI training.</strong> Free tier users 
                contribute anonymized questions to improve ORA, but you can opt-out anytime in Settings.
              </p>
            </div>

            <div className="bg-green-50 border border-green-300 rounded-lg p-3 sm:p-4">
              <h4 className="font-bold text-xs sm:text-sm mb-1 sm:mb-2 text-black">📞 Need Help Choosing?</h4>
              <p className="text-[10px] sm:text-xs text-gray-700 mb-2">
                Not sure which plan is right for you? Schedule a free consultation with our team.
              </p>
              <a
                href="https://calendly.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-3 sm:px-4 py-1.5 sm:py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-[10px] sm:text-xs font-semibold transition-colors"
              >
                Schedule Free Consultation →
              </a>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mt-4 sm:mt-8 border-t border-gray-300 pt-4 sm:pt-6">
            <h3 className="font-bold text-base sm:text-lg mb-3 sm:mb-4 text-black text-center">Frequently Asked Questions</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
              <div>
                <h4 className="font-semibold text-xs sm:text-sm mb-1 text-black">Can I change plans later?</h4>
                <p className="text-[10px] sm:text-xs text-gray-700">
                  Yes! Upgrade or downgrade anytime. Changes take effect immediately and we'll prorate the difference.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-xs sm:text-sm mb-1 text-black">What payment methods do you accept?</h4>
                <p className="text-[10px] sm:text-xs text-gray-700">
                  We accept all major credit cards through Stripe. Enterprise customers can request invoicing.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-xs sm:text-sm mb-1 text-black">Is there a commitment period?</h4>
                <p className="text-[10px] sm:text-xs text-gray-700">
                  No long-term contracts. All plans are month-to-month and you can cancel anytime.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-xs sm:text-sm mb-1 text-black">Do you offer refunds?</h4>
                <p className="text-[10px] sm:text-xs text-gray-700">
                  We offer a 14-day money-back guarantee on all paid plans, no questions asked.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
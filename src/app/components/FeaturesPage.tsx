/**
 * ORA - AI Leadership Agent
 * Copyright (c) 2024-2026 s2cpaul
 * Licensed under MIT License
 * Repository: https://github.com/s2cpaul/ora-agent
 */

import { X, Brain, Sparkles, MessageSquare, TrendingUp, Shield, Zap, ArrowRight, Check } from 'lucide-react';

interface FeaturesPageProps {
  isOpen: boolean;
  onClose: () => void;
  onTryAgent?: () => void;
  onUpgradeClick?: () => void;
}

export function FeaturesPage({ isOpen, onClose, onTryAgent, onUpgradeClick }: FeaturesPageProps) {
  if (!isOpen) return null;

  const specialists = [
    {
      avatar: '⚖️',
      name: 'Legal Advisor',
      specialty: 'Corporate Law & Compliance',
      description: 'Expert guidance on legal matters, regulatory compliance, contract review, and risk assessment.',
      capabilities: ['Contract Review', 'Compliance Checking', 'Legal Research', 'Risk Assessment'],
      color: 'from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20',
      borderColor: 'border-purple-200 dark:border-purple-700'
    },
    {
      avatar: '👥',
      name: 'Workforce & Training Expert',
      specialty: 'Human Resources & Talent',
      description: 'Strategic advice on hiring, performance management, culture building, and talent development.',
      capabilities: ['Hiring Strategies', 'Performance Management', 'Culture Building', 'Conflict Resolution'],
      color: 'from-pink-50 to-purple-50 dark:from-pink-900/20 dark:to-purple-900/20',
      borderColor: 'border-pink-200 dark:border-pink-700'
    },
    {
      avatar: '💰',
      name: 'Financial Expert',
      specialty: 'Finance & Strategy',
      description: 'Data-driven insights on budgeting, financial forecasting, ROI analysis, and cost optimization.',
      capabilities: ['Budget Analysis', 'Financial Forecasting', 'ROI Calculation', 'Cost Optimization'],
      color: 'from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20',
      borderColor: 'border-green-200 dark:border-green-700'
    },
    {
      avatar: '🔧',
      name: 'Tech Architect',
      specialty: 'Technology & Engineering',
      description: 'Technical expertise on architecture design, technology selection, scalability, and security.',
      capabilities: ['Architecture Design', 'Tech Stack Selection', 'Scalability Planning', 'Security Review'],
      color: 'from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20',
      borderColor: 'border-blue-200 dark:border-blue-700'
    },
    {
      avatar: '📊',
      name: 'Data Scientist',
      specialty: 'Analytics & Insights',
      description: 'Advanced analytics, machine learning strategy, metrics design, and predictive modeling.',
      capabilities: ['Data Analysis', 'ML Strategy', 'Metrics Design', 'Predictive Modeling'],
      color: 'from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20',
      borderColor: 'border-indigo-200 dark:border-indigo-700'
    },
    {
      avatar: '📈',
      name: 'Communications & Marketing',
      specialty: 'Marketing & Growth',
      description: 'Strategic marketing guidance on brand strategy, growth tactics, customer acquisition, and market research.',
      capabilities: ['Brand Strategy', 'Growth Hacking', 'Customer Acquisition', 'Market Research'],
      color: 'from-orange-50 to-pink-50 dark:from-orange-900/20 dark:to-pink-900/20',
      borderColor: 'border-orange-200 dark:border-orange-700'
    },
    {
      avatar: '⚙️',
      name: 'Process Engineer',
      specialty: 'Operations & Efficiency',
      description: 'Expert guidance on process optimization, workflow design, operational efficiency, and continuous improvement.',
      capabilities: ['Process Optimization', 'Workflow Design', 'Efficiency Analysis', 'Lean Methodology'],
      color: 'from-slate-50 to-gray-50 dark:from-slate-900/20 dark:to-gray-900/20',
      borderColor: 'border-slate-200 dark:border-slate-700'
    },
    {
      avatar: '🧘',
      name: 'Health & Wellness Expert',
      specialty: 'Holistic Well-Being',
      description: 'Guidance on mental health, relationships, fitness, and general wellness. Not a substitute for medical diagnosis.',
      capabilities: ['Mental Health Support', 'Relationship Guidance', 'Fitness Planning', 'Wellness Strategies'],
      color: 'from-teal-50 to-green-50 dark:from-teal-900/20 dark:to-green-900/20',
      borderColor: 'border-teal-200 dark:border-teal-700'
    }
  ];

  const triggerExamples = [
    {
      keyword: 'compliance',
      question: 'What compliance requirements should I consider for AI?',
      agent: '⚖️ Legal Advisor',
      color: 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300'
    },
    {
      keyword: 'budget',
      question: 'What\'s the budget impact of this initiative?',
      agent: '💰 Financial Expert',
      color: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300'
    },
    {
      keyword: 'hiring',
      question: 'How should I structure my hiring process?',
      agent: '👥 Workforce & Training Expert',
      color: 'bg-pink-100 dark:bg-pink-900/30 text-pink-700 dark:text-pink-300'
    },
    {
      keyword: 'workflow',
      question: 'How can I optimize our team\'s workflow?',
      agent: '⚙️ Process Engineer',
      color: 'bg-slate-100 dark:bg-slate-900/30 text-slate-700 dark:text-slate-300'
    },
    {
      keyword: 'wellness',
      question: 'How can I improve work-life balance and reduce stress?',
      agent: '🧘 Health & Wellness Expert',
      color: 'bg-teal-100 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300'
    }
  ];

  const pricingTiers = [
    {
      name: 'Free',
      price: '$0',
      connections: '0',
      description: 'View only',
      features: ['Browse agent marketplace', 'See agent descriptions', 'Learn about multi-agent'],
      highlight: false,
      cta: 'Current Plan'
    },
    {
      name: 'Pro',
      price: '$33',
      period: '/month',
      connections: '3',
      description: 'For individuals',
      features: ['3 agent connections', 'Multi-agent collaboration', 'Custom agent integration', 'Priority responses'],
      highlight: true,
      cta: 'Upgrade to Pro'
    },
    {
      name: 'Team',
      price: '$99',
      period: '/month',
      connections: '10',
      description: 'For small teams',
      features: ['10 agent connections', 'Team collaboration', 'Advanced analytics', 'Shared workspaces'],
      highlight: false,
      cta: 'Upgrade to Team'
    },
    {
      name: 'Enterprise',
      price: '$299',
      period: '/month',
      connections: '∞',
      description: 'For organizations',
      features: ['Unlimited connections', 'Full orchestration', 'Priority support', 'Custom workflows'],
      highlight: false,
      cta: 'Upgrade to Enterprise'
    }
  ];

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-background rounded-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-border relative my-4">
        {/* Close button */}
        <button
          onClick={onClose}
          className="sticky top-4 right-4 float-right p-2 hover:bg-accent rounded-lg transition-colors z-10 bg-background/80 backdrop-blur"
          aria-label="Close"
        >
          <X className="size-5 text-foreground" />
        </button>

        {/* Hero Section */}
        <div className="bg-gradient-to-b from-purple-600 via-purple-900 to-black text-white p-8 rounded-t-2xl">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-white/20 backdrop-blur p-3 rounded-xl">
              <Brain className="size-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">Multi-Agent Collaboration</h1>
              <p className="text-purple-100 text-sm">Powered by specialized AI experts</p>
            </div>
          </div>
          <p className="text-lg text-white/90 max-w-2xl">
            ORA doesn't just answer your questions—it orchestrates a team of specialized AI agents to provide 
            multi-perspective, expert-level guidance across domains.
          </p>
        </div>

        {/* Content */}
        <div className="p-6 space-y-8">
          {/* Overview Section */}
          <section>
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="size-5 text-purple-600 dark:text-purple-400" />
              <h2 className="text-2xl font-bold text-foreground">How It Works</h2>
            </div>
            
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 border-2 border-purple-200 dark:border-purple-700 rounded-xl p-4">
                <div className="bg-purple-600 text-white size-10 rounded-lg flex items-center justify-center font-bold mb-3">
                  1
                </div>
                <h3 className="font-bold text-foreground mb-2">Ask Your Question</h3>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  Type questions using keywords like "compliance," "budget," or "hiring"
                </p>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 border-2 border-blue-200 dark:border-blue-700 rounded-xl p-4">
                <div className="bg-blue-600 text-white size-10 rounded-lg flex items-center justify-center font-bold mb-3">
                  2
                </div>
                <h3 className="font-bold text-foreground mb-2">Agents Collaborate</h3>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  Specialist agents analyze your question from their domain expertise
                </p>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 border-2 border-green-200 dark:border-green-700 rounded-xl p-4">
                <div className="bg-green-600 text-white size-10 rounded-lg flex items-center justify-center font-bold mb-3">
                  3
                </div>
                <h3 className="font-bold text-foreground mb-2">Get Synthesis</h3>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  ORA combines insights into comprehensive, actionable guidance
                </p>
              </div>
            </div>
          </section>

          {/* Specialist Agents Section */}
          <section>
            <div className="flex items-center gap-2 mb-4">
              <Brain className="size-5 text-purple-600 dark:text-purple-400" />
              <h2 className="text-2xl font-bold text-foreground">Meet the Specialist Agents</h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4">
              {specialists.map((agent, index) => (
                <div
                  key={index}
                  className={`bg-gradient-to-br ${agent.color} border-2 ${agent.borderColor} rounded-xl p-4 hover:shadow-lg transition-shadow`}
                >
                  <div className="flex items-start gap-3 mb-3">
                    <div className="text-4xl">{agent.avatar}</div>
                    <div className="flex-1">
                      <h3 className="font-bold text-foreground text-lg">{agent.name}</h3>
                      <p className="text-xs text-gray-600 dark:text-gray-400 font-medium">{agent.specialty}</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">{agent.description}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {agent.capabilities.map((cap, i) => (
                      <span
                        key={i}
                        className="px-2 py-1 bg-white/60 dark:bg-gray-800/60 border border-gray-300 dark:border-gray-600 rounded-full text-xs text-gray-700 dark:text-gray-300"
                      >
                        {cap}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Trigger Keywords Section */}
          <section>
            <div className="flex items-center gap-2 mb-4">
              <MessageSquare className="size-5 text-purple-600 dark:text-purple-400" />
              <h2 className="text-2xl font-bold text-foreground">How to Trigger Multi-Agent Collaboration</h2>
            </div>
            
            <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">
              Simply include these keywords in your questions to activate specialist agents:
            </p>

            <div className="space-y-3">
              {triggerExamples.map((example, index) => (
                <div
                  key={index}
                  className="bg-card border-2 border-border rounded-xl p-4 hover:border-purple-300 dark:hover:border-purple-600 transition-colors"
                >
                  <div className="flex items-start gap-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-bold ${example.color}`}>
                          {example.keyword}
                        </span>
                        <ArrowRight className="size-4 text-gray-400" />
                        <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                          Activates {example.agent}
                        </span>
                      </div>
                      <p className="text-sm text-gray-700 dark:text-gray-300 italic">
                        "{example.question}"
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-200 dark:border-blue-700 rounded-xl p-4">
              <h4 className="font-bold text-sm text-foreground mb-2">💡 Pro Tip: Multi-Domain Questions</h4>
              <p className="text-xs text-gray-700 dark:text-gray-300">
                Ask questions that span multiple domains to activate multiple agents at once! For example: 
                <span className="italic font-medium"> "What are the legal and budget implications of our new AI initiative?"</span> will 
                activate both the Legal Advisor and Financial Expert.
              </p>
            </div>
          </section>

          {/* Visual Example Section */}
          <section>
            <div className="flex items-center gap-2 mb-4">
              <Zap className="size-5 text-purple-600 dark:text-purple-400" />
              <h2 className="text-2xl font-bold text-foreground">See It in Action</h2>
            </div>
            
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900/50 dark:to-gray-800/50 border-2 border-gray-300 dark:border-gray-700 rounded-xl p-6">
              {/* User Question */}
              <div className="flex justify-end mb-4">
                <div className="bg-purple-600 text-white rounded-2xl px-4 py-2 max-w-[80%]">
                  <p className="text-sm">What compliance requirements should I consider for AI?</p>
                </div>
              </div>

              {/* Collaboration Indicator */}
              <div className="bg-gradient-to-br from-purple-100 to-blue-100 dark:from-purple-900/40 dark:to-blue-900/40 border-2 border-purple-300 dark:border-purple-600 rounded-xl p-3 mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className="size-2 bg-purple-600 rounded-full animate-pulse"></div>
                  <p className="text-xs font-bold text-foreground">Multi-Agent Collaboration Active...</p>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-700 dark:text-gray-300">
                  <span>⚖️ Legal Advisor</span>
                  <span>•</span>
                  <span>Analyzing your question...</span>
                </div>
              </div>

              {/* ORA Response */}
              <div className="flex justify-start">
                <div className="bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600 rounded-2xl px-4 py-3 max-w-[85%]">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-bold text-sm text-foreground">🤖 ORA</span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">with ⚖️ Legal Advisor</span>
                  </div>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                    I've consulted with our Legal Advisor to provide comprehensive guidance on AI compliance...
                  </p>
                  <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-700 rounded-lg p-2 text-xs text-gray-700 dark:text-gray-300">
                    <span className="font-bold">⚖️ Legal Advisor:</span> Based on corporate law best practices, 
                    consider GDPR compliance, data protection regulations, and industry-specific requirements...
                  </div>
                </div>
              </div>

              {/* Attribution Footer */}
              <div className="mt-3 text-center">
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Multi-Agent Response: Created by ORA in collaboration with Legal Advisor
                </p>
              </div>
            </div>
          </section>

          {/* Pricing Comparison Section */}
          <section>
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="size-5 text-purple-600 dark:text-purple-400" />
              <h2 className="text-2xl font-bold text-foreground">Choose Your Plan</h2>
            </div>
            
            <div className="grid md:grid-cols-4 gap-4">
              {pricingTiers.map((tier, index) => (
                <div
                  key={index}
                  className={`rounded-xl p-4 border-2 ${
                    tier.highlight
                      ? 'bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-900/30 dark:to-blue-900/30 border-purple-400 dark:border-purple-500 shadow-lg'
                      : 'bg-card border-border'
                  }`}
                >
                  {tier.highlight && (
                    <div className="bg-purple-600 text-white text-xs font-bold px-2 py-1 rounded-full inline-block mb-2">
                      MOST POPULAR
                    </div>
                  )}
                  <h3 className="font-bold text-lg text-foreground">{tier.name}</h3>
                  <div className="flex items-baseline gap-1 mb-1">
                    <span className="text-3xl font-bold text-foreground">{tier.price}</span>
                    {tier.period && <span className="text-sm text-gray-600 dark:text-gray-400">{tier.period}</span>}
                  </div>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mb-3">{tier.description}</p>
                  
                  <div className="mb-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Brain className="size-4 text-purple-600 dark:text-purple-400" />
                      <span className="text-sm font-bold text-foreground">
                        {tier.connections === '0' ? 'No' : tier.connections} Agent{tier.connections === '1' ? '' : 's'}
                      </span>
                    </div>
                    <ul className="space-y-1.5">
                      {tier.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs text-gray-700 dark:text-gray-300">
                          <Check className="size-3.5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <button
                    onClick={() => {
                      if (tier.highlight && onUpgradeClick) {
                        onUpgradeClick();
                      }
                    }}
                    disabled={tier.connections === '0'}
                    className={`w-full py-2 px-4 rounded-lg font-semibold text-sm transition-colors ${
                      tier.highlight
                        ? 'bg-purple-600 hover:bg-purple-700 text-white'
                        : tier.connections === '0'
                        ? 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                        : 'bg-card hover:bg-accent text-foreground border border-border'
                    }`}
                  >
                    {tier.cta}
                  </button>
                </div>
              ))}
            </div>
          </section>

          {/* Benefits Section */}
          <section>
            <div className="flex items-center gap-2 mb-4">
              <Shield className="size-5 text-purple-600 dark:text-purple-400" />
              <h2 className="text-2xl font-bold text-foreground">Why Multi-Agent Collaboration?</h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-card border-2 border-border rounded-xl p-4">
                <h3 className="font-bold text-foreground mb-2 flex items-center gap-2">
                  <span className="text-2xl">🎯</span>
                  Specialized Expertise
                </h3>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  Instead of one AI trying to know everything, get insights from domain-specific experts trained 
                  in their specialty.
                </p>
              </div>

              <div className="bg-card border-2 border-border rounded-xl p-4">
                <h3 className="font-bold text-foreground mb-2 flex items-center gap-2">
                  <span className="text-2xl">🔍</span>
                  Multi-Perspective Analysis
                </h3>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  Complex problems require multiple viewpoints. See how different experts approach your challenge 
                  from their unique angles.
                </p>
              </div>

              <div className="bg-card border-2 border-border rounded-xl p-4">
                <h3 className="font-bold text-foreground mb-2 flex items-center gap-2">
                  <span className="text-2xl">⚡</span>
                  Faster Decision-Making
                </h3>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  Get coordinated input from multiple experts in seconds instead of scheduling meetings with 
                  multiple consultants.
                </p>
              </div>

              <div className="bg-card border-2 border-border rounded-xl p-4">
                <h3 className="font-bold text-foreground mb-2 flex items-center gap-2">
                  <span className="text-2xl">🔒</span>
                  Transparent Collaboration
                </h3>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  See exactly which agents contributed to your answer and understand the reasoning behind each 
                  recommendation.
                </p>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="bg-black text-white rounded-xl p-6 text-center">
            <h2 className="text-2xl font-bold mb-2">Ready to Experience Multi-Agent Collaboration?</h2>
            <p className="text-purple-100 mb-4 max-w-2xl mx-auto">
              Start asking questions and watch specialist agents collaborate to provide you with expert guidance.
            </p>
            <div className="flex gap-3 justify-center flex-wrap">
              <button
                onClick={() => {
                  if (onTryAgent) {
                    onTryAgent();
                    onClose();
                  }
                }}
                className="bg-white text-purple-600 hover:bg-purple-50 font-bold py-3 px-6 rounded-lg transition-colors flex items-center gap-2"
              >
                <Brain className="size-5" />
                Try AI Agent Now
              </button>
              <button
                onClick={() => {
                  if (onUpgradeClick) {
                    onUpgradeClick();
                  }
                }}
                className="bg-purple-800 hover:bg-purple-900 text-white font-bold py-3 px-6 rounded-lg transition-colors flex items-center gap-2 border-2 border-white/20"
              >
                <Sparkles className="size-5" />
                View Pricing Plans
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
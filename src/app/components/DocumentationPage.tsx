/**
 * ORA - AI Leadership Agent
 * Copyright (c) 2024-2026 s2cpaul
 * Licensed under MIT License
 * Repository: https://github.com/s2cpaul/ora-agent
 */

import { 
  BookOpen, 
  Rocket, 
  Database, 
  Lock, 
  Code, 
  Zap,
  CheckCircle2,
  ArrowRight,
  FileText,
  Users,
  DollarSign,
  Shield
} from 'lucide-react';

export function DocumentationPage() {
  const sections = [
    {
      title: 'Getting Started',
      icon: Rocket,
      color: 'green',
      items: [
        {
          title: 'Quick Setup (5 Minutes)',
          description: 'Install, configure, and deploy ORA in under 5 minutes',
          link: '/downloads',
          time: '5 min read',
        },
        {
          title: 'Project Overview',
          description: 'Complete guide to all UI pages, components, and features',
          link: '/downloads',
          time: '15 min read',
        },
        {
          title: 'Credentials Setup',
          description: 'Secure credential management for Supabase, Stripe, and OpenAI',
          link: '/downloads',
          time: '10 min read',
        },
      ],
    },
    {
      title: 'Architecture',
      icon: Code,
      color: 'blue',
      items: [
        {
          title: 'Component Structure',
          description: '50+ pre-built components: AI Agent, Pricing, Multi-Agent, Analytics',
          link: '#components',
        },
        {
          title: 'Routing & Navigation',
          description: 'React Router setup with Home, Chat, Features, Downloads, Docs',
          link: '#routing',
        },
        {
          title: 'State Management',
          description: 'Context API, localStorage, and Supabase realtime',
          link: '#state',
        },
      ],
    },
    {
      title: 'Database & Analytics',
      icon: Database,
      color: 'orange',
      items: [
        {
          title: 'Supabase Setup',
          description: 'PostgreSQL database with Row Level Security (RLS)',
          link: '/downloads',
        },
        {
          title: 'Analytics Tracking',
          description: 'Track every user interaction for ML/AI context building',
          link: '/downloads',
          time: '12 min read',
        },
        {
          title: 'Event Types',
          description: 'Questions, responses, feedback, videos, navigation, payments',
          link: '#analytics',
        },
      ],
    },
    {
      title: 'Security',
      icon: Lock,
      color: 'red',
      items: [
        {
          title: 'Credential Management',
          description: 'Environment variables, config.ts, and Edge Functions',
          link: '/downloads',
          featured: true,
        },
        {
          title: 'Authentication',
          description: 'Supabase Auth with email/password and Google OAuth',
          link: '#auth',
        },
        {
          title: 'Row Level Security',
          description: 'Protect user data with Supabase RLS policies',
          link: '#rls',
        },
      ],
    },
  ];

  const features = [
    {
      icon: Zap,
      title: 'Freemium Flow',
      description: 'No login required for free tier. 5 subscription tiers from $0 to $1500/month.',
    },
    {
      icon: Users,
      title: 'Multi-Agent System',
      description: 'Connect to Google Drive, SharePoint, Notion, Slack, and custom agents.',
    },
    {
      icon: DollarSign,
      title: 'Payment Integration',
      description: 'Stripe and PayPal ready with comprehensive checkout forms.',
    },
    {
      icon: Shield,
      title: 'Analytics Dashboard',
      description: 'Track user behavior, engagement, and conversion for ML models.',
    },
  ];

  const quickLinks = [
    {
      title: 'All Components',
      items: [
        'AIAgentSidePanel - Main chat interface',
        'PricingPage - 5-tier pricing modal',
        'CheckoutForm - Payment processing',
        'AgentConnectionsManager - Multi-agent',
        'AnalyticsDashboard - Admin analytics',
        'And 45+ more components...',
      ],
    },
    {
      title: 'Pricing Tiers',
      items: [
        'Free: $0 - 10 questions/month',
        'Solo: $24 - 50 questions/month',
        'Buddy: $60 - 100 questions/month',
        'Team: $250 - 200 questions/month',
        'Enterprise: $1500 - 1000 questions/month',
      ],
    },
    {
      title: 'Tech Stack',
      items: [
        'React 18 + TypeScript',
        'Vite (build tool)',
        'Tailwind CSS v4',
        'Supabase (PostgreSQL)',
        'Stripe + PayPal',
        'OpenAI GPT-4',
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 border-b">
        <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center justify-center size-16 bg-blue-600 rounded-2xl mb-6">
              <BookOpen className="size-8 text-white" />
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">
              Documentation
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Everything you need to understand, customize, deploy and track ORA. From quick setup to advanced integrations.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <a
                href="/downloads"
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium"
              >
                <Rocket className="size-5" />
                Quick Start Guide
              </a>
              <button
                onClick={() => document.getElementById('getting-started')?.scrollIntoView({ behavior: 'smooth' })}
                className="inline-flex items-center gap-2 px-6 py-3 border border-border rounded-lg hover:bg-muted transition-colors font-medium"
              >
                <BookOpen className="size-5" />
                Browse Docs
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Overview */}
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">What's Included</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            ORA comes with everything you need for a production-ready AI agent platform
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div key={idx} className="bg-card border rounded-xl p-6 hover:shadow-lg transition-shadow">
                <Icon className="size-8 text-primary mb-4" />
                <h3 className="font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            );
          })}
        </div>

        {/* Documentation Sections */}
        <div id="getting-started" className="space-y-12">
          {sections.map((section, idx) => {
            const Icon = section.icon;
            return (
              <div key={idx}>
                <div className="flex items-center gap-3 mb-6">
                  <Icon className={`size-7 text-${section.color}-600 dark:text-${section.color}-400`} />
                  <h2 className="text-2xl font-bold">{section.title}</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {section.items.map((item, itemIdx) => (
                    <a
                      key={itemIdx}
                      href={item.link}
                      className={`
                        block p-6 border rounded-xl hover:shadow-lg transition-all group
                        ${item.featured ? 'bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-950/20 dark:to-orange-950/20 border-red-200 dark:border-red-900/30' : 'bg-card'}
                      `}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="font-semibold group-hover:text-primary transition-colors">
                          {item.title}
                        </h3>
                        <ArrowRight className="size-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all flex-shrink-0 ml-2" />
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">{item.description}</p>
                      {item.time && (
                        <div className="text-xs text-muted-foreground flex items-center gap-1">
                          <FileText className="size-3" />
                          {item.time}
                        </div>
                      )}
                      {item.featured && (
                        <div className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-red-600 dark:text-red-400">
                          <CheckCircle2 className="size-3" />
                          Security Critical
                        </div>
                      )}
                    </a>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Quick Reference */}
        <div className="mt-16 pt-16 border-t">
          <h2 className="text-2xl font-bold mb-8 text-center">Quick Reference</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {quickLinks.map((section, idx) => (
              <div key={idx} className="bg-card border rounded-xl p-6">
                <h3 className="font-semibold mb-4">{section.title}</h3>
                <ul className="space-y-2">
                  {section.items.map((item, itemIdx) => (
                    <li key={itemIdx} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <CheckCircle2 className="size-4 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16 bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-950/20 dark:to-blue-950/20 border rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Download the setup guide and deploy your ORA instance in under 5 minutes. All documentation, SQL schemas, and configuration files included.
          </p>
          <a
            href="/downloads"
            className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium text-lg"
          >
            <Rocket className="size-5" />
            Download All Files
          </a>
        </div>
      </div>
    </div>
  );
}
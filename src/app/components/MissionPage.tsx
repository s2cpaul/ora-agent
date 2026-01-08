/**
 * ORA - AI Leadership Agent
 * Copyright (c) 2024-2026 s2cpaul
 * Licensed under MIT License
 * Repository: https://github.com/s2cpaul/ora-agent
 */

import { 
  Shield, 
  Zap, 
  Users, 
  Network, 
  Target, 
  Rocket,
  Globe,
  Lock,
  TrendingUp,
  Link as LinkIcon,
  CheckCircle2,
  Smartphone,
  Radio,
  Activity,
  Layers,
  ArrowRight,
  ExternalLink
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

export function MissionPage() {
  const capabilities = [
    {
      icon: Smartphone,
      title: 'Mobile-First Design',
      description: 'Built for operators on the move. Access mission-critical AI capabilities from any device, anywhere.',
      color: 'text-blue-600 dark:text-blue-400',
      bgColor: 'bg-blue-100 dark:bg-blue-900/30'
    },
    {
      icon: Network,
      title: 'Interoperable Architecture',
      description: 'Plugs directly into your operational ecosystem. No isolated systems — just seamless integration.',
      color: 'text-green-600 dark:text-green-400',
      bgColor: 'bg-green-100 dark:bg-green-900/30'
    },
    {
      icon: Zap,
      title: 'Mission Speed',
      description: 'Eliminate slow decision cycles. Coordinate and adapt in real-time at operational tempo.',
      color: 'text-yellow-600 dark:text-yellow-400',
      bgColor: 'bg-yellow-100 dark:bg-yellow-900/30'
    },
    {
      icon: Shield,
      title: 'Trusted & Transparent',
      description: 'Built with trust frameworks and transparency at the core. Know how decisions are made.',
      color: 'text-purple-600 dark:text-purple-400',
      bgColor: 'bg-purple-100 dark:bg-purple-900/30'
    },
    {
      icon: Target,
      title: 'Tailored Interactions',
      description: 'Personalized to your mission requirements. Fast deployment with customization built in.',
      color: 'text-red-600 dark:text-red-400',
      bgColor: 'bg-red-100 dark:bg-red-900/30'
    },
    {
      icon: TrendingUp,
      title: 'Measurable Efficiency',
      description: 'Track performance with clear KPIs. Reduce friction and drive operational efficiency.',
      color: 'text-orange-600 dark:text-orange-400',
      bgColor: 'bg-orange-100 dark:bg-orange-900/30'
    }
  ];

  const missionPillars = [
    {
      number: '01',
      title: 'Connective Tissue',
      description: 'Acts as the link between systems, not another isolated tool. Synchronizes data, workflows, and mission threads throughout operational domains.',
      icon: LinkIcon
    },
    {
      number: '02',
      title: 'Force Multiplier',
      description: 'Amplifies team capability without adding complexity. Empowers warfighters to unlock the full power of their digital environment.',
      icon: Users
    },
    {
      number: '03',
      title: 'Scale with Confidence',
      description: 'Deploy across your organization with precision. Built for training, brand building, and internal communications at enterprise scale.',
      icon: Rocket
    }
  ];

  const useCases = [
    {
      title: 'Training & Readiness',
      description: 'Accelerate AI literacy and operational readiness with mobile micro-learning tailored to mission requirements.',
      icon: Users,
      examples: ['AI Leadership Training', 'Micro-learning Modules', 'Real-time Knowledge Access']
    },
    {
      title: 'Brand Building',
      description: 'Establish your organization as an AI-enabled leader. Create a unified voice across all operational domains.',
      icon: Globe,
      examples: ['Organizational Identity', 'Consistent Messaging', 'Cultural Transformation']
    },
    {
      title: 'Internal Communications',
      description: 'Break down silos with synchronized information flow. Keep teams aligned at mission speed.',
      icon: Radio,
      examples: ['Cross-Domain Sync', 'Real-time Updates', 'Collaborative Intelligence']
    }
  ];

  const technicalAdvantages = [
    'Client-side configuration with no server dependency',
    'Integrates with SharePoint, Google Drive, OneDrive, Salesforce',
    'Multi-agent collaboration for specialist expertise',
    'Role-based access control (RBAC) for security',
    'Persistent localStorage across sessions',
    'Custom video and content integration',
    'Real-time sentiment tracking and analytics',
    'Mobile PWA with offline capability'
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white py-20 px-4">
        <div className="absolute inset-0 bg-grid-white/5 [mask-image:linear-gradient(0deg,transparent,black)]" />
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6 border border-white/20">
              <Shield className="size-5" />
              <span className="text-sm font-medium">Mission-Critical AI Agent</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              An Interoperable, Interconnected<br />AI Agent Built for Mission Advantage
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-4xl mx-auto mb-8 leading-relaxed">
              Modern operations don't have room for disconnected systems or slow decision cycles. They demand capabilities that can communicate, coordinate, and adapt at mission speed.
            </p>
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 mb-8 max-w-4xl mx-auto">
              <p className="text-xl md:text-2xl text-gray-700 dark:text-white font-semibold leading-relaxed">
                The key to unlocking AI Transformation is in mobile micro-learning: from hand held capabilities to cultural confidence!
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="/downloads"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-purple-900 rounded-lg hover:bg-blue-50 transition-colors font-semibold text-lg"
              >
                <Rocket className="size-5" />
                Get Started
                <ArrowRight className="size-5" />
              </a>
              <a
                href="/configuration"
                className="inline-flex items-center gap-2 px-8 py-4 border-2 border-white/30 backdrop-blur-sm rounded-lg hover:bg-white/10 transition-colors font-semibold text-lg"
              >
                <Shield className="size-5" />
                View Configuration
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Main Value Proposition */}
      <section className="py-16 px-4 bg-background">
        <div className="max-w-6xl mx-auto">
          <Card className="border-2 border-primary/50 bg-gradient-to-br from-primary/5 to-transparent">
            <CardContent className="pt-8">
              <div className="flex items-start gap-4">
                <div className="size-16 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Activity className="size-8 text-primary" />
                </div>
                <div className="flex-1">
                  <h2 className="text-3xl font-bold mb-4">Not a Simple Bot — A Force Multiplier</h2>
                  <p className="text-lg text-muted-foreground leading-relaxed mb-4">
                    This AI Agent isn't a simple bot — it's a mobile‑first, interoperable force multiplier built for operators on the move. Engineered to plug directly into the broader operational ecosystem, it delivers trusted, tailored, and transparent interactions wherever the mission takes you.
                  </p>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    The ORA agent is designed to get your AI initiative up and running fast! It can be personalized too! It synchronizes data, workflows, and mission threads throughout operational domains, enabling faster decisions, reducing friction, and driving measurable efficiency.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Core Capabilities */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Mission-Critical Capabilities</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Built for operational excellence across every domain
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {capabilities.map((capability, index) => {
              const Icon = capability.icon;
              return (
                <Card key={index} className="hover:shadow-xl transition-shadow">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <div className={`${capability.bgColor} size-12 rounded-lg flex items-center justify-center flex-shrink-0`}>
                        <Icon className={`size-6 ${capability.color}`} />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg mb-2">{capability.title}</h3>
                        <p className="text-sm text-muted-foreground">{capability.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Mission Pillars */}
      <section className="py-16 px-4 bg-background">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Three Mission Pillars</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              The foundation of operational AI advantage
            </p>
          </div>

          <div className="space-y-6">
            {missionPillars.map((pillar, index) => {
              const Icon = pillar.icon;
              return (
                <Card key={index} className="border-l-4 border-l-primary hover:shadow-lg transition-shadow">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-6">
                      <div className="flex-shrink-0">
                        <div className="text-6xl font-bold text-primary/20">{pillar.number}</div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <Icon className="size-6 text-primary" />
                          <h3 className="text-2xl font-bold">{pillar.title}</h3>
                        </div>
                        <p className="text-lg text-muted-foreground leading-relaxed">
                          {pillar.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Connective Tissue CTA */}
      <section className="py-16 px-4 bg-gradient-to-br from-primary/10 to-transparent">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center justify-center size-20 bg-primary/10 rounded-2xl mb-6">
            <Layers className="size-10 text-primary" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Connective Tissue, Not Another Isolated Tool
          </h2>
          <p className="text-xl text-muted-foreground leading-relaxed mb-8">
            By acting as the connective tissue rather than another isolated tool, this agent empowers warfighters and mission teams to unlock the full power of their digital environment and scale capability with confidence and precision.
          </p>
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
            <CheckCircle2 className="size-5 text-green-600" />
            <span className="font-semibold">Ideal for training, brand building, and internal communications</span>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-16 px-4 bg-background">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Mission Applications</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Deploy across critical operational areas
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {useCases.map((useCase, index) => {
              const Icon = useCase.icon;
              return (
                <Card key={index} className="hover:shadow-xl transition-shadow">
                  <CardHeader>
                    <div className="size-14 bg-gradient-to-br from-primary/20 to-primary/10 rounded-xl flex items-center justify-center mb-4">
                      <Icon className="size-7 text-primary" />
                    </div>
                    <CardTitle className="text-xl">{useCase.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-6">{useCase.description}</p>
                    <div className="space-y-2">
                      {useCase.examples.map((example, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <CheckCircle2 className="size-4 text-green-600 flex-shrink-0" />
                          <span className="text-sm">{example}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Technical Advantages */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full mb-6">
                <Lock className="size-4 text-primary" />
                <span className="text-sm font-medium text-primary">Enterprise-Ready</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Built for Operational Security & Scale
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                Designed with mission-critical requirements in mind. Every feature is built to support your operational tempo while maintaining the highest security standards.
              </p>
              <div className="flex gap-4">
                <a
                  href="/training"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium"
                >
                  <Users className="size-4" />
                  Explore Training
                </a>
                <a
                  href="/about"
                  className="inline-flex items-center gap-2 px-6 py-3 border border-border rounded-lg hover:bg-muted transition-colors font-medium"
                >
                  Learn More
                  <ExternalLink className="size-4" />
                </a>
              </div>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle2 className="size-5 text-green-600" />
                  Technical Advantages
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {technicalAdvantages.map((advantage, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle2 className="size-5 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{advantage}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-4 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Ready to Deploy Mission Advantage?
          </h2>
          <p className="text-xl text-blue-100 mb-8 leading-relaxed">
            Get your AI initiative up and running fast with a personalized, interoperable agent built for operational excellence.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="/pricing"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-purple-900 rounded-lg hover:bg-blue-50 transition-colors font-semibold text-lg"
            >
              <Rocket className="size-5" />
              View Pricing
            </a>
            <a
              href="https://calendly.com/caraz007"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 border-2 border-white/30 backdrop-blur-sm rounded-lg hover:bg-white/10 transition-colors font-semibold text-lg"
            >
              <ExternalLink className="size-5" />
              Schedule Consultation
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
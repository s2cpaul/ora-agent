/**
 * ORA - AI Leadership Agent
 * Copyright (c) 2024-2026 s2cpaul
 * Licensed under MIT License
 * Repository: https://github.com/s2cpaul/ora-agent
 */

import { Bot, Target, Users, Zap, Globe, Heart, Sparkles, TrendingUp, Rocket, Smartphone, Link2, Sliders, BarChart3, GraduationCap, MessageCircle, DollarSign, CheckCircle2 } from 'lucide-react';

export function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-background to-background py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-6">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Your Personal AI Leadership Agent</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Welcome to ORA
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Observe • Respond • Act
            </p>
            <p className="text-lg text-muted-foreground max-w-4xl mx-auto leading-relaxed mb-6">
              Empowering the modern workforce with fast, free, mobile micro-learning that makes them AI-enabled. 
              AI literacy is now essential for career success.
            </p>
            <div className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 border border-purple-200 dark:border-purple-800 rounded-xl p-6 max-w-4xl mx-auto">
              <p className="text-lg font-semibold text-gray-700 dark:text-white leading-relaxed">
                The key to unlocking AI Transformation is in mobile micro-learning: from hand held capabilities to cultural confidence!
              </p>
            </div>
          </div>

          {/* Key Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            <div className="text-center p-6 bg-card rounded-lg border">
              <div className="text-4xl font-bold text-primary mb-2">10+</div>
              <div className="text-sm text-muted-foreground">AI Agent Features</div>
            </div>
            <div className="text-center p-6 bg-card rounded-lg border">
              <div className="text-4xl font-bold text-primary mb-2">6+</div>
              <div className="text-sm text-muted-foreground">Platform Integrations</div>
            </div>
            <div className="text-center p-6 bg-card rounded-lg border">
              <div className="text-4xl font-bold text-primary mb-2">2</div>
              <div className="text-sm text-muted-foreground">Languages Supported</div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <Target className="w-12 h-12 text-primary mx-auto mb-4" />
            <h2 className="text-4xl font-bold mb-4">Our Mission</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              To democratize AI literacy and empower every professional with intelligent tools that drive innovation, efficiency, and measurable organizational change.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Mission Card 1 */}
            <div className="p-8 bg-card rounded-xl border hover:border-primary/50 transition-colors">
              <Bot className="w-10 h-10 text-primary mb-4" />
              <h3 className="text-2xl font-semibold mb-3">AI for Everyone</h3>
              <p className="text-muted-foreground leading-relaxed">
                We believe AI literacy should be accessible to all. ORA provides free, mobile-first micro-learning that makes complex AI concepts simple and actionable for the modern workforce.
              </p>
            </div>

            {/* Mission Card 2 */}
            <div className="p-8 bg-card rounded-xl border hover:border-primary/50 transition-colors">
              <Users className="w-10 h-10 text-primary mb-4" />
              <h3 className="text-2xl font-semibold mb-3">Community-Driven</h3>
              <p className="text-muted-foreground leading-relaxed">
                We foster unexpected collaboration, positive energy, and partnerships that accelerate transformation. Together, we're building a community of AI-enabled leaders.
              </p>
            </div>

            {/* Mission Card 3 */}
            <div className="p-8 bg-card rounded-xl border hover:border-primary/50 transition-colors">
              <Zap className="w-10 h-10 text-primary mb-4" />
              <h3 className="text-2xl font-semibold mb-3">Innovation & Efficiency</h3>
              <p className="text-muted-foreground leading-relaxed">
                ORA drives measurable organizational change by connecting multiple AI agents, automating workflows, and providing actionable insights that improve decision-making.
              </p>
            </div>

            {/* Mission Card 4 */}
            <div className="p-8 bg-card rounded-xl border hover:border-primary/50 transition-colors">
              <Globe className="w-10 h-10 text-primary mb-4" />
              <h3 className="text-2xl font-semibold mb-3">Global Accessibility</h3>
              <p className="text-muted-foreground leading-relaxed">
                Currently available in English and Spanish, with plans to expand globally. We're committed to making AI education accessible across languages and cultures.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Key Benefits Section */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <CheckCircle2 className="w-12 h-12 text-primary mx-auto mb-4" />
            <h2 className="text-4xl font-bold mb-4">Key Benefits</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Why organizations and professionals choose ORA to accelerate their AI transformation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {/* Benefit 1 */}
            <div className="flex gap-4 p-6 bg-card rounded-xl border hover:border-primary/50 transition-colors">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Rocket className="w-6 h-6 text-primary" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Fast deployment</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Get AI initiatives running quickly with minimal friction and clear onboarding paths.
                </p>
              </div>
            </div>

            {/* Benefit 2 */}
            <div className="flex gap-4 p-6 bg-card rounded-xl border hover:border-primary/50 transition-colors">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Smartphone className="w-6 h-6 text-primary" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Mobile first</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Designed for operators on the move; micro‑learning and tools available anywhere, anytime.
                </p>
              </div>
            </div>

            {/* Benefit 3 */}
            <div className="flex gap-4 p-6 bg-card rounded-xl border hover:border-primary/50 transition-colors">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Link2 className="w-6 h-6 text-primary" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Interoperable</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Integrates with existing systems to act as connective tissue, not another silo.
                </p>
              </div>
            </div>

            {/* Benefit 4 */}
            <div className="flex gap-4 p-6 bg-card rounded-xl border hover:border-primary/50 transition-colors">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Sliders className="w-6 h-6 text-primary" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Personalizable</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Tailored experiences for roles, missions, and workflows to increase relevance and adoption.
                </p>
              </div>
            </div>

            {/* Benefit 5 */}
            <div className="flex gap-4 p-6 bg-card rounded-xl border hover:border-primary/50 transition-colors">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <BarChart3 className="w-6 h-6 text-primary" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Measurable impact</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Drives efficiency gains and delivers quantifiable organizational change with clear metrics.
                </p>
              </div>
            </div>

            {/* Benefit 6 */}
            <div className="flex gap-4 p-6 bg-card rounded-xl border hover:border-primary/50 transition-colors">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <GraduationCap className="w-6 h-6 text-primary" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Free micro‑learning</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Accessible, bite‑sized training that builds AI confidence and capability at no cost.
                </p>
              </div>
            </div>

            {/* Benefit 7 */}
            <div className="flex gap-4 p-6 bg-card rounded-xl border hover:border-primary/50 transition-colors">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <MessageCircle className="w-6 h-6 text-primary" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Community support</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Active peer network, shared best practices, and ongoing help to accelerate learning and adoption.
                </p>
              </div>
            </div>

            {/* Benefit 8 */}
            <div className="flex gap-4 p-6 bg-card rounded-xl border hover:border-primary/50 transition-colors">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-primary" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Affordable</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Free core features plus cost‑effective options for scaling and enterprise needs.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <Heart className="w-12 h-12 text-primary mx-auto mb-4" />
            <h2 className="text-4xl font-bold mb-4">Our Values</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              The principles that guide everything we do at ORA.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Value 1 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Innovation First</h3>
              <p className="text-muted-foreground">
                We constantly push boundaries, explore new possibilities, and stay at the forefront of AI technology.
              </p>
            </div>

            {/* Value 2 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Community Focus</h3>
              <p className="text-muted-foreground">
                Our users are at the heart of everything we do. We listen, learn, and build together.
              </p>
            </div>

            {/* Value 3 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Measurable Impact</h3>
              <p className="text-muted-foreground">
                We focus on delivering real, quantifiable results that drive organizational success.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Our Vision</h2>
          <p className="text-xl text-muted-foreground leading-relaxed mb-8">
            We envision a world where every professional, regardless of background or experience, 
            has instant access to AI-powered tools that enhance their capabilities, accelerate their 
            learning, and amplify their impact.
          </p>
          <p className="text-lg text-muted-foreground leading-relaxed mb-8">
            ORA is more than just an AI agent—it's a movement toward democratizing AI literacy, 
            fostering unexpected collaboration, and creating positive energy that transforms 
            organizations from the inside out.
          </p>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Join us in building a future where AI empowers everyone to become a leader in their field.
          </p>
        </div>
      </section>

      {/* The ORA Difference */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">The ORA Difference</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              What makes ORA unique in the AI agent landscape.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-6 bg-card rounded-lg border">
              <h3 className="font-semibold mb-2">🚀 Mobile-First Design</h3>
              <p className="text-sm text-muted-foreground">
                Built for on-the-go professionals. Access AI assistance anywhere, anytime, on any device.
              </p>
            </div>

            <div className="p-6 bg-card rounded-lg border">
              <h3 className="font-semibold mb-2">🆓 Freemium Access</h3>
              <p className="text-sm text-muted-foreground">
                No login required for free tier. Try before you buy with instant access to core features.
              </p>
            </div>

            <div className="p-6 bg-card rounded-lg border">
              <h3 className="font-semibold mb-2">🔗 Multi-Agent System</h3>
              <p className="text-sm text-muted-foreground">
                Connect Google Drive, SharePoint, Notion, Slack, and more in a unified interface.
              </p>
            </div>

            <div className="p-6 bg-card rounded-lg border">
              <h3 className="font-semibold mb-2">📊 Analytics-Driven</h3>
              <p className="text-sm text-muted-foreground">
                Every interaction tracked for ML/AI insights. Build better context models over time.
              </p>
            </div>

            <div className="p-6 bg-card rounded-lg border">
              <h3 className="font-semibold mb-2">💡 Micro-Learning</h3>
              <p className="text-sm text-muted-foreground">
                Fast, focused learning sessions that fit into your busy schedule. Learn AI in minutes.
              </p>
            </div>

            <div className="p-6 bg-card rounded-lg border">
              <h3 className="font-semibold mb-2">🌍 Global Reach</h3>
              <p className="text-sm text-muted-foreground">
                English and Spanish support now, with more languages coming. AI for everyone, everywhere.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-xl text-muted-foreground mb-8">
            Join thousands of professionals who are already AI-enabled with ORA.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/"
              className="px-8 py-4 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-semibold text-lg"
            >
              Start Free Trial
            </a>
            <a
              href="/pricing"
              className="px-8 py-4 border border-border rounded-lg hover:bg-muted transition-colors font-semibold text-lg"
            >
              View Pricing
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
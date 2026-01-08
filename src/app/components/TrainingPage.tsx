/**
 * ORA - AI Leadership Agent
 * Copyright (c) 2024-2026 s2cpaul
 * Licensed under MIT License
 * Repository: https://github.com/s2cpaul/ora-agent
 */

import { useState } from 'react';
import { BookOpen, Video, FileText, CheckCircle, Brain, Zap, Users, Award, Lock } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';

export function TrainingPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    organization: '',
    role: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Handle form submission
    alert('Thank you for your interest! We will be in touch soon.');
  };

  const trainingModules = [
    {
      icon: Brain,
      title: 'AI Accelerator',
      description: 'Learn the core principles of AI leadership and measurable organizational transformation',
      duration: '2 hours',
      level: 'Beginner',
    },
    {
      icon: Zap,
      title: 'Agentic AI in Practice',
      description: 'Hands-on training with AI agents and multi-agent collaboration systems',
      duration: '3 hours',
      level: 'Intermediate',
    },
    {
      icon: Users,
      title: 'Team Collaboration with AI',
      description: 'Build effective workflows using AI agents across your organization',
      duration: '2.5 hours',
      level: 'Intermediate',
    },
    {
      icon: Award,
      title: 'Advanced AI Strategy',
      description: 'Develop comprehensive AI strategies for enterprise-wide adoption',
      duration: '4 hours',
      level: 'Advanced',
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="border-b bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl sm:text-5xl font-bold mb-6">
              Free AI Leadership Training
            </h1>
            <p className="text-xl text-muted-foreground mb-6">
              Master AI leadership with our comprehensive training program. Learn from industry experts and get hands-on experience with cutting-edge AI agent technology.
            </p>
            <div className="bg-purple-100 dark:bg-purple-900/30 border border-purple-300 dark:border-purple-700 rounded-xl p-6 mb-8">
              <p className="text-lg font-semibold text-gray-700 dark:text-white leading-relaxed">
                The key to unlocking AI Transformation is in mobile micro-learning: from hand held capabilities to cultural confidence!
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="text-lg px-8" onClick={() => {
                document.getElementById('get-started-form')?.scrollIntoView({ behavior: 'smooth' });
              }}>
                <BookOpen className="size-5 mr-2" />
                Get Started Free
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8" onClick={() => {
                window.open('https://calendly.com/caraz007', '_blank');
              }}>
                <Users className="size-5 mr-2" />
                Schedule a Demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Training Modules */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Training Modules</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Choose from our structured learning paths designed for leaders at every level
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {trainingModules.map((module, index) => {
              const Icon = module.icon;
              const isLocked = index !== 0; // Lock all except first module
              return (
                <Card key={index} className={`hover:shadow-lg transition-shadow ${isLocked ? 'opacity-75' : ''}`}>
                  <CardHeader>
                    <div className="flex items-start gap-4">
                      <div className={`p-3 rounded-lg ${isLocked ? 'bg-muted' : 'bg-primary/10'}`}>
                        <Icon className={`size-6 ${isLocked ? 'text-muted-foreground' : 'text-primary'}`} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <CardTitle>{module.title}</CardTitle>
                          {isLocked && (
                            <Lock className="size-4 text-muted-foreground" />
                          )}
                        </div>
                        <CardDescription>{module.description}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Video className="size-4" />
                        {module.duration}
                      </span>
                      <span className="px-2 py-1 bg-muted rounded-full text-xs font-medium">
                        {module.level}
                      </span>
                      {isLocked && (
                        <span className="px-2 py-1 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-400 rounded-full text-xs font-medium ml-auto">
                          Premium
                        </span>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 sm:py-20 bg-muted/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">What You'll Learn</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              'AI Strategy & Governance',
              'Multi-Agent Collaboration',
              'Risk Management & Ethics',
              'Workforce Readiness',
              'KPI & ROI Measurement',
              'Real-World Case Studies',
            ].map((benefit, index) => (
              <div key={index} className="flex items-start gap-3">
                <CheckCircle className="size-6 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                <span className="text-lg">{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Get Started Form */}
      <section id="get-started-form" className="py-16 sm:py-20">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Get Started with Free Training</CardTitle>
              <CardDescription>
                Fill out the form below and we'll send you access to our complete training library
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="organization">Organization</Label>
                  <Input
                    id="organization"
                    type="text"
                    placeholder="Your Company"
                    value={formData.organization}
                    onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="role">Your Role</Label>
                  <Input
                    id="role"
                    type="text"
                    placeholder="e.g., CTO, Product Manager, Team Lead"
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  />
                </div>

                <Button type="submit" className="w-full" size="lg">
                  <BookOpen className="size-5 mr-2" />
                  Start Free Training
                </Button>

                <p className="text-sm text-muted-foreground text-center">
                  By submitting this form, you agree to receive training materials and updates from ORA.
                </p>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Resources Section */}
      <section className="py-16 sm:py-20 bg-muted/50 border-t">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Additional Resources</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Explore our curated collection of articles, videos, and guides
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <FileText className="size-8 text-primary mb-4" />
                <CardTitle>Documentation</CardTitle>
                <CardDescription>
                  Comprehensive guides and best practices for AI leadership
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full" onClick={() => window.location.href = '/docs'}>
                  View Docs
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Video className="size-8 text-primary mb-4" />
                <CardTitle>Video Library</CardTitle>
                <CardDescription>
                  Watch expert interviews and case studies from industry leaders
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full" onClick={() => {
                  window.open('https://aiaccelerator.myora.now/', '_blank');
                }}>
                  Watch Videos
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Users className="size-8 text-primary mb-4" />
                <CardTitle>Community</CardTitle>
                <CardDescription>
                  Join our community of AI leaders and practitioners
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full" onClick={() => {
                  window.open('https://discord.gg/ora', '_blank');
                }}>
                  Join Discord
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
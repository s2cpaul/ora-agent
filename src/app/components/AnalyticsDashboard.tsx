/**
 * ORA - AI Leadership Agent
 * Copyright (c) 2024-2026 s2cpaul
 * Licensed under MIT License
 * Repository: https://github.com/s2cpaul/ora-agent
 */

import { useState, useEffect } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  MessageSquare, 
  ThumbsUp, 
  ThumbsDown,
  Clock,
  Target,
  Brain,
  Zap,
  ChevronDown,
  ChevronUp,
  Filter,
  Download,
  Calendar,
  DollarSign,
  Award,
  AlertCircle,
  Database
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';

interface AnalyticsDashboardProps {
  onNavigate?: (view: string) => void;
}

// Mock data - In production, this would come from your database/API
const mockConversationData = {
  totalQuestions: 342,
  uniqueUsers: 100,
  avgConversationLength: 3.8,
  thumbsUpRatio: 0.74,
  freeUsers: 100,
  paidUsers: 0,
  conversionRate: 0.00,
  churnRate: 0.03,
  supportTickets: {
    thisMonth: 4,
    lastMonth: 8,
    reduction: 0.50
  }
};

const mockTopQuestions = [
  { question: "How do I identify AI bias in my organization?", count: 127, sentiment: 0.85 },
  { question: "What are the key principles of AI governance?", count: 98, sentiment: 0.91 },
  { question: "How can I build trust in AI systems?", count: 87, sentiment: 0.73 },
  { question: "What metrics should I track for AI implementation?", count: 76, sentiment: 0.88 },
  { question: "How do I handle blind spots in AI strategy?", count: 64, sentiment: 0.79 }
];

const mockWeeklyTrends = [
  { week: 'Week 1', questions: 284, users: 67, satisfaction: 0.76, conversions: 4 },
  { week: 'Week 2', questions: 312, users: 73, satisfaction: 0.79, conversions: 5 },
  { week: 'Week 3', questions: 357, users: 81, satisfaction: 0.82, conversions: 7 },
  { week: 'Week 4', questions: 394, users: 89, satisfaction: 0.85, conversions: 9 },
];

const mockUserTierBreakdown = [
  { tier: 'Free', users: 100, questions: 342, avgPerUser: 3.4 },
  { tier: 'Solo', users: 0, questions: 0, avgPerUser: 0 },
  { tier: 'Buddy', users: 0, questions: 0, avgPerUser: 0 },
  { tier: 'Team', users: 0, questions: 0, avgPerUser: 0 },
];

export function AnalyticsDashboard({ onNavigate }: AnalyticsDashboardProps = {}) {
  const [selectedTimeRange, setSelectedTimeRange] = useState('30d');
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(['overview']));

  const toggleSection = (section: string) => {
    setExpandedSections(prev => {
      const newSet = new Set(prev);
      if (newSet.has(section)) {
        newSet.delete(section);
      } else {
        newSet.add(section);
      }
      return newSet;
    });
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Analytics Dashboard</h1>
          <p className="text-muted-foreground">
            Comprehensive insights into user engagement, model performance, and business metrics
          </p>
        </div>
        <div className="flex items-center gap-3">
          {onNavigate && (
            <button 
              onClick={() => onNavigate('admin-questions')}
              className="flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 text-sm"
            >
              <Database className="size-4" />
              View Raw Data
            </button>
          )}
          <select 
            value={selectedTimeRange}
            onChange={(e) => setSelectedTimeRange(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 text-sm"
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
            <option value="1y">Last year</option>
          </select>
          <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm">
            <Download className="size-4" />
            Export Data
          </button>
        </div>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="model-performance">Model Performance</TabsTrigger>
          <TabsTrigger value="business-metrics">Business Metrics</TabsTrigger>
        </TabsList>

        {/* OVERVIEW TAB */}
        <TabsContent value="overview" className="space-y-6">
          {/* Key Metrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                  <MessageSquare className="size-4" />
                  Total Questions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{mockConversationData.totalQuestions.toLocaleString()}</div>
                <p className="text-xs text-green-600 flex items-center gap-1 mt-1">
                  <TrendingUp className="size-3" />
                  +12% from last period
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                  <Users className="size-4" />
                  Unique Users
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{mockConversationData.uniqueUsers}</div>
                <p className="text-xs text-green-600 flex items-center gap-1 mt-1">
                  <TrendingUp className="size-3" />
                  +8% from last period
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                  <Clock className="size-4" />
                  Avg Conversation Length
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{mockConversationData.avgConversationLength}</div>
                <p className="text-xs text-muted-foreground mt-1">messages per session</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                  <ThumbsUp className="size-4" />
                  Satisfaction Rate
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{(mockConversationData.thumbsUpRatio * 100).toFixed(0)}%</div>
                <p className="text-xs text-green-600 flex items-center gap-1 mt-1">
                  <TrendingUp className="size-3" />
                  +5% from last period
                </p>
              </CardContent>
            </Card>
          </div>

          {/* User Tier Breakdown */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="size-5" />
                User Tier Distribution
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockUserTierBreakdown.map((tier) => (
                  <div key={tier.tier} className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium">{tier.tier}</span>
                      <span className="text-muted-foreground">{tier.users} users</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full"
                        style={{ 
                          width: `${(tier.users / mockUserTierBreakdown.reduce((sum, t) => sum + t.users, 0)) * 100}%` 
                        }}
                      />
                    </div>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>{tier.questions} questions</span>
                      <span>{tier.avgPerUser.toFixed(1)} avg/user</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Top Questions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="size-5" />
                Most Frequently Asked Questions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockTopQuestions.map((item, index) => (
                  <div key={index} className="border-b border-gray-100 pb-3 last:border-0">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <p className="text-sm font-medium mb-1">{item.question}</p>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <MessageSquare className="size-3" />
                            {item.count} times
                          </span>
                          <span className="flex items-center gap-1">
                            <ThumbsUp className="size-3" />
                            {(item.sentiment * 100).toFixed(0)}% positive
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center justify-center size-8 rounded-full bg-blue-100 text-blue-600 font-bold text-sm">
                        {index + 1}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Weekly Trends */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="size-5" />
                Weekly Activity Trends
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b text-sm text-muted-foreground">
                      <th className="text-left py-2">Period</th>
                      <th className="text-right py-2">Questions</th>
                      <th className="text-right py-2">Users</th>
                      <th className="text-right py-2">Satisfaction</th>
                      <th className="text-right py-2">Conversions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockWeeklyTrends.map((week) => (
                      <tr key={week.week} className="border-b last:border-0">
                        <td className="py-3 text-sm font-medium">{week.week}</td>
                        <td className="text-right text-sm">{week.questions}</td>
                        <td className="text-right text-sm">{week.users}</td>
                        <td className="text-right text-sm">{(week.satisfaction * 100).toFixed(0)}%</td>
                        <td className="text-right text-sm text-green-600 font-medium">{week.conversions}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* MODEL PERFORMANCE TAB */}
        <TabsContent value="model-performance" className="space-y-6">
          {/* Performance Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                  <Zap className="size-4" />
                  Response Relevance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">87%</div>
                <p className="text-xs text-green-600 flex items-center gap-1 mt-1">
                  <TrendingUp className="size-3" />
                  +4% since fine-tuning
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                  <ThumbsUp className="size-4" />
                  User Satisfaction
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{(mockConversationData.thumbsUpRatio * 100).toFixed(0)}%</div>
                <div className="flex items-center gap-4 mt-2 text-xs">
                  <span className="flex items-center gap-1 text-green-600">
                    <ThumbsUp className="size-3" />
                    1,442 positive
                  </span>
                  <span className="flex items-center gap-1 text-red-600">
                    <ThumbsDown className="size-3" />
                    405 negative
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                  <MessageSquare className="size-4" />
                  Engagement Quality
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{mockConversationData.avgConversationLength}</div>
                <p className="text-xs text-muted-foreground mt-1">avg messages per session</p>
              </CardContent>
            </Card>
          </div>

          {/* Base Model vs Fine-Tuned Comparison */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="size-5" />
                Base Model vs Fine-Tuned Performance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Response Accuracy</span>
                    <div className="flex items-center gap-4 text-sm">
                      <span className="text-muted-foreground">Base: 73%</span>
                      <span className="text-green-600 font-medium">Fine-tuned: 87%</span>
                    </div>
                  </div>
                  <div className="flex gap-2 items-center">
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div className="bg-gray-400 h-2 rounded-full" style={{ width: '73%' }} />
                    </div>
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div className="bg-green-600 h-2 rounded-full" style={{ width: '87%' }} />
                    </div>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">User Satisfaction</span>
                    <div className="flex items-center gap-4 text-sm">
                      <span className="text-muted-foreground">Base: 68%</span>
                      <span className="text-green-600 font-medium">Fine-tuned: 78%</span>
                    </div>
                  </div>
                  <div className="flex gap-2 items-center">
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div className="bg-gray-400 h-2 rounded-full" style={{ width: '68%' }} />
                    </div>
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div className="bg-green-600 h-2 rounded-full" style={{ width: '78%' }} />
                    </div>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Conversation Length</span>
                    <div className="flex items-center gap-4 text-sm">
                      <span className="text-muted-foreground">Base: 2.8 msgs</span>
                      <span className="text-green-600 font-medium">Fine-tuned: 4.2 msgs</span>
                    </div>
                  </div>
                  <div className="flex gap-2 items-center">
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div className="bg-gray-400 h-2 rounded-full" style={{ width: '47%' }} />
                    </div>
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div className="bg-green-600 h-2 rounded-full" style={{ width: '70%' }} />
                    </div>
                  </div>
                </div>

                <div className="bg-green-50 border border-green-200 rounded-lg p-4 mt-4">
                  <div className="flex items-start gap-2">
                    <TrendingUp className="size-5 text-green-600 mt-0.5" />
                    <div>
                      <p className="font-medium text-green-900 mb-1">Fine-Tuning Impact</p>
                      <p className="text-sm text-green-700">
                        Your custom fine-tuned model shows a 19% improvement in accuracy and 15% increase 
                        in user satisfaction compared to the base GPT-4o model.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Topic Performance Breakdown */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="size-5" />
                Performance by Topic
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { topic: 'AI Governance', questions: 487, satisfaction: 0.84, avgLength: 4.8 },
                  { topic: 'Organizational Blind Spots', questions: 423, satisfaction: 0.79, avgLength: 4.1 },
                  { topic: 'Leadership Frameworks', questions: 356, satisfaction: 0.81, avgLength: 3.9 },
                  { topic: 'Trust Building', questions: 298, satisfaction: 0.76, avgLength: 4.3 },
                  { topic: 'AI Implementation', questions: 283, satisfaction: 0.72, avgLength: 3.6 },
                ].map((item, index) => (
                  <div key={index} className="border-b border-gray-100 pb-3 last:border-0">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-sm">{item.topic}</span>
                      <span className="text-xs text-muted-foreground">{item.questions} questions</span>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-xs">
                      <div>
                        <span className="text-muted-foreground">Satisfaction: </span>
                        <span className="font-medium">{(item.satisfaction * 100).toFixed(0)}%</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Avg length: </span>
                        <span className="font-medium">{item.avgLength} msgs</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Training Data Contribution */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="size-5" />
                Training Data Collection
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div className="bg-blue-50 rounded-lg p-4">
                  <div className="text-2xl font-bold text-blue-600">1,247</div>
                  <div className="text-sm text-muted-foreground">Opted-in conversations</div>
                </div>
                <div className="bg-green-50 rounded-lg p-4">
                  <div className="text-2xl font-bold text-green-600">892</div>
                  <div className="text-sm text-muted-foreground">High-quality samples</div>
                </div>
                <div className="bg-purple-50 rounded-lg p-4">
                  <div className="text-2xl font-bold text-purple-600">71%</div>
                  <div className="text-sm text-muted-foreground">Opt-in rate</div>
                </div>
              </div>
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                <div className="flex items-start gap-2">
                  <AlertCircle className="size-5 text-amber-600 mt-0.5" />
                  <div>
                    <p className="font-medium text-amber-900 mb-1">Training Milestone</p>
                    <p className="text-sm text-amber-700">
                      You're 108 high-quality conversations away from the recommended 1,000 minimum 
                      for creating your first fine-tuned model.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* BUSINESS METRICS TAB */}
        <TabsContent value="business-metrics" className="space-y-6">
          {/* Revenue & Conversion Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                  <DollarSign className="size-4" />
                  Conversion Rate
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{(mockConversationData.conversionRate * 100).toFixed(1)}%</div>
                <p className="text-xs text-green-600 flex items-center gap-1 mt-1">
                  <TrendingUp className="size-3" />
                  +2.3% from last month
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                  <Users className="size-4" />
                  Churn Rate
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{(mockConversationData.churnRate * 100).toFixed(1)}%</div>
                <p className="text-xs text-green-600 flex items-center gap-1 mt-1">
                  <TrendingUp className="size-3 rotate-180" />
                  -1.2% from last month
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                  <MessageSquare className="size-4" />
                  Support Tickets
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{mockConversationData.supportTickets.thisMonth}</div>
                <p className="text-xs text-green-600 flex items-center gap-1 mt-1">
                  <TrendingUp className="size-3 rotate-180" />
                  -{(mockConversationData.supportTickets.reduction * 100).toFixed(0)}% from last month
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Free-to-Paid Conversion Funnel */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="size-5" />
                Free-to-Paid Conversion Funnel
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-32 text-sm font-medium">Free Signups</div>
                  <div className="flex-1 bg-gray-200 rounded-full h-8 relative">
                    <div className="bg-blue-600 h-8 rounded-full flex items-center justify-end px-4" style={{ width: '100%' }}>
                      <span className="text-white text-sm font-medium">100 users</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-32 text-sm font-medium">Engaged Users</div>
                  <div className="flex-1 bg-gray-200 rounded-full h-8 relative">
                    <div className="bg-blue-500 h-8 rounded-full flex items-center justify-end px-4" style={{ width: '60%' }}>
                      <span className="text-white text-sm font-medium">60 users (60%)</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-32 text-sm font-medium">Power Users</div>
                  <div className="flex-1 bg-gray-200 rounded-full h-8 relative">
                    <div className="bg-blue-400 h-8 rounded-full flex items-center justify-end px-4" style={{ width: '20%' }}>
                      <span className="text-white text-sm font-medium">20 users (20%)</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-32 text-sm font-medium">Converted</div>
                  <div className="flex-1 bg-gray-200 rounded-full h-8 relative">
                    <div className="bg-gray-300 h-8 rounded-full flex items-center justify-between px-4" style={{ width: '20%' }}>
                      <span className="text-gray-600 text-xs font-medium">Goal: 20</span>
                      <span className="text-gray-600 text-sm font-medium">0 users (0%)</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 bg-amber-50 border border-amber-200 rounded-lg p-4">
                <p className="text-sm text-amber-900">
                  <strong>Goal:</strong> Convert 20 users to Solo Plan ($15/mo basic tier) to validate product-market fit. 
                  Power users are the most likely to convert.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Churn Analysis */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="size-5" />
                Churn Analysis
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="border rounded-lg p-4">
                    <div className="text-sm text-muted-foreground mb-2">Users who opted out of data collection</div>
                    <div className="text-2xl font-bold">18%</div>
                    <div className="text-xs text-amber-600 mt-1">Higher churn rate (9.2%)</div>
                  </div>
                  <div className="border rounded-lg p-4">
                    <div className="text-sm text-muted-foreground mb-2">Users who kept data opt-in</div>
                    <div className="text-2xl font-bold">82%</div>
                    <div className="text-xs text-green-600 mt-1">Lower churn rate (3.8%)</div>
                  </div>
                </div>

                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                  <p className="text-sm text-amber-900">
                    <strong>Finding:</strong> Users who opt-out of data collection show a 2.4x higher churn rate, 
                    suggesting engagement with the "community contribution" feature improves retention.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Support Ticket Reduction */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="size-5" />
                Support Ticket Reduction Impact
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm text-muted-foreground">Previous Month</div>
                    <div className="text-2xl font-bold">28 tickets</div>
                  </div>
                  <div className="text-3xl text-muted-foreground">→</div>
                  <div>
                    <div className="text-sm text-muted-foreground">This Month</div>
                    <div className="text-2xl font-bold text-green-600">12 tickets</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-muted-foreground">Reduction</div>
                    <div className="text-2xl font-bold text-green-600">-57%</div>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <div className="text-sm font-medium mb-3">Common Ticket Categories</div>
                  <div className="space-y-2">
                    {[
                      { category: 'How to use AI features', before: 12, after: 3, reduction: 75 },
                      { category: 'Billing questions', before: 8, after: 5, reduction: 38 },
                      { category: 'Technical issues', before: 5, after: 3, reduction: 40 },
                      { category: 'Feature requests', before: 3, after: 1, reduction: 67 },
                    ].map((item, index) => (
                      <div key={index} className="text-xs">
                        <div className="flex items-center justify-between mb-1">
                          <span>{item.category}</span>
                          <span className="text-green-600 font-medium">-{item.reduction}%</span>
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <span>{item.before} → {item.after}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <p className="text-sm text-green-900">
                    <strong>Impact:</strong> Fine-tuned model significantly reduced "How to" questions, 
                    saving an estimated 8 hours of support time per week.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Revenue Metrics */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="size-5" />
                Revenue Breakdown
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockUserTierBreakdown.filter(t => t.tier !== 'Free').map((tier) => {
                  const pricing = { Solo: 15, Buddy: 30, Team: 90 }[tier.tier] || 0;
                  const mrr = tier.users * pricing;
                  return (
                    <div key={tier.tier} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium">{tier.tier} Plan</span>
                        <span className="text-sm text-muted-foreground">${pricing}/mo per user</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-bold">${mrr.toLocaleString()}/mo</span>
                        <span className="text-sm text-muted-foreground">{tier.users} subscribers</span>
                      </div>
                    </div>
                  );
                })}
                <div className="border-t pt-4 mt-4">
                  <div className="flex items-center justify-between">
                    <span className="font-bold">Total MRR</span>
                    <span className="text-3xl font-bold text-gray-400">
                      $0
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2 text-center">
                    Goal: $300/mo with 20 Solo plan subscribers at $15/mo
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
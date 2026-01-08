import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { BarChart2, TrendingUp, AlertCircle, Heart, MessageCircle } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";

interface QuestionLog {
  topic: string;
  question: string;
  timestamp: number;
  isPillButton: boolean;
}

interface CheckInLog {
  question: string;
  feeling: string;
  learningWish: string;
  timestamp: number;
}

interface AgentTrackingProps {
  onClose: () => void;
}

export function AgentTracking({ onClose }: AgentTrackingProps) {
  // Get question logs from localStorage
  const getQuestionLogs = (): QuestionLog[] => {
    const stored = localStorage.getItem("agentQuestionLogs");
    return stored ? JSON.parse(stored) : [];
  };

  // Get check-in logs from localStorage
  const getCheckInLogs = (): CheckInLog[] => {
    const stored = localStorage.getItem("checkInLogs");
    return stored ? JSON.parse(stored) : [];
  };

  const questionLogs = getQuestionLogs();
  const checkInLogs = getCheckInLogs();

  // Calculate date 120 days ago
  const oneHundredTwentyDaysAgo = Date.now() - (120 * 24 * 60 * 60 * 1000);

  // Filter questions from last 120 days
  const recentQuestions = questionLogs.filter(q => q.timestamp >= oneHundredTwentyDaysAgo);
  
  // Filter check-ins from last 120 days
  const recentCheckIns = checkInLogs.filter(c => c.timestamp >= oneHundredTwentyDaysAgo);

  // Group by topic and count occurrences
  const topicCounts = recentQuestions.reduce((acc, q) => {
    const topic = q.isPillButton ? q.topic : "Custom Questions";
    acc[topic] = (acc[topic] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Sort topics by count (descending)
  const sortedTopics = Object.entries(topicCounts)
    .sort(([, a], [, b]) => b - a)
    .map(([topic, count]) => ({ topic, count }));

  // Find topics with 10+ questions
  const frequentTopics = sortedTopics.filter(t => t.count >= 10);

  // Total stats
  const totalQuestions = recentQuestions.length;
  const pillButtonQuestions = recentQuestions.filter(q => q.isPillButton).length;
  const customQuestions = recentQuestions.filter(q => !q.isPillButton).length;

  // Categorize feelings as Positive, Negative, or Neutral
  const categorizeFeelings = (feeling: string): 'positive' | 'negative' | 'neutral' => {
    const positiveEmotions = [
      "Very Happy", "Happy", "Excited", "Celebrating", "Peaceful", "Confident", 
      "Amazed", "Blessed", "Grateful", "Satisfied"
    ];
    const negativeEmotions = [
      "Worried", "Sad", "Disappointed", "Tired", "Frustrated", 
      "Annoyed", "Angry", "Overwhelmed", "Concerned"
    ];
    
    if (positiveEmotions.includes(feeling)) return 'positive';
    if (negativeEmotions.includes(feeling)) return 'negative';
    return 'neutral';
  };

  // Check-in sentiment stats
  const totalCheckIns = recentCheckIns.length;
  const positiveCheckIns = recentCheckIns.filter(c => categorizeFeelings(c.feeling) === 'positive').length;
  const negativeCheckIns = recentCheckIns.filter(c => categorizeFeelings(c.feeling) === 'negative').length;
  const neutralCheckIns = recentCheckIns.filter(c => categorizeFeelings(c.feeling) === 'neutral').length;

  // Calculate wellness score (percentage of positive check-ins)
  const wellnessScore = totalCheckIns > 0 ? Math.round((positiveCheckIns / totalCheckIns) * 100) : 0;
  
  // Group feelings by type and count
  const feelingCounts = recentCheckIns.reduce((acc, c) => {
    if (c.feeling) {
      acc[c.feeling] = (acc[c.feeling] || 0) + 1;
    }
    return acc;
  }, {} as Record<string, number>);

  // Get top 6 feelings sorted by count
  const topFeelings = Object.entries(feelingCounts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 6)
    .map(([feeling, count]) => ({ feeling, count }));

  // Get most common feeling
  const mostCommonFeeling = topFeelings.length > 0 ? topFeelings[0] : null;

  // Get emoji for feeling label
  const getEmojiForFeeling = (feeling: string): string => {
    const emojiMap: Record<string, string> = {
      "Very Happy": "😊",
      "Happy": "🙂",
      "Excited": "😁",
      "Celebrating": "🥳",
      "Peaceful": "😌",
      "Confident": "😎",
      "Amazed": "😃",
      "Blessed": "😇",
      "Grateful": "🤗",
      "Satisfied": "😏",
      "Neutral": "😐",
      "Thinking": "🤔",
      "Speechless": "😶",
      "Awkward": "😬",
      "Concerned": "☹️",
      "Confused": "😕",
      "Worried": "😟",
      "Sad": "😔",
      "Disappointed": "😞",
      "Tired": "😫",
      "Frustrated": "😩",
      "Annoyed": "😠",
      "Angry": "😡",
      "Overwhelmed": "🤯"
    };
    return emojiMap[feeling] || "😐";
  };

  // Get sentiment badge info
  const getSentimentBadge = (feeling: string) => {
    const category = categorizeFeelings(feeling);
    if (category === 'positive') {
      return { label: 'Positive', color: 'bg-green-100 text-green-700' };
    } else if (category === 'negative') {
      return { label: 'Negative', color: 'bg-red-100 text-red-700' };
    } else {
      return { label: 'Neutral', color: 'bg-gray-100 text-gray-700' };
    }
  };

  return (
    <div className="space-y-4">
      {/* Header Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Questions</p>
                <p className="text-2xl font-bold">{totalQuestions}</p>
                <p className="text-xs text-muted-foreground mt-1">Last 120 days</p>
              </div>
              <BarChart2 className="size-8 text-primary opacity-20" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Pill Topics</p>
                <p className="text-2xl font-bold">{pillButtonQuestions}</p>
                <p className="text-xs text-muted-foreground mt-1">Button clicks</p>
              </div>
              <TrendingUp className="size-8 text-green-600 opacity-20" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Custom Questions</p>
                <p className="text-2xl font-bold">{customQuestions}</p>
                <p className="text-xs text-muted-foreground mt-1">User typed</p>
              </div>
              <AlertCircle className="size-8 text-blue-600 opacity-20" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Check-ins Saved</p>
                <p className="text-2xl font-bold">{totalCheckIns}</p>
                <p className="text-xs text-muted-foreground mt-1">Feelings tracked</p>
              </div>
              <Heart className="size-8 text-pink-600 opacity-20" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Frequent Topics Alert */}
      {frequentTopics.length > 0 && (
        <Card className="border-orange-200 bg-orange-50">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <AlertCircle className="size-5 text-orange-600" />
              High Engagement Topics (10+ questions)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {frequentTopics.map(({ topic, count }) => (
                <div key={topic} className="flex items-center justify-between p-2 bg-white rounded border border-orange-200">
                  <span className="text-sm font-medium">{topic}</span>
                  <span className="text-sm bg-orange-100 text-orange-700 px-2 py-1 rounded">
                    {count} questions
                  </span>
                </div>
              ))}
            </div>
            <p className="text-xs text-muted-foreground mt-3">
              💡 These topics show high user interest. Consider creating additional content or resources.
            </p>
          </CardContent>
        </Card>
      )}

      {/* All Topics Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Topic Breakdown</CardTitle>
          <p className="text-sm text-muted-foreground mt-1">
            Questions asked by topic in the last 120 days
          </p>
        </CardHeader>
        <CardContent>
          {sortedTopics.length > 0 ? (
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={sortedTopics} margin={{ top: 20, right: 30, left: 20, bottom: 80 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis 
                  dataKey="topic" 
                  angle={-45}
                  textAnchor="end"
                  height={100}
                  tick={{ fontSize: 12 }}
                  interval={0}
                />
                <YAxis 
                  label={{ value: 'Number of Questions', angle: -90, position: 'insideLeft', style: { fontSize: 12 } }}
                  tick={{ fontSize: 12 }}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #e5e7eb', 
                    borderRadius: '6px',
                    fontSize: '12px'
                  }}
                  formatter={(value: number) => [`${value} questions`, 'Count']}
                />
                <Bar dataKey="count" radius={[8, 8, 0, 0]}>
                  {sortedTopics.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.count >= 10 ? '#f97316' : 'hsl(var(--primary))'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="text-center py-8">
              <BarChart2 className="size-12 text-muted-foreground opacity-20 mx-auto mb-3" />
              <p className="text-sm text-muted-foreground">
                No questions tracked yet. Start using the AI Agent to see analytics here.
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Recent Questions Log */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Recent Questions</CardTitle>
          <p className="text-sm text-muted-foreground mt-1">
            Latest 10 questions asked
          </p>
        </CardHeader>
        <CardContent>
          {recentQuestions.length > 0 ? (
            <div className="space-y-2 max-h-[400px] overflow-y-auto">
              {recentQuestions.slice(0, 10).map((log, index) => {
                const date = new Date(log.timestamp);
                return (
                  <div key={index} className="p-3 border rounded-md">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{log.question}</p>
                        <div className="flex items-center gap-2 mt-1">
                          {log.isPillButton && (
                            <span className="text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded">
                              Pill Button
                            </span>
                          )}
                          <span className="text-xs text-muted-foreground">
                            {date.toLocaleDateString()} at {date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-sm text-muted-foreground">
                No questions logged yet.
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Check-in Stats */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Heart className="size-5 text-pink-600" />
            Sentiment Tracking
          </CardTitle>
          <p className="text-sm text-muted-foreground mt-1">
            Change can be hard. Your emotional journey and wellness insights matter. See what people are saying! We are all in this together.
          </p>
        </CardHeader>
        <CardContent>
          {totalCheckIns > 0 ? (
            <div className="space-y-6">
              {/* Sentiment Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="p-4 border rounded-lg">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="size-2 rounded-full bg-gray-400"></div>
                    <p className="text-xs text-muted-foreground">Total</p>
                  </div>
                  <p className="text-3xl font-bold">{totalCheckIns}</p>
                </div>
                <div className="p-4 border rounded-lg">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="size-2 rounded-full bg-green-500"></div>
                    <p className="text-xs text-muted-foreground">Positive</p>
                  </div>
                  <p className="text-3xl font-bold text-green-600">{positiveCheckIns}</p>
                </div>
                <div className="p-4 border rounded-lg">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="size-2 rounded-full bg-orange-500"></div>
                    <p className="text-xs text-muted-foreground">Negative</p>
                  </div>
                  <p className="text-3xl font-bold text-orange-600">{negativeCheckIns}</p>
                </div>
                <div className="p-4 border rounded-lg">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="size-2 rounded-full bg-gray-500"></div>
                    <p className="text-xs text-muted-foreground">Neutral</p>
                  </div>
                  <p className="text-3xl font-bold text-gray-600">{neutralCheckIns}</p>
                </div>
              </div>

              {/* Wellness Score */}
              <div className="p-4 border rounded-lg">
                <h3 className="font-semibold mb-3">Wellness Score</h3>
                <div className="relative">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-muted-foreground">0%</span>
                    <span className="text-2xl font-bold">{wellnessScore}%</span>
                    <span className="text-xs text-muted-foreground">100%</span>
                  </div>
                  <div className="h-6 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-green-500 via-teal-500 to-blue-500 rounded-full transition-all duration-500"
                      style={{ width: `${wellnessScore}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    Based on {positiveCheckIns} positive check-ins out of {totalCheckIns} total
                  </p>
                </div>
              </div>

              {/* Top Feelings and Positive Trend */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {/* Top Feelings */}
                <div className="p-4 border rounded-lg">
                  <h3 className="font-semibold mb-4">Top Feelings</h3>
                  <div className="space-y-3">
                    {topFeelings.map(({ feeling, count }) => {
                      const maxCount = topFeelings[0]?.count || 1;
                      const percentage = (count / maxCount) * 100;
                      const category = categorizeFeelings(feeling);
                      const barColor = category === 'positive' ? 'bg-green-500' : 
                                       category === 'negative' ? 'bg-orange-500' : 'bg-gray-400';
                      
                      return (
                        <div key={feeling}>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm font-medium">{feeling}</span>
                            <span className="text-sm font-semibold">{count}</span>
                          </div>
                          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                            <div 
                              className={`h-full ${barColor} rounded-full transition-all duration-500`}
                              style={{ width: `${percentage}%` }}
                            ></div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Positive Trend Placeholder */}
                <div className="p-4 border rounded-lg">
                  <h3 className="font-semibold mb-4">Positive Trend (last 3 months)</h3>
                  <div className="h-40 flex items-end justify-between gap-1">
                    {Array.from({ length: 30 }).map((_, i) => {
                      const height = Math.random() * 100;
                      return (
                        <div key={i} className="flex-1 bg-cyan-400 rounded-t" style={{ height: `${height}%` }}></div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Most Common Feeling */}
              {mostCommonFeeling && (
                <div className="p-6 border-2 rounded-lg bg-gradient-to-br from-yellow-50 to-orange-50">
                  <h3 className="font-semibold mb-3">Most Common Feeling</h3>
                  <div className="flex items-center gap-4">
                    <div className="text-6xl">{getEmojiForFeeling(mostCommonFeeling.feeling)}</div>
                    <div>
                      <p className="text-2xl font-bold">{mostCommonFeeling.feeling}</p>
                      <p className="text-sm text-muted-foreground">
                        You've felt this way {mostCommonFeeling.count} times
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Recent Check-ins */}
              <div>
                <h3 className="font-semibold mb-3">Recent Check-ins</h3>
                <div className="space-y-2 max-h-[500px] overflow-y-auto">
                  {recentCheckIns.slice(0, 10).map((log, index) => {
                    const date = new Date(log.timestamp);
                    const badge = getSentimentBadge(log.feeling);
                    return (
                      <div key={index} className="flex items-center gap-3 p-3 border rounded-lg hover:bg-accent/50 transition-colors">
                        <div className="text-3xl">{getEmojiForFeeling(log.feeling)}</div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium">{log.feeling || "No feeling selected"}</p>
                          <span className="text-xs text-muted-foreground">
                            {date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} at {date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </span>
                        </div>
                        <span className={`text-xs px-3 py-1 rounded-full ${badge.color}`}>
                          {badge.label}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <Heart className="size-12 text-muted-foreground opacity-20 mx-auto mb-3" />
              <p className="text-sm text-muted-foreground">
                No check-ins logged yet. Complete the "Checking-in" activity to track feelings.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
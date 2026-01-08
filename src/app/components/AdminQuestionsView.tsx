import { useState, useEffect } from 'react';
import { Search, Download, Filter, Clock, MessageSquare, User, ThumbsUp, ThumbsDown } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

interface ConversationLog {
  id: string;
  sessionId: string;
  userId: string;
  userTier: string;
  timestamp: number;
  userQuestion: string;
  aiResponse: string;
  pillButtonContext?: string;
  tokensUsed: number;
  conversationLength: number;
  dataConsent: boolean;
  feedback: "thumbs_up" | "thumbs_down" | null;
}

export function AdminQuestionsView() {
  const [conversations, setConversations] = useState<ConversationLog[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterTier, setFilterTier] = useState<string>('all');
  const [filterFeedback, setFilterFeedback] = useState<string>('all');

  useEffect(() => {
    // Load conversations from localStorage
    const stored = localStorage.getItem("conversationLogs");
    if (stored) {
      const logs = JSON.parse(stored);
      setConversations(logs.reverse()); // Show newest first
    }
  }, []);

  // Filter conversations
  const filteredConversations = conversations.filter(conv => {
    const matchesSearch = conv.userQuestion.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         conv.aiResponse.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTier = filterTier === 'all' || conv.userTier === filterTier;
    const matchesFeedback = filterFeedback === 'all' || 
                           (filterFeedback === 'positive' && conv.feedback === 'thumbs_up') ||
                           (filterFeedback === 'negative' && conv.feedback === 'thumbs_down') ||
                           (filterFeedback === 'no_feedback' && !conv.feedback);
    return matchesSearch && matchesTier && matchesFeedback;
  });

  const handleExport = () => {
    const dataStr = JSON.stringify(filteredConversations, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    const exportFileDefaultName = `conversations_export_${Date.now()}.json`;
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Admin: Question Logs</h1>
          <p className="text-muted-foreground">
            View and analyze all user questions for training data preparation
          </p>
        </div>
        <button 
          onClick={handleExport}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          <Download className="size-4" />
          Export Data
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Questions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{conversations.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">With Consent</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{conversations.filter(c => c.dataConsent).length}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {conversations.length > 0 ? ((conversations.filter(c => c.dataConsent).length / conversations.length) * 100).toFixed(0) : 0}% opted in
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Positive Feedback</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {conversations.filter(c => c.feedback === 'thumbs_up').length}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Negative Feedback</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {conversations.filter(c => c.feedback === 'thumbs_down').length}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-[200px]">
              <label className="block text-sm font-medium mb-2">Search Questions</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search questions or responses..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">User Tier</label>
              <select
                value={filterTier}
                onChange={(e) => setFilterTier(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Tiers</option>
                <option value="free">Free</option>
                <option value="solo">Solo</option>
                <option value="buddy">Buddy</option>
                <option value="team">Team</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Feedback</label>
              <select
                value={filterFeedback}
                onChange={(e) => setFilterFeedback(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Feedback</option>
                <option value="positive">👍 Positive</option>
                <option value="negative">👎 Negative</option>
                <option value="no_feedback">No Feedback</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Conversation List */}
      <Card>
        <CardHeader>
          <CardTitle>Conversations ({filteredConversations.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredConversations.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                No conversations found matching your filters
              </div>
            ) : (
              filteredConversations.map((conv) => (
                <div key={conv.id} className="border rounded-lg p-4 space-y-3">
                  {/* Header */}
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <div className="flex items-center gap-4">
                      <span className="flex items-center gap-1">
                        <Clock className="size-3" />
                        {new Date(conv.timestamp).toLocaleString()}
                      </span>
                      <span className="flex items-center gap-1">
                        <User className="size-3" />
                        {conv.userTier}
                      </span>
                      {conv.pillButtonContext && (
                        <span className="bg-purple-100 text-purple-700 px-2 py-0.5 rounded text-xs">
                          {conv.pillButtonContext}
                        </span>
                      )}
                      {conv.dataConsent && (
                        <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded text-xs">
                          ✓ Consent
                        </span>
                      )}
                    </div>
                    {conv.feedback && (
                      <div className={`flex items-center gap-1 ${
                        conv.feedback === 'thumbs_up' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {conv.feedback === 'thumbs_up' ? (
                          <><ThumbsUp className="size-3" /> Positive</>
                        ) : (
                          <><ThumbsDown className="size-3" /> Negative</>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Question */}
                  <div className="bg-blue-50 rounded-lg p-3">
                    <div className="text-xs font-medium text-blue-900 mb-1">User Question:</div>
                    <div className="text-sm text-blue-900">{conv.userQuestion}</div>
                  </div>

                  {/* Response */}
                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="text-xs font-medium text-gray-900 mb-1">AI Response:</div>
                    <div className="text-sm text-gray-700 line-clamp-3">{conv.aiResponse}</div>
                  </div>

                  {/* Metadata */}
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span>Tokens: {conv.tokensUsed}</span>
                    <span>Conversation length: {conv.conversationLength} messages</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

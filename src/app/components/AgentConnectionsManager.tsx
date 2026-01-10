import { X, Plus, Settings, Zap, CheckCircle, AlertCircle, Trash2, Link as LinkIcon, Lock, Shield, Brain, Sparkles } from 'lucide-react';
import { useState } from 'react';

export interface AgentConnection {
  id: string;
  name: string;
  type: 'REST_API' | 'MCP' | 'WEBHOOK' | 'LLM_DIRECT';
  endpoint: string;
  authMethod: 'API_KEY' | 'OAUTH' | 'BEARER' | 'NONE';
  apiKey?: string;
  capabilities: string[];
  status: 'active' | 'inactive' | 'error';
  description: string;
  avatar?: string;
  specialty: string;
}

interface AgentConnectionsManagerProps {
  isOpen: boolean;
  onClose: () => void;
  currentTier: 'Free' | 'Pro' | 'Team' | 'Enterprise' | 'Custom';
  onUpgradeClick?: () => void;
}

const TIER_LIMITS = {
  Free: 0,
  Pro: 3,
  Team: 10,
  Enterprise: 999,
  Custom: 999,
};

const SAMPLE_AGENT_MARKETPLACE = [
  {
    name: 'AI Engineer',
    type: 'LLM_DIRECT' as const,
    specialty: 'Information Architecture & Technology',
    description: 'Expert in system architecture, technical strategy, and engineering leadership',
    capabilities: ['architecture design', 'tech stack selection', 'scalability planning', 'security review'],
    avatar: '🔧'
  },
  {
    name: 'Workforce Development',
    type: 'MCP' as const,
    specialty: 'Human Resources & Talent',
    description: 'Expert in organizational development, talent management, and HR policy',
    capabilities: ['hiring strategies', 'performance management', 'culture building', 'conflict resolution'],
    avatar: '👥'
  },
  {
    name: 'Legal Advisor',
    type: 'REST_API' as const,
    specialty: 'Corporate Law & Compliance',
    description: 'Specialized in corporate governance, contracts, and regulatory compliance',
    capabilities: ['contract review', 'compliance checking', 'legal research', 'risk assessment']
  },
  {
    name: 'Financial Analyst',
    type: 'REST_API' as const,
    specialty: 'Finance & Strategy',
    description: 'Specialized in financial planning, budget analysis, and strategic forecasting',
    capabilities: ['budget analysis', 'financial forecasting', 'ROI calculation', 'cost optimization'],
    avatar: '💰'
  },
  {
    name: 'Data Scientist',
    type: 'MCP' as const,
    specialty: 'Analytics & Insights',
    description: 'Specialized in data analysis, ML/AI implementation, and metrics strategy',
    capabilities: ['data analysis', 'ML strategy', 'metrics design', 'predictive modeling'],
    avatar: '📊'
  },
  {
    name: 'Communications & Outreach',
    type: 'WEBHOOK' as const,
    specialty: 'Marketing & Growth',
    description: 'Expert in brand strategy, growth marketing, and customer acquisition',
    capabilities: ['brand strategy', 'growth hacking', 'customer acquisition', 'market research'],
    avatar: '📈'
  },
  {
    name: 'Agile Process Engineer',
    type: 'REST_API' as const,
    specialty: 'Operations & Efficiency',
    description: 'Expert guidance on process optimization, workflow design, operational efficiency, and continuous improvement',
    capabilities: ['process optimization', 'workflow design', 'efficiency analysis', 'lean methodology'],
    avatar: '⚙️'
  },
  {
    name: 'Health & Wellness Expert',
    type: 'MCP' as const,
    specialty: 'Holistic Well-Being',
    description: 'Guidance on mental health, relationships, fitness, and general wellness. Not a substitute for medical diagnosis.',
    capabilities: ['mental health support', 'relationship guidance', 'fitness planning', 'wellness strategies'],
    avatar: '🧘'
  }
];

export function AgentConnectionsManager({ isOpen, onClose, currentTier, onUpgradeClick }: AgentConnectionsManagerProps) {
  const [connections, setConnections] = useState<AgentConnection[]>([
    // Sample connected agent for demo
    {
      id: '1',
      name: 'Legal Advisor',
      type: 'REST_API',
      endpoint: 'https://api.legaladvisor.ai/v1/consult',
      authMethod: 'API_KEY',
      apiKey: '••••••••••••••••',
      capabilities: ['contract review', 'compliance checking', 'legal research', 'risk assessment'],
      status: 'active',
      description: 'Specialized in corporate governance, contracts, and regulatory compliance',
      specialty: 'Corporate Law & Compliance'
    }
  ]);

  const [showAddAgent, setShowAddAgent] = useState(false);
  const [showMarketplace, setShowMarketplace] = useState(false);

  const maxConnections = TIER_LIMITS[currentTier];
  const canAddMore = connections.length < maxConnections;

  const handleRemoveConnection = (id: string) => {
    setConnections(connections.filter(conn => conn.id !== id));
  };

  const handleTestConnection = (id: string) => {
    // Simulate testing connection
    setConnections(connections.map(conn => 
      conn.id === id ? { ...conn, status: 'active' as const } : conn
    ));
    alert('Connection test successful! ✓');
  };

  const handleAddFromMarketplace = (agent: typeof SAMPLE_AGENT_MARKETPLACE[0]) => {
    if (!canAddMore) {
      onUpgradeClick?.();
      return;
    }

    const newConnection: AgentConnection = {
      id: Date.now().toString(),
      name: agent.name,
      type: agent.type,
      endpoint: `https://api.${agent.name.toLowerCase().replace(/\s+/g, '')}.ai/v1/consult`,
      authMethod: 'API_KEY',
      capabilities: agent.capabilities,
      status: 'inactive',
      description: agent.description,
      avatar: agent.avatar,
      specialty: agent.specialty
    };

    setConnections([...connections, newConnection]);
    setShowMarketplace(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[110] p-3 sm:p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl w-full max-w-[820px] max-h-[90vh] overflow-y-auto shadow-2xl animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="sticky top-0 bg-gray-50 border-b border-gray-200 p-3 sm:p-4 rounded-t-2xl z-10">
          <button
            onClick={onClose}
            className="absolute top-3 right-3 p-1.5 hover:bg-gray-200 active:bg-gray-300 rounded-lg transition-colors touch-manipulation"
            aria-label="Close"
          >
            <X className="size-4 text-gray-600" />
          </button>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="bg-gray-700 p-1.5 rounded-lg">
                <Brain className="size-4 text-white" />
              </div>
              <div>
                <h2 className="text-sm font-semibold text-gray-900">Agent Connections</h2>
                <p className="text-xs text-gray-500">Multi-agent system</p>
              </div>
            </div>
            
            {/* Inline Usage Stats */}
            <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg px-3 py-1.5">
              <span className="text-xs text-gray-600">
                {connections.length} / {maxConnections === 999 ? '∞' : maxConnections}
              </span>
              <span className="text-xs text-gray-400">•</span>
              <span className="text-xs font-medium text-gray-700">
                {currentTier}
              </span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
          {/* Free Tier Upgrade Prompt */}
          {currentTier === 'Free' && (
            <div className="bg-gradient-to-br from-purple-50 to-blue-50 border-2 border-purple-300 rounded-xl p-4 sm:p-5">
              <div className="flex items-start gap-3">
                <Sparkles className="size-5 sm:size-6 text-purple-600 mt-0.5 flex-shrink-0" />
                <div className="flex-1">
                  <h3 className="font-bold text-base sm:text-lg text-gray-900 mb-2">
                    Unlock Multi-Agent Collaboration
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-700 mb-3 sm:mb-4">
                    Connect ORA with specialized AI agents to handle complex questions across different domains. 
                    Free users can view this feature but need to upgrade to connect agents.
                  </p>
                  <button
                    onClick={onUpgradeClick}
                    className="px-4 sm:px-5 py-2 sm:py-2.5 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold transition-colors text-xs sm:text-sm"
                  >
                    Upgrade to Pro →
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Subscribe Now Button */}
          <button
            onClick={onUpgradeClick}
            className="w-full px-5 sm:px-6 py-3 sm:py-4 bg-gradient-to-r from-purple-600 via-violet-600 to-purple-700 hover:from-purple-700 hover:via-violet-700 hover:to-purple-800 text-white rounded-xl font-bold transition-all flex items-center justify-center gap-2 sm:gap-3 shadow-[0_8px_30px_rgb(147,51,234,0.3)] hover:shadow-[0_12px_40px_rgb(147,51,234,0.4)] hover:scale-[1.02] active:scale-[0.98] text-base sm:text-lg"
          >
            <Sparkles className="size-5 sm:size-6" />
            Subscribe Now
          </button>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
            <button
              onClick={() => setShowMarketplace(!showMarketplace)}
              className="flex-1 px-3 sm:px-4 py-2.5 sm:py-3 bg-black hover:bg-gray-800 text-white rounded-xl font-semibold transition-all flex items-center justify-center gap-2 shadow-lg text-sm"
            >
              <Sparkles className="size-4 sm:size-5" />
              Browse Agent Marketplace
            </button>
            <button
              onClick={() => {
                if (!canAddMore) {
                  onUpgradeClick?.();
                  return;
                }
                setShowAddAgent(!showAddAgent);
              }}
              className={`px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 text-sm ${
                canAddMore 
                  ? 'bg-gray-100 hover:bg-gray-200 text-gray-900 border-2 border-gray-300' 
                  : 'bg-gray-100 text-gray-400 border-2 border-gray-200 cursor-not-allowed'
              }`}
            >
              <Plus className="size-4 sm:size-5" />
              Custom Agent
            </button>
          </div>

          {/* Marketplace */}
          {showMarketplace && (
            <div className="bg-gray-50 border-2 border-gray-300 rounded-xl p-4 sm:p-5">
              <h3 className="font-bold text-base sm:text-lg text-gray-900 mb-3 sm:mb-4 flex items-center gap-2">
                <Sparkles className="size-4 sm:size-5 text-gray-700" />
                Available Agents
              </h3>
              <div className="grid grid-cols-1 gap-3">
                {SAMPLE_AGENT_MARKETPLACE.map((agent, idx) => (
                  <div
                    key={idx}
                    className="bg-white border-2 border-gray-200 hover:border-gray-900 rounded-lg p-3 sm:p-4 transition-all cursor-pointer group"
                    onClick={() => handleAddFromMarketplace(agent)}
                  >
                    <div className="flex items-start gap-2 sm:gap-3">
                      <div className="text-2xl sm:text-3xl">{agent.avatar}</div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-sm sm:text-base text-gray-900">{agent.name}</h4>
                        <p className="text-[10px] sm:text-xs text-gray-600 font-medium mb-1">{agent.specialty}</p>
                        <p className="text-[10px] sm:text-xs text-gray-600 mb-2 line-clamp-2">{agent.description}</p>
                        <div className="flex flex-wrap gap-0.5">
                          {agent.capabilities.slice(0, 3).map((cap, i) => (
                            <span key={i} className="text-[9px] px-1.5 py-0.5 bg-gray-100 text-gray-700 rounded-full">
                              {cap}
                            </span>
                          ))}
                          {agent.capabilities.length > 3 && (
                            <span className="text-[9px] px-1.5 py-0.5 bg-gray-200 text-gray-600 rounded-full">
                              +{agent.capabilities.length - 3} more
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="text-gray-600 group-hover:text-gray-900">
                        <Plus className="size-4 sm:size-5" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Add Custom Agent Form */}
          {showAddAgent && (
            <div className="bg-gray-50 border-2 border-gray-300 rounded-xl p-5">
              <h3 className="font-bold text-lg text-gray-900 mb-4">Add Custom Agent</h3>
              <div className="space-y-3">
                <input
                  type="text"
                  placeholder="Agent Name"
                  className="w-full px-4 py-2.5 border-2 border-gray-300 rounded-lg text-sm focus:outline-none focus:border-purple-500"
                />
                <input
                  type="url"
                  placeholder="API Endpoint URL"
                  className="w-full px-4 py-2.5 border-2 border-gray-300 rounded-lg text-sm focus:outline-none focus:border-purple-500"
                />
                <select className="w-full px-4 py-2.5 border-2 border-gray-300 rounded-lg text-sm focus:outline-none focus:border-purple-500">
                  <option>Authentication Method</option>
                  <option>API Key</option>
                  <option>OAuth 2.0</option>
                  <option>Bearer Token</option>
                  <option>None</option>
                </select>
                <input
                  type="password"
                  placeholder="API Key / Token"
                  className="w-full px-4 py-2.5 border-2 border-gray-300 rounded-lg text-sm focus:outline-none focus:border-purple-500"
                />
                <textarea
                  placeholder="Agent capabilities (comma separated)"
                  rows={2}
                  className="w-full px-4 py-2.5 border-2 border-gray-300 rounded-lg text-sm focus:outline-none focus:border-purple-500"
                />
                <div className="flex gap-2">
                  <button className="flex-1 px-4 py-2.5 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold transition-colors">
                    Add Agent
                  </button>
                  <button 
                    onClick={() => setShowAddAgent(false)}
                    className="px-4 py-2.5 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg font-semibold transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Connected Agents List */}
          <div>
            <h3 className="font-bold text-lg text-gray-900 mb-4 flex items-center gap-2">
              <LinkIcon className="size-5 text-gray-700" />
              Connected Agents ({connections.length})
            </h3>

            {connections.length === 0 ? (
              <div className="text-center py-12 bg-gray-50 rounded-xl border-2 border-dashed border-gray-300">
                <Brain className="size-12 text-gray-400 mx-auto mb-3" />
                <p className="text-gray-600 font-medium">No agents connected yet</p>
                <p className="text-sm text-gray-500 mt-1">
                  Browse the marketplace or add a custom agent to get started
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {connections.map((connection) => (
                  <div
                    key={connection.id}
                    className="bg-white border border-gray-200 rounded-lg p-3 hover:border-gray-400 transition-all"
                  >
                    <div className="flex items-start gap-3">
                      {connection.avatar && (
                        <div className="text-2xl">{connection.avatar}</div>
                      )}
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2 mb-1">
                          <div className="flex-1 min-w-0">
                            <h4 className="font-bold text-sm text-gray-900 flex items-center gap-1.5">
                              {connection.name}
                              {connection.status === 'active' && (
                                <CheckCircle className="size-3.5 text-green-600 flex-shrink-0" />
                              )}
                            </h4>
                            <p className="text-[10px] text-gray-600 mt-0.5">{connection.specialty}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-3 text-[10px] text-gray-600 mb-2">
                          <span className="flex items-center gap-1">
                            <Zap className="size-3" />
                            {connection.type}
                          </span>
                          <span className="flex items-center gap-1">
                            <Shield className="size-3" />
                            {connection.authMethod}
                          </span>
                        </div>

                        <div className="flex flex-wrap gap-1 mb-2">
                          {connection.capabilities.map((cap, idx) => (
                            <span
                              key={idx}
                              className="text-[9px] px-1.5 py-0.5 bg-gray-100 text-gray-600 rounded-full"
                            >
                              {cap}
                            </span>
                          ))}
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleTestConnection(connection.id)}
                            className="px-2 py-1 bg-black hover:bg-gray-800 text-white rounded text-[10px] font-medium transition-colors"
                          >
                            Test
                          </button>
                          <button
                            onClick={() => handleRemoveConnection(connection.id)}
                            className="px-2 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded text-[10px] font-medium transition-colors"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Info Section */}
          <div className="bg-gray-50 border-2 border-gray-300 rounded-xl p-4">
            <h4 className="font-bold text-sm text-gray-900 mb-2 flex items-center gap-2">
              <Lock className="size-4 text-gray-700" />
              Security & Privacy
            </h4>
            <p className="text-xs text-gray-700">
              All agent connections are encrypted and authenticated. Agent API keys are stored securely 
              and never shared. Connected agents can only access the specific queries you route to them, 
              and all communication is logged for your security.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
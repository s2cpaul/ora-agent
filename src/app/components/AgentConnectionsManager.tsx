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
    name: 'Legal Advisor',
    type: 'REST_API' as const,
    specialty: 'Corporate Law & Compliance',
    description: 'Specialized in corporate governance, contracts, and regulatory compliance',
    capabilities: ['contract review', 'compliance checking', 'legal research', 'risk assessment']
  },
  {
    name: 'HR Strategist',
    type: 'MCP' as const,
    specialty: 'Human Resources & Talent',
    description: 'Expert in organizational development, talent management, and HR policy',
    capabilities: ['hiring strategies', 'performance management', 'culture building', 'conflict resolution'],
    avatar: '👥'
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
    name: 'Tech Architect',
    type: 'LLM_DIRECT' as const,
    specialty: 'Technology & Engineering',
    description: 'Expert in system architecture, technical strategy, and engineering leadership',
    capabilities: ['architecture design', 'tech stack selection', 'scalability planning', 'security review'],
    avatar: '🔧'
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
    name: 'Marketing Maven',
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
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-purple-600 to-blue-600 text-white p-6 rounded-t-2xl border-b border-purple-700 z-10">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-lg transition-colors"
            aria-label="Close"
          >
            <X className="size-5" />
          </button>
          
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-white/20 p-2 rounded-lg">
              <Brain className="size-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">Agent Connections</h2>
              <p className="text-sm text-purple-100">Multi-agent collaboration system</p>
            </div>
          </div>

          {/* Usage Stats */}
          <div className="mt-4 bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/20">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Connections Used</span>
              <span className="text-lg font-bold">
                {connections.length} / {maxConnections === 999 ? '∞' : maxConnections}
              </span>
            </div>
            <div className="w-full bg-white/20 rounded-full h-2 overflow-hidden">
              <div 
                className="bg-white h-full rounded-full transition-all"
                style={{ width: `${maxConnections === 999 ? 100 : (connections.length / maxConnections) * 100}%` }}
              />
            </div>
            <p className="text-xs text-purple-100 mt-2">
              {currentTier} Plan: {maxConnections === 999 ? 'Unlimited' : `Up to ${maxConnections}`} agent connections
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Free Tier Upgrade Prompt */}
          {currentTier === 'Free' && (
            <div className="bg-gradient-to-br from-purple-50 to-blue-50 border-2 border-purple-300 rounded-xl p-5">
              <div className="flex items-start gap-3">
                <Sparkles className="size-6 text-purple-600 mt-0.5 flex-shrink-0" />
                <div className="flex-1">
                  <h3 className="font-bold text-lg text-gray-900 mb-2">
                    Unlock Multi-Agent Collaboration
                  </h3>
                  <p className="text-sm text-gray-700 mb-4">
                    Connect ORA with specialized AI agents to handle complex questions across different domains. 
                    Free users can view this feature but need to upgrade to connect agents.
                  </p>
                  <button
                    onClick={onUpgradeClick}
                    className="px-5 py-2.5 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold transition-colors text-sm"
                  >
                    Upgrade to Pro →
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button
              onClick={() => setShowMarketplace(!showMarketplace)}
              className="flex-1 px-4 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-xl font-semibold transition-all flex items-center justify-center gap-2 shadow-lg"
            >
              <Sparkles className="size-5" />
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
              className={`px-4 py-3 rounded-xl font-semibold transition-all flex items-center gap-2 ${
                canAddMore 
                  ? 'bg-gray-100 hover:bg-gray-200 text-gray-900 border-2 border-gray-300' 
                  : 'bg-gray-100 text-gray-400 border-2 border-gray-200 cursor-not-allowed'
              }`}
            >
              <Plus className="size-5" />
              Custom Agent
            </button>
          </div>

          {/* Marketplace */}
          {showMarketplace && (
            <div className="bg-gradient-to-br from-purple-50 to-blue-50 border-2 border-purple-300 rounded-xl p-5">
              <h3 className="font-bold text-lg text-gray-900 mb-4 flex items-center gap-2">
                <Sparkles className="size-5 text-purple-600" />
                Available Agents
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {SAMPLE_AGENT_MARKETPLACE.map((agent, idx) => (
                  <div
                    key={idx}
                    className="bg-white border-2 border-gray-200 hover:border-purple-400 rounded-lg p-4 transition-all cursor-pointer group"
                    onClick={() => handleAddFromMarketplace(agent)}
                  >
                    <div className="flex items-start gap-3">
                      <div className="text-3xl">{agent.avatar}</div>
                      <div className="flex-1">
                        <h4 className="font-bold text-gray-900">{agent.name}</h4>
                        <p className="text-xs text-purple-600 font-medium mb-1">{agent.specialty}</p>
                        <p className="text-xs text-gray-600 mb-2">{agent.description}</p>
                        <div className="flex flex-wrap gap-1">
                          {agent.capabilities.slice(0, 3).map((cap, i) => (
                            <span key={i} className="text-xs px-2 py-0.5 bg-purple-100 text-purple-700 rounded-full">
                              {cap}
                            </span>
                          ))}
                          {agent.capabilities.length > 3 && (
                            <span className="text-xs px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full">
                              +{agent.capabilities.length - 3} more
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="text-purple-600 group-hover:text-purple-700">
                        <Plus className="size-5" />
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
                    className="bg-white border-2 border-gray-200 rounded-xl p-4 hover:border-purple-300 transition-all"
                  >
                    <div className="flex items-start gap-4">
                      {connection.avatar && (
                        <div className="text-4xl">{connection.avatar}</div>
                      )}
                      
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h4 className="font-bold text-gray-900 flex items-center gap-2">
                              {connection.name}
                              {connection.status === 'active' && (
                                <CheckCircle className="size-4 text-green-600" />
                              )}
                              {connection.status === 'error' && (
                                <AlertCircle className="size-4 text-red-600" />
                              )}
                            </h4>
                            <p className="text-xs text-purple-600 font-medium">{connection.specialty}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                              connection.status === 'active' 
                                ? 'bg-green-100 text-green-700' 
                                : connection.status === 'error'
                                ? 'bg-red-100 text-red-700'
                                : 'bg-gray-100 text-gray-700'
                            }`}>
                              {connection.status}
                            </span>
                          </div>
                        </div>

                        <p className="text-sm text-gray-600 mb-3">{connection.description}</p>

                        <div className="grid grid-cols-2 gap-2 text-xs mb-3">
                          <div className="flex items-center gap-1 text-gray-600">
                            <Zap className="size-3" />
                            <span className="font-medium">Type:</span> {connection.type}
                          </div>
                          <div className="flex items-center gap-1 text-gray-600">
                            <Shield className="size-3" />
                            <span className="font-medium">Auth:</span> {connection.authMethod}
                          </div>
                        </div>

                        <div className="mb-3">
                          <p className="text-xs font-medium text-gray-700 mb-2">Capabilities:</p>
                          <div className="flex flex-wrap gap-1">
                            {connection.capabilities.map((cap, idx) => (
                              <span
                                key={idx}
                                className="text-xs px-2 py-1 bg-purple-100 text-purple-700 rounded-full"
                              >
                                {cap}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="flex items-center gap-2 pt-3 border-t border-gray-200">
                          <button
                            onClick={() => handleTestConnection(connection.id)}
                            className="px-3 py-1.5 bg-purple-100 hover:bg-purple-200 text-purple-700 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1"
                          >
                            <Zap className="size-3" />
                            Test Connection
                          </button>
                          <button
                            className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1"
                          >
                            <Settings className="size-3" />
                            Configure
                          </button>
                          <button
                            onClick={() => handleRemoveConnection(connection.id)}
                            className="px-3 py-1.5 bg-red-100 hover:bg-red-200 text-red-700 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1 ml-auto"
                          >
                            <Trash2 className="size-3" />
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
          <div className="bg-blue-50 border-2 border-blue-300 rounded-xl p-4">
            <h4 className="font-bold text-sm text-gray-900 mb-2 flex items-center gap-2">
              <Lock className="size-4 text-blue-600" />
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
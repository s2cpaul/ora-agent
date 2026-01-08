import { Users, Brain, Loader2, CheckCircle, Sparkles } from 'lucide-react';
import { useEffect, useState } from 'react';

export interface CollaboratingAgent {
  name: string;
  avatar: string;
  status: 'thinking' | 'complete' | 'waiting';
  response?: string;
  specialty: string;
}

interface AgentCollaborationIndicatorProps {
  isCollaborating: boolean;
  collaboratingAgents?: CollaboratingAgent[];
  primaryAgent?: string;
  question?: string;
}

export function AgentCollaborationIndicator({ 
  isCollaborating, 
  collaboratingAgents = [],
  primaryAgent = 'ORA',
  question 
}: AgentCollaborationIndicatorProps) {
  const [dots, setDots] = useState('');

  useEffect(() => {
    if (!isCollaborating) return;
    
    const interval = setInterval(() => {
      setDots(prev => prev.length >= 3 ? '' : prev + '.');
    }, 500);

    return () => clearInterval(interval);
  }, [isCollaborating]);

  if (!isCollaborating && collaboratingAgents.length === 0) {
    return null;
  }

  return (
    <div className="space-y-3">
      {/* Main Collaboration Header */}
      {isCollaborating && (
        <div className="bg-gradient-to-r from-purple-100 to-blue-100 border-2 border-purple-300 rounded-xl p-4 shadow-sm animate-pulse">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Users className="size-6 text-purple-600" />
              <Sparkles className="size-3 text-blue-600 absolute -top-1 -right-1 animate-spin" />
            </div>
            <div className="flex-1">
              <h4 className="font-bold text-sm text-gray-900">
                Multi-Agent Collaboration Active{dots}
              </h4>
              <p className="text-xs text-gray-600">
                {primaryAgent} is consulting with {collaboratingAgents.length} specialized agent{collaboratingAgents.length !== 1 ? 's' : ''}
              </p>
            </div>
            <Loader2 className="size-5 text-purple-600 animate-spin" />
          </div>
        </div>
      )}

      {/* Individual Agent Status Cards */}
      {collaboratingAgents.length > 0 && (
        <div className="space-y-2">
          {collaboratingAgents.map((agent, idx) => (
            <div
              key={idx}
              className={`border-2 rounded-xl p-3 transition-all ${
                agent.status === 'complete' 
                  ? 'bg-green-50 border-green-300' 
                  : agent.status === 'thinking'
                  ? 'bg-purple-50 border-purple-300 animate-pulse'
                  : 'bg-gray-50 border-gray-300'
              }`}
            >
              <div className="flex items-start gap-3">
                <div className="text-2xl flex-shrink-0">{agent.avatar}</div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h5 className="font-bold text-sm text-gray-900">{agent.name}</h5>
                    {agent.status === 'thinking' && (
                      <Loader2 className="size-3 text-purple-600 animate-spin flex-shrink-0" />
                    )}
                    {agent.status === 'complete' && (
                      <CheckCircle className="size-3 text-green-600 flex-shrink-0" />
                    )}
                    {agent.status === 'waiting' && (
                      <div className="size-3 rounded-full bg-gray-400 flex-shrink-0" />
                    )}
                  </div>
                  
                  <p className="text-xs text-purple-600 font-medium mb-1">{agent.specialty}</p>
                  
                  <p className="text-xs text-gray-600">
                    {agent.status === 'thinking' && `Analyzing your question${dots}`}
                    {agent.status === 'waiting' && 'Queued...'}
                    {agent.status === 'complete' && 'Analysis complete'}
                  </p>

                  {/* Agent Response Preview */}
                  {agent.response && agent.status === 'complete' && (
                    <div className="mt-2 p-2 bg-white rounded-lg border border-green-200">
                      <p className="text-xs text-gray-700 italic">
                        "{agent.response.substring(0, 150)}{agent.response.length > 150 ? '...' : ''}"
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Synthesis Indicator */}
      {collaboratingAgents.every(a => a.status === 'complete') && collaboratingAgents.length > 0 && (
        <div className="bg-gradient-to-r from-green-100 to-blue-100 border-2 border-green-300 rounded-xl p-4 shadow-sm">
          <div className="flex items-center gap-3">
            <Brain className="size-6 text-green-600" />
            <div className="flex-1">
              <h4 className="font-bold text-sm text-gray-900">
                Synthesizing Responses
              </h4>
              <p className="text-xs text-gray-600">
                {primaryAgent} is combining insights from all agents to provide you with a comprehensive answer
              </p>
            </div>
            <Sparkles className="size-5 text-green-600 animate-pulse" />
          </div>
        </div>
      )}

      {/* Attribution Footer */}
      {!isCollaborating && collaboratingAgents.length > 0 && collaboratingAgents.every(a => a.status === 'complete') && (
        <div className="bg-gray-50 border border-gray-300 rounded-lg p-2">
          <p className="text-xs text-gray-600 text-center">
            <span className="font-semibold">Multi-Agent Response:</span> This answer was created by {primaryAgent} in collaboration with{' '}
            {collaboratingAgents.map(a => a.name).join(', ')}
          </p>
        </div>
      )}
    </div>
  );
}

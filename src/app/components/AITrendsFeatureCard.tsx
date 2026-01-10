import React from 'react';
import { X, Sparkles, Zap, Clock, Shield, Link2, Award } from 'lucide-react';

interface AITrendsFeatureCardProps {
  onClose: () => void;
}

export function AITrendsFeatureCard({ onClose }: AITrendsFeatureCardProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="w-full max-w-md bg-white dark:bg-gray-900 rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 p-6 text-white">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
              <Sparkles className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold">AI Trends RAG</h2>
          </div>
          <p className="text-white/90 text-sm">
            Real-time intelligence retrieval powered by Jina AI Reader
          </p>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
          {/* Key Features */}
          <section>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              Key Features
            </h3>
            <div className="space-y-3">
              <FeatureItem
                icon={<Zap className="w-4 h-4" />}
                title="Automatic Detection"
                description="Detects AI questions using 25+ keywords"
              />
              <FeatureItem
                icon={<Zap className="w-4 h-4" />}
                title="Parallel Retrieval"
                description="Fetches from both sources simultaneously"
              />
              <FeatureItem
                icon={<Clock className="w-4 h-4" />}
                title="Real-Time Content"
                description="Always fresh, up-to-date AI information"
              />
              <FeatureItem
                icon={<Shield className="w-4 h-4" />}
                title="Graceful Fallback"
                description="Shows source links if retrieval fails"
              />
              <FeatureItem
                icon={<Shield className="w-4 h-4" />}
                title="Non-Blocking"
                description="Doesn't interfere with existing functionality"
              />
              <FeatureItem
                icon={<Award className="w-4 h-4" />}
                title="Source Attribution"
                description="Always credits Forbes & MIT Tech Review"
              />
            </div>
          </section>

          {/* How It Works */}
          <section>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2">
              <Link2 className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              How It Works
            </h3>
            
            {/* Priority System */}
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 mb-4">
              <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                Priority System
              </h4>
              <div className="space-y-2">
                <PriorityStep number="1" label="Special handlers" secondary="News, Training, etc." />
                <PriorityStep number="2" label="Multi-agent collaboration" />
                <PriorityStep number="3" label="AI Trends RAG" isNew />
                <PriorityStep number="4" label="Keyword topics" />
                <PriorityStep number="5" label="Generic fallback" />
              </div>
            </div>

            {/* RAG Enhancement */}
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/30 dark:to-purple-950/30 rounded-lg p-4 border border-blue-200 dark:border-blue-800">
              <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-2">
                <span className="text-lg">🔍</span>
                RAG Enhancement
              </h4>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 dark:text-blue-400 mt-0.5">•</span>
                  <span>Detects questions about AI trends, companies, innovations</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-600 dark:text-purple-400 mt-0.5">•</span>
                  <span>Retrieves real content from configured sources</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-pink-600 dark:text-pink-400 mt-0.5">•</span>
                  <span>Provides context-rich, citation-backed responses</span>
                </li>
              </ul>
            </div>
          </section>

          {/* Sources */}
          <section className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
            <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
              📊 Configured Sources
            </h4>
            <div className="space-y-2">
              <a
                href="https://www.forbes.com/lists/ai50/"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-sm text-blue-600 dark:text-blue-400 hover:underline"
              >
                → Forbes AI 50
              </a>
              <a
                href="https://www.technologyreview.com/topic/artificial-intelligence/"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-sm text-blue-600 dark:text-blue-400 hover:underline"
              >
                → MIT Technology Review - AI
              </a>
            </div>
          </section>
        </div>

        {/* Footer */}
        <div className="p-4 bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
          <button
            onClick={onClose}
            className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg"
          >
            Got it!
          </button>
        </div>
      </div>
    </div>
  );
}

// Helper Components
interface FeatureItemProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

function FeatureItem({ icon, title, description }: FeatureItemProps) {
  return (
    <div className="flex items-start gap-3">
      <div className="mt-0.5 text-green-600 dark:text-green-400">
        <span className="text-base">✅</span>
      </div>
      <div className="flex-1">
        <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
          {title}
        </div>
        <div className="text-xs text-gray-600 dark:text-gray-400">
          {description}
        </div>
      </div>
    </div>
  );
}

interface PriorityStepProps {
  number: string;
  label: string;
  secondary?: string;
  isNew?: boolean;
}

function PriorityStep({ number, label, secondary, isNew }: PriorityStepProps) {
  return (
    <div className="flex items-center gap-3 text-sm">
      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-600 dark:bg-blue-500 text-white flex items-center justify-center text-xs font-bold">
        {number}
      </div>
      <div className="flex-1">
        <span className="text-gray-700 dark:text-gray-300 font-medium">
          {label}
        </span>
        {secondary && (
          <span className="text-gray-500 dark:text-gray-500 text-xs ml-1">
            ({secondary})
          </span>
        )}
        {isNew && (
          <span className="ml-2 inline-flex items-center gap-1 px-2 py-0.5 bg-gradient-to-r from-orange-500 to-pink-500 text-white text-xs font-bold rounded-full">
            ⭐ NEW!
          </span>
        )}
      </div>
    </div>
  );
}
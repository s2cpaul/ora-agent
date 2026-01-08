/**
 * ORA - AI Leadership Agent
 * Copyright (c) 2024-2026 s2cpaul
 * Licensed under MIT License
 * Repository: https://github.com/s2cpaul/ora-agent
 */

import { 
  Download, 
  FileText, 
  BookOpen, 
  Code, 
  Settings,
  Database,
  Lock,
  Rocket,
  CheckCircle2,
  ExternalLink,
  FileCode,
  FileJson,
  File
} from 'lucide-react';
import { useState } from 'react';

interface DownloadItem {
  title: string;
  description: string;
  icon: any;
  files: {
    name: string;
    path: string;
    type: 'md' | 'json' | 'ts' | 'sql' | 'env';
    size?: string;
  }[];
  category: 'documentation' | 'setup' | 'development' | 'database';
}

export function DownloadsPage() {
  const [userEmail, setUserEmail] = useState('');
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [showEmailPrompt, setShowEmailPrompt] = useState(false);

  const handleEmailVerification = () => {
    if (userEmail.toLowerCase() === 'carapaulson1@gmail.com') {
      setIsEmailVerified(true);
      setShowEmailPrompt(false);
    } else {
      alert('Access denied. File downloads are restricted to authorized users only.');
    }
  };

  const downloads: DownloadItem[] = [
    {
      title: 'Complete Project Overview',
      description: 'Comprehensive guide to all UI pages, components, features, and architecture',
      icon: BookOpen,
      category: 'documentation',
      files: [
        { name: 'PROJECT_OVERVIEW.md', path: '/PROJECT_OVERVIEW.md', type: 'md', size: '45 KB' },
      ],
    },
    {
      title: 'Quick Setup Guide',
      description: 'Get started in 5 minutes with Visual Studio Copilot',
      icon: Rocket,
      category: 'setup',
      files: [
        { name: 'QUICK_COPILOT_SETUP.md', path: '/QUICK_COPILOT_SETUP.md', type: 'md', size: '18 KB' },
        { name: 'SETUP_CHECKLIST.md', path: '/SETUP_CHECKLIST.md', type: 'md', size: '12 KB' },
      ],
    },
    {
      title: 'Analytics & Data Tracking',
      description: 'Complete analytics setup with SQL schemas and implementation guide',
      icon: Database,
      category: 'database',
      files: [
        { name: 'ANALYTICS_SETUP.md', path: '/ANALYTICS_SETUP.md', type: 'md', size: '28 KB' },
        { name: 'analytics.ts', path: '/src/app/utils/analytics.ts', type: 'ts', size: '15 KB' },
      ],
    },
    {
      title: 'Credentials & Security',
      description: 'Secure credential management and environment configuration',
      icon: Lock,
      category: 'setup',
      files: [
        { name: 'CREDENTIALS_GUIDE.md', path: '/CREDENTIALS_GUIDE.md', type: 'md', size: '22 KB' },
        { name: '.env.example', path: '/.env.example', type: 'env', size: '2 KB' },
        { name: 'SECURITY_REMINDER.md', path: '/.vscode/SECURITY_REMINDER.md', type: 'md', size: '8 KB' },
      ],
    },
    {
      title: 'VS Code Configuration',
      description: 'Editor settings, extensions, and Copilot instructions',
      icon: Code,
      category: 'development',
      files: [
        { name: 'copilot-instructions.md', path: '/.github/copilot-instructions.md', type: 'md', size: '35 KB' },
        { name: 'settings.json', path: '/.vscode/settings.json', type: 'json', size: '4 KB' },
        { name: 'extensions.json', path: '/.vscode/extensions.json', type: 'json', size: '3 KB' },
      ],
    },
    {
      title: 'Configuration Files',
      description: 'Central configuration and Supabase client setup',
      icon: Settings,
      category: 'development',
      files: [
        { name: 'config.ts', path: '/src/lib/config.ts', type: 'ts', size: '8 KB' },
        { name: 'supabase.ts', path: '/src/lib/supabase.ts', type: 'ts', size: '2 KB' },
      ],
    },
  ];

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'md':
        return FileText;
      case 'json':
        return FileJson;
      case 'ts':
        return FileCode;
      case 'sql':
        return Database;
      case 'env':
        return Lock;
      default:
        return File;
    }
  };

  const getFileColor = (type: string) => {
    switch (type) {
      case 'md':
        return 'text-blue-600 dark:text-blue-400';
      case 'json':
        return 'text-yellow-600 dark:text-yellow-400';
      case 'ts':
        return 'text-blue-500 dark:text-blue-300';
      case 'sql':
        return 'text-green-600 dark:text-green-400';
      case 'env':
        return 'text-red-600 dark:text-red-400';
      default:
        return 'text-gray-600 dark:text-gray-400';
    }
  };

  const handleDownload = (path: string, fileName: string) => {
    if (!isEmailVerified) {
      setShowEmailPrompt(true);
      return;
    }
    // In a real implementation, this would fetch the file and trigger download
    // For now, we'll show the file path
    alert(`Download: ${fileName}\nPath: ${path}\n\nIn production, this will download the actual file.`);
  };

  const categories = [
    { id: 'documentation', label: 'Documentation', icon: BookOpen, color: 'blue' },
    { id: 'setup', label: 'Setup Guides', icon: Rocket, color: 'green' },
    { id: 'development', label: 'Development', icon: Code, color: 'purple' },
    { id: 'database', label: 'Database', icon: Database, color: 'orange' },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-950/20 dark:to-blue-950/20 border-b">
        <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center justify-center size-16 bg-purple-600 rounded-2xl mb-6">
              <Download className="size-8 text-white" />
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">
              Developer Downloads
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Everything you need to understand, deploy, and customize ORA. Complete documentation, setup guides, and configuration files.
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
            {categories.map(category => {
              const Icon = category.icon;
              const count = downloads.filter(d => d.category === category.id).length;
              return (
                <div key={category.id} className="bg-white/50 dark:bg-white/5 backdrop-blur-sm border rounded-xl p-4 text-center">
                  <Icon className={`size-6 mx-auto mb-2 text-${category.color}-600 dark:text-${category.color}-400`} />
                  <div className="text-2xl font-bold">{count}</div>
                  <div className="text-xs text-muted-foreground">{category.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Downloads Grid */}
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="space-y-8">
          {categories.map(category => {
            const categoryDownloads = downloads.filter(d => d.category === category.id);
            if (categoryDownloads.length === 0) return null;

            const CategoryIcon = category.icon;

            return (
              <div key={category.id}>
                {/* Category Header */}
                <div className="flex items-center gap-3 mb-6">
                  <CategoryIcon className={`size-6 text-${category.color}-600 dark:text-${category.color}-400`} />
                  <h2 className="text-2xl font-bold">{category.label}</h2>
                  <div className="flex-1 h-px bg-border ml-4" />
                </div>

                {/* Download Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {categoryDownloads.map((download, idx) => {
                    const Icon = download.icon;
                    return (
                      <div
                        key={idx}
                        className="bg-card border rounded-xl p-6 hover:shadow-lg transition-shadow"
                      >
                        {/* Card Header */}
                        <div className="flex items-start gap-4 mb-4">
                          <div className="size-12 bg-gradient-to-br from-purple-100 to-blue-100 dark:from-purple-900/30 dark:to-blue-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                            <Icon className="size-6 text-purple-600 dark:text-purple-400" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="text-lg font-semibold mb-1">{download.title}</h3>
                            <p className="text-sm text-muted-foreground">{download.description}</p>
                          </div>
                        </div>

                        {/* Files List */}
                        <div className="space-y-2">
                          {download.files.map((file, fileIdx) => {
                            const FileIcon = getFileIcon(file.type);
                            const fileColor = getFileColor(file.type);
                            
                            return (
                              <button
                                key={fileIdx}
                                onClick={() => handleDownload(file.path, file.name)}
                                className="w-full flex items-center gap-3 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors group"
                              >
                                <FileIcon className={`size-5 ${fileColor} flex-shrink-0`} />
                                <div className="flex-1 text-left min-w-0">
                                  <div className="text-sm font-medium truncate">{file.name}</div>
                                  {file.size && (
                                    <div className="text-xs text-muted-foreground">{file.size}</div>
                                  )}
                                </div>
                                <Download className="size-4 text-muted-foreground group-hover:text-foreground transition-colors flex-shrink-0" />
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* Help Section */}
        <div className="mt-16 bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-950/20 dark:to-blue-950/20 border rounded-2xl p-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-4">Need Help Getting Started?</h2>
            <p className="text-muted-foreground mb-6">
              Start with <strong>QUICK_COPILOT_SETUP.md</strong> for a 5-minute setup guide, then review <strong>PROJECT_OVERVIEW.md</strong> to understand all available features.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
              <div className="flex flex-col items-center gap-2">
                <div className="size-12 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                  <CheckCircle2 className="size-6 text-green-600 dark:text-green-400" />
                </div>
                <div className="text-sm font-medium">1. Download Setup Guide</div>
              </div>
              
              <div className="flex flex-col items-center gap-2">
                <div className="size-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                  <CheckCircle2 className="size-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="text-sm font-medium">2. Configure VS Code</div>
              </div>
              
              <div className="flex flex-col items-center gap-2">
                <div className="size-12 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center">
                  <CheckCircle2 className="size-6 text-purple-600 dark:text-purple-400" />
                </div>
                <div className="text-sm font-medium">3. Deploy in 5 Minutes</div>
              </div>
            </div>

            <div className="mt-8 flex justify-center gap-4">
              <a
                href="https://calendly.com/caraz007"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium"
              >
                <ExternalLink className="size-4" />
                Schedule Consultation
              </a>
              <button
                onClick={() => window.open('mailto:carapaulson1@gmail.com', '_blank')}
                className="inline-flex items-center gap-2 px-6 py-3 border border-border rounded-lg hover:bg-muted transition-colors font-medium"
              >
                <ExternalLink className="size-4" />
                Contact Support
              </button>
            </div>
          </div>
        </div>

        {/* Additional Resources */}
        <div className="mt-12 border-t pt-12">
          <h2 className="text-2xl font-bold mb-6 text-center">Additional Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <a
              href="https://github.com/supabase/supabase"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-4 p-6 border rounded-xl hover:shadow-lg transition-shadow group"
            >
              <Database className="size-8 text-green-600 dark:text-green-400 flex-shrink-0" />
              <div className="flex-1">
                <h3 className="font-semibold mb-1 group-hover:text-primary transition-colors">Supabase Docs</h3>
                <p className="text-sm text-muted-foreground">Database, auth, and edge functions documentation</p>
              </div>
              <ExternalLink className="size-4 text-muted-foreground group-hover:text-foreground transition-colors" />
            </a>

            <a
              href="https://stripe.com/docs"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-4 p-6 border rounded-xl hover:shadow-lg transition-shadow group"
            >
              <Lock className="size-8 text-purple-600 dark:text-purple-400 flex-shrink-0" />
              <div className="flex-1">
                <h3 className="font-semibold mb-1 group-hover:text-primary transition-colors">Stripe Integration</h3>
                <p className="text-sm text-muted-foreground">Payment processing and subscription management</p>
              </div>
              <ExternalLink className="size-4 text-muted-foreground group-hover:text-foreground transition-colors" />
            </a>

            <a
              href="https://platform.openai.com/docs"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-4 p-6 border rounded-xl hover:shadow-lg transition-shadow group"
            >
              <Code className="size-8 text-blue-600 dark:text-blue-400 flex-shrink-0" />
              <div className="flex-1">
                <h3 className="font-semibold mb-1 group-hover:text-primary transition-colors">OpenAI API</h3>
                <p className="text-sm text-muted-foreground">AI model integration and prompt engineering</p>
              </div>
              <ExternalLink className="size-4 text-muted-foreground group-hover:text-foreground transition-colors" />
            </a>
          </div>
        </div>
      </div>

      {/* Email Verification Modal */}
      {showEmailPrompt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-background border rounded-xl p-6 max-w-md w-full mx-4 shadow-2xl">
            <div className="flex items-start gap-3 mb-4">
              <Lock className="size-6 text-red-600 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <h3 className="text-lg font-semibold mb-2">File Download Restricted</h3>
                <p className="text-sm text-muted-foreground">
                  File downloads are restricted to authorized users only. Please verify your email to continue.
                </p>
              </div>
            </div>

            <div className="space-y-3 mb-4">
              <label htmlFor="download-email" className="text-sm font-medium">
                Enter your email to access downloads:
              </label>
              <input
                id="download-email"
                type="email"
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
                placeholder="email@example.com"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleEmailVerification();
                  }
                }}
              />
            </div>

            <div className="flex gap-2">
              <button
                onClick={handleEmailVerification}
                className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium"
              >
                Verify Access
              </button>
              <button
                onClick={() => {
                  setShowEmailPrompt(false);
                  setUserEmail('');
                }}
                className="px-4 py-2 border border-border rounded-lg hover:bg-muted transition-colors font-medium"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Access Status Indicator */}
      {isEmailVerified && (
        <div className="fixed bottom-4 right-4 z-40 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 shadow-lg max-w-sm">
          <div className="flex items-start gap-3">
            <CheckCircle2 className="size-5 text-green-600 mt-0.5 flex-shrink-0" />
            <div className="flex-1">
              <p className="text-sm font-medium text-green-800 dark:text-green-300">
                Download Access Granted
              </p>
              <p className="text-xs text-green-700 dark:text-green-400">
                You can now download all files
              </p>
            </div>
            <button
              onClick={() => {
                setIsEmailVerified(false);
                setUserEmail('');
              }}
              className="text-green-700 dark:text-green-400 hover:text-green-900 dark:hover:text-green-200"
            >
              <Lock className="size-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
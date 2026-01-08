/**
 * ORA - AI Leadership Agent
 * Copyright (c) 2024-2026 s2cpaul
 * Licensed under MIT License
 * Repository: https://github.com/s2cpaul/ora-agent
 */

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Button } from './ui/button';
import { 
  Settings, 
  Library, 
  Newspaper, 
  Video, 
  Calendar, 
  Mail, 
  User, 
  AlertTriangle,
  CheckCircle2,
  Lock,
  Download,
  FileText,
  ExternalLink,
  Rocket,
  Zap,
  Shield,
  Languages,
  Users,
  TrendingUp,
  Link as LinkIcon,
  Lightbulb
} from 'lucide-react';

interface ConfigState {
  issueEmail: string;
  newsSource: string;
  library: string;
  videoService: string;
  calendar: string;
  subscriberEmail: string;
  avatarId: string;
  personaVideo: string;
  mailingAddress: string;
}

export function ConfigurationPage() {
  const [userEmail, setUserEmail] = useState('');
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [showEmailPrompt, setShowEmailPrompt] = useState(false);

  // Mock configuration state - in real app, this would come from localStorage
  const [config] = useState<ConfigState>({
    issueEmail: '',
    newsSource: 'War on the Rocks',
    library: '',
    videoService: 'FaceTime',
    calendar: 'Calendly',
    subscriberEmail: '',
    avatarId: '',
    personaVideo: '',
    mailingAddress: 'DEPARTMENT OF THE NAVY HEADQUARTERS UNITED STATES MARINE CORPS TRAINING AND EDUCATION COMMAND 2007 ELLIOT ROAD QUANTICO, VA 22134'
  });

  const handleEmailVerification = () => {
    if (userEmail.toLowerCase() === 'carapaulson1@gmail.com') {
      setIsEmailVerified(true);
      setShowEmailPrompt(false);
    } else {
      alert('Access denied. This files area is restricted.');
    }
  };

  const mockFiles = [
    { name: 'ORA_Configuration_Template.pdf', size: '2.4 MB', date: '2026-01-08' },
    { name: 'Multi_Agent_Setup_Guide.docx', size: '1.8 MB', date: '2026-01-07' },
    { name: 'Training_Materials_Package.zip', size: '15.2 MB', date: '2026-01-05' },
    { name: 'Integration_Specifications.pdf', size: '3.1 MB', date: '2026-01-03' }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-background to-background py-12 px-4 border-b">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full mb-4">
              <Settings className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">ORA - AI Leadership Agent</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Multi-Agent Configuration
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-4">
              Observe • Respond • Act
            </p>
            <p className="text-lg text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              Your Personal AI Leadership Agent
            </p>
          </div>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
            <div className="bg-white/40 dark:bg-white/5 backdrop-blur-sm border border-gray-400 dark:border-white/10 rounded-lg p-6">
              <div className="flex items-start gap-3">
                <Zap className="size-6 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold mb-2">Speed & Precision</h3>
                  <p className="text-sm text-muted-foreground">
                    Enables faster decisions and reduces operational friction through seamless integration.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white/40 dark:bg-white/5 backdrop-blur-sm border border-gray-400 dark:border-white/10 rounded-lg p-6">
              <div className="flex items-start gap-3">
                <Shield className="size-6 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold mb-2">Interoperability</h3>
                  <p className="text-sm text-muted-foreground">
                    Synchronizes data, workflows, and platforms across multiple operational domains.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Quick Start Banner */}
          <Card className="border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <Rocket className="size-8 text-gray-600 dark:text-gray-400 flex-shrink-0 mt-1 stroke-2" />
                <div className="flex-1">
                  <h3 className="font-semibold text-lg mb-2 text-gray-900 dark:text-white">Client-Side Custom Configuration</h3>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">
                    Fast, easy setup with no server required! From your mobile device, configure your preferences, integrations, and tools directly in your browser for instant personalization.
                  </p>
                  <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 space-y-2">
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      Check out the <Lightbulb className="inline-block size-4 mx-1 text-gray-600 dark:text-gray-400 stroke-2" /> icon to configure and the <Settings className="inline-block size-4 mx-1 text-gray-600 dark:text-gray-400 stroke-2" /> gear to manage multi-agent custom connections with Subject Matter Experts!
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Multi-Agent Collaboration Notice */}
          <Card className="border-green-500/50 bg-gradient-to-r from-green-500/5 to-transparent">
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="bg-green-500 text-white px-2 py-1 rounded text-xs font-bold">NEW!</div>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg mb-2">Multi-Agent Collaboration Available</h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    Try asking about compliance, legal, budget, or hiring to see specialist agents collaborate on your question!
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Click the <Settings className="inline-block size-4 mx-1" /> icon above to manage connections. Visit Multi-Agent Features in the header to learn more.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Configuration Instructions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="size-5" />
                Configuration Instructions
              </CardTitle>
              <CardDescription>
                Customize your News, Library, Video, Calendar connections and Subscriber Email for AI reports by typing commands in the chat.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Library Configuration */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 font-semibold">
                  <Library className="size-5 text-primary" />
                  <h4>Configure Context Library:</h4>
                </div>
                <p className="text-sm text-muted-foreground">Type or paste in the chat:</p>
                <div className="bg-muted/50 rounded-lg p-4 space-y-2 font-mono text-sm">
                  <p>"connect library to SharePoint"</p>
                  <p>"connect library to OneDrive"</p>
                  <p>"connect library to Google Drive"</p>
                  <p>"connect library to Salesforce"</p>
                  <p>"connect library to https://yourcompany.sharepoint.com..."</p>
                </div>
              </div>

              {/* News Configuration */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 font-semibold">
                  <Newspaper className="size-5 text-primary" />
                  <h4>Configure News:</h4>
                </div>
                <p className="text-sm text-muted-foreground">Default: War on the Rocks (pre-configured). To change, type:</p>
                <div className="bg-muted/50 rounded-lg p-4 space-y-2 font-mono text-sm">
                  <p>"connect news to https://warontherocks.com/?utm_source=copilot.com"</p>
                  <p>"connect news to CNN"</p>
                  <p>"connect news to TechCrunch"</p>
                  <p>"connect news to https://yournewssite.com"</p>
                </div>
              </div>

              {/* Video Configuration */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 font-semibold">
                  <Video className="size-5 text-primary" />
                  <h4>Configure Video Conferencing:</h4>
                </div>
                <p className="text-sm text-muted-foreground">Type or paste in the chat:</p>
                <div className="bg-muted/50 rounded-lg p-4 space-y-2 font-mono text-sm">
                  <p>"connect video to Microsoft Teams"</p>
                  <p>"connect video to FaceTime"</p>
                  <p>"connect video to Zoom"</p>
                  <p>"connect video to Google Meet"</p>
                  <p>"connect video to Webex"</p>
                  <p>"connect video to https://yourvideoconferencing.com"</p>
                </div>
              </div>

              {/* Calendar Configuration */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 font-semibold">
                  <Calendar className="size-5 text-primary" />
                  <h4>Configure Calendar:</h4>
                </div>
                <p className="text-sm text-muted-foreground">Type or paste in the chat:</p>
                <div className="bg-muted/50 rounded-lg p-4 space-y-2 font-mono text-sm">
                  <p>"connect calendar to Calendly"</p>
                  <p>"connect calendar to Google Calendar"</p>
                  <p>"connect calendar to Outlook"</p>
                  <p>"connect calendar to Microsoft Calendar"</p>
                  <p>"connect calendar to https://yourcalendarservice.com"</p>
                </div>
              </div>

              {/* Custom Video Content */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 font-semibold">
                  <Video className="size-5 text-primary" />
                  <h4>Add Custom Video Content:</h4>
                  <span className="text-xs bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300 px-2 py-1 rounded">Premium Feature</span>
                </div>
                <p className="text-sm text-muted-foreground">Add your own videos to the rotation:</p>
                <div className="bg-muted/50 rounded-lg p-4 space-y-2 font-mono text-sm">
                  <p>"add video https://yoursite.com/video.mp4"</p>
                  <p>"add video https://storage.example.com/training.mp4"</p>
                  <p>"include video https://cdn.example.com/content.mp4"</p>
                </div>
                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-3">
                  <p className="text-sm text-blue-800 dark:text-blue-300">
                    ℹ️ Custom videos will be added to the video rotation and play alongside default content.
                  </p>
                </div>
              </div>

              {/* Subscriber Email */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 font-semibold">
                  <Mail className="size-5 text-primary" />
                  <h4>Configure Subscriber Email (AI Reports):</h4>
                </div>
                <p className="text-sm text-muted-foreground">Type or paste in the chat:</p>
                <div className="bg-muted/50 rounded-lg p-4 space-y-2 font-mono text-sm">
                  <p>"set email to yourname@example.com"</p>
                  <p>"configure subscriber email admin@company.com"</p>
                  <p>"send reports to support@organization.mil"</p>
                </div>
              </div>

              {/* AI Avatar */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 font-semibold">
                  <User className="size-5 text-primary" />
                  <h4>Configure AI Avatar:</h4>
                </div>
                <p className="text-sm text-muted-foreground">Type or paste in the chat:</p>
                <div className="bg-muted/50 rounded-lg p-4 space-y-2 font-mono text-sm">
                  <p>"set avatar id to abc123xyz"</p>
                  <p>"configure avatar persona video with professional tone, friendly demeanor, and natural gestures for engaging user interactions with a brief intro of 30-40 words."</p>
                  <p>"configure avatar persona video with professional tone, friendly demeanor, and natural gestures for engaging user interactions with a brief intro of 60-70 words."</p>
                </div>
              </div>

              {/* Persona Video Link */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 font-semibold">
                  <LinkIcon className="size-5 text-primary" />
                  <h4>Configure Persona Video Link:</h4>
                </div>
                <p className="text-sm text-muted-foreground">Type or paste in the chat:</p>
                <div className="bg-muted/50 rounded-lg p-4 space-y-2 font-mono text-sm">
                  <p>"set persona video 1 to https://yourpersona.com/profile"</p>
                  <p>"set persona video 2 link https://yourpersona.com/persona/abc123"</p>
                  <p>"set persona video 3 link https://avatar.service.com/v1/persona/xyz789"</p>
                </div>
              </div>

              {/* Issue Reporting Email */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 font-semibold">
                  <AlertTriangle className="size-5 text-primary" />
                  <h4>Configure Issue Reporting E-mail:</h4>
                </div>
                <p className="text-sm text-muted-foreground">Type or paste in the chat:</p>
                <div className="bg-muted/50 rounded-lg p-4 space-y-2 font-mono text-sm">
                  <p>"set issue reporting email to issues@example.com"</p>
                  <p>"configure issue email support@company.com"</p>
                  <p>"set issue reporting to security@organization.mil"</p>
                </div>
              </div>

              {/* Incident Reporting Mailing Address */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 font-semibold">
                  <Mail className="size-5 text-primary" />
                  <h4>Configure Incident Reporting Mailing Address:</h4>
                </div>
                <div className="bg-muted/50 rounded-lg p-4 font-mono text-sm">
                  <p>DEPARTMENT OF THE NAVY</p>
                  <p>HEADQUARTERS UNITED STATES MARINE CORPS</p>
                  <p>TRAINING AND EDUCATION COMMAND</p>
                  <p>2007 ELLIOT ROAD</p>
                  <p>QUANTICO, VA 22134</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Current Configuration Status */}
          <Card className="border-green-500/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle2 className="size-5 text-green-600" />
                Current Configuration:
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <span className="text-sm font-medium">Issue Reporting E-mail:</span>
                    <span className="text-sm text-muted-foreground">{config.issueEmail || 'Not configured'}</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <span className="text-sm font-medium">News:</span>
                    <span className="text-sm text-muted-foreground">{config.newsSource}</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <span className="text-sm font-medium">Library:</span>
                    <span className="text-sm text-muted-foreground">{config.library || 'Not configured'}</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <span className="text-sm font-medium">Video:</span>
                    <span className="text-sm text-muted-foreground">{config.videoService}</span>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <span className="text-sm font-medium">Calendar:</span>
                    <span className="text-sm text-muted-foreground">{config.calendar}</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <span className="text-sm font-medium">Subscriber Email:</span>
                    <span className="text-sm text-muted-foreground">{config.subscriberEmail || 'Not configured'}</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <span className="text-sm font-medium">AI Avatar ID:</span>
                    <span className="text-sm text-muted-foreground">{config.avatarId || 'Not configured'}</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <span className="text-sm font-medium">Persona Video Link:</span>
                    <span className="text-sm text-muted-foreground">{config.personaVideo || 'Not configured'}</span>
                  </div>
                </div>
              </div>
              <div className="mt-4 p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="size-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <div className="flex-1">
                    <span className="text-sm font-medium">Incident Reporting Mailing Address:</span>
                    <p className="text-sm text-muted-foreground mt-1">Configured ✓</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Confirmation Messages */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle2 className="size-5 text-green-600" />
                Confirmation Messages:
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-muted-foreground mb-4">
                When you configure a service, the AI will confirm with a message like:
              </p>
              <div className="space-y-2">
                <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-3">
                  <p className="text-sm">✅ Library configured successfully! The Library button will now link to SharePoint...</p>
                </div>
                <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-3">
                  <p className="text-sm">✅ News source configured successfully! The News button will now link to CNN...</p>
                </div>
                <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-3">
                  <p className="text-sm">✅ Video service configured successfully! The Video button will now link to Microsoft Teams...</p>
                </div>
                <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-3">
                  <p className="text-sm">✅ Calendar service configured successfully! The Calendar button will now link to Calendly...</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Persistence Info */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle2 className="size-5 text-green-600" />
                Persistence:
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span className="text-sm">All configurations save to localStorage</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span className="text-sm">Persists across sessions</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span className="text-sm">Each button opens configured URL in new tab</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Premium Feature Notice */}
          <Card className="border-yellow-500/50 bg-gradient-to-r from-yellow-500/5 to-transparent">
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <AlertTriangle className="size-8 text-yellow-600 flex-shrink-0 mt-1" />
                <div className="flex-1">
                  <p className="text-sm font-medium">
                    ⚠️ This feature is only available to authenticated premium subscribers
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Restricted Files Area */}
          <Card className="border-red-500/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lock className="size-5 text-red-600" />
                Configuration Files & Resources
              </CardTitle>
              <CardDescription>
                This section contains configuration templates and documentation files.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {!isEmailVerified ? (
                <div className="space-y-4">
                  <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <Lock className="size-5 text-red-600 mt-0.5 flex-shrink-0" />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-red-800 dark:text-red-300 mb-2">
                          Restricted Access
                        </p>
                        <p className="text-sm text-red-700 dark:text-red-400">
                          This files area is only accessible to authorized users. Please verify your email to access configuration files and resources.
                        </p>
                      </div>
                    </div>
                  </div>

                  {!showEmailPrompt ? (
                    <Button 
                      onClick={() => setShowEmailPrompt(true)}
                      className="w-full"
                      variant="outline"
                    >
                      <Lock className="size-4 mr-2" />
                      Access Files Area
                    </Button>
                  ) : (
                    <div className="space-y-3">
                      <div className="space-y-2">
                        <label htmlFor="email-verify" className="text-sm font-medium">
                          Enter your email to access files:
                        </label>
                        <input
                          id="email-verify"
                          type="email"
                          value={userEmail}
                          onChange={(e) => setUserEmail(e.target.value)}
                          placeholder="email@example.com"
                          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                      </div>
                      <div className="flex gap-2">
                        <Button 
                          onClick={handleEmailVerification}
                          className="flex-1"
                        >
                          Verify Access
                        </Button>
                        <Button 
                          onClick={() => {
                            setShowEmailPrompt(false);
                            setUserEmail('');
                          }}
                          variant="outline"
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 mb-4">
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="size-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-green-800 dark:text-green-300">
                          Access Granted
                        </p>
                        <p className="text-sm text-green-700 dark:text-green-400">
                          You now have access to all configuration files and resources.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Files List */}
                  <div className="space-y-2">
                    {mockFiles.map((file, index) => (
                      <div 
                        key={index}
                        className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-muted/50 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <FileText className="size-5 text-primary" />
                          <div>
                            <p className="text-sm font-medium">{file.name}</p>
                            <p className="text-xs text-muted-foreground">
                              {file.size} • {file.date}
                            </p>
                          </div>
                        </div>
                        <Button size="sm" variant="outline">
                          <Download className="size-4 mr-2" />
                          Download
                        </Button>
                      </div>
                    ))}
                  </div>

                  <Button 
                    onClick={() => {
                      setIsEmailVerified(false);
                      setUserEmail('');
                      setShowEmailPrompt(false);
                    }}
                    variant="outline"
                    size="sm"
                    className="w-full mt-4"
                  >
                    Lock Files Area
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* About ORA */}
          <Card className="bg-gradient-to-br from-muted/50 to-background">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="size-5" />
                About ORA
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm leading-relaxed text-muted-foreground">
                Supporting the modern workforce with fast, free, mobile micro-learning that makes them AI-enabled. AI literacy is now essential for career success. We drive innovation, efficiency, and measurable organizational change while fostering community, unexpected collaboration, positive energy, and partnerships that accelerate transformation.
              </p>
              <div className="flex items-center gap-2 text-sm">
                <Languages className="size-4 text-primary" />
                <span>Currently available in <strong>English</strong> and <strong>Spanish</strong></span>
              </div>
              <div className="pt-4 border-t">
                <a 
                  href="https://agent.myora.now/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-sm text-blue-700 dark:text-blue-400 underline hover:text-blue-800 dark:hover:text-blue-300 inline-flex items-center gap-1"
                >
                  Visit ORA Agent Platform
                  <ExternalLink className="size-3" />
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
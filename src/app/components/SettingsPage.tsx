import { useState } from 'react';
import { 
  Shield, 
  Database, 
  Bell, 
  User, 
  CreditCard, 
  Key,
  TrendingUp,
  Download,
  Trash2,
  CheckCircle
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Switch } from './ui/switch';
import { SubscriptionStatus } from './SubscriptionStatus';

interface SettingsPageProps {
  onUpgradeClick: () => void;
}

export function SettingsPage({ onUpgradeClick }: SettingsPageProps) {
  const [dataConsent, setDataConsent] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [showContribution, setShowContribution] = useState(true);

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold mb-2">Settings</h1>
        <p className="text-muted-foreground">
          Manage your account preferences and privacy settings
        </p>
      </div>

      {/* Subscription Status */}
      <SubscriptionStatus onUpgradeClick={onUpgradeClick} />

      {/* Data & Privacy Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="size-5" />
            Data & Privacy
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Data Contribution Toggle */}
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <div className="font-semibold mb-1 flex items-center gap-2">
                <Database className="size-4" />
                Contribute Questions to Improve ORA
              </div>
              <p className="text-sm text-muted-foreground">
                Your anonymized questions help train better AI models for everyone. 
                You can change this anytime.
              </p>
              {dataConsent && (
                <div className="mt-3 bg-blue-50 border border-blue-200 rounded-lg p-3">
                  <p className="text-xs text-blue-900">
                    <strong>Thank you!</strong> Your contributions have helped improve ORA 
                    for 5,000+ users. You've contributed 47 questions.
                  </p>
                </div>
              )}
            </div>
            <Switch
              checked={dataConsent}
              onCheckedChange={setDataConsent}
            />
          </div>

          {/* Show Contribution Stats */}
          {dataConsent && (
            <div className="flex items-start justify-between gap-4 border-t pt-6">
              <div className="flex-1">
                <div className="font-semibold mb-1 flex items-center gap-2">
                  <TrendingUp className="size-4" />
                  Show My Contribution Stats
                </div>
                <p className="text-sm text-muted-foreground">
                  Display your impact and contribution statistics in the agent interface
                </p>
              </div>
              <Switch
                checked={showContribution}
                onCheckedChange={setShowContribution}
              />
            </div>
          )}

          {/* Upgrade Prompt for Privacy */}
          {!dataConsent && (
            <div className="bg-green-50 border-2 border-green-200 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <CheckCircle className="size-5 text-green-600 mt-0.5" />
                <div className="flex-1">
                  <p className="font-medium text-green-900 mb-2">
                    Data collection is disabled
                  </p>
                  <p className="text-sm text-green-800 mb-3">
                    Your questions will not be used for training. Want guaranteed privacy?
                  </p>
                  <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium">
                    Upgrade to Solo Plan ($19/mo)
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Data Export */}
          <div className="border-t pt-6">
            <div className="font-semibold mb-1 flex items-center gap-2">
              <Download className="size-4" />
              Export Your Data
            </div>
            <p className="text-sm text-muted-foreground mb-3">
              Download all your conversations and activity data (GDPR compliance)
            </p>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium">
              Request Data Export
            </button>
          </div>

          {/* Delete Account */}
          <div className="border-t pt-6">
            <div className="font-semibold mb-1 flex items-center gap-2 text-red-600">
              <Trash2 className="size-4" />
              Delete Account
            </div>
            <p className="text-sm text-muted-foreground mb-3">
              Permanently delete your account and all associated data
            </p>
            <button className="border-2 border-red-600 text-red-600 hover:bg-red-50 px-4 py-2 rounded-lg text-sm font-medium">
              Delete My Account
            </button>
          </div>
        </CardContent>
      </Card>

      {/* Notification Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="size-5" />
            Notifications
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <div className="font-semibold mb-1">Email Notifications</div>
              <p className="text-sm text-muted-foreground">
                Receive updates about new features, insights, and important announcements
              </p>
            </div>
            <Switch
              checked={emailNotifications}
              onCheckedChange={setEmailNotifications}
            />
          </div>
        </CardContent>
      </Card>

      {/* Account Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="size-5" />
            Account Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Full Name</label>
            <input
              type="text"
              defaultValue="John Doe"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Email Address</label>
            <input
              type="email"
              defaultValue="john.doe@example.com"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium">
            Save Changes
          </button>
        </CardContent>
      </Card>

      {/* Subscription & Billing */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="size-5" />
            Subscription & Billing
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <div>
                <div className="font-semibold">Free Plan</div>
                <div className="text-sm text-muted-foreground">Limited AI content • 25 questions/month</div>
              </div>
              <span className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm font-medium">
                Current Plan
              </span>
            </div>
          </div>

          <div className="space-y-3">
            <p className="text-sm font-medium">Upgrade Options:</p>
            
            <div className="border-2 border-blue-600 rounded-lg p-4 hover:bg-blue-50 cursor-pointer transition-colors">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-semibold text-blue-600">Solo Plan</div>
                  <div className="text-sm text-muted-foreground">Custom uploads • Unlimited questions</div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-lg">$19</div>
                  <div className="text-xs text-muted-foreground">/month</div>
                </div>
              </div>
            </div>

            <div className="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer transition-colors">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-semibold">Buddy Plan</div>
                  <div className="text-sm text-muted-foreground">2 users • Collaboration features</div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-lg">$35</div>
                  <div className="text-xs text-muted-foreground">/month</div>
                </div>
              </div>
            </div>

            <div className="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer transition-colors">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-semibold">Team Plan</div>
                  <div className="text-sm text-muted-foreground">Unlimited users • Advanced features</div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-lg">$99</div>
                  <div className="text-xs text-muted-foreground">/month</div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* API Settings (for future integration) */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Key className="size-5" />
            Integrations
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <div className="font-semibold mb-2">Connect Your Content</div>
            <p className="text-sm text-muted-foreground mb-4">
              Connect Google Drive or SharePoint to add custom context to your AI agent
            </p>
            <div className="space-y-2">
              <button className="w-full border-2 border-gray-300 hover:border-blue-600 hover:bg-blue-50 px-4 py-3 rounded-lg text-sm font-medium flex items-center justify-center gap-2">
                <svg className="size-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Connect Google Drive
              </button>
              <button className="w-full border-2 border-gray-300 hover:border-blue-600 hover:bg-blue-50 px-4 py-3 rounded-lg text-sm font-medium flex items-center justify-center gap-2">
                <svg className="size-5" viewBox="0 0 24 24">
                  <rect fill="#0078D4" width="24" height="24" rx="2"/>
                  <path fill="white" d="M8 6h8v2H8zm0 4h8v2H8zm0 4h5v2H8z"/>
                </svg>
                Connect SharePoint
              </button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

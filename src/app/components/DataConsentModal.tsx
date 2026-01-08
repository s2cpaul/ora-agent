/**
 * ORA - AI Leadership Agent
 * Copyright (c) 2024-2026 s2cpaul
 * Licensed under MIT License
 * Repository: https://github.com/s2cpaul/ora-agent
 */

import { X, Shield, Database, TrendingUp, Award, AlertCircle, Smartphone } from 'lucide-react';
import { useState } from 'react';

interface DataConsentModalProps {
  isOpen: boolean;
  onAccept: () => void;
  onDecline: () => void;
  onUpgradeClick?: () => void;
  deferredPrompt?: any;
}

export function DataConsentModal({ isOpen, onAccept, onDecline, onUpgradeClick, deferredPrompt }: DataConsentModalProps) {
  const [agreedToTerms, setAgreedToTerms] = useState(true);
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');

  if (!isOpen) return null;

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleAccept = async () => {
    // Reset error
    setEmailError('');

    // Validate email
    if (!email.trim()) {
      setEmailError('Email address is required');
      return;
    }

    if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address');
      return;
    }

    if (agreedToTerms) {
      // Store email in localStorage
      localStorage.setItem('userEmail', email);
      
      // Send User Agreement email
      await sendUserAgreementEmail(email);
      
      // Trigger PWA install prompt if available
      if (deferredPrompt) {
        try {
          // Show the install prompt
          deferredPrompt.prompt();
          
          // Wait for the user's response
          const { outcome } = await deferredPrompt.userChoice;
          console.log(`User response to install prompt: ${outcome}`);
          
          if (outcome === 'accepted') {
            console.log('PWA installation accepted');
          } else {
            console.log('PWA installation dismissed');
          }
        } catch (error) {
          console.error('Error showing install prompt:', error);
        }
      } else {
        console.log('PWA install prompt not available - might already be installed or not supported');
      }
      
      onAccept();
    }
  };

  // Function to send User Agreement email
  const sendUserAgreementEmail = async (userEmail: string) => {
    try {
      // TODO: Replace with your actual email service endpoint
      // Options: Firebase Functions, Supabase Edge Functions, SendGrid, Resend, etc.
      
      const agreementText = `
Dear User,

Thank you for downloading the Free Trial Version of ORA - AI Leadership Agent!

USER AGREEMENT

How Your Questions Help:
✓ Train specialized AI models focused on leadership & governance challenges
✓ Improve answer quality for all users based on real-world questions
✓ Identify common challenges leaders face in AI implementation
✓ Build better features based on what users actually need

Your Privacy is Protected:
• All data is anonymized - No names, emails, or company identifiers
• You can opt-out anytime in your settings
• Paid subscribers' data is NEVER used for training
• Only questions, not personal information are collected
• Full GDPR & privacy compliance

Free Trial Support:
No direct support available for free trial users. However, all free trial users can sign up for one complimentary Live Q&A session using our Calendly link to get personalized guidance.

Schedule your session: https://calendly.com/caraz007

MOBILE APP INSTALLATION INSTRUCTIONS

To add ORA to your mobile device home screen:

1. Open this link on your mobile device: https://agent.myora.now

2. Add to Home Screen:
   
   For iPhone/iPad (iOS):
   • Tap the Share icon (square with arrow pointing up) at the bottom of Safari
   • Scroll down and tap "Add to Home Screen"
   • Tap "Add" in the top right corner
   • The ORA icon will now appear on your home screen
   
   For Android:
   • Tap the Menu icon (three dots) in the top right of Chrome
   • Tap "Add to Home Screen" or "Install App"
   • Tap "Add" or "Install"
   • The ORA icon will now appear on your home screen

3. Launch ORA from your home screen for a seamless app experience!

By accepting this agreement, you agree to our Privacy Policy and Terms of Service.

Welcome to ORA!

---
ORA - Observe, Respond, Act
https://agent.myora.now
      `;

      console.log('Sending User Agreement email to:', userEmail);
      console.log('Email content:', agreementText);

      // Uncomment and configure when backend is ready:
      /*
      const response = await fetch('YOUR_EMAIL_API_ENDPOINT', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          to: userEmail,
          subject: 'ORA - Free Trial User Agreement',
          text: agreementText,
          from: 'noreply@myora.now'
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to send email');
      }
      */

      // For now, just log success
      console.log('✅ User Agreement email would be sent to:', userEmail);
      
    } catch (error) {
      console.error('Error sending User Agreement email:', error);
      // Don't block the user flow if email fails
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-gray-300 dark:border-gray-300 relative">
        {/* Close button */}
        <button
          onClick={onDecline}
          className="absolute top-4 right-4 p-1.5 hover:bg-gray-100 dark:hover:bg-gray-100 rounded-lg transition-colors z-10"
          aria-label="Close"
        >
          <X className="size-5 text-gray-600 dark:text-gray-600" />
        </button>

        {/* Header */}
        <div className="bg-white dark:bg-white border-b border-gray-300 dark:border-gray-300 p-4 pr-12 rounded-t-2xl">
          <div className="flex items-center gap-2 mb-1">
            <div className="bg-gray-100 dark:bg-gray-100 p-1.5 rounded-lg border border-gray-300 dark:border-gray-300">
              <Database className="size-5 text-black dark:text-black" />
            </div>
            <h2 className="text-xl font-bold text-black dark:text-black">Free Trial Version User Agreement</h2>
          </div>
          <p className="text-sm text-gray-700 dark:text-gray-700">
            Welcome to your free download of ORA - AI Leadership Agent
          </p>
        </div>

        {/* Content */}
        <div className="p-4 space-y-4">
          {/* Mobile App Installation Instructions - FIRST */}
          <div className="bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-50 dark:to-blue-50 border-2 border-green-400 dark:border-green-400 rounded-lg p-4 shadow-sm">
            <h3 className="font-bold text-sm mb-3 flex items-center gap-2 text-black dark:text-black">
              <Smartphone className="size-5 text-green-600 dark:text-green-600" />
              Mobile App Installation Instructions
            </h3>
            
            <div className="space-y-3 text-xs text-gray-800 dark:text-gray-800">
              <p className="font-semibold text-black dark:text-black">
                To add ORA to your mobile device home screen:
              </p>
              
              <div className="bg-white/80 dark:bg-white/80 border border-gray-200 dark:border-gray-200 rounded-lg p-3">
                <p className="font-bold text-black dark:text-black mb-2">📱 For iPhone/iPad (iOS):</p>
                <ol className="space-y-1.5 ml-4 list-decimal">
                  <li className="text-gray-800 dark:text-gray-800">Open <a href="https://agent.myora.now" target="_blank" rel="noopener noreferrer" className="text-blue-700 dark:text-blue-700 underline hover:no-underline font-medium">https://agent.myora.now</a> in Safari</li>
                  <li className="text-gray-800 dark:text-gray-800">Tap the Share icon (square with arrow pointing up) at the bottom</li>
                  <li className="text-gray-800 dark:text-gray-800">Scroll down and tap "Add to Home Screen"</li>
                  <li className="text-gray-800 dark:text-gray-800">Tap "Add" in the top right corner</li>
                  <li className="text-gray-800 dark:text-gray-800">The ORA icon will now appear on your home screen! 🎉</li>
                </ol>
              </div>
              
              <div className="bg-white/80 dark:bg-white/80 border border-gray-200 dark:border-gray-200 rounded-lg p-3">
                <p className="font-bold text-black dark:text-black mb-2">📱 For Android:</p>
                <ol className="space-y-1.5 ml-4 list-decimal">
                  <li className="text-gray-800 dark:text-gray-800">Open <a href="https://agent.myora.now" target="_blank" rel="noopener noreferrer" className="text-blue-700 dark:text-blue-700 underline hover:no-underline font-medium">https://agent.myora.now</a> in Chrome</li>
                  <li className="text-gray-800 dark:text-gray-800">Tap the Menu icon (three dots) in the top right</li>
                  <li className="text-gray-800 dark:text-gray-800">Tap "Add to Home Screen" or "Install App"</li>
                  <li className="text-gray-800 dark:text-gray-800">Tap "Add" or "Install"</li>
                  <li className="text-gray-800 dark:text-gray-800">The ORA icon will now appear on your home screen! 🎉</li>
                </ol>
              </div>
              
              <p className="text-center font-medium text-green-700 dark:text-green-700 bg-white/60 dark:bg-white/60 border border-green-200 dark:border-green-200 rounded-lg py-2 px-3">
                ✨ Launch ORA from your home screen for a seamless app experience!
              </p>
            </div>
          </div>

          {/* Email Field */}
          <div className="border-2 border-blue-600 dark:border-blue-600 rounded-lg p-3">
            <label htmlFor="email" className="block text-xs font-medium text-black dark:text-black mb-1.5">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="A copy of this User agreement will be sent to the email provided"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-300 rounded-lg text-sm text-black dark:text-black placeholder:text-gray-500 dark:placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-black/20 dark:focus:ring-black/20 bg-white dark:bg-white"
            />
            {emailError && <p className="text-xs text-red-500 dark:text-red-500 mt-1">{emailError}</p>}
          </div>

          {/* Consent Checkbox */}
          <div className="border-t border-gray-300 dark:border-gray-300 pt-4 mt-4">
            <label className="flex items-start gap-3 cursor-pointer bg-gray-50 dark:bg-gray-50 border-2 border-blue-600 dark:border-blue-600 rounded-lg p-4">
              <input
                type="checkbox"
                checked={agreedToTerms}
                onChange={(e) => setAgreedToTerms(e.target.checked)}
                className="mt-1 size-5 cursor-pointer accent-green-600 border-2 border-gray-400 dark:border-gray-400 rounded"
              />
              <div className="flex-1">
                <p className="text-sm font-semibold text-black dark:text-black mb-1">
                  I understand and agree to contribute my anonymized questions to improve ORA
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-600 mt-1">
                  You can change this anytime in Settings. By agreeing, you accept our{' '}
                  <a href="/privacy" className="text-black dark:text-black underline hover:no-underline">Privacy Policy</a>
                  {' '}and{' '}
                  <a href="/terms" className="text-black dark:text-black underline hover:no-underline">Terms of Service</a>.
                </p>
              </div>
            </label>
          </div>

          {/* What Your Contribution Does */}
          <div>
            <h3 className="font-bold text-sm mb-2 flex items-center gap-2 text-black dark:text-black">
              <TrendingUp className="size-4 text-black dark:text-black" />
              How Your Questions Help
            </h3>
            <div className="space-y-1.5 ml-6">
              <div className="flex items-start gap-2">
                <span className="text-black dark:text-black font-bold mt-0.5">✓</span>
                <p className="text-xs text-gray-800 dark:text-gray-800">
                  <strong>Train specialized AI models</strong> focused on leadership & governance challenges
                </p>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-black dark:text-black font-bold mt-0.5">✓</span>
                <p className="text-xs text-gray-800 dark:text-gray-800">
                  <strong>Improve answer quality</strong> for all users based on real-world questions
                </p>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-black dark:text-black font-bold mt-0.5">✓</span>
                <p className="text-xs text-gray-800 dark:text-gray-800">
                  <strong>Identify common challenges</strong> leaders face in AI implementation
                </p>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-black dark:text-black font-bold mt-0.5">✓</span>
                <p className="text-xs text-gray-800 dark:text-gray-800">
                  <strong>Build better features</strong> based on what users actually need
                </p>
              </div>
            </div>
          </div>

          {/* Your Privacy Protected */}
          <div className="bg-white dark:bg-white border border-gray-300 dark:border-gray-300 rounded-lg p-3">
            <h3 className="font-bold text-sm mb-2 flex items-center gap-2 text-black">
              <Shield className="size-4 text-black" />
              Your Privacy is Protected
            </h3>
            <div className="space-y-1.5 ml-6 text-xs text-black">
              <div className="flex items-start gap-2">
                <span className="text-black font-bold mt-0.5">•</span>
                <p>
                  <strong>All data is anonymized</strong> - No names, emails, or company identifiers
                </p>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-black font-bold mt-0.5">•</span>
                <p>
                  <strong>You can opt-out anytime</strong> in your settings
                </p>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-black font-bold mt-0.5">•</span>
                <p>
                  <strong>Paid subscribers' data is NEVER used</strong> for training
                </p>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-black font-bold mt-0.5">•</span>
                <p>
                  <strong>Only questions, not personal information</strong> are collected
                </p>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-black font-bold mt-0.5">•</span>
                <p>
                  <strong>Full GDPR & privacy compliance</strong>
                </p>
              </div>
            </div>
          </div>

          {/* Community Benefits */}
          <div className="bg-white dark:bg-white border border-gray-300 dark:border-gray-300 rounded-lg p-3">
            <h3 className="font-bold text-sm mb-1.5 flex items-center gap-2 text-black">
              <Award className="size-4 text-black" />
              Community Benefits
            </h3>
            <p className="text-xs text-black">
              Contributors get early access to new features and insights into what other leaders 
              are asking about. Together, we're building the most comprehensive AI leadership knowledge base.
            </p>
          </div>

          {/* Free Trial Support Notice */}
          <div className="bg-white dark:bg-white border border-gray-300 dark:border-gray-300 rounded-lg p-3">
            <h3 className="font-bold text-sm mb-1.5 flex items-center gap-2 text-black">
              <AlertCircle className="size-4 text-black" />
              Free Trial Support
            </h3>
            <div className="space-y-1.5 text-xs text-black">
              <p>
                <strong>No direct support available</strong> for free trial users.
              </p>
              <p>
                However, all free trial users can sign up for <strong>one complimentary Live Q&A session</strong> using our Calendly link to get personalized guidance and answers to your questions.
              </p>
              <a 
                href="https://calendly.com/caraz007" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-block mt-1.5 px-3 py-1.5 bg-white dark:bg-white border border-gray-300 dark:border-gray-300 rounded-lg text-black dark:text-black hover:bg-gray-50 dark:hover:bg-gray-50 transition-colors text-xs"
              >
                Schedule Your Free Q&A Session →
              </a>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button
              onClick={handleAccept}
              disabled={!agreedToTerms}
              className={`w-full py-2.5 px-5 rounded-lg font-semibold transition-all border border-gray-300 dark:border-gray-300 text-sm ${
                agreedToTerms
                  ? 'bg-black dark:bg-black hover:bg-gray-800 dark:hover:bg-gray-800 text-white dark:text-white'
                  : 'bg-gray-200 dark:bg-gray-200 text-gray-400 dark:text-gray-400 cursor-not-allowed'
              }`}
            >
              ACCEPT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
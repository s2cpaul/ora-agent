/**
 * ORA - AI Leadership Agent
 * Copyright (c) 2024-2026 s2cpaul
 * Licensed under MIT License
 * Repository: https://github.com/s2cpaul/ora-agent
 */

export function AgreementPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">Free Trial User Agreement</h1>
          <p className="text-muted-foreground">
            Last Updated: January 8, 2026
          </p>
        </div>

        {/* Agreement Content */}
        <div className="prose prose-sm max-w-none dark:prose-invert">
          {/* Introduction */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">1. Agreement Overview</h2>
            <p className="text-muted-foreground mb-4">
              Welcome to ORA! This Free Trial User Agreement ("Agreement") governs your use of the ORA AI Leadership Agent platform during the free trial period. By accessing or using ORA, you agree to be bound by this Agreement.
            </p>
          </section>

          {/* Free Trial Terms */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">2. Free Trial Terms</h2>
            <div className="space-y-4 text-muted-foreground">
              <div>
                <h3 className="text-lg font-medium text-foreground mb-2">2.1 Trial Access</h3>
                <p>
                  The free trial provides limited access to ORA's AI Leadership Agent features without requiring account registration or payment. Free tier users receive up to 10 questions per month.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-medium text-foreground mb-2">2.2 No Login Required</h3>
                <p>
                  Free trial users can access ORA without creating an account. However, to preserve conversation history and access premium features, registration is required for paid subscription tiers.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-medium text-foreground mb-2">2.3 Usage Limits</h3>
                <p>
                  Free tier usage is limited to 10 AI-generated responses per calendar month. Advanced features including multi-agent connectivity, custom branding, and analytics require a paid subscription.
                </p>
              </div>
            </div>
          </section>

          {/* Data Collection */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">3. Data Collection & Privacy</h2>
            <div className="space-y-4 text-muted-foreground">
              <div>
                <h3 className="text-lg font-medium text-foreground mb-2">3.1 Anonymous Analytics</h3>
                <p>
                  ORA collects anonymous usage analytics to improve the platform. This includes question patterns, response quality metrics, and feature engagement data. No personally identifiable information (PII) is collected from free tier users.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-medium text-foreground mb-2">3.2 Not for Sensitive Data</h3>
                <p>
                  <strong className="text-foreground">Important:</strong> ORA is not designed for collecting, storing, or securing personally identifiable information (PII) or sensitive data. Do not submit confidential business information, personal health information, financial data, or any other sensitive content during your free trial.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-medium text-foreground mb-2">3.3 Data Retention</h3>
                <p>
                  Free tier conversations are stored temporarily for quality improvement purposes. Data may be retained for up to 30 days unless you upgrade to a paid plan, which includes persistent conversation history.
                </p>
              </div>
            </div>
          </section>

          {/* Acceptable Use */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">4. Acceptable Use Policy</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>You agree NOT to use ORA for:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Illegal activities or content that violates laws or regulations</li>
                <li>Harassment, abuse, or threatening behavior</li>
                <li>Spreading misinformation or harmful content</li>
                <li>Attempting to circumvent usage limits or security measures</li>
                <li>Reverse engineering or copying the platform</li>
                <li>Commercial use without a paid subscription</li>
                <li>Automated scraping or bot access (unless authorized)</li>
              </ul>
            </div>
          </section>

          {/* Intellectual Property */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">5. Intellectual Property</h2>
            <div className="space-y-4 text-muted-foreground">
              <div>
                <h3 className="text-lg font-medium text-foreground mb-2">5.1 ORA Content</h3>
                <p>
                  All content, features, and functionality of ORA (including but not limited to AI models, software, designs, text, graphics, and logos) are owned by ORA Community and protected by intellectual property laws.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-medium text-foreground mb-2">5.2 Your Content</h3>
                <p>
                  You retain ownership of questions and content you submit to ORA. By using the platform, you grant ORA a limited license to process your content to provide the service and improve AI models (in anonymized form).
                </p>
              </div>
            </div>
          </section>

          {/* Disclaimers */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">6. Disclaimers & Limitations</h2>
            <div className="space-y-4 text-muted-foreground">
              <div>
                <h3 className="text-lg font-medium text-foreground mb-2">6.1 No Warranty</h3>
                <p>
                  ORA is provided "as is" without warranties of any kind, either express or implied. We do not guarantee that the service will be uninterrupted, error-free, or that AI responses will be accurate or complete.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-medium text-foreground mb-2">6.2 AI Limitations</h3>
                <p>
                  AI-generated responses are for informational and educational purposes only. ORA does not provide professional advice (legal, medical, financial, etc.). Always verify critical information with qualified professionals.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-medium text-foreground mb-2">6.3 Limitation of Liability</h3>
                <p>
                  ORA Community shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of the platform, even if advised of the possibility of such damages.
                </p>
              </div>
            </div>
          </section>

          {/* Subscription Transition */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">7. Upgrading to Paid Plans</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                Free trial users may upgrade to a paid subscription at any time. Paid plans include:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong className="text-foreground">Solo ($24/month):</strong> 50 questions, analytics, priority support</li>
                <li><strong className="text-foreground">Buddy ($60/month):</strong> 100 questions, custom branding, team features</li>
                <li><strong className="text-foreground">Team ($250/month):</strong> 200 questions, multi-agent connectivity, Drive/SharePoint</li>
                <li><strong className="text-foreground">Enterprise ($1500/month):</strong> 1000 questions, custom agents, white-label, SLA</li>
              </ul>
            </div>
          </section>

          {/* Termination */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">8. Termination</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                ORA reserves the right to suspend or terminate your access to the free trial at any time, with or without notice, for violations of this Agreement or any other reason. You may stop using ORA at any time.
              </p>
            </div>
          </section>

          {/* Changes to Agreement */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">9. Changes to This Agreement</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                We may update this Agreement from time to time. We will notify users of material changes by posting the new Agreement on this page with an updated "Last Updated" date. Your continued use of ORA after changes constitutes acceptance of the revised Agreement.
              </p>
            </div>
          </section>

          {/* Governing Law */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">10. Governing Law</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                This Agreement is governed by the laws of the United States. Any disputes arising from this Agreement will be resolved through binding arbitration in accordance with applicable arbitration rules.
              </p>
            </div>
          </section>

          {/* Contact */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">11. Contact Information</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                If you have questions about this Agreement or ORA's services, please contact us:
              </p>
              <ul className="list-none space-y-2">
                <li><strong className="text-foreground">Email:</strong> carapaulson1@gmail.com</li>
                <li><strong className="text-foreground">Schedule a Call:</strong> <a href="https://calendly.com/caraz007" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">calendly.com/caraz007</a></li>
                <li><strong className="text-foreground">Website:</strong> <a href="https://agent.myora.now/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">agent.myora.now</a></li>
              </ul>
            </div>
          </section>

          {/* Acknowledgment */}
          <section className="mb-8 p-6 bg-muted rounded-lg border">
            <h2 className="text-2xl font-semibold mb-4">By Using ORA, You Acknowledge:</h2>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>You have read and understood this Agreement</li>
              <li>You agree to be bound by these terms</li>
              <li>You understand ORA is not designed for sensitive data or PII</li>
              <li>You acknowledge AI responses are not professional advice</li>
              <li>You will use ORA in accordance with the Acceptable Use Policy</li>
            </ul>
          </section>
        </div>

        {/* Action Buttons */}
        <div className="mt-12 flex gap-4 justify-center">
          <a
            href="/"
            className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium"
          >
            I Accept - Start Free Trial
          </a>
          <a
            href="/pricing"
            className="px-6 py-3 border border-border rounded-lg hover:bg-muted transition-colors font-medium"
          >
            View Pricing Plans
          </a>
        </div>
      </div>
    </div>
  );
}

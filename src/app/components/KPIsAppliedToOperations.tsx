import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Volume2 } from "lucide-react";

export function KPIsAppliedToOperations() {
  return (
    <Card className="relative">
      <button 
        className="absolute top-4 right-4 text-primary hover:text-primary/80 transition-colors z-10"
        aria-label="Listen to this content"
      >
        <Volume2 className="size-5" />
      </button>
      <CardHeader>
        <CardTitle className="font-semibold text-lg pr-8">AI Governance KPIs</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Incident Response Section */}
        <div className="bg-accent/20 rounded-lg p-6 space-y-4 border border-border">
          <h3 className="font-semibold text-lg">Incident Response & Reporting</h3>
          <div className="space-y-4">
            <p className="text-sm leading-relaxed">
              Document incident‑response processes clearly and directly. Define what qualifies as a data breach involving PHI, PII, or other sensitive information; outline reporting procedures; describe immediate containment actions; and specify investigation and notification requirements. Include corrective measures and a post‑incident review to support continuous improvement. The goal is a repeatable, compliant process that protects people and information.
            </p>
            <p className="text-sm leading-relaxed">
              Incorporate a method for reporting AI‑related issues such as hallucinations, model drift, vendor lock-in or bias. Ensure all required forms and reporting tools are easily accessible for rapid response. Begin tracking form usage and reports.
            </p>
          </div>
        </div>

        {/* CAP Count Card */}
        <div className="bg-accent/20 rounded-lg p-6 space-y-4 border border-border">
          <h3 className="font-semibold text-lg">Connected Automated Processes (CAP) Count</h3>
          <div className="space-y-4">
            <p className="text-sm leading-relaxed">
              Measures how many business processes are fully integrated and automated across systems, teams, or workflows with corresponding, current, accessible SOPs (Standard Operating Procedures).
            </p>

            <div className="space-y-3 pt-2">
              <h4 className="font-semibold">KPI Definition:</h4>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Tracks the total number of processes that are automated and connected end‑to‑end (not isolated automations). This reflects the maturity of digital transformation and the organization's ability to scale AI‑enabled operations.
              </p>
            </div>

            <div className="space-y-3 pt-2">
              <h4 className="font-semibold">Why it matters:</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Shows progress toward enterprise‑wide automation</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Highlights reduction in manual handoffs and operational friction</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Indicates readiness for AI‑driven decisioning</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Helps leaders see where automation is fragmented vs. integrated</span>
                </li>
              </ul>
            </div>

            <div className="bg-background rounded-lg p-4 space-y-2 border-2 border-primary/30 mt-4">
              <p className="text-sm font-semibold">Example Target:</p>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Increase the number of connected automated processes by 20% quarter‑over‑quarter to improve efficiency and reduce cycle time.
              </p>
            </div>
          </div>
        </div>

        {/* Applied AI Dashboard Basics Card */}
        <div className="bg-accent/20 rounded-lg p-6 space-y-4 border border-border">
          <h3 className="font-semibold text-lg">Planning Your Applied AI Dashboard</h3>
          <div className="space-y-4">
            <p className="text-sm leading-relaxed">
              Keep is simple and start with the basics! An AI Governance KPI Dashboard strengthens transparency and maximizes return on investment by giving leaders a clear view of model reliability, data‑drift incidents, fairness audit coverage, and overall operational performance. With National Institute of Standards and Technology (NIST), Role‑Based Access Controls (RBAC)—where Admins set thresholds, Editors propose updates, and Viewers monitor metrics—the dashboard ensures that sensitive and proprietary information remains protected while maintaining accountability. By centralizing these indicators, organizations can quickly detect issues, validate model performance, and make informed decisions that improve safety, fairness, and mission impact.
            </p>

            {/* Dashboard Example Card */}
            <div className="bg-background rounded-lg p-6 space-y-4 border border-border mt-4">
              <div className="flex items-start justify-between gap-4">
                <h4 className="font-semibold text-lg">AI Governance KPI</h4>
                <span className="text-sm text-muted-foreground">RBAC: Admin / Editor / Viewer</span>
              </div>
              
              <p className="text-sm text-muted-foreground">
                Key performance indicators for AI governance measure model safety, fairness, and operational alignment.
              </p>

              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between py-2 border-b border-border">
                  <span className="text-sm">Operational Maintenance & Consumption Cost</span>
                  <span className="font-semibold">15K monthly</span>
                </div>
                
                <div className="flex items-center justify-between py-2 border-b border-border">
                  <span className="text-sm">Model Reliability</span>
                  <span className="font-semibold">87%</span>
                </div>
                
                <div className="flex items-center justify-between py-2 border-b border-border">
                  <span className="text-sm">Data Drift Incidents (30d)</span>
                  <span className="font-semibold">2</span>
                </div>
                
                <div className="flex items-center justify-between py-2 border-b border-border">
                  <span className="text-sm">Fairness Audit Coverage</span>
                  <span className="font-semibold">72%</span>
                </div>
                
                <div className="flex items-center justify-between py-2 border-b border-border">
                  <span className="text-sm">Transparency Measurement</span>
                  <span className="font-semibold">81%</span>
                </div>
                
                <div className="flex items-center justify-between py-2 border-b border-border">
                  <span className="text-sm">IT Spending on Applied AI</span>
                  <span className="font-semibold">500k allocated 400k spent</span>
                </div>
                
                <div className="flex items-center justify-between py-2 border-b border-border">
                  <span className="text-sm">AI Workforce Training & Readiness</span>
                  <span className="font-semibold">44% completion</span>
                </div>
                
                <div className="flex items-center justify-between py-2 border-b border-border">
                  <span className="text-sm">Access Control</span>
                  <span className="font-semibold">RBAC enforced</span>
                </div>
              </div>

              <div className="bg-accent/30 rounded-lg p-4 mt-4">
                <p className="text-sm">
                  <span className="font-semibold">Note:</span> RBAC is a NIST standard — only Admins can modify KPI thresholds, Collaborators or Editors can propose changes, and Viewers can only view metrics. RBAC leverages Role Based Access Groups for safeguarding sensitive, secure and proprietary information. Additional Cyber security certifications are required for defense contractors handling PII.
                </p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
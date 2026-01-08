import { FileText, ExternalLink } from "lucide-react";

interface Reference {
  title: string;
  hasExternalLink?: boolean;
}

export function RealWorldReferences() {
  const references: Reference[] = [
    { title: "AI Risk Management Framework (NIST)" },
    { title: "WEF - Future of Jobs Report" },
    { title: "Forbes - AI Literacy and Career Success" },
    { title: "Research for NICE Agent AI (PDF)" },
    { title: "MIT Sloan - Workforce Intelligence (PDF)" },
    { title: "Harvard C-Suite Guide (Oct 2025)" },
    { title: "NICE - The AI Agent Handbook (PDF)" },
    { title: "HKS - Generative AI Course (Spring 2024)" },
    { title: "MIT 6.S087: Foundation Models & Generative AI (2024)", hasExternalLink: true },
    { title: "RACI MATRIX Template", hasExternalLink: true },
    { title: "Agile Scrum Alliance" },
    { title: "White House M-25-05 - Evidence-Based Policymaking Act (PDF)", hasExternalLink: true }
  ];

  return (
    <div className="my-6 p-4 rounded-xl border border-border bg-card shadow-sm">
      <div className="flex items-center gap-2 mb-2">
        <FileText className="size-5" />
        <h3 className="font-semibold text-lg">Real World Reference Materials</h3>
      </div>
      
      <p className="text-muted-foreground text-sm mb-3 leading-relaxed">
        These real world references are supplied to support continued learning at your own pace. Opening them now is optional and encouraged so you can make bookmarks.
      </p>

      <div className="space-y-0.5">
        {references.map((reference, index) => (
          <div
            key={index}
            className="flex items-center gap-3 p-1 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer group"
          >
            <FileText className="size-4 flex-shrink-0 text-muted-foreground" />
            <span className="flex-1 text-sm group-hover:text-foreground transition-colors">
              {reference.title}
            </span>
            {reference.hasExternalLink && (
              <ExternalLink className="size-3 text-muted-foreground" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
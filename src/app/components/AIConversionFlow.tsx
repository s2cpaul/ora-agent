import { ArrowRight, Zap, DollarSign, Gift, Building2, AlertCircle } from "lucide-react";

interface ConversionStep {
  icon: React.ReactNode;
  title: string;
  description: string;
  highlight?: boolean;
}

export function AIConversionFlow() {
  const steps: ConversionStep[] = [
    {
      icon: <ArrowRight className="size-6" />,
      title: "Information → Data",
      description: "AI breaks down text or speech into structured data."
    },
    {
      icon: <Zap className="size-6" />,
      title: "Vertexes & Numbers",
      description: "Think of it like mapping words into points in a giant network, each linked by numerical weights."
    },
    {
      icon: <ArrowRight className="size-6" />,
      title: "Tokens",
      description: "Words, phrases, or chunks of text are converted into tokens (the basic units AI processes)."
    },
    {
      icon: <DollarSign className="size-6" />,
      title: "Cost",
      description: "Every token processed has a cost. More tokens = higher expense.",
      highlight: true
    },
    {
      icon: <Gift className="size-6" />,
      title: "Free Trial Credits",
      description: "OpenAI's API offers free credits (e.g., $5 worth) for a trial period. These let you experiment without paying."
    },
    {
      icon: <Building2 className="size-6" />,
      title: "Chat",
      description: "In many integrated AI productivity platforms, users don't see or manage tokens directly because the licensing or subscription model abstracts that usage behind the scenes. Ie., Copilot Chat"
    },
    {
      icon: <AlertCircle className="size-6" />,
      title: "Limits",
      description: "Once you use up the free credits, you must pay per token. There is a \"Pay-As-You-Go\" structure. There's no unlimited free usage.",
      highlight: true
    }
  ];

  return (
    <div className="space-y-2 my-4">
      <h3 className="font-semibold text-lg mb-3">How AI Converts Information</h3>
      {steps.map((step, index) => (
        <div
          key={index}
          className={`p-3 rounded-lg border-2 transition-all ${
            step.highlight
              ? "bg-primary/5 border-primary/30"
              : "bg-card border-border"
          }`}
        >
          <div className="flex gap-2.5">
            <div className={`flex-shrink-0 ${
              step.highlight ? "text-primary" : "text-muted-foreground"
            }`}>
              {step.icon}
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-semibold mb-0.5 text-sm">{step.title}</h4>
              <p className="text-sm text-muted-foreground">{step.description}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
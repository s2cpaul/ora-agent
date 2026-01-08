import { Rocket, Users, Zap } from "lucide-react";

interface Benefit {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
}

export function FrameworkBenefits() {
  const benefits: Benefit[] = [
    {
      icon: <Rocket className="size-8" />,
      title: "Build Momentum",
      description: "They offer a starting point with conversations and clear phases. Crawl > Walk > Run: is familiar and human centered.",
      color: "text-blue-600"
    },
    {
      icon: <Users className="size-8" />,
      title: "Align Teams",
      description: "They give everyone a shared language so smarter decisions move quicker.",
      color: "text-green-600"
    },
    {
      icon: <Zap className="size-8" />,
      title: "Unlock Speed at Scale",
      description: "They turn messy AI work into clear, repeatable steps so teams can move faster and scale confidently without reinventing the process every time.",
      color: "text-purple-600"
    }
  ];

  return (
    <div className="space-y-4 my-6">
      <h3 className="font-semibold text-lg mb-4">Why Frameworks Matter in AI, Governance, and Innovation</h3>
      <div className="grid gap-3">
        {benefits.map((benefit, index) => (
          <div
            key={index}
            className="p-4 rounded-xl bg-gradient-to-br from-card to-muted/20 border border-border shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-start gap-3">
              <div className={`flex-shrink-0 ${benefit.color}`}>
                {benefit.icon}
              </div>
              <div className="flex-1">
                <h4 className="font-semibold mb-1">{benefit.title}</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
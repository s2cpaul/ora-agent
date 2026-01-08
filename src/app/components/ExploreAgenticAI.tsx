import { Bot } from "lucide-react";
import { Button } from "./ui/button";

interface ExploreAgenticAIProps {
  onOpenAgent: () => void;
}

export function ExploreAgenticAI({ onOpenAgent }: ExploreAgenticAIProps) {
  return (
    <div className="my-6 p-6 rounded-xl border border-border bg-card shadow-sm">
      <div className="flex items-center gap-2 mb-3">
        <Bot className="size-5" />
        <h3 className="font-semibold text-lg">Explore Agentic AI</h3>
      </div>
      
      <p className="text-sm leading-relaxed text-foreground/90 mb-6">
        Agentic AI may look like a simple bot, but it's actually the front door to an entire connected ecosystem. Open the agent for a new chat session. Locate the button, Applied AI for Transformation. Tap and watch the video to learn from MIT with Arnold. Arnold is an agile persona representing an expert perspective. The AI generated video is based on a real Subject Matter Expert with validated information. Ask a question about Agents, and AI Leadership now!
      </p>

      <div className="flex justify-center">
        <Button 
          className="gap-2"
          onClick={onOpenAgent}
        >
          <Bot className="size-4" />
          Applied AI for Transformation
        </Button>
      </div>
    </div>
  );
}
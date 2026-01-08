import { Card, CardContent } from "./ui/card";
import { AlertTriangle, Expand, X } from "lucide-react";
import { useState } from "react";
import governanceToolkitImage from "figma:asset/7ac1c7d39d73cc7eaecba01e0813f92acab6b046.png";

export function BlindSpotsIntro() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <>
      <Card className="mb-6 overflow-hidden">
        <CardContent className="pt-6">
          <div className="flex items-center gap-2 mb-3">
            <AlertTriangle className="size-5 text-primary" />
            <h3 className="font-semibold text-lg">Organizational Blind Spots</h3>
          </div>
          <p className="leading-relaxed mb-4">
            Even well-intentioned AI initiatives can stumble when organizations overlook critical dependencies, misallocate resources, or fail to prepare their workforce. These blind spots—ranging from vendor lock-in to incomplete accountability matrices—represent the gap between AI investment and meaningful returns.
          </p>
          
          {/* Expandable Principles Image */}
          <div 
            className="relative rounded-lg overflow-hidden border-2 border-border mb-4 cursor-pointer hover:border-primary transition-colors group"
            onClick={() => setIsExpanded(true)}
          >
            <img 
              src={governanceToolkitImage} 
              alt="Your Practical Governance Toolkit - RACI Matrix" 
              className="w-full h-auto"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
              <div className="bg-white/90 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <Expand className="size-5 text-foreground" />
              </div>
            </div>
            <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded-md flex items-center gap-1">
              <Expand className="size-3" />
              <span>Tap to expand</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Expanded Image Modal */}
      {isExpanded && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setIsExpanded(false)}
        >
          <button
            className="absolute top-4 right-4 bg-white/10 hover:bg-white/20 text-white rounded-full p-2 transition-colors"
            onClick={() => setIsExpanded(false)}
          >
            <X className="size-6" />
          </button>
          <div className="max-w-4xl w-full max-h-[90vh] overflow-auto">
            <img 
              src={governanceToolkitImage} 
              alt="Your Practical Governance Toolkit - RACI Matrix - Expanded View" 
              className="w-full h-auto rounded-lg"
            />
          </div>
        </div>
      )}
    </>
  );
}
import { QRCodePage } from "./QRCodePage";
import { useState } from "react";
import { Users } from "lucide-react";
import { useNavigation } from "../../contexts/NavigationContext";

export function QRCodeHub() {
  const [selectedAgent, setSelectedAgent] = useState<"ora" | "workforce">("ora");
  const { navigate } = useNavigation();

  // Get the current deployment URL dynamically
  const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://your-app-url.com';
  
  // Direct chat URLs - these open the ORA agent immediately
  const oraUrl = `${baseUrl}/chat`;
  const workforceUrl = `${baseUrl}/chat?agent=workforce`;

  const handleOpenORAChat = () => {
    // Navigate to chat page to open ORA
    navigate('/chat');
  };

  const handleOpenWorkforceChat = () => {
    // Navigate to chat page with workforce agent parameter
    navigate('/chat');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Agent Selector */}
      <div className="bg-card border-b border-border sticky top-0 z-10">
        <div className="max-w-3xl mx-auto p-4">
          <div className="flex gap-3">
            <button
              onClick={() => setSelectedAgent("ora")}
              className={`flex-1 px-6 py-3 rounded-lg font-medium transition-colors ${
                selectedAgent === "ora"
                  ? "bg-primary text-primary-foreground"
                  : "bg-card border border-border hover:bg-accent"
              }`}
            >
              ORA AI Leadership Agent
            </button>
            <button
              onClick={() => setSelectedAgent("workforce")}
              className={`flex-1 px-6 py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 ${
                selectedAgent === "workforce"
                  ? "bg-primary text-primary-foreground"
                  : "bg-card border border-border hover:bg-accent"
              }`}
            >
              <Users className="size-4" />
              Workforce Development
            </button>
          </div>
        </div>
      </div>

      {/* QR Code Display */}
      {selectedAgent === "ora" ? (
        <QRCodePage
          title="Chat with ORA AI"
          description="Scan the QR code to instantly start a conversation with your AI learning assistant"
          url={oraUrl}
          onOpenChat={handleOpenORAChat}
        />
      ) : (
        <QRCodePage
          title="Mobile Agent for Workforce Development"
          description="Scan the QR code to connect with your workforce development AI assistant"
          url={workforceUrl}
          onOpenChat={handleOpenWorkforceChat}
        />
      )}
    </div>
  );
}
/**
 * ORA - AI Leadership Agent
 * Copyright (c) 2024-2026 s2cpaul
 * Licensed under MIT License
 * Repository: https://github.com/s2cpaul/ora-agent
 * 
 * ============================================================================
 * DESIGN RULES - MAIN APP
 * ============================================================================
 * 1. Desktop screen defaults to DARK MODE on initial load
 * 2. AI Agent modals ALWAYS display in LIGHT MODE (see agent components)
 * 3. Users can toggle between light/dark mode using the theme toggle button
 * ============================================================================
 */

import { useState, useEffect, useRef } from "react";
import { Bot, Moon, Sun, Zap, Monitor, Shield, CheckCircle2, Smartphone, Sparkles, QrCode } from "lucide-react";
import { AIAgentModal } from "./components/AIAgentModal";
import { AIAgentSidePanel } from "./components/AIAgentSidePanel";
import { AITrendsFeatureCard } from "./components/AITrendsFeatureCard";
import { FeaturesPage } from "./components/FeaturesPage";
import { QRCodeSection } from "./components/QRCodeSection";
import { GlobalNavigation } from "./components/GlobalNavigation";
import { GlobalFooter } from "./components/GlobalFooter";
import { DownloadsPage } from "./components/DownloadsPage";
import { DocumentationPage } from "./components/DocumentationPage";
import { PricingPage } from "./components/PricingPage";
import { AboutPage } from "./components/AboutPage";
import { AgreementPage } from "./components/AgreementPage";
import { TrainingPage } from "./components/TrainingPage";
import { MissionPage } from "./components/MissionPage";
import { QRCodeHub } from "./components/QRCodeHub";
import { AuthProvider } from "../contexts/AuthContext";
import { NavigationProvider, useNavigation } from "../contexts/NavigationContext";

// Navigation types
type PageRoute = '/' | '/chat' | '/features' | '/downloads' | '/docs' | '/pricing' | '/about' | '/agreement' | '/training' | '/mission' | '/qrcodehub';

// Home Page Component
function HomePage() {
  const [showFeatureCard, setShowFeatureCard] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("dark"); // Default to dark mode
  const [isAgentModalOpen, setIsAgentModalOpen] = useState(false);
  const [isPersonalAgentOpen, setIsPersonalAgentOpen] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const { navigate } = useNavigation();
  
  // Double-tap to toggle theme tracking
  const lastTapRef = useRef<number>(0);

  // Double-tap handler for mobile devices
  useEffect(() => {
    const handleDoubleTap = (e: TouchEvent) => {
      const target = e.target as HTMLElement;
      
      // Exclude interactive elements from double-tap
      const isInteractive = 
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.tagName === 'SELECT' ||
        target.closest('button') ||
        target.closest('a');
      
      if (isInteractive) return;
      
      const now = Date.now();
      const timeSinceLastTap = now - lastTapRef.current;
      
      // If two taps within 300ms, toggle theme
      if (timeSinceLastTap < 300 && timeSinceLastTap > 0) {
        toggleTheme();
        lastTapRef.current = 0; // Reset to prevent triple-tap
      } else {
        lastTapRef.current = now;
      }
    };
    
    document.addEventListener('touchend', handleDoubleTap);
    
    return () => {
      document.removeEventListener('touchend', handleDoubleTap);
    };
  }, [theme]); // Include theme in dependencies

  // Initialize dark mode on component mount
  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    if (newTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  const handleConsentAccept = () => {
    localStorage.setItem("userAgreementAccepted", "true");
    localStorage.setItem("userQuestionCount", "0"); // Reset question count
    setAgreedToTerms(true);
  };

  const handleConsentDecline = () => {
    // Don't set userAgreementAccepted to true
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Simplified Header */}
      <header className="border-b bg-card">
        <div className="max-w-4xl mx-auto px-4 py-4 sm:px-6">
          <div className="flex items-center justify-between">
            {/* Left: Logo and Theme Toggle */}
            <div className="flex items-center gap-4 -ml-[2px]">
              <h1 className="font-semibold text-lg">ORA</h1>
              <button 
                onClick={toggleTheme}
                className="text-muted-foreground hover:text-foreground flex items-center gap-2"
              >
                {theme === "light" ? <Moon className="size-4" /> : <Sun className="size-4" />}
              </button>
            </div>
            
            {/* Center: Multi-Agent Features Button */}
            <div className="absolute left-1/2 -translate-x-1/2">
              <button 
                onClick={() => navigate('/features')}
                className="text-[12.6px] text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 flex items-center gap-1.5 font-medium transition-colors whitespace-nowrap"
              >
                Multi-Agent Features
              </button>
            </div>
            
            {/* Right: ORA Agent Button */}
            <button 
              onClick={() => setIsAgentModalOpen(true)}
              className="flex items-center justify-center p-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              <Bot className="size-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        <div className="text-center px-4">
          {/* ORA Brand */}
          <div className="mb-6">
            <h1 className="text-7xl sm:text-8xl font-black tracking-[0.2em] mb-3 text-foreground">
              ORA
            </h1>
            <p className="text-base text-muted-foreground tracking-[0.3em]">
              Observe &nbsp;&nbsp; Respond &nbsp;&nbsp; Act
            </p>
          </div>

          {/* Main Headline */}
          <h2 className="text-3xl sm:text-5xl font-bold mb-4 max-w-4xl mx-auto leading-tight bg-gradient-to-r from-purple-500 to-purple-600 bg-clip-text text-transparent">
            Your Personal AI Leadership Agent
          </h2>

          {/* Tagline */}
          <p className="text-base sm:text-lg text-foreground mb-8 max-w-4xl mx-auto leading-relaxed">
            The key to unlocking AI Transformation is in mobile micro-learning: from hand held capabilities to cultural confidence!
          </p>

          {/* Try Mobile AI Agent Button */}
          <button 
            onClick={() => setIsPersonalAgentOpen(true)}
            className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 text-lg font-semibold rounded-xl inline-flex items-center gap-3 transition-all shadow-lg hover:shadow-green-600/50 mb-12"
          >
            <Bot className="size-6" /> Try Mobile AI Agent
          </button>

          {/* Features Container with Purple Border */}
          <div className="max-w-5xl mx-auto bg-gradient-to-br from-purple-600/20 via-blue-600/20 to-purple-600/20 p-[3px] rounded-2xl mb-8">
            <div className="bg-card rounded-2xl p-8">
              {/* Get Free Trial Button */}
              <button 
                onClick={() => setShowFeatureCard(true)}
                className="bg-purple-600 hover:bg-purple-700 text-white px-10 py-4 text-lg font-bold rounded-xl transition-all shadow-lg hover:shadow-purple-600/50 mb-4 w-full sm:w-auto"
              >
                Get Free Trial Version ORA Mobile Download Now!
              </button>
              
              <p className="text-sm text-muted-foreground mb-8">
                From your mobile device tap add to home screen for seamless startup.
              </p>

              {/* Features Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left mb-8">
                {/* Speed & Precision */}
                <div className="bg-black rounded-xl p-6 border border-gray-800">
                  <div className="flex items-start gap-3">
                    <Zap className="size-6 text-yellow-400 fill-yellow-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <h3 className="font-bold text-lg text-white mb-2">Speed & Precision</h3>
                      <p className="text-sm text-gray-300 leading-relaxed">
                        Enables faster decisions and reduces operational friction through seamless integration.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Interoperability */}
                <div className="bg-black rounded-xl p-6 border border-gray-800">
                  <div className="flex items-start gap-3">
                    <Shield className="size-6 text-yellow-400 fill-yellow-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <h3 className="font-bold text-lg text-white mb-2">Interoperability</h3>
                      <p className="text-sm text-gray-300 leading-relaxed">
                        Synchronizes data, workflows, and platforms across multiple operational domains.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* User Agreement Form */}
              <div className="border-t border-border pt-6">
                <label className="flex items-start gap-3 cursor-pointer group">
                  <input 
                    type="checkbox"
                    checked={agreedToTerms}
                    onChange={(e) => setAgreedToTerms(e.target.checked)}
                    className="mt-1 w-5 h-5 rounded border-gray-300 text-purple-600 focus:ring-purple-500 cursor-pointer"
                  />
                  <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                    I agree to the{' '}
                    <button 
                      onClick={(e) => {
                        e.preventDefault();
                        navigate('/agreement');
                      }}
                      className="text-blue-600 dark:text-blue-400 underline hover:text-blue-700 dark:hover:text-blue-300"
                    >
                      Terms of Service
                    </button>
                    {' '}and understand that ORA is designed for learning and professional development, not for collecting personally identifiable information (PII) or securing sensitive data.
                  </span>
                </label>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <GlobalFooter />

      {/* Floating Feature Button */}
      <button
        onClick={() => setShowFeatureCard(true)}
        className="fixed bottom-6 right-6 p-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full shadow-2xl hover:shadow-purple-500/50 hover:scale-110 transition-all z-40 flex items-center gap-2"
        aria-label="View AI Trends RAG Feature"
      >
        <Sparkles className="size-5" />
        <span className="text-sm font-semibold">NEW</span>
      </button>

      {/* AI Trends Feature Card */}
      {showFeatureCard && (
        <AITrendsFeatureCard onClose={() => setShowFeatureCard(false)} />
      )}

      {/* AI Agent Modal */}
      <AIAgentModal 
        isOpen={isAgentModalOpen}
        onClose={() => setIsAgentModalOpen(false)}
      />

      {/* Personal AI Agent Side Panel */}
      <AIAgentSidePanel 
        isOpen={isPersonalAgentOpen}
        onClose={() => setIsPersonalAgentOpen(false)}
      />
    </div>
  );
}

// Chat Page Component
function ChatPage() {
  const [isPersonalAgentOpen, setIsPersonalAgentOpen] = useState(true);
  const { navigate } = useNavigation();

  const handleClose = () => {
    setIsPersonalAgentOpen(false);
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-background">
      <AIAgentSidePanel 
        isOpen={isPersonalAgentOpen}
        onClose={handleClose}
      />
    </div>
  );
}

// Features Page Wrapper
function FeaturesPageWrapper() {
  const [isOpen, setIsOpen] = useState(true);
  const { navigate } = useNavigation();

  const handleClose = () => {
    setIsOpen(false);
    navigate('/');
  };

  const handleTryAgent = () => {
    navigate('/chat');
  };

  const handleUpgradeClick = () => {
    navigate('/chat');
  };

  return (
    <FeaturesPage
      isOpen={isOpen}
      onClose={handleClose}
      onTryAgent={handleTryAgent}
      onUpgradeClick={handleUpgradeClick}
    />
  );
}

// App Router Component
function AppRouter() {
  const { currentPage } = useNavigation();
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [isAgentOpen, setIsAgentOpen] = useState(false);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    if (newTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  // Render current page
  const renderPage = () => {
    switch (currentPage) {
      case '/':
        return <HomePage />;
      case '/chat':
        return <ChatPage />;
      case '/features':
        return <FeaturesPageWrapper />;
      case '/downloads':
        return (
          <>
            <GlobalNavigation 
              theme={theme}
              onThemeToggle={toggleTheme}
              onOpenAgent={() => setIsAgentOpen(true)}
            />
            <DownloadsPage />
            <GlobalFooter />
            <AIAgentModal 
              isOpen={isAgentOpen}
              onClose={() => setIsAgentOpen(false)}
            />
          </>
        );
      case '/docs':
        return (
          <>
            <GlobalNavigation 
              theme={theme}
              onThemeToggle={toggleTheme}
              onOpenAgent={() => setIsAgentOpen(true)}
            />
            <DocumentationPage />
            <GlobalFooter />
            <AIAgentModal 
              isOpen={isAgentOpen}
              onClose={() => setIsAgentOpen(false)}
            />
          </>
        );
      case '/pricing':
        return (
          <>
            <GlobalNavigation 
              theme={theme}
              onThemeToggle={toggleTheme}
              onOpenAgent={() => setIsAgentOpen(true)}
            />
            <PricingPage onClose={() => {}} />
            <GlobalFooter />
            <AIAgentModal 
              isOpen={isAgentOpen}
              onClose={() => setIsAgentOpen(false)}
            />
          </>
        );
      case '/about':
        return (
          <>
            <GlobalNavigation 
              theme={theme}
              onThemeToggle={toggleTheme}
              onOpenAgent={() => setIsAgentOpen(true)}
            />
            <AboutPage />
            <GlobalFooter />
            <AIAgentModal 
              isOpen={isAgentOpen}
              onClose={() => setIsAgentOpen(false)}
            />
          </>
        );
      case '/agreement':
        return (
          <>
            <GlobalNavigation 
              theme={theme}
              onThemeToggle={toggleTheme}
              onOpenAgent={() => setIsAgentOpen(true)}
            />
            <AgreementPage />
            <GlobalFooter />
            <AIAgentModal 
              isOpen={isAgentOpen}
              onClose={() => setIsAgentOpen(false)}
            />
          </>
        );
      case '/training':
        return (
          <>
            <GlobalNavigation 
              theme={theme}
              onThemeToggle={toggleTheme}
              onOpenAgent={() => setIsAgentOpen(true)}
            />
            <TrainingPage />
            <GlobalFooter />
            <AIAgentModal 
              isOpen={isAgentOpen}
              onClose={() => setIsAgentOpen(false)}
            />
          </>
        );
      case '/mission':
        return (
          <>
            <GlobalNavigation 
              theme={theme}
              onThemeToggle={toggleTheme}
              onOpenAgent={() => setIsAgentOpen(true)}
            />
            <MissionPage />
            <GlobalFooter />
            <AIAgentModal 
              isOpen={isAgentOpen}
              onClose={() => setIsAgentOpen(false)}
            />
          </>
        );
      case '/qrcodehub':
        return (
          <>
            <GlobalNavigation 
              theme={theme}
              onThemeToggle={toggleTheme}
              onOpenAgent={() => setIsAgentOpen(true)}
            />
            <QRCodeHub />
            <GlobalFooter />
            <AIAgentModal 
              isOpen={isAgentOpen}
              onClose={() => setIsAgentOpen(false)}
            />
          </>
        );
      default:
        return <HomePage />;
    }
  };

  return <div>{renderPage()}</div>;
}

// Main App - Export
export default function App() {
  return (
    <AuthProvider>
      <NavigationProvider>
        <AppRouter />
      </NavigationProvider>
    </AuthProvider>
  );
}
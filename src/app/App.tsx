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
import { DataConsentModal } from "./components/DataConsentModal";
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
  const [showConsentModal, setShowConsentModal] = useState(false);
  const [showFeatureCard, setShowFeatureCard] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("dark"); // Default to dark mode
  const [isAgentModalOpen, setIsAgentModalOpen] = useState(false);
  const [isPersonalAgentOpen, setIsPersonalAgentOpen] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
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

  // Capture the beforeinstallprompt event
  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      console.log('PWA install prompt captured');
    };

    window.addEventListener('beforeinstallprompt', handler);

    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
    };
  }, []);

  // Check if consent modal should be shown for first-time users
  useEffect(() => {
    const consentShown = localStorage.getItem("consentShown");
    if (!consentShown) {
      setTimeout(() => {
        setShowConsentModal(true);
      }, 2000);
    }
  }, []);

  // Authenticate carapaulson1@gmail.com as subscriber during design stage
  useEffect(() => {
    const authenticatedEmail = "carapaulson1@gmail.com";
    const currentUserEmail = localStorage.getItem("userEmail");
    
    if (currentUserEmail === authenticatedEmail || !currentUserEmail) {
      localStorage.setItem("userEmail", authenticatedEmail);
      localStorage.setItem("userStatus", "logged_in");
      localStorage.setItem("userTier", "premium");
      localStorage.setItem("userName", "Cara Paulson");
    }
  }, []);

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
    localStorage.setItem("consentShown", "true");
    localStorage.setItem("userAgreementAccepted", "true");
    localStorage.setItem("userQuestionCount", "0"); // Reset question count
    setShowConsentModal(false);
  };

  const handleConsentDecline = () => {
    setShowConsentModal(false);
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
      <main className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center px-4 pt-5 -mt-4">
          {/* ORA Brand */}
          <div className="mb-8">
            <a 
              href="https://agent.myora.now/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-block hover:opacity-80 transition-opacity cursor-pointer"
            >
              <h1 className="text-6xl sm:text-7xl font-black tracking-[0.3em] mb-4">
                ORA
              </h1>
            </a>
            <p className="text-lg text-muted-foreground tracking-wider mb-0">
              Observe &nbsp;&nbsp; Respond &nbsp;&nbsp; Act
            </p>
          </div>

          {/* Main Headline */}
          <h2 className="text-3xl sm:text-4xl font-bold mb-6 max-w-3xl mx-auto leading-tight text-purple-600 dark:text-purple-400 -mt-2">
            Your Personal AI Leadership Agent
          </h2>

          {/* Tagline */}
          <p className="text-sm sm:text-lg text-gray-700 dark:text-white mb-8 max-w-3xl mx-auto leading-relaxed font-medium -mt-[18px]">
            The key to unlocking AI Transformation is in mobile micro-learning: from hand held capabilities to cultural confidence!
          </p>

          {/* Quick Launch Button */}
          <button 
            onClick={() => setIsPersonalAgentOpen(true)}
            className="bg-green-600 hover:bg-green-700 text-white px-7 py-3.5 text-base rounded-lg inline-flex items-center gap-2.5 transition-colors mb-8"
          >
            <Bot className="size-5" /> Try Mobile AI Agent
          </button>

          {/* Features Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left relative z-10">
            {/* Speed & Precision */}
            <div className="bg-black dark:bg-black backdrop-blur-sm border border-gray-400 dark:border-purple-400/30 rounded-lg p-4 shadow-md shadow-purple-500/20 dark:shadow-purple-500/40 hover:shadow-purple-500/40 dark:hover:shadow-purple-500/60 hover:shadow-lg transition-shadow">
              <div className="flex items-start gap-3">
                <Zap className="size-5 text-white fill-yellow-400 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-bold text-sm text-white mb-1">Speed & Precision</h3>
                  <p className="text-xs text-white leading-relaxed">
                    Enables faster decisions and reduces operational friction through seamless integration.
                  </p>
                </div>
              </div>
            </div>

            {/* Interoperability */}
            <div className="bg-black dark:bg-black backdrop-blur-sm border border-gray-400 dark:border-purple-400/30 rounded-lg p-4 shadow-md shadow-purple-500/20 dark:shadow-purple-500/40 hover:shadow-purple-500/40 dark:hover:shadow-purple-500/60 hover:shadow-lg transition-shadow">
              <div className="flex items-start gap-3">
                <Shield className="size-5 text-white fill-yellow-400 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-bold text-sm text-white mb-1">Interoperability</h3>
                  <p className="text-xs text-white leading-relaxed">
                    Synchronizes data, workflows, and platforms across multiple operational domains.
                  </p>
                </div>
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

      {/* Data Consent Modal */}
      <DataConsentModal
        isOpen={showConsentModal}
        onAccept={handleConsentAccept}
        onDecline={handleConsentDecline}
        deferredPrompt={deferredPrompt}
      />
    </div>
  );
}

// Chat Page Component
function ChatPage() {
  const [isPersonalAgentOpen, setIsPersonalAgentOpen] = useState(true);
  const [showConsentModal, setShowConsentModal] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const { navigate } = useNavigation();

  // Capture the beforeinstallprompt event
  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      console.log('PWA install prompt captured');
    };

    window.addEventListener('beforeinstallprompt', handler);

    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
    };
  }, []);

  const handleConsentAccept = () => {
    localStorage.setItem("consentShown", "true");
    localStorage.setItem("userAgreementAccepted", "true");
    localStorage.setItem("userQuestionCount", "0"); // Reset question count
    setShowConsentModal(false);
  };

  const handleConsentDecline = () => {
    setShowConsentModal(false);
  };

  const handleShowConsentModal = () => {
    setShowConsentModal(true);
  };

  const handleClose = () => {
    setIsPersonalAgentOpen(false);
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-background">
      <AIAgentSidePanel 
        isOpen={isPersonalAgentOpen}
        onClose={handleClose}
        onShowConsentModal={handleShowConsentModal}
      />
      
      {/* Data Consent Modal */}
      <DataConsentModal
        isOpen={showConsentModal}
        onAccept={handleConsentAccept}
        onDecline={handleConsentDecline}
        deferredPrompt={deferredPrompt}
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
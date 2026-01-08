/**
 * ORA - AI Leadership Agent
 * Copyright (c) 2024-2026 s2cpaul
 * Licensed under MIT License
 * Repository: https://github.com/s2cpaul/ora-agent
 */

import { useState, useEffect, useRef } from "react";
import { BrowserRouter, Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { Bot, Moon, Sun, Zap, Monitor, Shield, CheckCircle2, Smartphone, Sparkles } from "lucide-react";
import { AIAgentModal } from "./components/AIAgentModal";
import { AIAgentSidePanel } from "./components/AIAgentSidePanel";
import { DataConsentModal } from "./components/DataConsentModal";
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
import { ConfigurationPage } from "./components/ConfigurationPage";
import { MissionPage } from "./components/MissionPage";
import { AuthProvider } from "../contexts/AuthContext";

// Home Page Component
function HomePage() {
  const [showConsentModal, setShowConsentModal] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [isAgentModalOpen, setIsAgentModalOpen] = useState(false);
  const [isPersonalAgentOpen, setIsPersonalAgentOpen] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const navigate = useNavigate();
  
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
    setShowConsentModal(false);
  };

  const handleConsentDecline = () => {
    setShowConsentModal(false);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Simplified Header */}
      <header className="border-b bg-card">
        <div className="max-w-4xl mx-auto px-4 py-4 sm:px-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h1 className="font-semibold text-lg">ORA - AI Leadership Agent</h1>
              <button 
                onClick={() => navigate('/features')}
                className="text-sm text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 flex items-center gap-1.5 font-medium transition-colors"
              >
                <Sparkles className="size-4" /> Multi-Agent Features
              </button>
              <button 
                onClick={toggleTheme}
                className="text-muted-foreground hover:text-foreground flex items-center gap-2"
              >
                {theme === "light" ? <Moon className="size-4" /> : <Sun className="size-4" />}
              </button>
            </div>
            
            <button 
              onClick={() => setIsAgentModalOpen(true)}
              className="flex items-center gap-2 px-3 py-1.5 bg-primary text-primary-foreground dark:bg-purple-600 dark:text-white rounded-lg hover:bg-primary/90 dark:hover:bg-purple-700 transition-colors text-sm"
            >
              <Bot className="size-4" /> ORA Agent
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center px-4 pt-5">
          {/* ORA Brand */}
          <div className="mb-12">
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
            <p className="text-lg text-muted-foreground tracking-wider">
              Observe &nbsp;&nbsp; Respond &nbsp;&nbsp; Act
            </p>
          </div>

          {/* Main Headline */}
          <h2 className="text-3xl sm:text-4xl font-bold mb-6 max-w-3xl mx-auto leading-tight text-black dark:text-white">
            Your Personal AI Leadership Agent
          </h2>

          {/* Tagline */}
          <p className="text-lg sm:text-xl text-gray-700 dark:text-white mb-8 max-w-3xl mx-auto leading-relaxed font-medium">
            The key to unlocking AI Transformation is in mobile micro-learning: from hand held capabilities to cultural confidence!
          </p>

          {/* Quick Launch Button */}
          <button 
            onClick={() => setIsPersonalAgentOpen(true)}
            className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 text-lg rounded-lg inline-flex items-center gap-3 transition-colors mb-8"
          >
            <Bot className="size-6" /> Try Mobile AI Agent
          </button>

          {/* Free Trial Mobile Download Section */}
          <div className="max-w-2xl mx-auto mb-12">
            <div className="bg-gradient-to-br from-gray-100 to-gray-200 dark:from-purple-900/40 dark:via-blue-900/40 dark:to-green-900/40 border border-black dark:border-purple-400/50 rounded-xl p-6 shadow-[0_0_20px_rgba(34,197,94,0.3)] hover:shadow-[0_0_30px_rgba(34,197,94,0.5)] dark:shadow-[0_0_30px_rgba(168,85,247,0.4),0_0_60px_rgba(59,130,246,0.3)] dark:hover:shadow-[0_0_40px_rgba(168,85,247,0.6),0_0_80px_rgba(59,130,246,0.5)] transition-shadow dark:backdrop-blur-xl dark:relative dark:before:absolute dark:before:inset-0 dark:before:rounded-xl dark:before:bg-gradient-to-br dark:before:from-white/10 dark:before:via-purple-400/5 dark:before:to-blue-400/5 dark:before:opacity-60 dark:before:pointer-events-none">
              <button 
                onClick={() => setShowConsentModal(true)}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg inline-flex items-center gap-2 font-semibold transition-colors mb-4 mx-auto shadow-lg shadow-green-500/50 hover:shadow-green-500/70 hover:shadow-xl"
              >
                <Smartphone className="size-5" />
                Get Free Trial Version ORA Mobile Download Now!
              </button>
              
              <p className="text-sm text-gray-800 dark:text-white mb-6 relative z-10">
                From your mobile device tap <Monitor className="inline size-4 mx-1" />
                add to home screen for seamless startup.
              </p>

              {/* Features Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left relative z-10">
                {/* Speed & Precision */}
                <div className="bg-gray-700 dark:bg-gray-700 backdrop-blur-sm border border-gray-400 dark:border-purple-400/30 rounded-lg p-4 shadow-md shadow-purple-500/20 dark:shadow-purple-500/40 hover:shadow-purple-500/40 dark:hover:shadow-purple-500/60 hover:shadow-lg transition-shadow">
                  <div className="flex items-start gap-3">
                    <Zap className="size-5 text-white fill-white mt-0.5 flex-shrink-0" />
                    <div>
                      <h3 className="font-bold text-sm text-white mb-1">Speed & Precision</h3>
                      <p className="text-xs text-white leading-relaxed">
                        Enables faster decisions and reduces operational friction through seamless integration.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Interoperability */}
                <div className="bg-gray-700 dark:bg-gray-700 backdrop-blur-sm border border-gray-400 dark:border-blue-400/30 rounded-lg p-4 shadow-md shadow-purple-500/20 dark:shadow-blue-500/40 hover:shadow-purple-500/40 dark:hover:shadow-blue-500/60 hover:shadow-lg transition-shadow">
                  <div className="flex items-start gap-3">
                    <Shield className="size-5 text-white fill-white mt-0.5 flex-shrink-0" />
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
          </div>
        </div>
      </main>

      {/* Footer */}
      <GlobalFooter />

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
  const navigate = useNavigate();

  // Ensure chat opens immediately on mount
  useEffect(() => {
    setIsPersonalAgentOpen(true);
  }, []);

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
  const navigate = useNavigate();

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

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/features" element={<FeaturesPageWrapper />} />
        <Route 
          path="/downloads" 
          element={
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
          } 
        />
        <Route 
          path="/docs" 
          element={
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
          } 
        />
        <Route 
          path="/pricing" 
          element={
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
          } 
        />
        <Route 
          path="/about" 
          element={
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
          } 
        />
        <Route 
          path="/agreement" 
          element={
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
          } 
        />
        <Route 
          path="/training" 
          element={
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
          } 
        />
        <Route 
          path="/configuration" 
          element={
            <>
              <GlobalNavigation 
                theme={theme}
                onThemeToggle={toggleTheme}
                onOpenAgent={() => setIsAgentOpen(true)}
              />
              <ConfigurationPage />
              <GlobalFooter />
              <AIAgentModal 
                isOpen={isAgentOpen}
                onClose={() => setIsAgentOpen(false)}
              />
            </>
          } 
        />
        <Route 
          path="/mission" 
          element={
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
          } 
        />
      </Routes>
    </BrowserRouter>
  );
}

// Main App - Export
export default function App() {
  return (
    <AuthProvider>
      <AppRouter />
    </AuthProvider>
  );
}
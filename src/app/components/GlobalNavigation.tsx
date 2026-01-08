/**
 * ORA - AI Leadership Agent
 * Copyright (c) 2024-2026 s2cpaul
 * Licensed under MIT License
 * Repository: https://github.com/s2cpaul/ora-agent
 */

import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  Bot, 
  Moon, 
  Sun, 
  Menu, 
  X, 
  Home, 
  Download,
  Sparkles,
  Settings,
  BookOpen,
  MessageSquare,
  DollarSign,
  Shield,
  FileText
} from 'lucide-react';

interface GlobalNavigationProps {
  theme?: 'light' | 'dark';
  onThemeToggle?: () => void;
  onOpenAgent?: () => void;
}

export function GlobalNavigation({ 
  theme = 'light', 
  onThemeToggle,
  onOpenAgent 
}: GlobalNavigationProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const navLinks = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/features', label: 'Features', icon: Sparkles },
    { path: '/mission', label: 'Mission', icon: Shield },
    { path: '/downloads', label: 'Downloads', icon: Download },
    { path: '/docs', label: 'Documentation', icon: BookOpen },
    { path: '/pricing', label: 'Pricing', icon: DollarSign },
    { path: '/configuration', label: 'Configuration', icon: Settings },
  ];

  const handleNavClick = (path: string) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* Desktop & Mobile Header */}
      <header className="sticky top-0 z-50 border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
        <div className="max-w-7xl mx-auto px-4 py-3 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo & Brand */}
            <button 
              onClick={() => handleNavClick('/')}
              className="flex items-center gap-3 hover:opacity-80 transition-opacity"
            >
              <div className="size-8 bg-gradient-to-br from-purple-600 to-purple-800 rounded-lg flex items-center justify-center">
                <Bot className="size-5 text-white" />
              </div>
              <span className="font-bold text-xl tracking-tight">ORA</span>
            </button>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map(link => {
                const Icon = link.icon;
                return (
                  <button
                    key={link.path}
                    onClick={() => handleNavClick(link.path)}
                    className={`
                      flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors
                      ${isActive(link.path)
                        ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300'
                        : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                      }
                    `}
                  >
                    <Icon className="size-4" />
                    <span>{link.label}</span>
                  </button>
                );
              })}
            </nav>

            {/* Right Actions */}
            <div className="flex items-center gap-2">
              {/* Theme Toggle */}
              {onThemeToggle && (
                <button
                  onClick={onThemeToggle}
                  className="p-2 text-muted-foreground hover:text-foreground rounded-lg hover:bg-muted transition-colors"
                  aria-label="Toggle theme"
                >
                  {theme === 'light' ? (
                    <Moon className="size-5" />
                  ) : (
                    <Sun className="size-5" />
                  )}
                </button>
              )}

              {/* Open AI Agent */}
              {onOpenAgent && (
                <button
                  onClick={onOpenAgent}
                  className="hidden sm:flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium"
                >
                  <Bot className="size-5" />
                  <span className="hidden lg:inline text-gray-400">Chat with ORA</span>
                  <span className="lg:hidden text-gray-400">Chat</span>
                </button>
              )}

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 text-muted-foreground hover:text-foreground rounded-lg hover:bg-muted transition-colors"
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? (
                  <X className="size-6" />
                ) : (
                  <Menu className="size-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-black/50 md:hidden" onClick={() => setIsMobileMenuOpen(false)} />
      )}

      {/* Mobile Menu */}
      <div
        className={`
          fixed top-[57px] right-0 bottom-0 z-40 w-64 bg-card border-l transform transition-transform duration-300 ease-in-out md:hidden
          ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}
        `}
      >
        <nav className="p-4 space-y-2">
          {navLinks.map(link => {
            const Icon = link.icon;
            return (
              <button
                key={link.path}
                onClick={() => handleNavClick(link.path)}
                className={`
                  w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors
                  ${isActive(link.path)
                    ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300'
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                  }
                `}
              >
                <Icon className="size-5" />
                <span>{link.label}</span>
              </button>
            );
          })}

          <div className="pt-4 border-t border-border">
            {onOpenAgent && (
              <button
                onClick={() => {
                  onOpenAgent();
                  setIsMobileMenuOpen(false);
                }}
                className="w-full flex items-center gap-3 px-4 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium"
              >
                <MessageSquare className="size-5" />
                <span>Chat with ORA</span>
              </button>
            )}
          </div>
        </nav>
      </div>
    </>
  );
}
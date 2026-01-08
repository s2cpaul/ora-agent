/**
 * ORA - AI Leadership Agent
 * Copyright (c) 2024-2026 s2cpaul
 * Licensed under MIT License
 * Repository: https://github.com/s2cpaul/ora-agent
 */

import { useNavigate } from 'react-router-dom';

export function GlobalFooter() {
  const navigate = useNavigate();
  const currentYear = new Date().getFullYear();

  const communityLinks = [
    { label: 'Forums', href: '#forums' },
    { label: 'Discord', href: 'https://discord.gg/ora', external: true },
    { label: 'Events', href: '#events' },
    { label: 'Meetups', href: '#meetups' },
  ];

  const resourceLinks = [
    { label: 'Documentation', href: '/docs' },
    { label: 'Free Training', href: 'https://agent.myora.now/', external: true },
    { label: 'Research Papers', href: '#research' },
    { label: 'Best Practices', href: '#best-practices' },
  ];

  const companyLinks = [
    { label: 'About', href: '/about' },
    { label: 'Investors', href: '#investors' },
    { label: 'Donate', href: '#donate' },
    { label: 'Contact', href: 'https://calendly.com/caraz007', external: true },
  ];

  const legalLinks = [
    { label: 'Privacy Policy', href: '#privacy' },
    { label: 'Terms of Service', href: '#terms' },
    { label: 'User Agreement', href: '#user-agreement' },
    { label: 'Code of Conduct', href: '#code-of-conduct' },
  ];

  const handleLinkClick = (href: string, external?: boolean) => {
    if (external) {
      window.open(href, '_blank', 'noopener noreferrer');
    } else if (href.startsWith('#')) {
      // Handle hash links (scroll to section)
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      navigate(href);
    }
  };

  return (
    <footer className="border-t bg-card">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* ORA Brand Section */}
          <div className="lg:col-span-1">
            <a
              href="/training"
              onClick={(e) => {
                e.preventDefault();
                handleLinkClick('/training');
              }}
              className="text-xl font-bold mb-4 inline-block hover:text-primary transition-colors cursor-pointer"
            >
              ORA
            </a>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4 mt-4">
              Supporting the modern workforce with fast, free, mobile micro-learning that makes them AI-enabled. AI literacy is now essential for career success. We drive innovation, efficiency, and measurable organizational change while fostering community, unexpected collaboration, positive energy, and partnerships that accelerate transformation. Currently available in English and Spanish.
            </p>
            <a
              href="/agreement"
              onClick={(e) => {
                e.preventDefault();
                handleLinkClick('/agreement');
              }}
              className="text-sm text-primary hover:underline font-medium inline-block"
            >
              Free Trial User Agreement
            </a>
          </div>

          {/* Community Links */}
          <div>
            <h3 className="text-sm font-semibold mb-4">Community</h3>
            <ul className="space-y-3">
              {communityLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleLinkClick(link.href, link.external);
                    }}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h3 className="text-sm font-semibold mb-4">Resources</h3>
            <ul className="space-y-3">
              {resourceLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleLinkClick(link.href, link.external);
                    }}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-sm font-semibold mb-4">Company</h3>
            <ul className="space-y-3">
              {companyLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleLinkClick(link.href, link.external);
                    }}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Legal Section */}
        <div className="pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Copyright */}
            <p className="text-sm text-muted-foreground">
              © {currentYear} ORA Community. All rights reserved.
            </p>

            {/* Legal Links */}
            <nav className="flex flex-wrap justify-center gap-6">
              {legalLinks.map((link, index) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleLinkClick(link.href);
                  }}
                  className={`text-sm text-muted-foreground hover:text-foreground transition-colors ${
                    index === legalLinks.length - 2 ? 'font-medium' : ''
                  }`}
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
}
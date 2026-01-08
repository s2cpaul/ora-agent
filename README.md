# 📱 ORA AI Agent

**Your Personal AI Leadership Agent with Multi-Agent Connectivity**

[![GitHub](https://img.shields.io/badge/GitHub-s2cpaul%2Fora--agent-blue?logo=github)](https://github.com/s2cpaul/ora-agent)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18-blue?logo=react)](https://reactjs.org/)

---

## 🎯 What is ORA?

**ORA** (Observe • Respond • Act) is a freemium, mobile-first AI Leadership Agent platform that enables:

- ✅ **Instant AI Assistance** - No signup required for free tier
- ✅ **Multi-Agent Connectivity** - Connect Google Drive, SharePoint, Notion, Slack, and more
- ✅ **Seat-Based Pricing** - 5 flexible tiers (Free, Solo, Buddy, Team, Enterprise)
- ✅ **Mobile PWA** - Install as native app on iPhone/Android
- ✅ **Analytics-Driven** - Comprehensive tracking for ML/AI insights
- ✅ **Security First** - Credential management and RLS built-in

---

## 🚀 Quick Start

### **📖 [Complete Setup Guide →](./QUICK_START_SETUP.md)**

For detailed setup instructions including credential configuration, database setup, and deployment, see the **[Quick Start Setup Guide](./QUICK_START_SETUP.md)**.

### **⚡ TL;DR - In 3 Steps:**

```bash
# 1. Clone and install
git clone https://github.com/s2cpaul/ora-agent.git
cd ora-agent
npm install

# 2. Set up credentials
cp .env.example .env
# Edit .env and add your API keys (see QUICK_START_SETUP.md)

# 3. Start dev server
npm run dev
```

**🔐 Important:** You need API keys from:
- **OpenAI** - [Get key here](https://platform.openai.com/api-keys)
- **Supabase** - [Get key here](https://supabase.com/dashboard)

See **[QUICK_START_SETUP.md](./QUICK_START_SETUP.md)** for step-by-step instructions.

---

## 📚 Documentation

| Guide | Description |
|-------|-------------|
| **[Quick Start Setup](./QUICK_START_SETUP.md)** | ⭐ Complete setup guide (start here!) |
| [Multi-Agent Quick Start](./QUICK_START.md) | Multi-agent features walkthrough |
| [Supabase Auth Guide](./QUICK_START_GUIDE.md) | Authentication setup details |
| [Credentials Guide](./CREDENTIALS_GUIDE.md) | Security best practices |
| [Multi-Agent System](./MULTI_AGENT_SYSTEM.md) | Architecture documentation |

---

## 📂 Project Structure

```
ora-agent/
├── src/
│   ├── app/
│   │   ├── components/           # React components
│   │   │   ├── AIAgentSidePanel.tsx
│   │   │   ├── GlobalNavigation.tsx
│   │   │   ├── GlobalFooter.tsx
│   │   │   ├── PricingPage.tsx
│   │   │   └── ui/              # Reusable UI components
│   │   ├── data/                # Static data
│   │   ├── utils/               # Analytics, tracking
│   │   └── App.tsx              # Main app (408 lines)
│   ├── contexts/                # React contexts
│   ├── lib/                     # Config, Supabase
│   └── styles/                  # Tailwind CSS
├── .vscode/                     # VS Code config
├── .github/                     # Copilot instructions
├── .env.example                 # Environment template
├── PROJECT_OVERVIEW.md          # Complete docs (50+ pages)
├── ERROR_HANDLING_GUIDE.md      # TypeScript/JSX error guide
└── package.json
```

---

## 💰 Pricing Tiers

| Tier | Price | Questions/Month | Key Features |
|------|-------|-----------------|--------------|
| **Free** | $0 | 10 | Basic AI chat, no login required |
| **Solo** | $24 | 50 | Analytics, export, priority support |
| **Buddy** | $60 | 100 | Custom branding, team features |
| **Team** | $250 | 200 | Multi-agent, Drive/SharePoint |
| **Enterprise** | $1500 | 1000 | Custom agents, white-label, SLA |

---

## 🔌 Integrations

### Ready to Connect

- 🤖 **Google Drive** - Document access
- 🤖 **SharePoint** - Enterprise documents
- 🤖 **Notion** - Knowledge base
- 🤖 **Slack** - Team communication
- 🤖 **Microsoft Teams** - Enterprise chat
- 🤖 **Jira** - Project management

### Authentication & Payments

- ✅ **Supabase Auth** - Email, Google OAuth
- ✅ **Stripe** - Credit card processing
- ✅ **PayPal** - Alternative payment

---

## 🛠️ Tech Stack

### Frontend
- **React 18** + TypeScript
- **Vite** - Fast build tool
- **Tailwind CSS v4** - Styling
- **React Router v6** - Navigation
- **Lucide React** - Icons

### Backend
- **Supabase** - PostgreSQL database
- **Supabase Auth** - User authentication
- **Edge Functions** - Serverless API

### APIs
- **OpenAI GPT-4** - AI responses
- **Stripe** - Payments
- **Google APIs** - Drive, OAuth
- **Microsoft Graph** - SharePoint

---

## 📊 Analytics

Built-in comprehensive tracking system:

- ✅ User questions & AI responses
- ✅ Video engagement
- ✅ Feedback (thumbs up/down)
- ✅ Navigation & feature usage
- ✅ Subscription events
- ✅ Conversion funnels

See `/ANALYTICS_SETUP.md` for full setup guide.

---

## 🔐 Security

### Credential Management
- All secrets in `.env` (not committed)
- Central config at `/src/lib/config.ts`
- Client-safe values only (VITE_ prefix)
- Server secrets in Edge Functions

### Database Security
- Row Level Security (RLS) enabled
- Users can only access own data
- Admin-only analytics access

See `/CREDENTIALS_GUIDE.md` for details.

---

## 📱 Mobile PWA

### Install on Mobile
1. Visit app on mobile device
2. Tap "Get Free Trial Version"
3. Accept data consent
4. Tap "Add to Home Screen"
5. App icon appears on home screen

### Features
- Offline support (service worker ready)
- Push notifications ready
- iPhone 16 optimized (393px × 852px)
- Native app experience

---

## 🎨 Design System

### Theme
- **Light Mode:** White/gray background, dark text
- **Dark Mode:** Black background, white text
- **Primary:** Purple (#7c3aed)
- **Accent:** Green (#16a34a)

### Design Rules
- Thought bubbles: Dark gray (light mode), white (dark mode)
- Links: Dark blue, underlined
- No white text in thought bubbles (accessibility)
- Mobile-first responsive design

See `/src/styles/theme.css` for token system.

---

## 🚀 Deployment

### Development
```bash
npm run dev          # Start dev server
npm run type-check   # Check TypeScript errors
npm run lint         # Run ESLint
npm run validate     # Run all checks
```

### Production
```bash
npm run build        # Build for production
npm run preview      # Preview production build
```

### Deploy to Vercel
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Production deploy
vercel --prod
```

See `/SETUP_CHECKLIST.md` for full deployment guide.

---

## 🎓 VS Code Setup

### Recommended Extensions
- GitHub Copilot + Copilot Chat
- ESLint
- Prettier
- Error Lens
- TypeScript
- Tailwind CSS IntelliSense

Install all:
```bash
# VS Code will prompt when you open the project
# Or manually: Cmd+Shift+P → "Extensions: Show Recommended Extensions"
```

See `/QUICK_COPILOT_SETUP.md` for 5-minute setup.

---

## 🐛 Error Handling

### Common Issues

**TypeScript Errors:**
```bash
npm run type-check   # Check errors
```

**ESLint Errors:**
```bash
npm run lint         # Show errors
npm run lint:fix     # Auto-fix
```

**Format Code:**
```bash
npm run format       # Format all files
```

See `/ERROR_HANDLING_GUIDE.md` for 10+ common errors and fixes.

---

## 🤝 Contributing

### Workflow
1. Fork the repository
2. Create feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open Pull Request

### Code Standards
- TypeScript strict mode
- ESLint + Prettier configured
- Run `npm run validate` before commit
- Follow existing component patterns

---

## 📞 Support & Contact

### Built-In Support
- AI Agent help system
- Report Issue modal
- Feedback modal
- FAQ component

### Contact
- **Email:** carapaulson1@gmail.com
- **Calendly:** https://calendly.com/caraz007
- **Website:** https://agent.myora.now/
- **GitHub:** https://github.com/s2cpaul/ora-agent

---

## 📈 Roadmap

### Q1 2025
- [ ] Launch freemium version
- [ ] Multi-agent beta (Team tier)
- [ ] Mobile PWA optimization

### Q2 2025
- [ ] Custom agent builder
- [ ] Advanced analytics dashboards
- [ ] White-label options (Enterprise)

### Q3 2025
- [ ] Mobile native apps (iOS/Android)
- [ ] API access for Enterprise
- [ ] Webhooks & integrations

### Q4 2025
- [ ] SSO (SAML, LDAP)
- [ ] ML/AI enhancements
- [ ] Churn prediction model

---

## 🏆 What Makes ORA Unique

1. **Mobile-First** - iPhone 16 optimized from day one
2. **No Login for Free** - Try before you buy
3. **Multi-Agent System** - Connect all your tools
4. **Analytics-Driven** - Every interaction tracked
5. **Clean Codebase** - 408-line App.tsx (was 1400+)
6. **Security First** - Credential management built-in
7. **Copilot Ready** - AI pair programming configured
8. **PWA Ready** - Install as native app
9. **5 Pricing Tiers** - Flexible for all users
10. **Production-Ready** - Deploy in 5 minutes

---

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.

**Copyright (c) 2024-2026 s2cpaul**  
All code is licensed under the MIT License and available on GitHub at [https://github.com/s2cpaul/ora-agent](https://github.com/s2cpaul/ora-agent)

---

## 🙏 Acknowledgments

- Built with [React](https://reactjs.org/) + [TypeScript](https://www.typescriptlang.org/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Powered by [Supabase](https://supabase.com/)
- AI by [OpenAI](https://openai.com/)
- Icons by [Lucide](https://lucide.dev/)

---

## 📊 Project Stats

- **Components:** 50+ UI components
- **Routes:** 5 main pages
- **Pricing Tiers:** 5 (Free → Enterprise)
- **Integrations:** 6+ multi-agent connections
- **Documentation:** 10+ comprehensive guides
- **Analytics Events:** 15+ tracked interactions
- **Lines of Code:** ~13,000 (clean, organized)

---

## 🚀 Get Started Now!

```bash
git clone https://github.com/s2cpaul/ora-agent.git
cd ora-agent
npm install
npm run dev
```

**Your AI Leadership Agent is ready in 60 seconds!** 🎉

---

**Made with ❤️ by the ORA Community**

**Repository:** https://github.com/s2cpaul/ora-agent
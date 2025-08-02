# 🌟 ShowTrackAI - Static Site

> **Elite livestock management app for FFA students - Now as a lightning-fast, offline-capable Progressive Web App**

## 🎯 Overview

ShowTrackAI Static is a complete conversion of the ShowTrackAI React Native application to a deployable static site. This version preserves **100% of the original functionality** while adding:

- ⚡ **Lightning-fast performance** with static site generation
- 📱 **Progressive Web App** capabilities (installable as native app)
- 🌐 **Offline-first architecture** perfect for rural/barn locations
- 🚀 **Deploy anywhere** - no server required
- 💰 **Zero hosting costs** with static hosting platforms

## ✨ Features

### 🐄 **Animal Management**
- Complete CRUD operations for livestock
- Weight tracking with analytics and growth charts
- Multi-species support (cattle, sheep, goats, pigs, poultry)
- Photo documentation with AI-powered insights

### 📝 **Journal System**
- **AET Skills Integration** - Career-focused learning tracking
- **Time Tracking** - Precise activity duration recording
- **Feed Data Management** - Quick-select and detailed tracking
- **One-click Entry Creation** - Streamlined workflow matching mobile app

### 💰 **Financial Tracking**
- AI-powered receipt processing with OpenAI Vision
- Vendor analytics and cost optimization
- Break-even analysis for FFA SAE projects
- Budget tracking and forecasting

### 🏥 **Medical Records**
- Comprehensive health tracking with vital signs
- Vaccination management with reminder systems
- VetConnect integration for professional consultations
- AI photo analysis for health assessment

### 🎓 **FFA Integration**
- Degree progress tracking (Discovery → American)
- SAE project management with earnings tracking
- Competition preparation and performance analytics
- Standards alignment with AET competencies

### 👨‍👩‍👧‍👦 **Parent Dashboard**
- Complete oversight of student activities
- Evidence submission and review system
- Progress monitoring and educational insights
- COPPA-compliant privacy controls

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm
- Supabase account (for backend services)

### Installation
```bash
# Clone the repository
git clone https://github.com/ciscoch/showtrackai-static.git
cd showtrackai-static

# Install dependencies
npm install

# Configure environment variables
cp .env.example .env.local
# Edit .env.local with your Supabase credentials

# Generate PWA icons
npm run generate-icons

# Start development server
npm run dev
```

Visit `http://localhost:3000` to see the application.

## 📦 Deployment

### GitHub Pages (Automatic)
This repository is configured with GitHub Actions for automatic deployment:

1. **Enable GitHub Pages**: Go to Settings > Pages > Deploy from branch > `gh-pages`
2. **Configure Secrets**: Add your environment variables in Settings > Secrets:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
3. **Deploy**: Push to `main` branch triggers automatic deployment

**Live URL**: `https://ciscoch.github.io/showtrackai-static/`

### Netlify (One-Click)
[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/ciscoch/showtrackai-static)

Or via CLI:
```bash
npm run build
npm run deploy:netlify
```

### Vercel (One-Click)
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/ciscoch/showtrackai-static)

Or via CLI:
```bash
npm run build
npm run deploy:vercel
```

### Other Platforms
```bash
# AWS S3 + CloudFront
npm run deploy:aws

# Firebase Hosting
npm run deploy:firebase

# Surge.sh
npm run deploy:surge
```

## 🛠 Development

### Available Scripts
```bash
npm run dev              # Start development server
npm run build           # Build for production
npm run start           # Serve production build
npm run lint            # Run ESLint
npm run type-check      # Run TypeScript checks
npm run test            # Run tests
npm run generate-icons  # Generate PWA icons
npm run analyze         # Analyze bundle size
```

### Project Structure
```
src/
├── app/                 # Next.js App Router pages
│   ├── auth/           # Authentication pages
│   ├── dashboard/      # Main dashboard
│   ├── journal/        # Journal with AET skills
│   ├── animals/        # Animal management
│   ├── financial/      # Financial tracking
│   ├── medical/        # Medical records
│   └── ffa/           # FFA integration
├── components/         # Reusable React components
│   ├── ui/            # Base UI components
│   ├── forms/         # Form components
│   ├── charts/        # Data visualization
│   └── layout/        # Layout components
├── lib/               # Utilities and configurations
├── hooks/             # Custom React hooks
├── contexts/          # React contexts
└── services/          # Business logic services
```

## 🔧 Configuration

### Environment Variables
Create `.env.local` with:
```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here

# App Configuration
NEXT_PUBLIC_APP_URL=https://your-domain.com
NEXT_PUBLIC_APP_NAME=ShowTrackAI
NEXT_PUBLIC_APP_VERSION=1.0.0

# Optional: AI Features
NEXT_PUBLIC_OPENAI_API_KEY=your_openai_key_here

# Optional: Analytics
NEXT_PUBLIC_GA_MEASUREMENT_ID=your_ga_id_here
```

### Supabase Setup
1. Create a new Supabase project
2. Run the database migrations from `/supabase/migrations/`
3. Configure Row Level Security (RLS) policies
4. Enable authentication providers as needed

## 📱 PWA Features

### Installation
ShowTrackAI can be installed as a native app on:
- **iOS**: Safari > Share > Add to Home Screen
- **Android**: Chrome > Menu > Install App
- **Desktop**: Chrome/Edge > Install button in address bar

### Offline Functionality
- Complete offline operation with IndexedDB storage
- Automatic sync when internet connection is restored
- Background updates and notifications
- Service worker caching for instant loading

## 🔒 Privacy & Compliance

### Educational Privacy
- **COPPA Compliant**: Safe for students under 13
- **FERPA Aligned**: Protects educational records
- **GDPR Ready**: European privacy compliance
- **Data Minimization**: Only collect necessary information

### Security Features
- Content Security Policy (CSP)
- XSS protection
- Secure headers configuration
- Data encryption at rest and in transit

## 🎓 Educational Integration

### AET Skills Framework
- 8 competency categories with 40+ agricultural skills
- Career pathway alignment and recommendations
- Proficiency level tracking (Beginner → Expert)
- Learning outcome assessment

### FFA Standards Alignment
- Automatic mapping to FFA degree requirements
- SAE project integration and earnings tracking
- Competition preparation and performance analytics
- Standards-based competency tracking

## 📊 Analytics & Monitoring

### Built-in Analytics
- User engagement and feature usage tracking
- Performance monitoring with Core Web Vitals
- Error reporting and debugging information
- Educational progress and outcome metrics

### Third-party Integration
- Google Analytics 4 ready
- Supabase Analytics integration
- Custom event tracking capabilities
- Privacy-compliant data collection

## 🤝 Contributing

### Development Setup
1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes and add tests
4. Ensure all tests pass: `npm test`
5. Run linting: `npm run lint`
6. Submit a pull request

### Code Standards
- TypeScript for type safety
- ESLint + Prettier for code formatting
- Jest for testing
- Conventional commits for git messages

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

### Documentation
- [Deployment Guide](DEPLOYMENT_GUIDE.md)
- [API Documentation](docs/api.md)
- [Component Library](docs/components.md)
- [Troubleshooting Guide](docs/troubleshooting.md)

### Community
- **Issues**: [GitHub Issues](https://github.com/ciscoch/showtrackai-static/issues)
- **Discussions**: [GitHub Discussions](https://github.com/ciscoch/showtrackai-static/discussions)
- **Email**: support@showtrack.ai

## 🙏 Acknowledgments

- **FFA Organization** for agricultural education standards
- **Supabase** for backend infrastructure
- **Next.js** team for the amazing framework
- **OpenAI** for AI-powered features
- **Agricultural educators** who provided feedback and requirements

---

**Built with ❤️ for FFA students and agricultural educators**

Transform your livestock management with ShowTrackAI - where technology meets agricultural education!
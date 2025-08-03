# ShowTrackAI - FFA Livestock Management Platform

A comprehensive web application designed specifically for FFA (Future Farmers of America) students to manage their livestock projects, track AET (Agricultural Experience Tracker) hours, and monitor FFA degree progress.

## 🎯 Purpose

ShowTrackAI bridges the gap between traditional livestock management and modern educational requirements for FFA students. It provides a professional-grade platform that helps students:

- **Track Livestock**: Complete animal management with photos, weights, health records
- **Build AET Portfolio**: Log daily activities mapped to specific agricultural skills
- **Monitor Expenses**: Financial tracking for project cost analysis
- **Advance FFA Degrees**: Visual progress tracking for degree requirements
- **Learn Agricultural Skills**: Integrated training modules and curriculum

## ✨ Key Features

### 🐄 Animal Management
- Multi-species support (cattle, swine, sheep, goats, poultry)
- Photo galleries and growth tracking
- Weight and health record management
- Timeline view of animal history
- Cost analysis per animal

### 📚 Activity Journal & AET Skills
- Quick-click daily activity logging
- Automatic AET skill mapping
- Time tracking for degree requirements
- Photo attachments for documentation
- Skill progression analytics

### 💰 Financial Tracking
- Categorized expense management (feed, medical, equipment, show costs)
- Receipt photo uploads
- Monthly and yearly financial reports
- Cost-per-animal breakdowns
- Budget planning tools

### 🏆 FFA Degree Progress
- Visual progress indicators for all FFA degrees
- Requirement checklists and documentation
- Mentor/advisor approval workflows
- Achievement timeline tracking
- Certificate generation

### 📱 Mobile-First Design
- Progressive Web App (PWA) capabilities
- Offline functionality for field use
- Touch-optimized interfaces
- Professional agricultural theme
- Cross-platform compatibility

## 🚀 Technology Stack

### Frontend
- **Next.js 15**: React framework with App Router
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first styling
- **Lucide React**: Modern icon library
- **React Hook Form**: Form management
- **Recharts**: Data visualization

### Backend & Database
- **Supabase**: PostgreSQL database with real-time features
- **Row Level Security**: Data protection and privacy
- **Authentication**: Secure user management
- **File Storage**: Image and document uploads

### Additional Technologies
- **PWA**: Offline-first capabilities
- **Zustand**: State management
- **TanStack Query**: Server state management
- **Zod**: Runtime validation
- **Date-fns**: Date manipulation

## 📁 Project Structure

```
src/
├── app/                    # Next.js 15 App Router
│   ├── dashboard/         # Main application dashboard
│   ├── animals/           # Animal management pages
│   ├── journal/           # Activity journal pages
│   ├── expenses/          # Financial tracking pages
│   ├── training/          # FFA curriculum pages
│   └── progress/          # Degree tracking pages
├── components/
│   ├── ui/                # Base UI components (buttons, cards, inputs)
│   ├── forms/             # Form components
│   ├── charts/            # Data visualization components
│   └── layout/            # Navigation and layout components
├── lib/
│   ├── supabase/          # Database client and helpers
│   ├── hooks/             # Custom React hooks
│   ├── utils/             # Utility functions
│   └── types/             # TypeScript type definitions
├── store/                 # Zustand state management
└── docs/                  # Technical documentation
```

## 🛠 Installation & Setup

### Prerequisites
- Node.js 18.0.0 or higher
- npm 9.0.0 or higher
- Supabase account (for backend services)

### Development Setup

1. **Clone the repository**
```bash
git clone https://github.com/your-org/showtrackai-static.git
cd showtrackai-static
```

2. **Install dependencies**
```bash
npm install
```

3. **Environment Configuration**
Create a `.env.local` file in the root directory:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. **Database Setup**
Run the SQL scripts in `docs/database-schema.sql` in your Supabase dashboard to create the required tables and functions.

5. **Start Development Server**
```bash
npm run dev
```

Visit `http://localhost:3000` to see the application.

### Production Build

```bash
npm run build
npm start
```

## 🗄 Database Schema

The application uses a PostgreSQL database with the following core tables:

- **users**: Student profiles and FFA chapter information
- **animals**: Livestock records with species, breeds, and status
- **weight_records**: Growth tracking data
- **health_records**: Veterinary and health management
- **journal_entries**: Daily activities and AET skill logging
- **expenses**: Financial tracking and cost management
- **aet_skills**: Master list of agricultural skills
- **user_skill_progress**: Individual skill progression tracking
- **ffa_degree_requirements**: Degree requirement definitions
- **user_degree_progress**: Individual degree advancement tracking

See `docs/technical-architecture.md` for detailed schema documentation.

## 🎨 Design System

The application uses a custom design system built on Tailwind CSS with:

- **Agricultural Color Palette**: Green, blue, and earth tones
- **Mobile-First Approach**: Optimized for touch interfaces
- **Accessibility**: WCAG 2.1 AA compliance
- **Responsive Typography**: Scales from mobile to desktop
- **Component Library**: Reusable UI components

## 📊 Features in Detail

### Animal Management
- **Multi-Species Support**: Cattle, swine, sheep, goats, poultry
- **Growth Tracking**: Weight charts and growth rate analysis
- **Health Records**: Vaccination schedules and medical history
- **Photo Documentation**: Visual progress tracking
- **Financial Analysis**: Cost per pound of gain calculations

### AET Portfolio Building
- **Activity Logging**: Quick-entry forms for daily tasks
- **Skill Mapping**: Automatic connection to AET skill categories
- **Time Tracking**: Precise hour logging for degree requirements
- **Documentation**: Photo and note attachments
- **Progress Analytics**: Visual skill development tracking

### Financial Management
- **Expense Categories**: Feed, medical, equipment, show, other
- **Receipt Management**: Photo uploads and digital storage
- **Cost Analysis**: Per-animal and per-category breakdowns
- **Budget Planning**: Projected vs actual spending
- **Profitability Tracking**: Revenue and cost analysis

### FFA Degree Integration
- **Greenhand Degree**: Foundation level requirements
- **Chapter Degree**: Chapter-level achievement tracking
- **State Degree**: State-level requirement monitoring
- **American Degree**: Highest level FFA recognition
- **Custom Requirements**: Flexible requirement configuration

## 🔒 Security & Privacy

- **Row Level Security**: Database-level access control
- **Data Encryption**: All sensitive data encrypted at rest
- **FERPA Compliance**: Educational privacy standards
- **User Consent**: Clear data usage policies
- **Audit Logging**: Activity tracking for compliance

## 📱 Mobile & PWA Features

- **Offline Functionality**: Core features work without internet
- **Home Screen Installation**: Add to home screen capability
- **Push Notifications**: Reminders and updates
- **Camera Integration**: Photo capture for documentation
- **Touch Optimization**: Finger-friendly interface design

## 🚀 Deployment Options

### Static Deployment
- **Netlify**: Automated deployments with form handling
- **Vercel**: Optimized for Next.js applications
- **GitHub Pages**: Free hosting for open source projects
- **AWS S3 + CloudFront**: Scalable static hosting

### Full-Stack Deployment
- **Vercel + Supabase**: Recommended for production
- **Netlify + Supabase**: Alternative with great DX
- **Custom VPS**: Self-hosted option for institutions

## 🚀 Quick Start

### Development
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

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

### Deployment Scripts
```bash
npm run deploy:netlify   # Deploy to Netlify
npm run deploy:vercel    # Deploy to Vercel
npm run deploy:github    # Deploy to GitHub Pages
npm run deploy:surge     # Deploy to Surge.sh
npm run deploy:aws       # Deploy to AWS S3
```

## 🤝 Contributing

We welcome contributions from the agricultural education community!

### Development Process
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Areas for Contribution
- **Educational Content**: FFA curriculum integration
- **Species-Specific Features**: Specialized tracking for different livestock
- **Regional Adaptations**: State-specific FFA requirements
- **Mobile Enhancements**: Native app development
- **Accessibility**: Improved accessibility features

### Code Standards
- TypeScript for type safety
- ESLint + Prettier for code formatting
- Jest for testing
- Conventional commits for git messages

## 📖 Documentation

- **Technical Architecture**: `docs/technical-architecture.md`
- **Database Schema**: `docs/database-schema.sql`
- **API Documentation**: `docs/api-reference.md`
- **User Guides**: `docs/user-guides/`
- **Deployment Guide**: `DEPLOYMENT_GUIDE.md`

## 🆘 Support

- **Issues**: Report bugs and request features on GitHub
- **Discussions**: Community support and questions
- **Documentation**: Comprehensive guides and tutorials
- **Email**: support@showtrackai.com

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **National FFA Organization**: For their educational mission and resources
- **Agricultural Educators**: For feedback and guidance on requirements
- **Student Beta Testers**: For real-world testing and feedback
- **Open Source Community**: For the amazing tools and libraries used

---

**Built with ❤️ for the agricultural education community**

*Empowering the next generation of agricultural leaders through technology*
# ShowTrackAI Technical Architecture

## Database Schema

### Core Tables

#### Users
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR UNIQUE NOT NULL,
  full_name VARCHAR NOT NULL,
  chapter VARCHAR, -- FFA Chapter
  advisor_email VARCHAR,
  graduation_year INTEGER,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

#### Animals
```sql
CREATE TABLE animals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  name VARCHAR NOT NULL,
  species VARCHAR NOT NULL, -- cattle, swine, sheep, goats, poultry
  breed VARCHAR,
  birth_date DATE,
  acquisition_date DATE,
  acquisition_cost DECIMAL(10,2),
  tag_number VARCHAR,
  sire VARCHAR,
  dam VARCHAR,
  photos JSONB DEFAULT '[]',
  notes TEXT,
  status VARCHAR DEFAULT 'active', -- active, sold, deceased
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

#### Weight_Records
```sql
CREATE TABLE weight_records (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  animal_id UUID REFERENCES animals(id) ON DELETE CASCADE,
  weight DECIMAL(8,2) NOT NULL,
  weight_date DATE NOT NULL,
  notes TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);
```

#### Health_Records
```sql
CREATE TABLE health_records (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  animal_id UUID REFERENCES animals(id) ON DELETE CASCADE,
  record_type VARCHAR NOT NULL, -- vaccination, treatment, checkup
  date DATE NOT NULL,
  description TEXT NOT NULL,
  veterinarian VARCHAR,
  cost DECIMAL(10,2),
  notes TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);
```

#### Journal_Entries
```sql
CREATE TABLE journal_entries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  entry_date DATE NOT NULL,
  activity_type VARCHAR NOT NULL,
  description TEXT NOT NULL,
  hours_spent DECIMAL(4,2),
  aet_skills JSONB DEFAULT '[]', -- Array of AET skill codes
  animals_involved JSONB DEFAULT '[]', -- Array of animal IDs
  photos JSONB DEFAULT '[]',
  created_at TIMESTAMP DEFAULT NOW()
);
```

#### Expenses
```sql
CREATE TABLE expenses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  category VARCHAR NOT NULL, -- feed, medical, equipment, show, other
  description TEXT NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  vendor VARCHAR,
  receipt_photo VARCHAR,
  animals_related JSONB DEFAULT '[]',
  created_at TIMESTAMP DEFAULT NOW()
);
```

#### AET_Skills
```sql
CREATE TABLE aet_skills (
  id VARCHAR PRIMARY KEY, -- e.g., "AG-101", "AN-201"
  category VARCHAR NOT NULL, -- Animal Science, Plant Science, etc.
  title VARCHAR NOT NULL,
  description TEXT,
  level INTEGER NOT NULL, -- 1-4 for FFA levels
  hours_required DECIMAL(4,2) DEFAULT 0
);
```

#### User_Skill_Progress
```sql
CREATE TABLE user_skill_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  skill_id VARCHAR REFERENCES aet_skills(id),
  hours_completed DECIMAL(4,2) DEFAULT 0,
  date_started DATE,
  date_completed DATE,
  is_completed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW()
);
```

#### FFA_Degree_Requirements
```sql
CREATE TABLE ffa_degree_requirements (
  id VARCHAR PRIMARY KEY, -- e.g., "greenhand", "chapter", "state", "american"
  name VARCHAR NOT NULL,
  description TEXT,
  requirements JSONB NOT NULL, -- Complex requirements structure
  order_level INTEGER
);
```

#### User_Degree_Progress
```sql
CREATE TABLE user_degree_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  degree_id VARCHAR REFERENCES ffa_degree_requirements(id),
  progress_data JSONB DEFAULT '{}',
  is_completed BOOLEAN DEFAULT FALSE,
  completion_date DATE,
  created_at TIMESTAMP DEFAULT NOW()
);
```

## Application Architecture

### Frontend Structure
```
src/
├── app/                    # Next.js 15 App Router
│   ├── (auth)/            # Authentication pages
│   ├── dashboard/         # Main application
│   ├── animals/          # Animal management
│   ├── journal/          # Activity journal
│   ├── expenses/         # Financial tracking
│   ├── training/         # FFA curriculum
│   └── progress/         # Degree tracking
├── components/
│   ├── ui/               # Base UI components
│   ├── forms/            # Form components
│   ├── charts/           # Data visualization
│   └── layout/           # Layout components
├── lib/
│   ├── supabase/         # Database client
│   ├── hooks/            # Custom React hooks
│   ├── utils/            # Utility functions
│   └── types/            # TypeScript definitions
└── store/                # Zustand state management
```

### Core Features Implementation

#### 1. Animal Management
- CRUD operations for animals
- Photo upload and management
- Weight tracking with charts
- Health record management
- Timeline view of animal history

#### 2. Journal System
- Quick-entry forms for daily activities
- AET skill mapping and auto-suggestion
- Photo attachments
- Time tracking
- Bulk entry for similar activities

#### 3. Expense Tracking
- Categorized expense entry
- Receipt photo uploads
- Monthly/yearly reports
- Cost per animal calculations
- Budget planning tools

#### 4. Training Module
- Interactive FFA curriculum content
- Skill-based learning paths
- Progress tracking
- Quiz and assessment system
- Certificate generation

#### 5. Degree Progress
- Visual progress indicators
- Requirement checklists
- Documentation uploads
- Mentor/advisor approvals
- Timeline tracking

## Technology Stack

### Frontend
- **Next.js 15**: React framework with App Router
- **TypeScript**: Type safety
- **Tailwind CSS**: Styling framework
- **Lucide React**: Icon library
- **React Hook Form**: Form management
- **TanStack Query**: Server state management
- **Zustand**: Client state management
- **Recharts**: Data visualization

### Backend
- **Supabase**: Database and authentication
- **PostgreSQL**: Primary database
- **Row Level Security**: Data protection
- **Real-time subscriptions**: Live updates
- **Storage**: File and image uploads

### PWA Features
- **Service Worker**: Offline functionality
- **App Manifest**: Install prompts
- **Push Notifications**: Reminders and updates
- **Background Sync**: Data synchronization

## Security & Compliance

### Data Protection
- Row Level Security (RLS) policies
- Encrypted file storage
- FERPA compliance considerations
- User data anonymization options

### Authentication
- Email/password authentication
- Social login options (Google, Apple)
- Multi-factor authentication
- Session management

## Performance Optimization

### Frontend
- Code splitting by feature
- Image optimization
- Lazy loading
- Service worker caching
- Bundle analysis and optimization

### Backend
- Database indexing
- Query optimization
- Connection pooling
- CDN for static assets

## Deployment Strategy

### Development
- Local Supabase instance
- Hot reloading
- TypeScript checking
- ESLint/Prettier

### Staging
- Supabase staging environment
- Preview deployments
- E2E testing
- Performance monitoring

### Production
- Supabase production
- Edge deployment
- Monitoring and alerting
- Backup strategies
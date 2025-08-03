// Core database types
export interface User {
  id: string
  email: string
  full_name: string
  chapter?: string
  advisor_email?: string
  graduation_year?: number
  created_at: string
  updated_at: string
}

export interface Animal {
  id: string
  user_id: string
  name: string
  species: 'cattle' | 'swine' | 'sheep' | 'goats' | 'poultry'
  breed?: string
  birth_date?: string
  acquisition_date: string
  acquisition_cost?: number
  tag_number?: string
  sire?: string
  dam?: string
  photos: string[]
  notes?: string
  status: 'active' | 'sold' | 'deceased'
  created_at: string
  updated_at: string
}

export interface WeightRecord {
  id: string
  animal_id: string
  weight: number
  weight_date: string
  notes?: string
  created_at: string
}

export interface HealthRecord {
  id: string
  animal_id: string
  record_type: 'vaccination' | 'treatment' | 'checkup'
  date: string
  description: string
  veterinarian?: string
  cost?: number
  notes?: string
  created_at: string
}

export interface JournalEntry {
  id: string
  user_id: string
  entry_date: string
  activity_type: string
  description: string
  hours_spent?: number
  aet_skills: string[]
  animals_involved: string[]
  photos: string[]
  created_at: string
}

export interface Expense {
  id: string
  user_id: string
  date: string
  category: 'feed' | 'medical' | 'equipment' | 'show' | 'other'
  description: string
  amount: number
  vendor?: string
  receipt_photo?: string
  animals_related: string[]
  created_at: string
}

export interface AETSkill {
  id: string
  category: string
  title: string
  description?: string
  level: 1 | 2 | 3 | 4
  hours_required: number
}

export interface UserSkillProgress {
  id: string
  user_id: string
  skill_id: string
  hours_completed: number
  date_started?: string
  date_completed?: string
  is_completed: boolean
  created_at: string
}

export interface FFADegreeRequirement {
  id: 'greenhand' | 'chapter' | 'state' | 'american'
  name: string
  description?: string
  requirements: Record<string, any>
  order_level: number
}

export interface UserDegreeProgress {
  id: string
  user_id: string
  degree_id: string
  progress_data: Record<string, any>
  is_completed: boolean
  completion_date?: string
  created_at: string
}

// Form types
export interface AnimalFormData {
  name: string
  species: Animal['species']
  breed?: string
  birth_date?: string
  acquisition_date: string
  acquisition_cost?: number
  tag_number?: string
  sire?: string
  dam?: string
  notes?: string
}

export interface JournalFormData {
  entry_date: string
  activity_type: string
  description: string
  hours_spent?: number
  aet_skills: string[]
  animals_involved: string[]
}

export interface ExpenseFormData {
  date: string
  category: Expense['category']
  description: string
  amount: number
  vendor?: string
  animals_related: string[]
}

// API response types
export interface ApiResponse<T> {
  data: T | null
  error: string | null
  success: boolean
}

// Component prop types
export interface AnimalCardProps {
  animal: Animal
  onEdit?: () => void
  onDelete?: () => void
  onView?: () => void
}

export interface StatCardProps {
  title: string
  value: string | number
  icon: React.ReactNode
  trend?: {
    value: number
    isPositive: boolean
  }
  color?: 'green' | 'blue' | 'yellow' | 'red'
}

// Chart data types
export interface WeightChartData {
  date: string
  weight: number
}

export interface ExpenseChartData {
  category: string
  amount: number
  percentage: number
}

export interface ProgressChartData {
  month: string
  hours: number
  target: number
}

// Navigation types
export interface NavItem {
  title: string
  href: string
  icon: React.ReactNode
  description?: string
  children?: NavItem[]
}

// Filter types
export interface AnimalFilters {
  species?: Animal['species']
  status?: Animal['status']
  search?: string
}

export interface JournalFilters {
  startDate?: string
  endDate?: string
  activityType?: string
  aetSkill?: string
}

export interface ExpenseFilters {
  startDate?: string
  endDate?: string
  category?: Expense['category']
  minAmount?: number
  maxAmount?: number
}

// Dashboard types
export interface DashboardStats {
  totalAnimals: number
  activeAnimals: number
  totalExpenses: number
  monthlyExpenses: number
  journalEntries: number
  aetHours: number
  completedSkills: number
}

// User preferences
export interface UserPreferences {
  theme: 'light' | 'dark' | 'system'
  units: 'imperial' | 'metric'
  currency: 'USD' | 'CAD' | 'EUR'
  notifications: {
    email: boolean
    push: boolean
    reminders: boolean
  }
}

// Error types
export interface ValidationError {
  field: string
  message: string
}

export interface FormErrors {
  [key: string]: string | undefined
}

// Success response type
export interface SuccessResponse {
  message: string
  data?: any
}
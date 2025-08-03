export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          full_name: string
          chapter: string | null
          advisor_email: string | null
          graduation_year: number | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          email: string
          full_name: string
          chapter?: string | null
          advisor_email?: string | null
          graduation_year?: number | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          full_name?: string
          chapter?: string | null
          advisor_email?: string | null
          graduation_year?: number | null
          created_at?: string
          updated_at?: string
        }
      }
      animals: {
        Row: {
          id: string
          user_id: string
          name: string
          species: 'cattle' | 'swine' | 'sheep' | 'goats' | 'poultry'
          breed: string | null
          birth_date: string | null
          acquisition_date: string
          acquisition_cost: number | null
          tag_number: string | null
          sire: string | null
          dam: string | null
          photos: Json
          notes: string | null
          status: 'active' | 'sold' | 'deceased'
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          name: string
          species: 'cattle' | 'swine' | 'sheep' | 'goats' | 'poultry'
          breed?: string | null
          birth_date?: string | null
          acquisition_date: string
          acquisition_cost?: number | null
          tag_number?: string | null
          sire?: string | null
          dam?: string | null
          photos?: Json
          notes?: string | null
          status?: 'active' | 'sold' | 'deceased'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          name?: string
          species?: 'cattle' | 'swine' | 'sheep' | 'goats' | 'poultry'
          breed?: string | null
          birth_date?: string | null
          acquisition_date?: string
          acquisition_cost?: number | null
          tag_number?: string | null
          sire?: string | null
          dam?: string | null
          photos?: Json
          notes?: string | null
          status?: 'active' | 'sold' | 'deceased'
          created_at?: string
          updated_at?: string
        }
      }
      weight_records: {
        Row: {
          id: string
          animal_id: string
          weight: number
          weight_date: string
          notes: string | null
          created_at: string
        }
        Insert: {
          id?: string
          animal_id: string
          weight: number
          weight_date: string
          notes?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          animal_id?: string
          weight?: number
          weight_date?: string
          notes?: string | null
          created_at?: string
        }
      }
      health_records: {
        Row: {
          id: string
          animal_id: string
          record_type: 'vaccination' | 'treatment' | 'checkup'
          date: string
          description: string
          veterinarian: string | null
          cost: number | null
          notes: string | null
          created_at: string
        }
        Insert: {
          id?: string
          animal_id: string
          record_type: 'vaccination' | 'treatment' | 'checkup'
          date: string
          description: string
          veterinarian?: string | null
          cost?: number | null
          notes?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          animal_id?: string
          record_type?: 'vaccination' | 'treatment' | 'checkup'
          date?: string
          description?: string
          veterinarian?: string | null
          cost?: number | null
          notes?: string | null
          created_at?: string
        }
      }
      journal_entries: {
        Row: {
          id: string
          user_id: string
          entry_date: string
          activity_type: string
          description: string
          hours_spent: number | null
          aet_skills: Json
          animals_involved: Json
          photos: Json
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          entry_date: string
          activity_type: string
          description: string
          hours_spent?: number | null
          aet_skills?: Json
          animals_involved?: Json
          photos?: Json
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          entry_date?: string
          activity_type?: string
          description?: string
          hours_spent?: number | null
          aet_skills?: Json
          animals_involved?: Json
          photos?: Json
          created_at?: string
        }
      }
      expenses: {
        Row: {
          id: string
          user_id: string
          date: string
          category: 'feed' | 'medical' | 'equipment' | 'show' | 'other'
          description: string
          amount: number
          vendor: string | null
          receipt_photo: string | null
          animals_related: Json
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          date: string
          category: 'feed' | 'medical' | 'equipment' | 'show' | 'other'
          description: string
          amount: number
          vendor?: string | null
          receipt_photo?: string | null
          animals_related?: Json
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          date?: string
          category?: 'feed' | 'medical' | 'equipment' | 'show' | 'other'
          description?: string
          amount?: number
          vendor?: string | null
          receipt_photo?: string | null
          animals_related?: Json
          created_at?: string
        }
      }
      aet_skills: {
        Row: {
          id: string
          category: string
          title: string
          description: string | null
          level: number
          hours_required: number
        }
        Insert: {
          id: string
          category: string
          title: string
          description?: string | null
          level: number
          hours_required?: number
        }
        Update: {
          id?: string
          category?: string
          title?: string
          description?: string | null
          level?: number
          hours_required?: number
        }
      }
      user_skill_progress: {
        Row: {
          id: string
          user_id: string
          skill_id: string
          hours_completed: number
          date_started: string | null
          date_completed: string | null
          is_completed: boolean
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          skill_id: string
          hours_completed?: number
          date_started?: string | null
          date_completed?: string | null
          is_completed?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          skill_id?: string
          hours_completed?: number
          date_started?: string | null
          date_completed?: string | null
          is_completed?: boolean
          created_at?: string
        }
      }
      ffa_degree_requirements: {
        Row: {
          id: string
          name: string
          description: string | null
          requirements: Json
          order_level: number
        }
        Insert: {
          id: string
          name: string
          description?: string | null
          requirements: Json
          order_level: number
        }
        Update: {
          id?: string
          name?: string
          description?: string | null
          requirements?: Json
          order_level?: number
        }
      }
      user_degree_progress: {
        Row: {
          id: string
          user_id: string
          degree_id: string
          progress_data: Json
          is_completed: boolean
          completion_date: string | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          degree_id: string
          progress_data?: Json
          is_completed?: boolean
          completion_date?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          degree_id?: string
          progress_data?: Json
          is_completed?: boolean
          completion_date?: string | null
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
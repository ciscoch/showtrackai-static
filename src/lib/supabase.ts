import { createClient } from '@supabase/supabase-js'
import type { Database } from './database.types'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
})

// Auth helpers
export const auth = {
  async signUp(email: string, password: string, userData?: any) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: userData,
      },
    })
    return { data, error }
  },

  async signIn(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    return { data, error }
  },

  async signOut() {
    const { error } = await supabase.auth.signOut()
    return { error }
  },

  async resetPassword(email: string) {
    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    })
    return { data, error }
  },

  async updatePassword(password: string) {
    const { data, error } = await supabase.auth.updateUser({
      password,
    })
    return { data, error }
  },

  async getCurrentUser() {
    const { data: { user }, error } = await supabase.auth.getUser()
    return { user, error }
  },

  async getCurrentSession() {
    const { data: { session }, error } = await supabase.auth.getSession()
    return { session, error }
  },

  onAuthStateChange(callback: (event: string, session: any) => void) {
    return supabase.auth.onAuthStateChange(callback)
  }
}

// Database helpers
export const db = {
  // Users
  async createUser(userData: any) {
    const { data, error } = await supabase
      .from('users')
      .insert(userData)
      .select()
      .single()
    return { data, error }
  },

  async getUserById(id: string) {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', id)
      .single()
    return { data, error }
  },

  async updateUser(id: string, updates: any) {
    const { data, error } = await supabase
      .from('users')
      .update(updates)
      .eq('id', id)
      .select()
      .single()
    return { data, error }
  },

  // Animals
  async getAnimals(userId: string, filters?: any) {
    let query = supabase
      .from('animals')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })

    if (filters?.species) {
      query = query.eq('species', filters.species)
    }
    if (filters?.status) {
      query = query.eq('status', filters.status)
    }
    if (filters?.search) {
      query = query.ilike('name', `%${filters.search}%`)
    }

    const { data, error } = await query
    return { data, error }
  },

  async getAnimalById(id: string) {
    const { data, error } = await supabase
      .from('animals')
      .select('*')
      .eq('id', id)
      .single()
    return { data, error }
  },

  async createAnimal(animalData: any) {
    const { data, error } = await supabase
      .from('animals')
      .insert(animalData)
      .select()
      .single()
    return { data, error }
  },

  async updateAnimal(id: string, updates: any) {
    const { data, error } = await supabase
      .from('animals')
      .update(updates)
      .eq('id', id)
      .select()
      .single()
    return { data, error }
  },

  async deleteAnimal(id: string) {
    const { data, error } = await supabase
      .from('animals')
      .delete()
      .eq('id', id)
    return { data, error }
  },

  // Weight Records
  async getWeightRecords(animalId: string) {
    const { data, error } = await supabase
      .from('weight_records')
      .select('*')
      .eq('animal_id', animalId)
      .order('weight_date', { ascending: true })
    return { data, error }
  },

  async addWeightRecord(weightData: any) {
    const { data, error } = await supabase
      .from('weight_records')
      .insert(weightData)
      .select()
      .single()
    return { data, error }
  },

  async updateWeightRecord(id: string, updates: any) {
    const { data, error } = await supabase
      .from('weight_records')
      .update(updates)
      .eq('id', id)
      .select()
      .single()
    return { data, error }
  },

  async deleteWeightRecord(id: string) {
    const { data, error } = await supabase
      .from('weight_records')
      .delete()
      .eq('id', id)
    return { data, error }
  },

  // Health Records
  async getHealthRecords(animalId: string) {
    const { data, error } = await supabase
      .from('health_records')
      .select('*')
      .eq('animal_id', animalId)
      .order('date', { ascending: false })
    return { data, error }
  },

  async addHealthRecord(healthData: any) {
    const { data, error } = await supabase
      .from('health_records')
      .insert(healthData)
      .select()
      .single()
    return { data, error }
  },

  async updateHealthRecord(id: string, updates: any) {
    const { data, error } = await supabase
      .from('health_records')
      .update(updates)
      .eq('id', id)
      .select()
      .single()
    return { data, error }
  },

  async deleteHealthRecord(id: string) {
    const { data, error } = await supabase
      .from('health_records')
      .delete()
      .eq('id', id)
    return { data, error }
  },

  // Journal Entries
  async getJournalEntries(userId: string, filters?: any) {
    let query = supabase
      .from('journal_entries')
      .select('*')
      .eq('user_id', userId)
      .order('entry_date', { ascending: false })

    if (filters?.startDate) {
      query = query.gte('entry_date', filters.startDate)
    }
    if (filters?.endDate) {
      query = query.lte('entry_date', filters.endDate)
    }
    if (filters?.activityType) {
      query = query.eq('activity_type', filters.activityType)
    }

    const { data, error } = await query
    return { data, error }
  },

  async createJournalEntry(entryData: any) {
    const { data, error } = await supabase
      .from('journal_entries')
      .insert(entryData)
      .select()
      .single()
    return { data, error }
  },

  async updateJournalEntry(id: string, updates: any) {
    const { data, error } = await supabase
      .from('journal_entries')
      .update(updates)
      .eq('id', id)
      .select()
      .single()
    return { data, error }
  },

  async deleteJournalEntry(id: string) {
    const { data, error } = await supabase
      .from('journal_entries')
      .delete()
      .eq('id', id)
    return { data, error }
  },

  // Expenses
  async getExpenses(userId: string, filters?: any) {
    let query = supabase
      .from('expenses')
      .select('*')
      .eq('user_id', userId)
      .order('date', { ascending: false })

    if (filters?.startDate) {
      query = query.gte('date', filters.startDate)
    }
    if (filters?.endDate) {
      query = query.lte('date', filters.endDate)
    }
    if (filters?.category) {
      query = query.eq('category', filters.category)
    }

    const { data, error } = await query
    return { data, error }
  },

  async createExpense(expenseData: any) {
    const { data, error } = await supabase
      .from('expenses')
      .insert(expenseData)
      .select()
      .single()
    return { data, error }
  },

  async updateExpense(id: string, updates: any) {
    const { data, error } = await supabase
      .from('expenses')
      .update(updates)
      .eq('id', id)
      .select()
      .single()
    return { data, error }
  },

  async deleteExpense(id: string) {
    const { data, error } = await supabase
      .from('expenses')
      .delete()
      .eq('id', id)
    return { data, error }
  },

  // AET Skills
  async getAETSkills() {
    const { data, error } = await supabase
      .from('aet_skills')
      .select('*')
      .order('category', { ascending: true })
    return { data, error }
  },

  async getUserSkillProgress(userId: string) {
    const { data, error } = await supabase
      .from('user_skill_progress')
      .select(`
        *,
        aet_skills (*)
      `)
      .eq('user_id', userId)
    return { data, error }
  },

  async updateSkillProgress(userId: string, skillId: string, hoursToAdd: number) {
    // First, try to get existing progress
    const { data: existing } = await supabase
      .from('user_skill_progress')
      .select('*')
      .eq('user_id', userId)
      .eq('skill_id', skillId)
      .single()

    if (existing) {
      // Update existing progress
      const newHours = existing.hours_completed + hoursToAdd
      const { data, error } = await supabase
        .from('user_skill_progress')
        .update({
          hours_completed: newHours,
          updated_at: new Date().toISOString()
        })
        .eq('id', existing.id)
        .select()
        .single()
      return { data, error }
    } else {
      // Create new progress record
      const { data, error } = await supabase
        .from('user_skill_progress')
        .insert({
          user_id: userId,
          skill_id: skillId,
          hours_completed: hoursToAdd,
          date_started: new Date().toISOString()
        })
        .select()
        .single()
      return { data, error }
    }
  },

  // Dashboard Analytics
  async getDashboardStats(userId: string) {
    const [animals, expenses, journal, skills] = await Promise.all([
      this.getAnimals(userId),
      this.getExpenses(userId),
      this.getJournalEntries(userId),
      this.getUserSkillProgress(userId)
    ])

    const stats = {
      totalAnimals: animals.data?.length || 0,
      activeAnimals: animals.data?.filter(a => a.status === 'active').length || 0,
      totalExpenses: expenses.data?.reduce((sum, e) => sum + e.amount, 0) || 0,
      monthlyExpenses: expenses.data?.filter(e => {
        const expenseDate = new Date(e.date)
        const now = new Date()
        return expenseDate.getMonth() === now.getMonth() && 
               expenseDate.getFullYear() === now.getFullYear()
      }).reduce((sum, e) => sum + e.amount, 0) || 0,
      journalEntries: journal.data?.length || 0,
      aetHours: skills.data?.reduce((sum, s) => sum + s.hours_completed, 0) || 0,
      completedSkills: skills.data?.filter(s => s.is_completed).length || 0
    }

    return { data: stats, error: null }
  }
}

// Storage helpers
export const storage = {
  async uploadFile(bucket: string, path: string, file: File) {
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(path, file)
    return { data, error }
  },

  async downloadFile(bucket: string, path: string) {
    const { data, error } = await supabase.storage
      .from(bucket)
      .download(path)
    return { data, error }
  },

  async deleteFile(bucket: string, path: string) {
    const { data, error } = await supabase.storage
      .from(bucket)
      .remove([path])
    return { data, error }
  },

  getPublicUrl(bucket: string, path: string) {
    const { data } = supabase.storage
      .from(bucket)
      .getPublicUrl(path)
    return data.publicUrl
  }
}
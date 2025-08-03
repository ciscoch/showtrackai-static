import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { format, parseISO, differenceInDays, differenceInMonths } from "date-fns"

// Utility function for combining Tailwind CSS classes
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Date formatting utilities
export function formatDate(date: string | Date, formatString: string = "MMM dd, yyyy"): string {
  if (typeof date === 'string') {
    return format(parseISO(date), formatString)
  }
  return format(date, formatString)
}

export function formatDateTime(date: string | Date): string {
  return formatDate(date, "MMM dd, yyyy 'at' h:mm a")
}

export function getRelativeTime(date: string | Date): string {
  const now = new Date()
  const targetDate = typeof date === 'string' ? parseISO(date) : date
  
  const daysDiff = differenceInDays(now, targetDate)
  
  if (daysDiff === 0) return 'Today'
  if (daysDiff === 1) return 'Yesterday'
  if (daysDiff < 7) return `${daysDiff} days ago`
  if (daysDiff < 30) return `${Math.floor(daysDiff / 7)} weeks ago`
  
  const monthsDiff = differenceInMonths(now, targetDate)
  if (monthsDiff < 12) return `${monthsDiff} months ago`
  
  return `${Math.floor(monthsDiff / 12)} years ago`
}

// Currency formatting
export function formatCurrency(amount: number, currency: string = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
  }).format(amount)
}

// Weight formatting (with unit conversion)
export function formatWeight(weight: number, unit: 'lbs' | 'kg' = 'lbs'): string {
  if (unit === 'kg') {
    return `${weight.toFixed(1)} kg`
  }
  return `${weight.toFixed(1)} lbs`
}

export function convertWeight(weight: number, from: 'lbs' | 'kg', to: 'lbs' | 'kg'): number {
  if (from === to) return weight
  if (from === 'lbs' && to === 'kg') return weight * 0.453592
  if (from === 'kg' && to === 'lbs') return weight * 2.20462
  return weight
}

// Age calculation utilities
export function calculateAge(birthDate: string | Date): {
  years: number
  months: number
  days: number
  ageString: string
} {
  const now = new Date()
  const birth = typeof birthDate === 'string' ? parseISO(birthDate) : birthDate
  
  let years = now.getFullYear() - birth.getFullYear()
  let months = now.getMonth() - birth.getMonth()
  let days = now.getDate() - birth.getDate()
  
  if (days < 0) {
    months--
    const daysInPrevMonth = new Date(now.getFullYear(), now.getMonth(), 0).getDate()
    days += daysInPrevMonth
  }
  
  if (months < 0) {
    years--
    months += 12
  }
  
  let ageString = ''
  if (years > 0) {
    ageString += `${years} year${years !== 1 ? 's' : ''}`
    if (months > 0) ageString += `, ${months} month${months !== 1 ? 's' : ''}`
  } else if (months > 0) {
    ageString = `${months} month${months !== 1 ? 's' : ''}`
    if (days > 0) ageString += `, ${days} day${days !== 1 ? 's' : ''}`
  } else {
    ageString = `${days} day${days !== 1 ? 's' : ''}`
  }
  
  return { years, months, days, ageString }
}

// Text utilities
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength) + '...'
}

export function capitalizeFirst(text: string): string {
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase()
}

export function titleCase(text: string): string {
  return text
    .split(' ')
    .map(word => capitalizeFirst(word))
    .join(' ')
}

// Array utilities
export function groupBy<T>(array: T[], key: keyof T): Record<string, T[]> {
  return array.reduce((groups, item) => {
    const group = String(item[key])
    groups[group] = groups[group] || []
    groups[group].push(item)
    return groups
  }, {} as Record<string, T[]>)
}

export function sortBy<T>(array: T[], key: keyof T, direction: 'asc' | 'desc' = 'asc'): T[] {
  return [...array].sort((a, b) => {
    const aVal = a[key]
    const bVal = b[key]
    
    if (aVal < bVal) return direction === 'asc' ? -1 : 1
    if (aVal > bVal) return direction === 'asc' ? 1 : -1
    return 0
  })
}

// Validation utilities
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export function isValidPhoneNumber(phone: string): boolean {
  const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/
  return phoneRegex.test(phone.replace(/\s/g, ''))
}

// File utilities
export function getFileExtension(filename: string): string {
  return filename.slice((filename.lastIndexOf('.') - 1 >>> 0) + 2)
}

export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes'
  
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

// URL utilities
export function createSlug(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

// Local storage utilities
export function getFromStorage<T>(key: string, defaultValue: T): T {
  if (typeof window === 'undefined') return defaultValue
  
  try {
    const item = window.localStorage.getItem(key)
    return item ? JSON.parse(item) : defaultValue
  } catch (error) {
    console.warn(`Error reading localStorage key "${key}":`, error)
    return defaultValue
  }
}

export function setToStorage<T>(key: string, value: T): void {
  if (typeof window === 'undefined') return
  
  try {
    window.localStorage.setItem(key, JSON.stringify(value))
  } catch (error) {
    console.warn(`Error setting localStorage key "${key}":`, error)
  }
}

export function removeFromStorage(key: string): void {
  if (typeof window === 'undefined') return
  
  try {
    window.localStorage.removeItem(key)
  } catch (error) {
    console.warn(`Error removing localStorage key "${key}":`, error)
  }
}

// Color utilities for charts and UI
export function getSpeciesColor(species: string): string {
  const colors = {
    cattle: '#ef4444', // red-500
    swine: '#f97316',  // orange-500
    sheep: '#eab308',  // yellow-500
    goats: '#22c55e',  // green-500
    poultry: '#3b82f6' // blue-500
  }
  return colors[species as keyof typeof colors] || '#6b7280' // gray-500
}

export function getCategoryColor(category: string): string {
  const colors = {
    feed: '#22c55e',     // green-500
    medical: '#ef4444',  // red-500
    equipment: '#3b82f6', // blue-500
    show: '#8b5cf6',     // violet-500
    other: '#6b7280'     // gray-500
  }
  return colors[category as keyof typeof colors] || '#6b7280'
}

// Search utilities
export function fuzzySearch<T>(
  items: T[],
  query: string,
  keys: (keyof T)[]
): T[] {
  if (!query.trim()) return items
  
  const searchTerm = query.toLowerCase().trim()
  
  return items.filter(item =>
    keys.some(key => {
      const value = String(item[key]).toLowerCase()
      return value.includes(searchTerm)
    })
  )
}

// Analytics utilities
export function calculateGrowthRate(current: number, previous: number): number {
  if (previous === 0) return current > 0 ? 100 : 0
  return ((current - previous) / previous) * 100
}

export function calculateAverage(numbers: number[]): number {
  if (numbers.length === 0) return 0
  return numbers.reduce((sum, num) => sum + num, 0) / numbers.length
}

export function calculatePercentile(numbers: number[], percentile: number): number {
  const sorted = [...numbers].sort((a, b) => a - b)
  const index = (percentile / 100) * (sorted.length - 1)
  
  if (Math.floor(index) === index) {
    return sorted[index]
  }
  
  const lower = sorted[Math.floor(index)]
  const upper = sorted[Math.ceil(index)]
  const weight = index - Math.floor(index)
  
  return lower + weight * (upper - lower)
}

// Error handling utilities
export function createErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message
  }
  if (typeof error === 'string') {
    return error
  }
  return 'An unexpected error occurred'
}

// Debounce utility
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null
  
  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}
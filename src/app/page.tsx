'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function HomePage() {
  const router = useRouter()

  useEffect(() => {
    // Redirect to dashboard if user is authenticated, otherwise to auth
    const checkAuth = async () => {
      try {
        // Check if user is authenticated (simplified check)
        const hasAuth = localStorage.getItem('supabase.auth.token')
        if (hasAuth) {
          router.push('/dashboard')
        } else {
          router.push('/auth')
        }
      } catch (error) {
        // Fallback to auth page
        router.push('/auth')
      }
    }

    checkAuth()
  }, [router])

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">ShowTrackAI</h1>
        <p className="text-gray-600">Loading your agricultural management platform...</p>
      </div>
    </div>
  )
}
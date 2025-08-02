'use client'

import { useState } from 'react'

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(false)

  const handleGetStarted = () => {
    setIsLoading(true)
    // Simulate brief loading then show the main app content
    setTimeout(() => {
      setIsLoading(false)
      // For now, just show success - in a real app this would navigate to dashboard
      alert('Welcome to ShowTrackAI! This is a static demo.')
    }, 1000)
  }

  if (isLoading) {
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Show<span className="text-blue-600">Track</span>AI
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Revolutionize your agricultural management with AI-powered insights, 
            real-time monitoring, and data-driven decision making.
          </p>
          <button
            onClick={handleGetStarted}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition duration-300 transform hover:scale-105"
          >
            Get Started
          </button>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="text-blue-600 text-4xl mb-4">🌱</div>
            <h3 className="text-xl font-semibold mb-3">Crop Monitoring</h3>
            <p className="text-gray-600">
              Track crop health, growth patterns, and yield predictions with advanced AI analysis.
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="text-green-600 text-4xl mb-4">📊</div>
            <h3 className="text-xl font-semibold mb-3">Data Analytics</h3>
            <p className="text-gray-600">
              Comprehensive insights from weather, soil, and market data to optimize your operations.
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="text-yellow-600 text-4xl mb-4">🤖</div>
            <h3 className="text-xl font-semibold mb-3">AI Recommendations</h3>
            <p className="text-gray-600">
              Get personalized recommendations for planting, harvesting, and resource management.
            </p>
          </div>
        </div>

        {/* Stats Section */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-3xl font-bold text-center mb-8">Why Choose ShowTrackAI?</h2>
          <div className="grid md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-2">25%</div>
              <p className="text-gray-600">Increase in Yield</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-600 mb-2">30%</div>
              <p className="text-gray-600">Water Savings</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-yellow-600 mb-2">40%</div>
              <p className="text-gray-600">Cost Reduction</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-600 mb-2">24/7</div>
              <p className="text-gray-600">Monitoring</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
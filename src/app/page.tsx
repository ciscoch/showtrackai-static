'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function HomePage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [showOnboarding, setShowOnboarding] = useState(false)
  const [selectedFeature, setSelectedFeature] = useState(null)
  const [isCalculating, setIsCalculating] = useState(false)
  const [farmSize, setFarmSize] = useState(100)
  const [currentCosts, setCurrentCosts] = useState(50000)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  // Agricultural hero animation states
  const [heroAnimated, setHeroAnimated] = useState(false)
  const [statsVisible, setStatsVisible] = useState(false)

  useEffect(() => {
    // Check if user is authenticated (mock for now)
    // In real app, this would check Supabase auth state
    const mockAuth = false // Set to true to test dashboard redirect
    
    if (mockAuth) {
      router.push('/dashboard')
      return
    }

    // Trigger hero animation on mount
    setTimeout(() => setHeroAnimated(true), 300)
    // Trigger stats animation after hero
    setTimeout(() => setStatsVisible(true), 1200)
  }, [router])

  const handleGetStarted = () => {
    setShowOnboarding(true)
    setCurrentStep(0)
  }

  const calculateROI = () => {
    setIsCalculating(true)
    setTimeout(() => {
      setIsCalculating(false)
    }, 2000)
  }

  const onboardingSteps = [
    {
      title: "Welcome to the Future of Farming",
      description: "Let's show you how AI can transform your agricultural operations in just 3 minutes.",
      icon: "🌾",
      action: "Start Journey"
    },
    {
      title: "Your Farm Profile",
      description: "Tell us about your operation so we can personalize your experience.",
      icon: "🚜",
      action: "Continue"
    },
    {
      title: "See Your Potential",
      description: "Based on farms like yours, here's what you could achieve with ShowTrackAI.",
      icon: "📈",
      action: "View Results"
    },
    {
      title: "Ready to Transform?",
      description: "Join thousands of farmers already using AI to optimize their operations.",
      icon: "🎯",
      action: "Get Access"
    }
  ]

  const features = [
    {
      id: 'monitoring',
      icon: '🌱',
      title: 'Smart Crop Monitoring',
      description: 'AI-powered analysis of crop health, growth patterns, and yield predictions.',
      details: {
        benefits: ['Early disease detection', 'Optimal harvest timing', 'Yield optimization'],
        technology: 'Satellite imagery + IoT sensors + Machine learning',
        results: '25% average yield increase'
      }
    },
    {
      id: 'analytics',
      icon: '📊',
      title: 'Predictive Analytics',
      description: 'Weather, soil, and market data insights for smarter decision making.',
      details: {
        benefits: ['Weather risk mitigation', 'Resource optimization', 'Market timing'],
        technology: 'Big data + Weather APIs + Market analysis',
        results: '30% reduction in input costs'
      }
    },
    {
      id: 'recommendations',
      icon: '🤖',
      title: 'AI Farm Assistant',
      description: 'Personalized recommendations for every aspect of your operation.',
      details: {
        benefits: ['Automated scheduling', 'Resource planning', 'Risk assessment'],
        technology: 'Neural networks + Expert systems + Real-time data',
        results: '40% time savings on planning'
      }
    }
  ]

  // Onboarding Modal Component
  const OnboardingModal = () => {
    if (!showOnboarding) return null

    const currentStepData = onboardingSteps[currentStep]

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl max-w-md w-full p-6 transform transition-all duration-300 scale-100">
          {/* Progress Indicator */}
          <div className="flex justify-center mb-6">
            {onboardingSteps.map((_, index) => (
              <div
                key={index}
                className={`h-2 w-8 mx-1 rounded-full transition-colors duration-300 ${
                  index <= currentStep ? 'bg-green-500' : 'bg-gray-200'
                }`}
              />
            ))}
          </div>

          {/* Step Content */}
          <div className="text-center">
            <div className="text-6xl mb-4">{currentStepData.icon}</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">{currentStepData.title}</h3>
            <p className="text-gray-600 mb-6">{currentStepData.description}</p>

            {/* Step-specific content */}
            {currentStep === 1 && (
              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Farm Size (acres)</label>
                  <input
                    type="range"
                    min="10"
                    max="1000"
                    value={farmSize}
                    onChange={(e) => setFarmSize(e.target.value)}
                    className="w-full"
                  />
                  <div className="text-center text-lg font-semibold text-green-600">{farmSize} acres</div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Annual Operating Costs</label>
                  <input
                    type="range"
                    min="10000"
                    max="500000"
                    step="5000"
                    value={currentCosts}
                    onChange={(e) => setCurrentCosts(e.target.value)}
                    className="w-full"
                  />
                  <div className="text-center text-lg font-semibold text-green-600">${parseInt(currentCosts).toLocaleString()}</div>
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="bg-green-50 p-4 rounded-lg mb-6">
                <h4 className="font-semibold text-green-800 mb-3">Your Potential with ShowTrackAI:</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Potential Yield Increase:</span>
                    <span className="font-semibold text-green-600">+{Math.round(farmSize * 2.5)} bushels</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Annual Cost Savings:</span>
                    <span className="font-semibold text-green-600">${Math.round(currentCosts * 0.3).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>ROI Timeline:</span>
                    <span className="font-semibold text-green-600">6-8 months</span>
                  </div>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex space-x-3">
              {currentStep > 0 && (
                <button
                  onClick={() => setCurrentStep(currentStep - 1)}
                  className="flex-1 py-3 px-4 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Back
                </button>
              )}
              <button
                onClick={() => {
                  if (currentStep < onboardingSteps.length - 1) {
                    setCurrentStep(currentStep + 1)
                  } else {
                    setShowOnboarding(false)
                    alert('Thanks for your interest! In a real app, this would start your free trial.')
                  }
                }}
                className="flex-1 py-3 px-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold"
              >
                {currentStepData.action}
              </button>
            </div>

            {/* Close button */}
            <button
              onClick={() => setShowOnboarding(false)}
              className="mt-4 text-sm text-gray-500 hover:text-gray-700"
            >
              Maybe later
            </button>
          </div>
        </div>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-yellow-50 flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-green-200 border-t-green-600 mx-auto mb-4"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-2xl">🌱</span>
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">ShowTrackAI</h1>
          <p className="text-gray-600 animate-pulse">Growing your agricultural insights...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-yellow-50 relative overflow-hidden">
      {/* Floating agricultural elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 text-6xl opacity-10 animate-bounce" style={{animationDelay: '0s', animationDuration: '3s'}}>🌾</div>
        <div className="absolute top-40 right-20 text-4xl opacity-10 animate-bounce" style={{animationDelay: '1s', animationDuration: '4s'}}>🚜</div>
        <div className="absolute bottom-40 left-20 text-5xl opacity-10 animate-bounce" style={{animationDelay: '2s', animationDuration: '3.5s'}}>🌽</div>
        <div className="absolute bottom-20 right-10 text-3xl opacity-10 animate-bounce" style={{animationDelay: '0.5s', animationDuration: '4.5s'}}>🐄</div>
      </div>

      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className={`text-center mb-16 transition-all duration-1000 transform ${
          heroAnimated ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}>
          <div className="inline-flex items-center space-x-2 bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <span className="animate-pulse">🔥</span>
            <span>Trusted by 10,000+ farmers worldwide</span>
          </div>
          
          <h1 className="text-6xl font-bold text-gray-900 mb-6 leading-tight">
            FFA Livestock
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-blue-600">
              Management Made Easy
            </span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-4xl mx-auto leading-relaxed">
            The complete livestock management platform for FFA students. Track animals, log activities, 
            <span className="font-semibold text-green-700"> build your AET portfolio</span>, 
            and advance your FFA degree requirements all in one place.
          </p>

          {/* Value Proposition Pills */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {['🐄 Animal Tracking', '📊 AET Portfolio', '🏆 Degree Progress', '📱 Mobile Ready'].map((item, index) => (
              <div 
                key={index}
                className={`bg-white px-4 py-2 rounded-full shadow-sm border border-gray-200 text-sm font-medium transition-all duration-500 transform ${
                  heroAnimated ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                }`}
                style={{transitionDelay: `${index * 100 + 600}ms`}}
              >
                {item}
              </div>
            ))}
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={handleGetStarted}
              className="group bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg relative overflow-hidden"
            >
              <span className="relative z-10 flex items-center">
                Start Your FFA Journey
                <svg className="ml-2 w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-green-700 to-blue-700 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
            </button>
            
            <button
              onClick={calculateROI}
              className="flex items-center text-green-700 font-semibold hover:text-green-800 transition-colors group"
            >
              <span className="mr-2">📊</span>
              Calculate Your ROI
              <svg className="ml-1 w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Trust Indicators */}
          <div className="mt-8 text-sm text-gray-500">
            <p>Certified by USDA • ISO 27001 Security • 99.9% Uptime SLA</p>
          </div>
        </div>

        {/* Interactive Features Showcase */}
        <div className="mb-16">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-4">How ShowTrackAI Works</h2>
          <p className="text-xl text-gray-600 text-center mb-12 max-w-3xl mx-auto">
            Three powerful AI systems working together to optimize every aspect of your farm
          </p>
          
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={feature.id}
                className={`group relative bg-white rounded-2xl shadow-lg p-6 cursor-pointer transition-all duration-500 transform hover:scale-105 hover:shadow-2xl ${
                  selectedFeature === feature.id ? 'ring-4 ring-green-200 scale-105' : ''
                }`}
                onClick={() => setSelectedFeature(selectedFeature === feature.id ? null : feature.id)}
              >
                {/* Feature Icon with Animation */}
                <div className="relative mb-6">
                  <div className="text-6xl mb-4 transform transition-transform duration-300 group-hover:scale-110">
                    {feature.icon}
                  </div>
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>

                <h3 className="text-2xl font-bold mb-3 text-gray-900">{feature.title}</h3>
                <p className="text-gray-600 mb-4 leading-relaxed">{feature.description}</p>

                {/* Expandable Details */}
                <div className={`transition-all duration-500 overflow-hidden ${
                  selectedFeature === feature.id ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}>
                  <div className="border-t pt-4 mt-4">
                    <div className="space-y-3">
                      <div>
                        <h4 className="font-semibold text-green-700 mb-2">Key Benefits:</h4>
                        <ul className="space-y-1">
                          {feature.details.benefits.map((benefit, idx) => (
                            <li key={idx} className="flex items-center text-sm text-gray-600">
                              <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                              {benefit}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold text-blue-700 mb-1">Technology:</h4>
                        <p className="text-sm text-gray-600">{feature.details.technology}</p>
                      </div>
                      <div className="bg-green-50 p-3 rounded-lg">
                        <h4 className="font-semibold text-green-800 mb-1">Average Results:</h4>
                        <p className="text-lg font-bold text-green-700">{feature.details.results}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Interaction Hint */}
                <div className="flex items-center justify-between mt-4">
                  <span className="text-sm text-gray-500">
                    {selectedFeature === feature.id ? 'Click to collapse' : 'Click to learn more'}
                  </span>
                  <svg 
                    className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${
                      selectedFeature === feature.id ? 'rotate-180' : ''
                    }`} 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>

                {/* Hover Effect Overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-blue-600 opacity-0 group-hover:opacity-5 transition-opacity duration-300 rounded-2xl"></div>
              </div>
            ))}
          </div>

          {/* Feature Demo CTA */}
          <div className="text-center mt-12">
            <button className="bg-white border-2 border-green-600 text-green-600 hover:bg-green-600 hover:text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105">
              🎥 Watch 2-Minute Demo
            </button>
          </div>
        </div>

        {/* ROI Calculator Section */}
        <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-2xl shadow-2xl p-8 text-white mb-16">
          <h2 className="text-4xl font-bold text-center mb-4">Calculate Your Farm's Potential</h2>
          <p className="text-center text-green-100 mb-8 text-lg">See how much you could save and earn with ShowTrackAI</p>
          
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Input Section */}
              <div className="bg-white bg-opacity-10 rounded-xl p-6">
                <h3 className="text-2xl font-semibold mb-4">Your Farm Details</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Farm Size</label>
                    <div className="flex items-center space-x-3">
                      <input
                        type="range"
                        min="10"
                        max="1000"
                        value={farmSize}
                        onChange={(e) => setFarmSize(e.target.value)}
                        className="flex-1 h-2 bg-white bg-opacity-20 rounded-lg appearance-none cursor-pointer"
                      />
                      <span className="text-xl font-bold min-w-[80px]">{farmSize} acres</span>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Annual Operating Costs</label>
                    <div className="flex items-center space-x-3">
                      <input
                        type="range"
                        min="10000"
                        max="500000"
                        step="5000"
                        value={currentCosts}
                        onChange={(e) => setCurrentCosts(e.target.value)}
                        className="flex-1 h-2 bg-white bg-opacity-20 rounded-lg appearance-none cursor-pointer"
                      />
                      <span className="text-xl font-bold min-w-[120px]">${parseInt(currentCosts).toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Results Section */}
              <div className="bg-white bg-opacity-10 rounded-xl p-6">
                <h3 className="text-2xl font-semibold mb-4">Your Potential Returns</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Increased Revenue:</span>
                    <span className="text-2xl font-bold text-yellow-300">+${Math.round(farmSize * 125).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Cost Savings:</span>
                    <span className="text-2xl font-bold text-green-300">-${Math.round(currentCosts * 0.3).toLocaleString()}</span>
                  </div>
                  <div className="border-t border-white border-opacity-20 pt-4">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-semibold">Net Annual Benefit:</span>
                      <span className="text-3xl font-bold text-yellow-300">
                        ${Math.round(farmSize * 125 + currentCosts * 0.3).toLocaleString()}
                      </span>
                    </div>
                    <p className="text-sm text-green-100 mt-2">ROI: {Math.round(((farmSize * 125 + currentCosts * 0.3) / (farmSize * 50)) * 100)}% in first year</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center mt-8">
              <button
                onClick={calculateROI}
                disabled={isCalculating}
                className="bg-white text-green-600 hover:bg-green-50 font-bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50"
              >
                {isCalculating ? (
                  <span className="flex items-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-green-600 mr-2"></div>
                    Calculating...
                  </span>
                ) : (
                  'Get Detailed ROI Report'
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Social Proof & Results */}
        <div className={`bg-white rounded-2xl shadow-xl p-8 mb-16 transition-all duration-1000 transform ${
          statsVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}>
          <h2 className="text-4xl font-bold text-center mb-4">Proven Results from Real Farms</h2>
          <p className="text-center text-gray-600 mb-12 text-lg">Join thousands of farmers already transforming their operations</p>
          
          <div className="grid md:grid-cols-4 gap-8 text-center mb-12">
            {[
              { value: '25%', label: 'Average Yield Increase', icon: '🌾', color: 'text-green-600' },
              { value: '30%', label: 'Water Usage Reduction', icon: '💧', color: 'text-blue-600' },
              { value: '40%', label: 'Operating Cost Savings', icon: '💰', color: 'text-yellow-600' },
              { value: '24/7', label: 'Continuous Monitoring', icon: '🔄', color: 'text-purple-600' }
            ].map((stat, index) => (
              <div 
                key={index}
                className={`transform transition-all duration-700 hover:scale-110 ${
                  statsVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                }`}
                style={{transitionDelay: `${index * 200}ms`}}
              >
                <div className="text-5xl mb-3">{stat.icon}</div>
                <div className={`text-4xl font-bold mb-2 ${stat.color}`}>{stat.value}</div>
                <p className="text-gray-600 font-medium">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Testimonials Preview */}
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                quote: "ShowTrackAI helped us increase corn yields by 28% while reducing water usage. It's like having an agricultural expert available 24/7.",
                author: "Sarah Johnson",
                farm: "Johnson Family Farms, Iowa",
                crop: "Corn & Soybeans"
              },
              {
                quote: "The predictive analytics saved us from a major pest outbreak. Early detection meant we saved 85% of our tomato crop.",
                author: "Miguel Rodriguez",
                farm: "Rodriguez Organic Farms, California",
                crop: "Organic Vegetables"
              },
              {
                quote: "ROI was positive within 6 months. The AI recommendations optimized our irrigation schedule and reduced costs by 35%.",
                author: "David Chen",
                farm: "Chen Agricultural Systems, Texas",
                crop: "Cotton & Wheat"
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-6 hover:shadow-md transition-shadow duration-300">
                <div className="text-yellow-400 text-xl mb-3">★★★★★</div>
                <p className="text-gray-700 mb-4 italic">"{testimonial.quote}"</p>
                <div className="border-t pt-4">
                  <p className="font-semibold text-gray-900">{testimonial.author}</p>
                  <p className="text-sm text-gray-600">{testimonial.farm}</p>
                  <p className="text-xs text-green-600 font-medium">{testimonial.crop}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Final CTA Section */}
        <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-8 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Ready to Transform Your Farm?</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Join over 10,000 farmers who are already using AI to grow more efficiently and profitably.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-6">
            <button
              onClick={handleGetStarted}
              className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105"
            >
              Start Your Free 30-Day Trial
            </button>
            <button className="text-green-700 font-semibold hover:text-green-800 transition-colors">
              📞 Schedule a Personal Demo
            </button>
          </div>
          
          <div className="flex justify-center items-center space-x-6 text-sm text-gray-500">
            <span>✓ No credit card required</span>
            <span>✓ Setup in under 5 minutes</span>
            <span>✓ 24/7 support included</span>
          </div>
        </div>

        {/* Onboarding Modal */}
        <OnboardingModal />
      </div>
    </div>
  )
}
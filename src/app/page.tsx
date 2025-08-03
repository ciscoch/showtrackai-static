'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { 
  Tractor, 
  ChartBar, 
  Trophy, 
  Smartphone, 
  TrendingUp, 
  Shield, 
  Clock, 
  Users, 
  Star,
  ArrowRight,
  CheckCircle,
  BarChart3,
  FileText,
  Target,
  Sparkles,
  Play,
  ChevronDown
} from 'lucide-react'

export default function HomePage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [showOnboarding, setShowOnboarding] = useState(false)
  const [selectedFeature, setSelectedFeature] = useState(null)
  const [isCalculating, setIsCalculating] = useState(false)
  const [animalCount, setAnimalCount] = useState(5)
  const [projectBudget, setProjectBudget] = useState(2500)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  // Livestock project hero animation states
  const [heroAnimated, setHeroAnimated] = useState(false)
  const [statsVisible, setStatsVisible] = useState(false)

  useEffect(() => {
    // Check if student is authenticated (mock for now)
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
      title: "Welcome to Your FFA Journey",
      description: "Let's show you how ShowTrackAI can transform your livestock project in just 3 minutes.",
      icon: Tractor,
      action: "Start Journey"
    },
    {
      title: "Your Project Profile",
      description: "Tell us about your livestock project so we can personalize your experience.",
      icon: FileText,
      action: "Continue"
    },
    {
      title: "See Your Potential",
      description: "Based on similar FFA projects, here's what you could achieve with ShowTrackAI.",
      icon: TrendingUp,
      action: "View Results"
    },
    {
      title: "Ready to Excel?",
      description: "Join thousands of FFA students already using ShowTrackAI for their livestock projects.",
      icon: Trophy,
      action: "Get Access"
    }
  ]

  const features = [
    {
      id: 'tracking',
      icon: Tractor,
      title: 'Animal Health Tracking',
      description: 'Track weight gain, health records, feed consumption, and growth progress for your livestock.',
      details: {
        benefits: ['Daily weight tracking', 'Health record management', 'Growth pattern analysis'],
        technology: 'Mobile app + Cloud sync + Analytics dashboard',
        results: '95% improvement in record accuracy'
      }
    },
    {
      id: 'portfolio',
      icon: BarChart3,
      title: 'AET Portfolio Builder',
      description: 'Automatically generate your AET portfolio entries and track degree requirements.',
      details: {
        benefits: ['Auto-generated entries', 'Degree progress tracking', 'Portfolio organization'],
        technology: 'Smart templates + Progress tracking + Export tools',
        results: '80% faster portfolio completion'
      }
    },
    {
      id: 'show',
      icon: Trophy,
      title: 'Show Preparation',
      description: 'Manage show schedules, track preparation activities, and calculate project ROI.',
      details: {
        benefits: ['Show calendar management', 'Preparation checklists', 'Cost tracking'],
        technology: 'Calendar integration + Checklist system + Financial tracking',
        results: '90% better show preparedness'
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
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 rounded-full professional-gradient flex items-center justify-center">
                <currentStepData.icon className="w-10 h-10 text-white" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">{currentStepData.title}</h3>
            <p className="text-gray-600 mb-6">{currentStepData.description}</p>

            {/* Step-specific content */}
            {currentStep === 1 && (
              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Number of Animals</label>
                  <input
                    type="range"
                    min="1"
                    max="20"
                    value={animalCount}
                    onChange={(e) => setAnimalCount(e.target.value)}
                    className="w-full"
                  />
                  <div className="text-center text-lg font-semibold text-green-600">{animalCount} animals</div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Project Budget</label>
                  <input
                    type="range"
                    min="500"
                    max="10000"
                    step="250"
                    value={projectBudget}
                    onChange={(e) => setProjectBudget(e.target.value)}
                    className="w-full"
                  />
                  <div className="text-center text-lg font-semibold text-green-600">${parseInt(projectBudget).toLocaleString()}</div>
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="bg-green-50 p-4 rounded-lg mb-6">
                <h4 className="font-semibold text-green-800 mb-3">Your Potential with ShowTrackAI:</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Time Saved on Records:</span>
                    <span className="font-semibold text-green-600">{Math.round(animalCount * 2)} hours/month</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Show Performance Improvement:</span>
                    <span className="font-semibold text-green-600">+{Math.round(projectBudget * 0.15)} in winnings</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Portfolio Completion:</span>
                    <span className="font-semibold text-green-600">80% faster</span>
                  </div>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex space-x-3">
              {currentStep > 0 && (
                <Button
                  onClick={() => setCurrentStep(currentStep - 1)}
                  variant="secondary"
                  className="flex-1"
                >
                  Back
                </Button>
              )}
              <Button
                onClick={() => {
                  if (currentStep < onboardingSteps.length - 1) {
                    setCurrentStep(currentStep + 1)
                  } else {
                    setShowOnboarding(false)
                    alert('Thanks for your interest! In a real app, this would start your student account setup.')
                  }
                }}
                variant="agricultural"
                className="flex-1"
              >
                {currentStepData.action}
              </Button>
            </div>

            {/* Close button */}
            <Button
              onClick={() => setShowOnboarding(false)}
              variant="ghost"
              size="sm"
              className="mt-4"
            >
              Maybe later
            </Button>
          </div>
        </div>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-lime-50 flex items-center justify-center">
        <div className="text-center">
          <div className="relative mb-8">
            <div className="animate-spin rounded-full h-20 w-20 border-4 border-lime-200 border-t-lime-600 mx-auto"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <Sparkles className="w-8 h-8 text-lime-600 animate-pulse" />
            </div>
          </div>
          <h1 className="text-4xl font-black text-gray-900 mb-4">ShowTrackAI</h1>
          <p className="text-lg text-gray-600 animate-pulse font-medium">Loading your professional livestock management tools...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-lime-50 relative overflow-hidden">
      {/* Professional background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 opacity-5 animate-pulse">
          <Tractor className="w-24 h-24 text-lime-600" />
        </div>
        <div className="absolute top-40 right-20 opacity-5 animate-pulse" style={{animationDelay: '1s'}}>
          <BarChart3 className="w-16 h-16 text-green-600" />
        </div>
        <div className="absolute bottom-40 left-20 opacity-5 animate-pulse" style={{animationDelay: '2s'}}>
          <Trophy className="w-20 h-20 text-amber-600" />
        </div>
        <div className="absolute bottom-20 right-10 opacity-5 animate-pulse" style={{animationDelay: '0.5s'}}>
          <Target className="w-12 h-12 text-lime-600" />
        </div>
      </div>

      {/* Hero Section */}
      <div className="container-responsive section-spacing relative z-10">
        <div className={`text-center mb-20 transition-all duration-1000 transform ${
          heroAnimated ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}>
          <div className="inline-flex items-center space-x-3 bg-lime-50 text-lime-800 px-6 py-3 rounded-full text-sm font-semibold mb-8 border border-lime-200">
            <Trophy className="w-5 h-5 text-lime-600" />
            <span>Trusted by 5,000+ FFA students nationwide</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-black text-gray-900 mb-8 leading-tight tracking-tight">
            FFA Livestock
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-lime-600 via-green-600 to-lime-700">
              Project Excellence
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-600 mb-10 max-w-4xl mx-auto leading-relaxed font-medium">
            The professional livestock management platform designed specifically for FFA students. Track animals, manage daily activities, 
            <span className="font-bold text-lime-700"> automate your AET portfolio</span>, 
            and accelerate your degree requirements with industry-leading tools.
          </p>

          {/* Value Proposition Pills */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {[
              { icon: Tractor, text: 'Animal Tracking' },
              { icon: BarChart3, text: 'AET Portfolio' },
              { icon: Trophy, text: 'Show Prep' },
              { icon: Smartphone, text: 'Mobile-First' }
            ].map((item, index) => (
              <div 
                key={index}
                className={`flex items-center space-x-2 bg-white px-5 py-3 rounded-full shadow-md border border-gray-100 text-sm font-semibold transition-all duration-500 transform hover:shadow-lg hover:-translate-y-1 ${
                  heroAnimated ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                }`}
                style={{transitionDelay: `${index * 100 + 600}ms`}}
              >
                <item.icon className="w-5 h-5 text-lime-600" />
                <span className="text-gray-700">{item.text}</span>
              </div>
            ))}
          </div>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Button
              onClick={handleGetStarted}
              variant="agricultural"
              size="xl"
              className="group font-bold"
            >
              Start Your FFA Journey
              <ArrowRight className="ml-2 w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
            </Button>
            
            <Button
              onClick={calculateROI}
              variant="professional"
              size="lg"
              className="group"
            >
              <BarChart3 className="mr-2 w-5 h-5" />
              Calculate Your ROI
              <ArrowRight className="ml-2 w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="mt-12 flex flex-wrap justify-center items-center gap-6 text-sm text-gray-500">
            <div className="flex items-center space-x-2">
              <Shield className="w-4 h-4 text-lime-600" />
              <span>FFA Approved</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-4 h-4 text-lime-600" />
              <span>FERPA Compliant</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4 text-lime-600" />
              <span>99.9% Uptime</span>
            </div>
          </div>
        </div>

        {/* Interactive Features Showcase */}
        <div className="mb-24">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">How ShowTrackAI Works</h2>
            <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto font-medium leading-relaxed">
              Three powerful tools working together to streamline your FFA livestock project and accelerate your success
            </p>
          </div>
          
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
                <div className="relative mb-8">
                  <div className="w-20 h-20 mx-auto mb-4 rounded-2xl professional-gradient flex items-center justify-center transform transition-transform duration-300 group-hover:scale-110 shadow-lg">
                    <feature.icon className="w-10 h-10 text-white" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-8 h-8 bg-lime-500 rounded-full flex items-center justify-center shadow-md">
                    <CheckCircle className="w-5 h-5 text-white" />
                  </div>
                </div>

                <h3 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900">{feature.title}</h3>
                <p className="text-gray-600 mb-6 leading-relaxed text-lg">{feature.description}</p>

                {/* Expandable Details */}
                <div className={`transition-all duration-500 overflow-hidden ${
                  selectedFeature === feature.id ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}>
                  <div className="border-t pt-4 mt-4">
                    <div className="space-y-3">
                      <div>
                        <h4 className="font-semibold text-green-700 mb-2">Key Benefits:</h4>
                        <ul className="space-y-2">
                          {feature.details.benefits.map((benefit, idx) => (
                            <li key={idx} className="flex items-center text-sm text-gray-600">
                              <CheckCircle className="w-4 h-4 text-lime-500 mr-3 flex-shrink-0" />
                              <span>{benefit}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold text-lime-700 mb-1">Technology:</h4>
                        <p className="text-sm text-gray-600">{feature.details.technology}</p>
                      </div>
                      <div className="bg-lime-50 p-4 rounded-lg border border-lime-100">
                        <h4 className="font-semibold text-lime-800 mb-1">Average Results:</h4>
                        <p className="text-lg font-bold text-lime-700">{feature.details.results}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Interaction Hint */}
                <div className="flex items-center justify-between mt-4">
                  <span className="text-sm text-gray-500">
                    {selectedFeature === feature.id ? 'Click to collapse' : 'Click to learn more'}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${
                      selectedFeature === feature.id ? 'rotate-180' : ''
                    }`}
                  />
                </div>

                {/* Hover Effect Overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-blue-600 opacity-0 group-hover:opacity-5 transition-opacity duration-300 rounded-2xl"></div>
              </div>
            ))}
          </div>

          {/* Feature Demo CTA */}
          <div className="text-center mt-16">
            <Button variant="professional" size="lg" className="group">
              <Play className="mr-2 w-5 h-5" />
              Watch Student Success Stories
              <ArrowRight className="ml-2 w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>

        {/* Project Calculator Section */}
        <div className="professional-gradient rounded-3xl shadow-2xl p-8 md:p-12 text-white mb-24">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-black mb-6">Calculate Your Project's Potential</h2>
            <p className="text-xl text-lime-100 max-w-3xl mx-auto font-medium leading-relaxed">
              See how ShowTrackAI can transform your livestock project success and accelerate your FFA journey
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Input Section */}
              <div className="bg-white bg-opacity-10 rounded-xl p-6">
                <h3 className="text-2xl font-semibold mb-4">Your Project Details</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Number of Animals</label>
                    <div className="flex items-center space-x-3">
                      <input
                        type="range"
                        min="1"
                        max="20"
                        value={animalCount}
                        onChange={(e) => setAnimalCount(e.target.value)}
                        className="flex-1 h-2 bg-white bg-opacity-20 rounded-lg appearance-none cursor-pointer"
                      />
                      <span className="text-xl font-bold min-w-[80px]">{animalCount} animals</span>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Project Budget</label>
                    <div className="flex items-center space-x-3">
                      <input
                        type="range"
                        min="500"
                        max="10000"
                        step="250"
                        value={projectBudget}
                        onChange={(e) => setProjectBudget(e.target.value)}
                        className="flex-1 h-2 bg-white bg-opacity-20 rounded-lg appearance-none cursor-pointer"
                      />
                      <span className="text-xl font-bold min-w-[120px]">${parseInt(projectBudget).toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Results Section */}
              <div className="bg-white bg-opacity-10 rounded-xl p-6">
                <h3 className="text-2xl font-semibold mb-4">Your Potential Benefits</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Time Saved Monthly:</span>
                    <span className="text-2xl font-bold text-yellow-300">{Math.round(animalCount * 2)} hours</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Improved Show Performance:</span>
                    <span className="text-2xl font-bold text-green-300">+{Math.round((projectBudget / 1000) * 15)}% placing</span>
                  </div>
                  <div className="border-t border-white border-opacity-20 pt-4">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-semibold">Portfolio Completion:</span>
                      <span className="text-3xl font-bold text-yellow-300">
                        80% faster
                      </span>
                    </div>
                    <p className="text-sm text-green-100 mt-2">Complete degree requirements in half the time</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center mt-12">
              <Button
                onClick={calculateROI}
                disabled={isCalculating}
                variant="professional"
                size="xl"
                className="group font-bold"
              >
                {isCalculating ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-lime-600 mr-2"></div>
                    Calculating...
                  </>
                ) : (
                  <>
                    <BarChart3 className="mr-2 w-5 h-5" />
                    Get Detailed Project Report
                    <ArrowRight className="ml-2 w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Social Proof & Results */}
        <div className={`bg-white rounded-3xl shadow-xl p-8 md:p-12 mb-24 border border-gray-100 transition-all duration-1000 transform ${
          statsVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">Proven Results from FFA Students</h2>
            <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto font-medium leading-relaxed">
              Join thousands of FFA students already excelling in their livestock projects with ShowTrackAI
            </p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8 text-center mb-16">
            {[
              { value: '95%', label: 'Record Accuracy', icon: FileText, color: 'text-lime-600' },
              { value: '80%', label: 'Faster Portfolio Building', icon: BarChart3, color: 'text-green-600' },
              { value: '3x', label: 'Better Show Performance', icon: Trophy, color: 'text-amber-600' },
              { value: '24/7', label: 'Mobile Access', icon: Smartphone, color: 'text-sky-600' }
            ].map((stat, index) => (
              <Card 
                key={index}
                className={`p-6 transform transition-all duration-700 hover:scale-105 cursor-pointer hover:shadow-lg ${
                  statsVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                }`}
                style={{transitionDelay: `${index * 200}ms`}}
              >
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 rounded-2xl bg-gray-50 flex items-center justify-center">
                    <stat.icon className={`w-8 h-8 ${stat.color}`} />
                  </div>
                </div>
                <div className={`text-4xl font-black mb-2 ${stat.color}`}>{stat.value}</div>
                <p className="text-gray-600 font-semibold">{stat.label}</p>
              </Card>
            ))}
          </div>

          {/* Testimonials Preview */}
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                quote: "ShowTrackAI helped me organize my steer project perfectly. I finished my AET portfolio in half the time and won Grand Champion at our county fair!",
                author: "Emma Martinez",
                farm: "Riverside FFA Chapter, Texas",
                crop: "Market Steer Project"
              },
              {
                quote: "Tracking my lamb's daily weight gain was so easy. The app reminded me of all my tasks and I earned my American Degree requirements faster than ever.",
                author: "Jake Thompson",
                farm: "Valley View FFA Chapter, Iowa",
                crop: "Market Lamb Project"
              },
              {
                quote: "My pig project records were perfect thanks to ShowTrackAI. I saved 5 hours per week and had more time to focus on training and showing.",
                author: "Sophia Chen",
                farm: "Mountain Vista FFA Chapter, Colorado",
                crop: "Market Swine Project"
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-6 hover:shadow-md transition-shadow duration-300">
                <div className="flex justify-center mb-3">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="w-5 h-5 text-amber-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4 italic">"{testimonial.quote}"</p>
                <div className="border-t pt-4">
                  <p className="font-semibold text-gray-900">{testimonial.author}</p>
                  <p className="text-sm text-gray-600">{testimonial.farm}</p>
                  <p className="text-xs text-blue-600 font-medium">{testimonial.crop}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Final CTA Section */}
        <div className="bg-gradient-to-r from-lime-50 via-white to-green-50 rounded-3xl p-8 md:p-16 text-center border border-lime-100">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-6xl font-black text-gray-900 mb-6 leading-tight">
              Ready to Excel in Your 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-lime-600 to-green-600">FFA Project?</span>
            </h2>
            <p className="text-xl md:text-2xl text-gray-600 mb-12 font-medium leading-relaxed">
              Join over 5,000 FFA students who are already using ShowTrackAI to excel in their livestock projects and accelerate their agricultural careers.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
            <Button
              onClick={handleGetStarted}
              variant="agricultural"
              size="xl"
              className="group font-bold"
            >
              Start Your Student Account
              <ArrowRight className="ml-2 w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button variant="professional" size="lg" className="group">
              <Users className="mr-2 w-5 h-5" />
              See Chapter Discounts
              <ArrowRight className="ml-2 w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
          
          <div className="flex flex-wrap justify-center items-center gap-6 text-sm text-gray-600">
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-4 h-4 text-lime-600" />
              <span className="font-medium">Student-friendly pricing</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-4 h-4 text-lime-600" />
              <span className="font-medium">Setup in under 5 minutes</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-4 h-4 text-lime-600" />
              <span className="font-medium">Teacher dashboard included</span>
            </div>
          </div>
        </div>

        {/* Onboarding Modal */}
        <OnboardingModal />
      </div>
    </div>
  )
}
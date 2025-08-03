'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Menu, X, Sprout, BookOpen, BarChart3, Users, ChevronDown } from 'lucide-react'

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isResourcesOpen, setIsResourcesOpen] = useState(false)

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)
  const toggleResources = () => setIsResourcesOpen(!isResourcesOpen)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl professional-gradient">
              <Sprout className="w-6 h-6 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold text-gray-900 leading-none">ShowTrackAI</span>
              <span className="text-xs text-gray-500 leading-none">FFA Excellence</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              href="/features" 
              className="text-gray-700 hover:text-lime-600 font-medium transition-colors duration-200"
            >
              Features
            </Link>
            
            {/* Resources Dropdown */}
            <div className="relative">
              <button
                onClick={toggleResources}
                className="flex items-center space-x-1 text-gray-700 hover:text-lime-600 font-medium transition-colors duration-200"
              >
                <span>Resources</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isResourcesOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {isResourcesOpen && (
                <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-200 py-2">
                  <Link href="/guides" className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-50 hover:text-lime-600 transition-colors">
                    <BookOpen className="w-5 h-5 mr-3" />
                    <div>
                      <div className="font-medium">FFA Guides</div>
                      <div className="text-sm text-gray-500">Project tutorials</div>
                    </div>
                  </Link>
                  <Link href="/success-stories" className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-50 hover:text-lime-600 transition-colors">
                    <BarChart3 className="w-5 h-5 mr-3" />
                    <div>
                      <div className="font-medium">Success Stories</div>
                      <div className="text-sm text-gray-500">Student achievements</div>
                    </div>
                  </Link>
                  <Link href="/community" className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-50 hover:text-lime-600 transition-colors">
                    <Users className="w-5 h-5 mr-3" />
                    <div>
                      <div className="font-medium">Community</div>
                      <div className="text-sm text-gray-500">Connect with peers</div>
                    </div>
                  </Link>
                </div>
              )}
            </div>

            <Link 
              href="/pricing" 
              className="text-gray-700 hover:text-lime-600 font-medium transition-colors duration-200"
            >
              Pricing
            </Link>
            
            <Link 
              href="/support" 
              className="text-gray-700 hover:text-lime-600 font-medium transition-colors duration-200"
            >
              Support
            </Link>
          </nav>

          {/* Desktop CTA Buttons */}
          <div className="hidden md:flex items-center space-x-3">
            <Button variant="ghost" size="sm" className="text-gray-700 hover:text-lime-600">
              Sign In
            </Button>
            <Button variant="agricultural" size="sm" className="font-semibold">
              Get Started Free
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200 bg-white">
            <nav className="flex flex-col space-y-4">
              <Link 
                href="/features" 
                className="text-gray-700 hover:text-lime-600 font-medium py-2 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Features
              </Link>
              
              <div className="space-y-2">
                <div className="text-gray-500 text-sm font-medium uppercase tracking-wide px-2">Resources</div>
                <Link 
                  href="/guides" 
                  className="flex items-center text-gray-700 hover:text-lime-600 py-2 pl-4 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <BookOpen className="w-5 h-5 mr-3" />
                  FFA Guides
                </Link>
                <Link 
                  href="/success-stories" 
                  className="flex items-center text-gray-700 hover:text-lime-600 py-2 pl-4 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <BarChart3 className="w-5 h-5 mr-3" />
                  Success Stories
                </Link>
                <Link 
                  href="/community" 
                  className="flex items-center text-gray-700 hover:text-lime-600 py-2 pl-4 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Users className="w-5 h-5 mr-3" />
                  Community
                </Link>
              </div>
              
              <Link 
                href="/pricing" 
                className="text-gray-700 hover:text-lime-600 font-medium py-2 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Pricing
              </Link>
              
              <Link 
                href="/support" 
                className="text-gray-700 hover:text-lime-600 font-medium py-2 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Support
              </Link>
              
              <div className="pt-4 space-y-3 border-t border-gray-200">
                <Button 
                  variant="ghost" 
                  className="w-full justify-start text-gray-700 hover:text-lime-600"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign In
                </Button>
                <Button 
                  variant="agricultural" 
                  className="w-full font-semibold"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Get Started Free
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
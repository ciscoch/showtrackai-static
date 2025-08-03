'use client'

import Link from 'next/link'
import { Sprout, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Youtube } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8">
            {/* Brand Section */}
            <div className="lg:col-span-1">
              <Link href="/" className="flex items-center space-x-2 mb-6">
                <div className="flex items-center justify-center w-10 h-10 rounded-xl professional-gradient">
                  <Sprout className="w-6 h-6 text-white" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xl font-bold leading-none">ShowTrackAI</span>
                  <span className="text-sm text-gray-400 leading-none">FFA Excellence</span>
                </div>
              </Link>
              <p className="text-gray-300 mb-6 leading-relaxed">
                Empowering FFA students with professional livestock management tools 
                to excel in their agricultural projects and degree requirements.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-lime-600 rounded-lg flex items-center justify-center transition-colors">
                  <Facebook className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-lime-600 rounded-lg flex items-center justify-center transition-colors">
                  <Twitter className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-lime-600 rounded-lg flex items-center justify-center transition-colors">
                  <Instagram className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-lime-600 rounded-lg flex items-center justify-center transition-colors">
                  <Youtube className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Product Links */}
            <div>
              <h3 className="font-semibold text-lg mb-6">Product</h3>
              <ul className="space-y-4">
                <li>
                  <Link href="/features" className="text-gray-300 hover:text-lime-400 transition-colors">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="/pricing" className="text-gray-300 hover:text-lime-400 transition-colors">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link href="/integrations" className="text-gray-300 hover:text-lime-400 transition-colors">
                    Integrations
                  </Link>
                </li>
                <li>
                  <Link href="/mobile-app" className="text-gray-300 hover:text-lime-400 transition-colors">
                    Mobile App
                  </Link>
                </li>
                <li>
                  <Link href="/api" className="text-gray-300 hover:text-lime-400 transition-colors">
                    API Access
                  </Link>
                </li>
              </ul>
            </div>

            {/* Resources Links */}
            <div>
              <h3 className="font-semibold text-lg mb-6">Resources</h3>
              <ul className="space-y-4">
                <li>
                  <Link href="/guides" className="text-gray-300 hover:text-lime-400 transition-colors">
                    FFA Guides
                  </Link>
                </li>
                <li>
                  <Link href="/templates" className="text-gray-300 hover:text-lime-400 transition-colors">
                    AET Templates
                  </Link>
                </li>
                <li>
                  <Link href="/webinars" className="text-gray-300 hover:text-lime-400 transition-colors">
                    Training Webinars
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="text-gray-300 hover:text-lime-400 transition-colors">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="/help" className="text-gray-300 hover:text-lime-400 transition-colors">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="/community" className="text-gray-300 hover:text-lime-400 transition-colors">
                    Community Forum
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact & Support */}
            <div>
              <h3 className="font-semibold text-lg mb-6">Contact & Support</h3>
              <div className="space-y-4 mb-6">
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-lime-400" />
                  <a href="mailto:support@showtrackai.com" className="text-gray-300 hover:text-lime-400 transition-colors">
                    support@showtrackai.com
                  </a>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-lime-400" />
                  <a href="tel:+1-800-FFA-HELP" className="text-gray-300 hover:text-lime-400 transition-colors">
                    1-800-FFA-HELP
                  </a>
                </div>
                <div className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 text-lime-400 mt-0.5" />
                  <div className="text-gray-300">
                    <div>Agricultural Technology Center</div>
                    <div>123 Innovation Drive</div>
                    <div>Farm Valley, IA 50001</div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <Link href="/support" className="block text-gray-300 hover:text-lime-400 transition-colors">
                  Support Portal
                </Link>
                <Link href="/status" className="block text-gray-300 hover:text-lime-400 transition-colors">
                  System Status
                </Link>
                <Link href="/educators" className="block text-gray-300 hover:text-lime-400 transition-colors">
                  For Educators
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-gray-800 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6">
              <p className="text-gray-400 text-sm">
                © 2024 ShowTrackAI. All rights reserved.
              </p>
              <div className="flex items-center space-x-4 text-sm">
                <Link href="/privacy" className="text-gray-400 hover:text-lime-400 transition-colors">
                  Privacy Policy
                </Link>
                <Link href="/terms" className="text-gray-400 hover:text-lime-400 transition-colors">
                  Terms of Service
                </Link>
                <Link href="/cookies" className="text-gray-400 hover:text-lime-400 transition-colors">
                  Cookie Policy
                </Link>
              </div>
            </div>
            
            <div className="flex items-center space-x-4 text-sm text-gray-400">
              <span className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                <span>All systems operational</span>
              </span>
              <span>•</span>
              <span>FERPA Compliant</span>
              <span>•</span>
              <span>SOC 2 Certified</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
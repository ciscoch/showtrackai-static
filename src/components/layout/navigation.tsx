'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  Home, 
  PawPrint, 
  BookOpen, 
  DollarSign, 
  GraduationCap, 
  TrendingUp,
  Menu,
  X,
  User,
  Settings,
  LogOut
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

const navigationItems = [
  {
    title: 'Dashboard',
    href: '/dashboard',
    icon: Home,
    description: 'Overview and analytics'
  },
  {
    title: 'Animals',
    href: '/animals',
    icon: PawPrint,
    description: 'Manage your livestock'
  },
  {
    title: 'Journal',
    href: '/journal',
    icon: BookOpen,
    description: 'Activity logging and AET skills'
  },
  {
    title: 'Expenses',
    href: '/expenses',
    icon: DollarSign,
    description: 'Financial tracking'
  },
  {
    title: 'Training',
    href: '/training',
    icon: GraduationCap,
    description: 'FFA curriculum and courses'
  },
  {
    title: 'Progress',
    href: '/progress',
    icon: TrendingUp,
    description: 'FFA degree advancement'
  }
]

export function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
        <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white border-r border-gray-200 px-6 pb-4">
          {/* Logo */}
          <div className="flex h-16 shrink-0 items-center">
            <Link href="/dashboard" className="flex items-center space-x-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-r from-green-600 to-blue-600">
                <PawPrint className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">ShowTrackAI</span>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex flex-1 flex-col">
            <ul role="list" className="flex flex-1 flex-col gap-y-7">
              <li>
                <ul role="list" className="-mx-2 space-y-1">
                  {navigationItems.map((item) => {
                    const isActive = pathname === item.href
                    return (
                      <li key={item.title}>
                        <Link
                          href={item.href}
                          className={cn(
                            "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold transition-all duration-200",
                            isActive
                              ? "bg-green-50 text-green-700"
                              : "text-gray-700 hover:text-green-700 hover:bg-green-50"
                          )}
                        >
                          <item.icon
                            className={cn(
                              "h-6 w-6 shrink-0 transition-colors",
                              isActive ? "text-green-700" : "text-gray-400 group-hover:text-green-700"
                            )}
                          />
                          <div className="flex flex-col">
                            <span>{item.title}</span>
                            <span className="text-xs text-gray-500 font-normal">
                              {item.description}
                            </span>
                          </div>
                        </Link>
                      </li>
                    )
                  })}
                </ul>
              </li>

              {/* User Profile Section */}
              <li className="mt-auto">
                <div className="border-t border-gray-200 pt-4">
                  <div className="flex items-center gap-x-4 px-2 py-3 text-sm font-semibold leading-6 text-gray-900">
                    <div className="h-8 w-8 rounded-full bg-gradient-to-r from-green-600 to-blue-600 flex items-center justify-center">
                      <User className="h-4 w-4 text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">John Smith</p>
                      <p className="text-xs text-gray-500">Central Valley FFA</p>
                    </div>
                  </div>
                  <div className="mt-2 space-y-1">
                    <Link
                      href="/settings"
                      className="group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold text-gray-700 hover:text-green-700 hover:bg-green-50 transition-all duration-200"
                    >
                      <Settings className="h-5 w-5 text-gray-400 group-hover:text-green-700" />
                      Settings
                    </Link>
                    <button className="group flex w-full gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold text-gray-700 hover:text-red-700 hover:bg-red-50 transition-all duration-200">
                      <LogOut className="h-5 w-5 text-gray-400 group-hover:text-red-700" />
                      Sign out
                    </button>
                  </div>
                </div>
              </li>
            </ul>
          </nav>
        </div>
      </aside>

      {/* Mobile Header */}
      <div className="sticky top-0 z-40 flex items-center gap-x-6 bg-white px-4 py-4 shadow-sm sm:px-6 lg:hidden">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsMobileMenuOpen(true)}
          className="lg:hidden"
        >
          <Menu className="h-6 w-6" />
          <span className="sr-only">Open sidebar</span>
        </Button>

        <div className="flex-1 text-sm font-semibold leading-6 text-gray-900">
          ShowTrackAI
        </div>

        <Button variant="ghost" size="icon">
          <User className="h-6 w-6" />
          <span className="sr-only">Your profile</span>
        </Button>
      </div>

      {/* Mobile Sidebar */}
      {isMobileMenuOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-50 bg-gray-900/80 lg:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          
          {/* Sidebar */}
          <div className="fixed inset-y-0 left-0 z-50 w-72 bg-white lg:hidden">
            <div className="flex grow flex-col gap-y-5 overflow-y-auto px-6 pb-4">
              {/* Header */}
              <div className="flex h-16 shrink-0 items-center justify-between">
                <Link href="/dashboard" className="flex items-center space-x-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-r from-green-600 to-blue-600">
                    <PawPrint className="h-5 w-5 text-white" />
                  </div>
                  <span className="text-xl font-bold text-gray-900">ShowTrackAI</span>
                </Link>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <X className="h-6 w-6" />
                  <span className="sr-only">Close sidebar</span>
                </Button>
              </div>

              {/* Navigation */}
              <nav className="flex flex-1 flex-col">
                <ul role="list" className="flex flex-1 flex-col gap-y-7">
                  <li>
                    <ul role="list" className="-mx-2 space-y-1">
                      {navigationItems.map((item) => {
                        const isActive = pathname === item.href
                        return (
                          <li key={item.title}>
                            <Link
                              href={item.href}
                              onClick={() => setIsMobileMenuOpen(false)}
                              className={cn(
                                "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold transition-all duration-200",
                                isActive
                                  ? "bg-green-50 text-green-700"
                                  : "text-gray-700 hover:text-green-700 hover:bg-green-50"
                              )}
                            >
                              <item.icon
                                className={cn(
                                  "h-6 w-6 shrink-0 transition-colors",
                                  isActive ? "text-green-700" : "text-gray-400 group-hover:text-green-700"
                                )}
                              />
                              <div className="flex flex-col">
                                <span>{item.title}</span>
                                <span className="text-xs text-gray-500 font-normal">
                                  {item.description}
                                </span>
                              </div>
                            </Link>
                          </li>
                        )
                      })}
                    </ul>
                  </li>

                  {/* User Profile Section */}
                  <li className="mt-auto">
                    <div className="border-t border-gray-200 pt-4">
                      <div className="flex items-center gap-x-4 px-2 py-3 text-sm font-semibold leading-6 text-gray-900">
                        <div className="h-8 w-8 rounded-full bg-gradient-to-r from-green-600 to-blue-600 flex items-center justify-center">
                          <User className="h-4 w-4 text-white" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">John Smith</p>
                          <p className="text-xs text-gray-500">Central Valley FFA</p>
                        </div>
                      </div>
                      <div className="mt-2 space-y-1">
                        <Link
                          href="/settings"
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold text-gray-700 hover:text-green-700 hover:bg-green-50 transition-all duration-200"
                        >
                          <Settings className="h-5 w-5 text-gray-400 group-hover:text-green-700" />
                          Settings
                        </Link>
                        <button className="group flex w-full gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold text-gray-700 hover:text-red-700 hover:bg-red-50 transition-all duration-200">
                          <LogOut className="h-5 w-5 text-gray-400 group-hover:text-red-700" />
                          Sign out
                        </button>
                      </div>
                    </div>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </>
      )}
    </>
  )
}

export function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Navigation />
      
      {/* Main content */}
      <div className="lg:pl-72">
        <main className="py-6">
          <div className="px-4 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}
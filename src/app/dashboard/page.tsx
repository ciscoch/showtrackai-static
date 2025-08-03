'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  PawPrint, 
  TrendingUp, 
  DollarSign, 
  BookOpen, 
  GraduationCap,
  Plus,
  Activity,
  Calendar,
  Target
} from 'lucide-react'
import { AppLayout } from '@/components/layout/navigation'
import { formatCurrency, formatDate } from '@/lib/utils'

// Mock data - in real app this would come from Supabase
const mockStats = {
  totalAnimals: 8,
  activeAnimals: 6,
  totalExpenses: 12750.50,
  monthlyExpenses: 850.25,
  journalEntries: 45,
  aetHours: 127.5,
  completedSkills: 12
}

const mockRecentAnimals = [
  {
    id: '1',
    name: 'Bella',
    species: 'cattle',
    breed: 'Angus',
    status: 'active',
    age: '8 months',
    lastWeight: 650,
    photo: null
  },
  {
    id: '2',
    name: 'Wilbur',
    species: 'swine',
    breed: 'Yorkshire',
    status: 'active',
    age: '4 months',
    lastWeight: 180,
    photo: null
  },
  {
    id: '3',
    name: 'Dolly',
    species: 'sheep',
    breed: 'Suffolk',
    status: 'active',
    age: '6 months',
    lastWeight: 95,
    photo: null
  }
]

const mockRecentEntries = [
  {
    id: '1',
    date: '2024-01-15',
    activity: 'Feed and Water',
    hours: 1.5,
    animals: ['Bella', 'Wilbur'],
    aetSkills: ['Animal Nutrition', 'Daily Care']
  },
  {
    id: '2',
    date: '2024-01-14',
    activity: 'Health Check',
    hours: 2.0,
    animals: ['Dolly'],
    aetSkills: ['Animal Health', 'Record Keeping']
  },
  {
    id: '3',
    date: '2024-01-13',
    activity: 'Pen Cleaning',
    hours: 3.0,
    animals: ['Bella', 'Wilbur', 'Dolly'],
    aetSkills: ['Facility Management', 'Animal Welfare']
  }
]

const mockUpcomingTasks = [
  {
    id: '1',
    title: 'Vaccination - Bella',
    dueDate: '2024-01-20',
    priority: 'high',
    type: 'health'
  },
  {
    id: '2',
    title: 'Weight Recording',
    dueDate: '2024-01-22',
    priority: 'medium',
    type: 'routine'
  },
  {
    id: '3',
    title: 'Feed Order',
    dueDate: '2024-01-25',
    priority: 'low',
    type: 'expense'
  }
]

function StatCard({ title, value, icon: Icon, trend, color = 'green' }: any) {
  return (
    <Card className="hover:shadow-md transition-shadow duration-200">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-gray-600">{title}</CardTitle>
        <Icon className={`h-4 w-4 text-${color}-600`} />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-gray-900">{value}</div>
        {trend && (
          <p className={`text-xs ${trend.isPositive ? 'text-green-600' : 'text-red-600'} flex items-center mt-1`}>
            <TrendingUp className="h-3 w-3 mr-1" />
            {trend.value}% from last month
          </p>
        )}
      </CardContent>
    </Card>
  )
}

function AnimalCard({ animal }: any) {
  const getSpeciesIcon = (species: string) => {
    switch (species) {
      case 'cattle': return '🐄'
      case 'swine': return '🐷'
      case 'sheep': return '🐑'
      case 'goats': return '🐐'
      case 'poultry': return '🐔'
      default: return '🐾'
    }
  }

  return (
    <Card className="hover:shadow-md transition-shadow duration-200">
      <CardContent className="p-4">
        <div className="flex items-center space-x-3">
          <div className="text-2xl">{getSpeciesIcon(animal.species)}</div>
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900">{animal.name}</h3>
            <p className="text-sm text-gray-500">{animal.breed} • {animal.age}</p>
            <p className="text-xs text-gray-400">Last weight: {animal.lastWeight} lbs</p>
          </div>
          <Badge variant={animal.species as any} className="text-xs">
            {animal.species}
          </Badge>
        </div>
      </CardContent>
    </Card>
  )
}

export default function DashboardPage() {
  const [timeOfDay, setTimeOfDay] = useState('')

  useEffect(() => {
    const hour = new Date().getHours()
    if (hour < 12) setTimeOfDay('morning')
    else if (hour < 17) setTimeOfDay('afternoon')
    else setTimeOfDay('evening')
  }, [])

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Good {timeOfDay}, John! 👋
            </h1>
            <p className="text-gray-600">
              Here's what's happening with your livestock today.
            </p>
          </div>
          <div className="flex space-x-3">
            <Button variant="outline" size="sm">
              <Calendar className="h-4 w-4 mr-2" />
              Today's Schedule
            </Button>
            <Button size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Quick Entry
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Total Animals"
            value={mockStats.totalAnimals}
            icon={PawPrint}
            trend={{ value: 12, isPositive: true }}
            color="green"
          />
          <StatCard
            title="Monthly Expenses"
            value={formatCurrency(mockStats.monthlyExpenses)}
            icon={DollarSign}
            trend={{ value: 8, isPositive: false }}
            color="blue"
          />
          <StatCard
            title="Journal Entries"
            value={mockStats.journalEntries}
            icon={BookOpen}
            trend={{ value: 25, isPositive: true }}
            color="yellow"
          />
          <StatCard
            title="AET Hours"
            value={mockStats.aetHours}
            icon={GraduationCap}
            trend={{ value: 15, isPositive: true }}
            color="purple"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Animals */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <CardTitle className="text-lg font-semibold">Recent Animals</CardTitle>
              <Button variant="ghost" size="sm">
                View All
              </Button>
            </CardHeader>
            <CardContent className="space-y-3">
              {mockRecentAnimals.map((animal) => (
                <AnimalCard key={animal.id} animal={animal} />
              ))}
            </CardContent>
          </Card>

          {/* Upcoming Tasks */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <CardTitle className="text-lg font-semibold">Upcoming Tasks</CardTitle>
              <Button variant="ghost" size="sm">
                <Target className="h-4 w-4 mr-2" />
                Manage
              </Button>
            </CardHeader>
            <CardContent className="space-y-3">
              {mockUpcomingTasks.map((task) => (
                <div key={task.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">{task.title}</h4>
                    <p className="text-sm text-gray-500">Due {formatDate(task.dueDate)}</p>
                  </div>
                  <Badge 
                    variant={task.priority === 'high' ? 'error' : task.priority === 'medium' ? 'warning' : 'success'}
                  >
                    {task.priority}
                  </Badge>
                </div>
              ))}
              {mockUpcomingTasks.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <Activity className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                  <p>No upcoming tasks</p>
                  <p className="text-sm">Great job staying on top of things!</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Recent Journal Entries */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-lg font-semibold">Recent Journal Entries</CardTitle>
            <Button variant="ghost" size="sm">
              View All
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockRecentEntries.map((entry) => (
                <div key={entry.id} className="border-l-4 border-green-500 pl-4 py-2">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium text-gray-900">{entry.activity}</h4>
                    <span className="text-sm text-gray-500">{formatDate(entry.date)}</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">
                    {entry.hours} hours • {entry.animals.join(', ')}
                  </p>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {entry.aetSkills.map((skill) => (
                      <Badge key={skill} variant="secondary" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="bg-gradient-to-r from-green-50 to-blue-50">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Button variant="outline" className="h-20 flex-col">
                <PawPrint className="h-6 w-6 mb-2" />
                Add Animal
              </Button>
              <Button variant="outline" className="h-20 flex-col">
                <BookOpen className="h-6 w-6 mb-2" />
                New Entry
              </Button>
              <Button variant="outline" className="h-20 flex-col">
                <DollarSign className="h-6 w-6 mb-2" />
                Log Expense
              </Button>
              <Button variant="outline" className="h-20 flex-col">
                <Activity className="h-6 w-6 mb-2" />
                Record Weight
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  )
}
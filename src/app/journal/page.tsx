'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { 
  BookOpen, 
  Plus,
  Search,
  Filter,
  Calendar,
  Clock,
  PawPrint,
  GraduationCap,
  Target,
  Edit,
  Trash2
} from 'lucide-react'
import { AppLayout } from '@/components/layout/navigation'
import { formatDate } from '@/lib/utils'

// Mock data for journal entries
const mockEntries = [
  {
    id: '1',
    date: '2024-01-15',
    activityType: 'Daily Care',
    description: 'Fed all animals morning rations. Checked water systems. Cleaned cattle pen. Noticed Bella gaining good weight.',
    hoursSpent: 2.5,
    aetSkills: ['Animal Nutrition', 'Daily Animal Care', 'Facility Management'],
    animalsInvolved: ['Bella', 'Wilbur', 'Dolly'],
    photos: [],
    createdAt: '2024-01-15T08:30:00Z'
  },
  {
    id: '2',
    date: '2024-01-14',
    activityType: 'Health Management',
    description: 'Administered vaccination to Dolly. Recorded weight measurements for all sheep. Updated health records.',
    hoursSpent: 1.5,
    aetSkills: ['Animal Health', 'Record Keeping', 'Livestock Handling'],
    animalsInvolved: ['Dolly'],
    photos: [],
    createdAt: '2024-01-14T14:15:00Z'
  },
  {
    id: '3',
    date: '2024-01-13',
    activityType: 'Facility Maintenance',
    description: 'Repaired fence gate in swine area. Cleaned and disinfected feed troughs. Organized feed storage area.',
    hoursSpent: 3.0,
    aetSkills: ['Facility Management', 'Equipment Maintenance', 'Safety Procedures'],
    animalsInvolved: ['Wilbur'],
    photos: [],
    createdAt: '2024-01-13T16:45:00Z'
  },
  {
    id: '4',
    date: '2024-01-12',
    activityType: 'Training & Education',
    description: 'Attended FFA chapter meeting. Learned about showmanship techniques. Practiced with Bella for upcoming show.',
    hoursSpent: 2.0,
    aetSkills: ['Livestock Showing', 'Leadership Development', 'Communication Skills'],
    animalsInvolved: ['Bella'],
    photos: [],
    createdAt: '2024-01-12T19:30:00Z'
  },
  {
    id: '5',
    date: '2024-01-11',
    activityType: 'Record Keeping',
    description: 'Updated all weight records in ShowTrackAI. Calculated feed efficiency ratios. Reviewed monthly expense reports.',
    hoursSpent: 1.0,
    aetSkills: ['Record Keeping', 'Data Analysis', 'Financial Management'],
    animalsInvolved: ['Bella', 'Wilbur', 'Dolly', 'Daisy'],
    photos: [],
    createdAt: '2024-01-11T20:00:00Z'
  }
]

// Mock AET skills for suggestions
const aetSkills = [
  'Animal Nutrition',
  'Daily Animal Care', 
  'Animal Health',
  'Livestock Handling',
  'Facility Management',
  'Equipment Maintenance',
  'Record Keeping',
  'Data Analysis',
  'Financial Management',
  'Livestock Showing',
  'Leadership Development',
  'Communication Skills',
  'Safety Procedures',
  'Breeding Management',
  'Feed Quality Analysis'
]

const activityTypes = [
  'Daily Care',
  'Health Management',
  'Facility Maintenance',
  'Training & Education',
  'Record Keeping',
  'Show Preparation',
  'Breeding Activities',
  'Feed Management',
  'Equipment Operation',
  'Other'
]

function JournalEntryCard({ entry }: { entry: any }) {
  return (
    <Card className="hover:shadow-md transition-shadow duration-200">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-1">
              <Calendar className="h-4 w-4 text-green-600" />
              <span className="text-sm font-medium text-gray-900">
                {formatDate(entry.date)}
              </span>
              <Badge variant="outline" className="text-xs">
                {entry.activityType}
              </Badge>
            </div>
            <div className="flex items-center space-x-4 text-sm text-gray-500">
              <div className="flex items-center space-x-1">
                <Clock className="h-3 w-3" />
                <span>{entry.hoursSpent} hours</span>
              </div>
              <div className="flex items-center space-x-1">
                <PawPrint className="h-3 w-3" />
                <span>{entry.animalsInvolved.length} animals</span>
              </div>
            </div>
          </div>
          <div className="flex space-x-1">
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Edit className="h-3 w-3" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Trash2 className="h-3 w-3" />
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Description */}
        <p className="text-gray-700 text-sm leading-relaxed">
          {entry.description}
        </p>

        {/* Animals Involved */}
        {entry.animalsInvolved.length > 0 && (
          <div>
            <p className="text-xs font-medium text-gray-500 mb-2">Animals Involved</p>
            <div className="flex flex-wrap gap-1">
              {entry.animalsInvolved.map((animal: string) => (
                <Badge key={animal} variant="secondary" className="text-xs">
                  {animal}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* AET Skills */}
        {entry.aetSkills.length > 0 && (
          <div>
            <p className="text-xs font-medium text-gray-500 mb-2">AET Skills</p>
            <div className="flex flex-wrap gap-1">
              {entry.aetSkills.map((skill: string) => (
                <Badge key={skill} variant="success" className="text-xs">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Hours Breakdown */}
        <div className="bg-green-50 rounded-lg p-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-green-800 font-medium">
              Hours Applied to AET: {entry.hoursSpent}
            </span>
            <GraduationCap className="h-4 w-4 text-green-600" />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default function JournalPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedActivityType, setSelectedActivityType] = useState('all')
  const [selectedDateRange, setSelectedDateRange] = useState('all')
  const [showFilters, setShowFilters] = useState(false)

  // Filter entries
  const filteredEntries = mockEntries.filter(entry => {
    const matchesSearch = entry.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         entry.activityType.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         entry.aetSkills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()))
    
    const matchesActivityType = selectedActivityType === 'all' || entry.activityType === selectedActivityType
    
    // Date filtering would be implemented here
    
    return matchesSearch && matchesActivityType
  })

  // Calculate summary stats
  const totalEntries = filteredEntries.length
  const totalHours = filteredEntries.reduce((sum, entry) => sum + entry.hoursSpent, 0)
  const uniqueSkills = new Set(filteredEntries.flatMap(entry => entry.aetSkills)).size
  const thisWeekEntries = filteredEntries.filter(entry => {
    const entryDate = new Date(entry.date)
    const weekAgo = new Date()
    weekAgo.setDate(weekAgo.getDate() - 7)
    return entryDate >= weekAgo
  }).length

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Activity Journal</h1>
            <p className="text-gray-600">
              Log your daily activities and track AET skill development
            </p>
          </div>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            New Entry
          </Button>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <BookOpen className="h-5 w-5 text-green-600" />
                <div>
                  <p className="text-sm text-gray-500">Total Entries</p>
                  <p className="text-xl font-bold">{totalEntries}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Clock className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="text-sm text-gray-500">Total Hours</p>
                  <p className="text-xl font-bold">{totalHours.toFixed(1)}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Target className="h-5 w-5 text-yellow-600" />
                <div>
                  <p className="text-sm text-gray-500">Skills Practiced</p>
                  <p className="text-xl font-bold">{uniqueSkills}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Calendar className="h-5 w-5 text-purple-600" />
                <div>
                  <p className="text-sm text-gray-500">This Week</p>
                  <p className="text-xl font-bold">{thisWeekEntries}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search journal entries, activities, or skills..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button
            variant="outline"
            onClick={() => setShowFilters(!showFilters)}
            className="whitespace-nowrap"
          >
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>
        </div>

        {/* Filter Panel */}
        {showFilters && (
          <Card>
            <CardContent className="p-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Activity Type
                  </label>
                  <select
                    value={selectedActivityType}
                    onChange={(e) => setSelectedActivityType(e.target.value)}
                    className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    <option value="all">All Activities</option>
                    {activityTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Date Range
                  </label>
                  <select
                    value={selectedDateRange}
                    onChange={(e) => setSelectedDateRange(e.target.value)}
                    className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    <option value="all">All Time</option>
                    <option value="week">This Week</option>
                    <option value="month">This Month</option>
                    <option value="quarter">This Quarter</option>
                  </select>
                </div>
                <div className="flex items-end">
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => {
                      setSearchTerm('')
                      setSelectedActivityType('all')
                      setSelectedDateRange('all')
                    }}
                  >
                    Clear Filters
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Quick Stats Card */}
        <Card className="bg-gradient-to-r from-green-50 to-blue-50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  AET Progress This Month
                </h3>
                <div className="flex items-center space-x-6">
                  <div>
                    <p className="text-sm text-gray-600">Hours Logged</p>
                    <p className="text-2xl font-bold text-green-600">
                      {totalHours.toFixed(1)}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Skills Practiced</p>
                    <p className="text-2xl font-bold text-blue-600">
                      {uniqueSkills}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Days Active</p>
                    <p className="text-2xl font-bold text-purple-600">
                      {new Set(filteredEntries.map(e => e.date)).size}
                    </p>
                  </div>
                </div>
              </div>
              <GraduationCap className="h-16 w-16 text-green-600 opacity-20" />
            </div>
          </CardContent>
        </Card>

        {/* Journal Entries */}
        {filteredEntries.length > 0 ? (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-900">
              Recent Entries ({filteredEntries.length})
            </h2>
            <div className="space-y-4">
              {filteredEntries.map((entry) => (
                <JournalEntryCard key={entry.id} entry={entry} />
              ))}
            </div>
          </div>
        ) : (
          <Card>
            <CardContent className="text-center py-12">
              <BookOpen className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No journal entries found</h3>
              <p className="text-gray-600 mb-6">
                {searchTerm || selectedActivityType !== 'all'
                  ? "Try adjusting your search or filters"
                  : "Start documenting your daily activities and build your AET portfolio"}
              </p>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Create Your First Entry
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </AppLayout>
  )
}
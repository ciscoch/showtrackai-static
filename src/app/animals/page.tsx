'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { 
  PawPrint, 
  Plus,
  Search,
  Filter,
  MoreVertical,
  Eye,
  Edit,
  Trash2,
  TrendingUp,
  Calendar,
  DollarSign
} from 'lucide-react'
import { AppLayout } from '@/components/layout/navigation'
import { formatCurrency, formatDate, calculateAge } from '@/lib/utils'

// Mock data
const mockAnimals = [
  {
    id: '1',
    name: 'Bella',
    species: 'cattle',
    breed: 'Black Angus',
    birthDate: '2023-05-15',
    acquisitionDate: '2023-05-20',
    acquisitionCost: 1200,
    tagNumber: 'C001',
    status: 'active',
    photos: [],
    currentWeight: 650,
    lastWeightDate: '2024-01-10',
    totalExpenses: 890.50,
    notes: 'Excellent temperament, good growth rate'
  },
  {
    id: '2',
    name: 'Wilbur',
    species: 'swine',
    breed: 'Yorkshire',
    birthDate: '2023-09-10',
    acquisitionDate: '2023-09-15',
    acquisitionCost: 350,
    tagNumber: 'S001',
    status: 'active',
    photos: [],
    currentWeight: 180,
    lastWeightDate: '2024-01-08',
    totalExpenses: 420.75,
    notes: 'Strong feeder, good muscle development'
  },
  {
    id: '3',
    name: 'Dolly',
    species: 'sheep',
    breed: 'Suffolk',
    birthDate: '2023-07-20',
    acquisitionDate: '2023-07-25',
    acquisitionCost: 280,
    tagNumber: 'SH001',
    status: 'active',
    photos: [],
    currentWeight: 95,
    lastWeightDate: '2024-01-12',
    totalExpenses: 310.25,
    notes: 'Good wool quality, healthy ewe'
  },
  {
    id: '4',
    name: 'Daisy',
    species: 'goats',
    breed: 'Boer',
    birthDate: '2023-06-05',
    acquisitionDate: '2023-06-10',
    acquisitionCost: 400,
    tagNumber: 'G001',
    status: 'active',
    photos: [],
    currentWeight: 75,
    lastWeightDate: '2024-01-09',
    totalExpenses: 275.00,
    notes: 'Excellent mother, good milk production'
  },
  {
    id: '5',
    name: 'Henrietta',
    species: 'poultry',
    breed: 'Rhode Island Red',
    birthDate: '2023-04-01',
    acquisitionDate: '2023-04-05',
    acquisitionCost: 25,
    tagNumber: 'P001',
    status: 'active',
    photos: [],
    currentWeight: 6.5,
    lastWeightDate: '2024-01-11',
    totalExpenses: 85.30,
    notes: 'Consistent layer, good health'
  }
]

const speciesOptions = [
  { value: 'all', label: 'All Species' },
  { value: 'cattle', label: 'Cattle' },
  { value: 'swine', label: 'Swine' },
  { value: 'sheep', label: 'Sheep' },
  { value: 'goats', label: 'Goats' },
  { value: 'poultry', label: 'Poultry' }
]

const statusOptions = [
  { value: 'all', label: 'All Status' },
  { value: 'active', label: 'Active' },
  { value: 'sold', label: 'Sold' },
  { value: 'deceased', label: 'Deceased' }
]

function AnimalCard({ animal }: { animal: any }) {
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

  const age = calculateAge(animal.birthDate)

  return (
    <Card className="hover:shadow-md transition-shadow duration-200 group">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <div className="text-3xl">{getSpeciesIcon(animal.species)}</div>
            <div>
              <CardTitle className="text-lg">{animal.name}</CardTitle>
              <p className="text-sm text-gray-500">{animal.breed}</p>
              <p className="text-xs text-gray-400">Tag: {animal.tagNumber}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Badge variant={animal.species as any}>
              {animal.species}
            </Badge>
            <Button
              variant="ghost"
              size="icon"
              className="opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <MoreVertical className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Basic Info */}
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-gray-500">Age</p>
            <p className="font-medium">{age.ageString}</p>
          </div>
          <div>
            <p className="text-gray-500">Current Weight</p>
            <p className="font-medium">{animal.currentWeight} lbs</p>
          </div>
          <div>
            <p className="text-gray-500">Acquisition Cost</p>
            <p className="font-medium">{formatCurrency(animal.acquisitionCost)}</p>
          </div>
          <div>
            <p className="text-gray-500">Total Expenses</p>
            <p className="font-medium">{formatCurrency(animal.totalExpenses)}</p>
          </div>
        </div>

        {/* Status */}
        <div>
          <Badge 
            variant={animal.status === 'active' ? 'success' : animal.status === 'sold' ? 'warning' : 'error'}
          >
            {animal.status}
          </Badge>
        </div>

        {/* Notes Preview */}
        {animal.notes && (
          <div>
            <p className="text-xs text-gray-500 mb-1">Notes</p>
            <p className="text-sm text-gray-700 line-clamp-2">{animal.notes}</p>
          </div>
        )}

        {/* Actions */}
        <div className="flex space-x-2 pt-2">
          <Button variant="outline" size="sm" className="flex-1">
            <Eye className="h-4 w-4 mr-2" />
            View
          </Button>
          <Button variant="outline" size="sm" className="flex-1">
            <Edit className="h-4 w-4 mr-2" />
            Edit
          </Button>
          <Button variant="outline" size="sm">
            <TrendingUp className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export default function AnimalsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedSpecies, setSelectedSpecies] = useState('all')
  const [selectedStatus, setSelectedStatus] = useState('all')
  const [showFilters, setShowFilters] = useState(false)

  // Filter animals based on search and filters
  const filteredAnimals = mockAnimals.filter(animal => {
    const matchesSearch = animal.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         animal.breed.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         animal.tagNumber.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesSpecies = selectedSpecies === 'all' || animal.species === selectedSpecies
    const matchesStatus = selectedStatus === 'all' || animal.status === selectedStatus
    
    return matchesSearch && matchesSpecies && matchesStatus
  })

  // Calculate summary stats
  const totalAnimals = filteredAnimals.length
  const totalValue = filteredAnimals.reduce((sum, animal) => sum + animal.acquisitionCost, 0)
  const totalExpenses = filteredAnimals.reduce((sum, animal) => sum + animal.totalExpenses, 0)
  const activeCount = filteredAnimals.filter(animal => animal.status === 'active').length

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Animal Management</h1>
            <p className="text-gray-600">
              Track and manage your livestock portfolio
            </p>
          </div>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add Animal
          </Button>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <PawPrint className="h-5 w-5 text-green-600" />
                <div>
                  <p className="text-sm text-gray-500">Total Animals</p>
                  <p className="text-xl font-bold">{totalAnimals}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <TrendingUp className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="text-sm text-gray-500">Active</p>
                  <p className="text-xl font-bold">{activeCount}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <DollarSign className="h-5 w-5 text-yellow-600" />
                <div>
                  <p className="text-sm text-gray-500">Total Value</p>
                  <p className="text-xl font-bold">{formatCurrency(totalValue)}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Calendar className="h-5 w-5 text-red-600" />
                <div>
                  <p className="text-sm text-gray-500">Expenses</p>
                  <p className="text-xl font-bold">{formatCurrency(totalExpenses)}</p>
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
              placeholder="Search animals by name, breed, or tag..."
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
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Species
                  </label>
                  <select
                    value={selectedSpecies}
                    onChange={(e) => setSelectedSpecies(e.target.value)}
                    className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    {speciesOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Status
                  </label>
                  <select
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                    className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    {statusOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Animals Grid */}
        {filteredAnimals.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAnimals.map((animal) => (
              <AnimalCard key={animal.id} animal={animal} />
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="text-center py-12">
              <PawPrint className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No animals found</h3>
              <p className="text-gray-600 mb-6">
                {searchTerm || selectedSpecies !== 'all' || selectedStatus !== 'all'
                  ? "Try adjusting your search or filters"
                  : "Get started by adding your first animal"}
              </p>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Animal
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </AppLayout>
  )
}
'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { 
  DollarSign, 
  Plus,
  Search,
  Filter,
  Calendar,
  Receipt,
  TrendingUp,
  TrendingDown,
  Edit,
  Trash2,
  Download
} from 'lucide-react'
import { AppLayout } from '@/components/layout/navigation'
import { formatCurrency, formatDate } from '@/lib/utils'

// Mock data for expenses
const mockExpenses = [
  {
    id: '1',
    date: '2024-01-15',
    category: 'feed',
    description: 'Corn feed for cattle - 50 bags',
    amount: 275.00,
    vendor: 'County Feed Supply',
    receipt: null,
    animalsRelated: ['Bella'],
    createdAt: '2024-01-15T10:30:00Z'
  },
  {
    id: '2',
    date: '2024-01-14',
    category: 'medical',
    description: 'Vaccination shots for sheep',
    amount: 85.50,
    vendor: 'Rural Vet Clinic',
    receipt: 'receipt-123.jpg',
    animalsRelated: ['Dolly'],
    createdAt: '2024-01-14T14:15:00Z'
  },
  {
    id: '3',
    date: '2024-01-12',
    category: 'equipment',
    description: 'Water trough repair parts',
    amount: 45.25,
    vendor: 'Farm Supply Store',
    receipt: null,
    animalsRelated: ['Bella', 'Wilbur'],
    createdAt: '2024-01-12T16:45:00Z'
  },
  {
    id: '4',
    date: '2024-01-10',
    category: 'show',
    description: 'County fair entry fees',
    amount: 125.00,
    vendor: 'County Fair Association',
    receipt: 'receipt-456.pdf',
    animalsRelated: ['Bella'],
    createdAt: '2024-01-10T09:20:00Z'
  },
  {
    id: '5',
    date: '2024-01-08',
    category: 'feed',
    description: 'Pig feed supplement',
    amount: 65.75,
    vendor: 'AgriNutrition Co.',
    receipt: null,
    animalsRelated: ['Wilbur'],
    createdAt: '2024-01-08T11:10:00Z'
  }
]

const categoryOptions = [
  { value: 'all', label: 'All Categories' },
  { value: 'feed', label: 'Feed' },
  { value: 'medical', label: 'Medical' },
  { value: 'equipment', label: 'Equipment' },
  { value: 'show', label: 'Show' },
  { value: 'other', label: 'Other' }
]

function ExpenseCard({ expense }: { expense: any }) {
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'feed': return '🌾'
      case 'medical': return '💊'
      case 'equipment': return '🔧'
      case 'show': return '🏆'
      case 'other': return '📋'
      default: return '💰'
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'feed': return 'success'
      case 'medical': return 'error'
      case 'equipment': return 'info'
      case 'show': return 'warning'
      default: return 'secondary'
    }
  }

  return (
    <Card className="hover:shadow-md transition-shadow duration-200">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <div className="text-2xl">{getCategoryIcon(expense.category)}</div>
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-1">
                <CardTitle className="text-lg">{expense.description}</CardTitle>
              </div>
              <div className="flex items-center space-x-4 text-sm text-gray-500">
                <div className="flex items-center space-x-1">
                  <Calendar className="h-3 w-3" />
                  <span>{formatDate(expense.date)}</span>
                </div>
                {expense.vendor && (
                  <span>• {expense.vendor}</span>
                )}
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Badge variant={getCategoryColor(expense.category) as any}>
              {expense.category}
            </Badge>
            <div className="flex space-x-1">
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Edit className="h-3 w-3" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Trash2 className="h-3 w-3" />
              </Button>
            </div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Amount */}
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-gray-900">
            {formatCurrency(expense.amount)}
          </span>
          {expense.receipt && (
            <div className="flex items-center space-x-1 text-sm text-green-600">
              <Receipt className="h-4 w-4" />
              <span>Receipt available</span>
            </div>
          )}
        </div>

        {/* Animals Related */}
        {expense.animalsRelated.length > 0 && (
          <div>
            <p className="text-xs font-medium text-gray-500 mb-2">Animals</p>
            <div className="flex flex-wrap gap-1">
              {expense.animalsRelated.map((animal: string) => (
                <Badge key={animal} variant="secondary" className="text-xs">
                  {animal}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Receipt and Actions */}
        <div className="flex justify-between items-center pt-2 border-t">
          <div className="text-xs text-gray-500">
            Added {formatDate(expense.createdAt)}
          </div>
          {expense.receipt && (
            <Button variant="outline" size="sm">
              <Receipt className="h-3 w-3 mr-2" />
              View Receipt
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

export default function ExpensesPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedDateRange, setSelectedDateRange] = useState('all')
  const [showFilters, setShowFilters] = useState(false)

  // Filter expenses
  const filteredExpenses = mockExpenses.filter(expense => {
    const matchesSearch = expense.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         expense.vendor?.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesCategory = selectedCategory === 'all' || expense.category === selectedCategory
    
    return matchesSearch && matchesCategory
  })

  // Calculate summary stats
  const totalExpenses = filteredExpenses.reduce((sum, expense) => sum + expense.amount, 0)
  const thisMonthExpenses = filteredExpenses.filter(expense => {
    const expenseDate = new Date(expense.date)
    const now = new Date()
    return expenseDate.getMonth() === now.getMonth() && 
           expenseDate.getFullYear() === now.getFullYear()
  }).reduce((sum, expense) => sum + expense.amount, 0)

  const lastMonthExpenses = 450.75 // Mock data for comparison
  const expenseChange = ((thisMonthExpenses - lastMonthExpenses) / lastMonthExpenses) * 100

  // Category breakdown
  const categoryTotals = filteredExpenses.reduce((acc, expense) => {
    acc[expense.category] = (acc[expense.category] || 0) + expense.amount
    return acc
  }, {} as Record<string, number>)

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Expense Tracking</h1>
            <p className="text-gray-600">
              Monitor and manage your livestock project expenses
            </p>
          </div>
          <div className="flex space-x-3">
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export Report
            </Button>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Expense
            </Button>
          </div>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <DollarSign className="h-5 w-5 text-green-600" />
                <div>
                  <p className="text-sm text-gray-500">Total Expenses</p>
                  <p className="text-xl font-bold">{formatCurrency(totalExpenses)}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Calendar className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="text-sm text-gray-500">This Month</p>
                  <p className="text-xl font-bold">{formatCurrency(thisMonthExpenses)}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                {expenseChange >= 0 ? (
                  <TrendingUp className="h-5 w-5 text-red-600" />
                ) : (
                  <TrendingDown className="h-5 w-5 text-green-600" />
                )}
                <div>
                  <p className="text-sm text-gray-500">Change</p>
                  <p className={`text-xl font-bold ${expenseChange >= 0 ? 'text-red-600' : 'text-green-600'}`}>
                    {expenseChange >= 0 ? '+' : ''}{expenseChange.toFixed(1)}%
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Receipt className="h-5 w-5 text-purple-600" />
                <div>
                  <p className="text-sm text-gray-500">Receipts</p>
                  <p className="text-xl font-bold">
                    {filteredExpenses.filter(e => e.receipt).length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Category Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle>Expense Breakdown by Category</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {Object.entries(categoryTotals).map(([category, total]) => (
                <div key={category} className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl mb-2">
                    {category === 'feed' && '🌾'}
                    {category === 'medical' && '💊'}
                    {category === 'equipment' && '🔧'}
                    {category === 'show' && '🏆'}
                    {category === 'other' && '📋'}
                  </div>
                  <p className="text-sm text-gray-600 capitalize">{category}</p>
                  <p className="text-lg font-bold">{formatCurrency(total)}</p>
                  <p className="text-xs text-gray-500">
                    {((total / totalExpenses) * 100).toFixed(1)}%
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search expenses by description or vendor..."
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
                    Category
                  </label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    {categoryOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
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
                      setSelectedCategory('all')
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

        {/* Expenses List */}
        {filteredExpenses.length > 0 ? (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-900">
              Recent Expenses ({filteredExpenses.length})
            </h2>
            <div className="space-y-4">
              {filteredExpenses.map((expense) => (
                <ExpenseCard key={expense.id} expense={expense} />
              ))}
            </div>
          </div>
        ) : (
          <Card>
            <CardContent className="text-center py-12">
              <DollarSign className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No expenses found</h3>
              <p className="text-gray-600 mb-6">
                {searchTerm || selectedCategory !== 'all'
                  ? "Try adjusting your search or filters"
                  : "Start tracking your livestock project expenses"}
              </p>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Your First Expense
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </AppLayout>
  )
}
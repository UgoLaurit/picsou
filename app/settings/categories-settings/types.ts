import { TransactionType } from '@prisma/client'

export interface Category {
  id: string
  name: string
  type: TransactionType
  subcategories: Subcategory[]
  createdAt: Date
  updatedAt: Date
}

export interface Subcategory {
  id: string
  name: string
  categoryId: string
  category: Category
  goals: SubcategoryGoal[]
  createdAt: Date
  updatedAt: Date
}

export interface SubcategoryGoal {
  id: string
  subcategoryId: string
  amount: number
  type: 'required' | 'wanted'
  startDate: Date
  endDate?: Date | null
  isRecurring: boolean
  recurrenceInterval?: string | null
  createdAt: Date
  updatedAt: Date
}

export interface CategoryFormData {
  name: string
  type: TransactionType
}

export interface SubcategoryFormData {
  name: string
  categoryId: string
}

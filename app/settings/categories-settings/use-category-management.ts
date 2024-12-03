import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

import {
  Category,
  CategoryFormData,
  Subcategory,
  SubcategoryFormData,
} from './types'

export const useCategoryManagement = () => {
  const router = useRouter()
  const [categories, setCategories] = useState<Category[]>([])
  const [selectedCategory, setSelectedCategory] = useState<
    Category | undefined
  >()
  const [selectedSubcategory, setSelectedSubcategory] = useState<
    Subcategory | undefined
  >()
  const [formMode, setFormMode] = useState<'category' | 'subcategory'>(
    'category'
  )
  const [isFormOpen, setIsFormOpen] = useState(false)

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('/api/categories')
        const data = await response.json()
        setCategories(data)
      } catch (error) {
        console.error('Failed to fetch categories:', error)
      }
    }
    fetchCategories()
  }, [])

  const handleOpenNewCategory = () => {
    setSelectedCategory(undefined)
    setSelectedSubcategory(undefined)
    setFormMode('category')
    setIsFormOpen(true)
  }

  const handleOpenNewSubcategory = (categoryId: string) => {
    const category = categories.find((c) => c.id === categoryId)
    setSelectedCategory(category)
    setSelectedSubcategory(undefined)
    setFormMode('subcategory')
    setIsFormOpen(true)
  }

  const handleEditCategory = (category: Category) => {
    setSelectedCategory(category)
    setSelectedSubcategory(undefined)
    setFormMode('category')
    setIsFormOpen(true)
  }

  const handleEditSubcategory = (subcategory: Subcategory) => {
    const category = categories.find((c) => c.id === subcategory.categoryId)
    setSelectedCategory(category)
    setSelectedSubcategory(subcategory)
    setFormMode('subcategory')
    setIsFormOpen(true)
  }

  const handleCloseForm = () => {
    setSelectedCategory(undefined)
    setSelectedSubcategory(undefined)
    setIsFormOpen(false)
  }

  const handleSubmit = async (data: CategoryFormData | SubcategoryFormData) => {
    try {
      if (formMode === 'category') {
        const categoryData = data as CategoryFormData
        if (selectedCategory) {
          await fetch(`/api/categories/${selectedCategory.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(categoryData),
          })
        } else {
          await fetch('/api/categories', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              ...categoryData,
              userId: '9c52d370-0851-4494-9f8b-63fdf67d3572', // TODO: Get from auth session
            }),
          })
        }
      } else {
        if (selectedSubcategory) {
          await fetch(`/api/subcategories/${selectedSubcategory.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
          })
        } else if (selectedCategory) {
          await fetch('/api/subcategories', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              name: data.name,
              categoryId: selectedCategory.id,
              userId: '9c52d370-0851-4494-9f8b-63fdf67d3572', // TODO: Get from auth session
            }),
          })
        }
      }

      // Fetch updated categories after successful submission
      const response = await fetch('/api/categories')
      const updatedCategories = await response.json()
      setCategories(updatedCategories)

      handleCloseForm()
    } catch (error) {
      console.error('Failed to save:', error)
    }
  }

  const handleDeleteCategory = async (id: string) => {
    try {
      await fetch(`/api/categories/${id}`, { method: 'DELETE' })
      // Fetch updated categories after successful deletion
      const response = await fetch('/api/categories')
      const updatedCategories = await response.json()
      setCategories(updatedCategories)
    } catch (error) {
      console.error('Failed to delete category:', error)
    }
  }

  const handleDeleteSubcategory = async (id: string) => {
    try {
      await fetch(`/api/subcategories/${id}`, { method: 'DELETE' })
      // Fetch updated categories after successful deletion
      const response = await fetch('/api/categories')
      const updatedCategories = await response.json()
      setCategories(updatedCategories)
    } catch (error) {
      console.error('Failed to delete subcategory:', error)
    }
  }

  return {
    categories,
    selectedCategory,
    selectedSubcategory,
    formMode,
    isFormOpen,
    handleOpenNewCategory,
    handleOpenNewSubcategory,
    handleEditCategory,
    handleEditSubcategory,
    handleDeleteCategory,
    handleDeleteSubcategory,
    handleCloseForm,
    handleSubmit,
  }
}

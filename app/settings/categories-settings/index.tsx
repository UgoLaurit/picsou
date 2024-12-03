'use client'

import { Button } from '@/components/ui/button'
import { PageTitle } from '@/components/ui/page-title'
import { Plus } from 'lucide-react'
import { CategoryTable } from './category-table'
import { CategoryForm } from './category-form'
import { useCategoryManagement } from './use-category-management'

export default function CategoriesSettings() {
  const {
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
  } = useCategoryManagement()

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-8 gap-12">
        <PageTitle title="Categories" />
        <Button onClick={handleOpenNewCategory}>
          <Plus className="mr-2 h-4 w-4" />
          New Category
        </Button>
      </div>

      <div className="bg-card rounded-lg border shadow">
        <CategoryTable
          categories={categories}
          onEditCategory={handleEditCategory}
          onDeleteCategory={handleDeleteCategory}
          onAddSubcategory={handleOpenNewSubcategory}
          onEditSubcategory={handleEditSubcategory}
          onDeleteSubcategory={handleDeleteSubcategory}
        />
      </div>

      <CategoryForm
        open={isFormOpen}
        onClose={handleCloseForm}
        onSubmit={handleSubmit}
        category={selectedCategory}
        subcategory={selectedSubcategory}
        mode={formMode}
      />
    </div>
  )
}

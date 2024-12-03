'use client'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Category,
  CategoryFormData,
  Subcategory,
  SubcategoryFormData,
} from './types'
import { useForm } from 'react-hook-form'
import { TransactionType } from '@prisma/client'

interface CategoryFormProps {
  open: boolean
  onClose: () => void
  onSubmit: (data: CategoryFormData | SubcategoryFormData) => Promise<void>
  category?: Category
  subcategory?: Subcategory
  mode: 'category' | 'subcategory'
}

export const CategoryForm = ({
  open,
  onClose,
  onSubmit,
  category,
  subcategory,
  mode,
}: CategoryFormProps) => {
  const { register, handleSubmit, watch, setValue, reset } = useForm<
    CategoryFormData | SubcategoryFormData
  >({
    defaultValues:
      mode === 'category'
        ? {
            name: category?.name || '',
            type: category?.type || TransactionType.expense,
          }
        : {
            name: subcategory?.name || '',
            categoryId: category?.id || '',
          },
  })

  const handleClose = () => {
    reset()
    onClose()
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {mode === 'category'
              ? category
                ? 'Edit Category'
                : 'New Category'
              : subcategory
              ? 'Edit Subcategory'
              : `New Subcategory in ${category?.name}`}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" {...register('name', { required: true })} />
          </div>
          {mode === 'category' && (
            <div className="space-y-2">
              <Label htmlFor="type">Type</Label>
              <Select
                value={watch('type')}
                onValueChange={(value) =>
                  setValue('type', value as TransactionType)
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={TransactionType.income}>Income</SelectItem>
                  <SelectItem value={TransactionType.expense}>
                    Expense
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}
          <DialogFooter>
            <Button type="submit">Save</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

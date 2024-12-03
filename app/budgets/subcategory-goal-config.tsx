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
import { SubcategoryGoal } from '@prisma/client'
import { useForm } from 'react-hook-form'

interface SubcategoryGoalConfigProps {
  open: boolean
  onClose: () => void
  goal?: SubcategoryGoal | null
}

interface FormData {
  amount: number
  type: 'required' | 'wanted'
  isRecurring: boolean
  recurrenceInterval?: string
}

export const SubcategoryGoalConfig = ({
  open,
  onClose,
  goal,
}: SubcategoryGoalConfigProps) => {
  const { register, handleSubmit, watch, setValue } = useForm<FormData>({
    defaultValues: {
      amount: goal?.amount || 0,
      type: goal?.type || 'wanted',
      isRecurring: goal?.isRecurring || false,
      recurrenceInterval: goal?.recurrenceInterval,
    },
  })

  const onSubmit = async (data: FormData) => {
    try {
      if (goal) {
        await fetch(`/api/subcategory-goals/${goal.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        })
      } else {
        await fetch('/api/subcategory-goals', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        })
      }
      onClose()
    } catch (error) {
      console.error('Failed to save goal:', error)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {goal ? 'Edit Budget Goal' : 'New Budget Goal'}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="amount">Amount</Label>
            <Input
              id="amount"
              type="number"
              step="0.01"
              {...register('amount', { valueAsNumber: true })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="type">Type</Label>
            <Select
              value={watch('type')}
              onValueChange={(value) =>
                setValue('type', value as 'required' | 'wanted')
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="required">Required</SelectItem>
                <SelectItem value="wanted">Wanted</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="isRecurring">Recurring</Label>
            <Select
              value={watch('isRecurring').toString()}
              onValueChange={(value) =>
                setValue('isRecurring', value === 'true')
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="true">Yes</SelectItem>
                <SelectItem value="false">No</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {watch('isRecurring') && (
            <div className="space-y-2">
              <Label htmlFor="recurrenceInterval">Interval</Label>
              <Select
                value={watch('recurrenceInterval')}
                onValueChange={(value) => setValue('recurrenceInterval', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select interval" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="yearly">Yearly</SelectItem>
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

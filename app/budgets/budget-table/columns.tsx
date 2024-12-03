'use client'

import { ColumnDef } from '@tanstack/react-table'
import { ChevronRight, ChevronDown, AlertCircle, Target } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { cn } from '@/lib/utils'
import { AmountCell } from './amount-cell'

export type GoalType = 'required' | 'wanted'

export type Payment = {
  id: string
  category: string
  bucket?: string
  amount: number
  goal?: {
    amount: number
    type: GoalType
  }
  subRows?: Payment[]
}

export const columns: ColumnDef<Payment>[] = [
  {
    id: 'expander',
    header: () => null,
    size: 40,
    cell: ({ row }) => {
      return row.getCanExpand() ? (
        <Button
          variant="ghost"
          className="p-0 h-auto w-6"
          onClick={row.getToggleExpandedHandler()}
        >
          {row.getIsExpanded() ? (
            <ChevronDown className="h-4 w-4" />
          ) : (
            <ChevronRight className="h-4 w-4" />
          )}
        </Button>
      ) : null
    },
  },
  {
    accessorKey: 'category',
    header: 'Category',
    cell: ({ row }) => {
      return row.original.bucket ? (
        <span className="text-muted-foreground">{row.original.bucket}</span>
      ) : (
        <span className="font-medium">{row.original.category}</span>
      )
    },
  },
  {
    id: 'progress',
    header: 'Progress',
    size: 300,
    cell: ({ row }) => {
      if (!row.original.goal) return null

      const goalAmount = row.original.goal.amount
      const currentAmount = row.original.amount
      const progress = (currentAmount / goalAmount) * 100
      const remaining = goalAmount - currentAmount
      const isComplete = progress >= 100
      const isRequired = row.original.goal.type === 'required'

      const formattedRemaining = new Intl.NumberFormat('fr-FR', {
        style: 'currency',
        currency: 'EUR',
      }).format(remaining)

      return (
        <div className="flex items-center gap-2">
          <div className="w-32">
            <Progress
              value={progress}
              className={cn(
                isComplete && 'bg-emerald-100 [&>div]:bg-emerald-600',
                !isComplete &&
                  isRequired &&
                  'bg-destructive/20 [&>div]:bg-destructive',
                !isComplete &&
                  !isRequired &&
                  'bg-yellow-500/20 [&>div]:bg-yellow-500',
                '[&>div]:transition-all'
              )}
            />
          </div>
          <div
            className={cn(
              'text-xs whitespace-nowrap',
              isComplete && 'text-emerald-600',
              !isComplete && isRequired && 'text-destructive',
              !isComplete && !isRequired && 'text-yellow-500'
            )}
          >
            {isComplete
              ? 'Goal completed'
              : `${formattedRemaining} remaining this month`}
          </div>
        </div>
      )
    },
  },
  {
    accessorKey: 'goal',
    header: () => <div className="text-right">Goal</div>,
    cell: ({ row }) => {
      if (!row.original.goal) return null
      const formatted = new Intl.NumberFormat('fr-FR', {
        style: 'currency',
        currency: 'EUR',
      }).format(row.original.goal.amount)

      const isRequired = row.original.goal.type === 'required'
      const Icon = isRequired ? AlertCircle : Target

      return (
        <div className="flex items-center justify-end gap-2">
          <Icon
            className={cn(
              'h-4 w-4',
              isRequired ? 'text-destructive' : 'text-yellow-500'
            )}
          />
          <div
            className={cn(
              'text-right',
              row.original.bucket ? 'text-muted-foreground' : 'font-medium'
            )}
          >
            {formatted}
          </div>
        </div>
      )
    },
  },
  {
    accessorKey: 'amount',
    header: () => <div className="text-right">Amount</div>,
    cell: ({ row, table }) => {
      const amount = parseFloat(row.getValue('amount'))
      return (
        <AmountCell
          value={amount}
          row={row}
          onAmountChange={(id, newAmount) => {
            const updateAmount = (table.options.meta as TableMetaType)
              ?.updateAmount
            updateAmount?.(id, newAmount)
          }}
        />
      )
    },
  },
]

interface TableMetaType {
  updateAmount?: (id: string, newAmount: number) => void
}

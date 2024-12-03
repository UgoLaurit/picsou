'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Payment } from './budget-table/columns'
import { cn } from '@/lib/utils'
import { Separator } from '@/components/ui/separator'
import { Progress } from '@/components/ui/progress'

interface BudgetSummaryProps {
  data: Payment[]
}

interface CategorySummary {
  total: number
  budgeted: number
  progress: number
  hasGoals: boolean
}

export const BudgetSummary = ({ data }: BudgetSummaryProps) => {
  const calculateCategorySummary = (category: string): CategorySummary => {
    const items = data.filter((item) => item.category === category)
    const hasGoals = items.some(
      (item) => item?.goal?.amount && item.goal.amount > 0
    )
    const total = items.reduce((sum, item) => {
      const goalAmount = item.goal?.amount || 0
      return sum + goalAmount
    }, 0)
    const budgeted = items.reduce((sum, item) => sum + item.amount, 0)
    const progress = hasGoals ? (total > 0 ? (budgeted / total) * 100 : 0) : 100

    return {
      total,
      budgeted,
      progress,
      hasGoals,
    }
  }

  const incomes = calculateCategorySummary('Incomes')
  const expenses = calculateCategorySummary('Expenses')
  const remaining = incomes.budgeted - expenses.budgeted

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
    }).format(amount)
  }

  const CategoryProgress = ({
    label,
    summary,
  }: {
    label: string
    summary: CategorySummary
  }) => (
    <div className="flex flex-col gap-2 p-4">
      <div className="flex flex-row justify-between text-sm">
        <span className="font-medium">{label}</span>
        <div>
          <span className="text-muted-foreground">
            {`${formatCurrency(summary.budgeted)} `}
          </span>
          {summary.hasGoals && (
            <>
              <span className="text-muted-foreground">/ </span>
              <span>{formatCurrency(summary.total)}</span>
            </>
          )}
        </div>
      </div>
      <Progress
        value={summary.progress}
        className={cn(
          summary.progress >= 100
            ? 'bg-emerald-100 [&>div]:bg-emerald-600'
            : 'bg-blue-100 [&>div]:bg-blue-600'
        )}
      />
    </div>
  )

  return (
    <Card className="w-[400px]">
      <Card
        className={cn(
          'm-4 shadow-none border-none',
          remaining >= 0 ? 'bg-emerald-50' : 'bg-red-50'
        )}
      >
        <div
          className={cn(
            'flex flex-col items-center justify-center p-4',
            remaining >= 0 ? 'text-emerald-600' : 'text-red-600'
          )}
        >
          <span className="text-2xl font-bold">
            {formatCurrency(remaining)}
          </span>
          <span className="text-sm font-medium">Left to budget</span>
        </div>
      </Card>

      <Separator />
      <CategoryProgress label="Incomes" summary={incomes} />
      <Separator />
      <CategoryProgress label="Expenses" summary={expenses} />
    </Card>
  )
}

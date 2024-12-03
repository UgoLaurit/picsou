'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { cn } from '@/lib/utils'
import { SubcategoryGoal } from '@prisma/client'

interface BudgetSummaryProps {
  goals: SubcategoryGoal[]
}

export const BudgetSummary = ({ goals }: BudgetSummaryProps) => {
  const totalRequired = goals
    .filter((goal) => goal.type === 'required')
    .reduce((sum, goal) => sum + Number(goal.amount), 0)

  const totalWanted = goals
    .filter((goal) => goal.type === 'wanted')
    .reduce((sum, goal) => sum + Number(goal.amount), 0)

  const totalGoals = totalRequired + totalWanted
  const requiredPercentage = (totalRequired / totalGoals) * 100
  const wantedPercentage = (totalWanted / totalGoals) * 100

  const formatAmount = (amount: number) =>
    new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
    }).format(amount)

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Budget</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{formatAmount(totalGoals)}</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Required</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {formatAmount(totalRequired)}
          </div>
          <Progress
            value={requiredPercentage}
            className="mt-2 bg-destructive/20 [&>div]:bg-destructive"
          />
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Wanted</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{formatAmount(totalWanted)}</div>
          <Progress
            value={wantedPercentage}
            className="mt-2 bg-yellow-500/20 [&>div]:bg-yellow-500"
          />
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Goals</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{goals.length}</div>
          <div className="text-xs text-muted-foreground">
            {goals.filter((goal) => goal.type === 'required').length} required,{' '}
            {goals.filter((goal) => goal.type === 'wanted').length} wanted
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

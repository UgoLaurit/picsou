'use client'

import { Button } from '@/components/ui/button'
import { PageTitle } from '@/components/ui/page-title'
import { Plus } from 'lucide-react'
import { BudgetTable } from './budget-table/budget-table'
import { BudgetSummary } from './budget-summary'
import { SubcategoryGoalConfig } from './subcategory-goal-config'
import { useState, useEffect } from 'react'
import { SubcategoryGoal } from '@prisma/client'

export default function BudgetsPage() {
  const [goals, setGoals] = useState<SubcategoryGoal[]>([])
  const [selectedGoal, setSelectedGoal] = useState<SubcategoryGoal | null>(null)
  const [isConfigOpen, setIsConfigOpen] = useState(false)

  useEffect(() => {
    const fetchGoals = async () => {
      const response = await fetch('/api/subcategory-goals')
      const data = await response.json()
      setGoals(data)
    }
    fetchGoals()
  }, [])

  const handleOpenConfig = (goal?: SubcategoryGoal) => {
    setSelectedGoal(goal || null)
    setIsConfigOpen(true)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <PageTitle title="Budgets" />
        <Button onClick={() => handleOpenConfig()}>
          <Plus className="mr-2 h-4 w-4" />
          New Budget
        </Button>
      </div>

      <BudgetSummary goals={goals} />
      <BudgetTable goals={goals} onEdit={handleOpenConfig} />

      <SubcategoryGoalConfig
        open={isConfigOpen}
        onClose={() => setIsConfigOpen(false)}
        goal={selectedGoal}
      />
    </div>
  )
}

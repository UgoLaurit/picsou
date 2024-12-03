'use client'

import { DataTable } from './data-table'
import { columns } from './columns'
import { SubcategoryGoal } from '@prisma/client'

interface BudgetTableProps {
  goals: SubcategoryGoal[]
  onEdit: (goal: SubcategoryGoal) => void
}

export const BudgetTable = ({ goals, onEdit }: BudgetTableProps) => {
  return (
    <div className="rounded-md border">
      <DataTable columns={columns} data={goals} onEdit={onEdit} />
    </div>
  )
}

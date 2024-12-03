'use client'

import { columns } from './columns'
import { DataTable } from './data-table'
import type { Payment } from './columns'
import { Card } from '@/components/ui/card'

interface BudgetTableProps {
  data: Payment[]
  updateAmount: (id: string, newAmount: number) => void
  onSubcategorySelect: (id: string | null) => void
  selectedSubcategoryId: string | null
}

const BudgetTable = ({
  data,
  updateAmount,
  onSubcategorySelect,
  selectedSubcategoryId,
}: BudgetTableProps) => {
  return (
    <Card className="w-full">
      <DataTable
        columns={columns}
        data={data}
        updateAmount={updateAmount}
        onSubcategorySelect={onSubcategorySelect}
        selectedSubcategoryId={selectedSubcategoryId}
      />
    </Card>
  )
}

export default BudgetTable

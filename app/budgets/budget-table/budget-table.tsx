'use client'

import { columns } from './columns'
import { DataTable } from './data-table'
import type { Payment } from './columns'
import { Card } from '@/components/ui/card'

interface BudgetTableProps {
  data: Payment[]
  updateAmount: (id: string, newAmount: number) => void
  onBucketSelect: (id: string | null) => void
  selectedBucketId: string | null
}

const BudgetTable = ({
  data,
  updateAmount,
  onBucketSelect,
  selectedBucketId,
}: BudgetTableProps) => {
  return (
    <Card className="w-full">
      <DataTable
        columns={columns}
        data={data}
        updateAmount={updateAmount}
        onBucketSelect={onBucketSelect}
        selectedBucketId={selectedBucketId}
      />
    </Card>
  )
}

export default BudgetTable

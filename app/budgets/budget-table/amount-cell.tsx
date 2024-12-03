'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import type { Row } from '@tanstack/react-table'
import type { Payment } from './columns'

interface AmountCellProps {
  value: number
  row: Row<Payment>
  onAmountChange: (id: string, newAmount: number) => void
}

export const AmountCell = ({ value, row, onAmountChange }: AmountCellProps) => {
  const [isEditing, setIsEditing] = useState(false)
  const [amount, setAmount] = useState(value)
  const isBucketRow = Boolean(row.original.bucket)

  const formatted = new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
  }).format(amount)

  const handleBlur = () => {
    setIsEditing(false)
    if (amount !== value) {
      onAmountChange(row.original.id, amount)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleBlur()
    }
    if (e.key === 'Escape') {
      setAmount(value)
      setIsEditing(false)
    }
  }

  if (isEditing && isBucketRow) {
    return (
      <Input
        type="number"
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        className="h-7 w-28 ml-auto text-right"
        autoFocus
      />
    )
  }

  return (
    <div
      onClick={() => isBucketRow && setIsEditing(true)}
      className={cn(
        'text-right px-2 py-0.5 rounded',
        isBucketRow && 'cursor-pointer hover:bg-muted',
        row.original.bucket ? 'text-muted-foreground' : 'font-medium'
      )}
    >
      {formatted}
    </div>
  )
}

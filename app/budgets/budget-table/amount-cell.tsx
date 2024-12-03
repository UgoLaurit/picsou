'use client'

import { cn } from '@/lib/utils'

interface AmountCellProps {
  value: number
}

export const AmountCell = ({ value }: AmountCellProps) => {
  const formatted = new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
  }).format(value)

  return <div className="text-right font-medium">{formatted}</div>
}

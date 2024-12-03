'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Payment } from './budget-table/columns'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useState } from 'react'
import { X, AlertCircle, Target } from 'lucide-react'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'

interface BucketGoalConfigProps {
  bucket: Payment
  onUpdate: (id: string, amount: number, type: 'required' | 'wanted') => void
  onClose: () => void
}

export const BucketGoalConfig = ({
  bucket,
  onUpdate,
  onClose,
}: BucketGoalConfigProps) => {
  const [amount, setAmount] = useState(bucket.goal?.amount || 0)
  const [type, setType] = useState<'required' | 'wanted'>(
    bucket.goal?.type || 'wanted'
  )

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
    }).format(amount)
  }

  const handleSave = () => {
    onUpdate(bucket.id, amount, type)
    onClose()
  }

  const progress = amount > 0 ? (bucket.amount / amount) * 100 : 0
  const remaining = Math.max(0, amount - bucket.amount)

  return (
    <Card className="w-[400px]">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-base font-medium">
          Goal Configuration
        </CardTitle>
        <Button variant="ghost" className="h-auto p-0" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </CardHeader>

      <CardContent className="grid gap-4">
        <div>
          <div className="mb-4 flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Current amount:</span>
            <span className="font-medium">{formatCurrency(bucket.amount)}</span>
          </div>

          <div className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="amount">Target amount</Label>
              <Input
                id="amount"
                type="number"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="h-8"
              />
            </div>

            <div className="grid gap-2">
              <Label>Goal type</Label>
              <RadioGroup
                value={type}
                onValueChange={(value) =>
                  setType(value as 'required' | 'wanted')
                }
                className="flex gap-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="required" id="required" />
                  <Label
                    htmlFor="required"
                    className="flex items-center gap-1.5"
                  >
                    <AlertCircle className="h-4 w-4 text-destructive" />
                    Required
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="wanted" id="wanted" />
                  <Label htmlFor="wanted" className="flex items-center gap-1.5">
                    <Target className="h-4 w-4 text-yellow-500" />
                    Target
                  </Label>
                </div>
              </RadioGroup>
            </div>
          </div>
        </div>

        <Card
          className={cn(
            'shadow-none border-none',
            type === 'required' ? 'bg-red-50' : 'bg-yellow-50'
          )}
        >
          <div className="p-3">
            <div className="flex justify-between text-sm">
              <span
                className={cn(
                  'font-medium',
                  type === 'required' ? 'text-red-600' : 'text-yellow-600'
                )}
              >
                {remaining > 0
                  ? `${formatCurrency(remaining)} remaining`
                  : 'Goal completed'}
              </span>
              <span className="text-muted-foreground">
                {Math.round(progress)}% funded
              </span>
            </div>
          </div>
        </Card>

        <div className="flex justify-end">
          <Button size="sm" onClick={handleSave} className="px-8">
            Save
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

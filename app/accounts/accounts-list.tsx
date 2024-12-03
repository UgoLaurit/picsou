'use client'

import { useState } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

type Account = {
  id: string
  name: string
  type: 'checking' | 'savings' | 'loan' | 'investment'
  bank: string
  balance: number
}

const mockAccounts: Account[] = [
  {
    id: '1',
    name: 'Main Checking',
    type: 'checking',
    bank: 'Bank A',
    balance: 2500,
  },
  { id: '2', name: 'Savings', type: 'savings', bank: 'Bank A', balance: 10000 },
  {
    id: '3',
    name: 'Credit Card',
    type: 'loan',
    bank: 'Bank B',
    balance: -1500,
  },
  {
    id: '4',
    name: 'Investment Portfolio',
    type: 'investment',
    bank: 'Bank C',
    balance: 50000,
  },
  {
    id: '5',
    name: 'Secondary Checking',
    type: 'checking',
    bank: 'Bank B',
    balance: 1000,
  },
]

export const AccountsList = () => {
  const [accounts] = useState<Account[]>(mockAccounts)

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {accounts.map((account) => (
        <Card key={account.id}>
          <CardHeader>
            <CardTitle>{account.name}</CardTitle>
            <CardDescription>{account.bank}</CardDescription>
          </CardHeader>
          <CardContent>
            <p
              className={`text-2xl font-semibold ${
                account.balance < 0 ? 'text-red-500' : 'text-green-500'
              }`}
            >
              {new Intl.NumberFormat('fr-FR', {
                style: 'currency',
                currency: 'EUR',
              }).format(account.balance)}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

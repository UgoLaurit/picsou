'use client'

import { PageTitle } from '@/components/ui/page-title'
import BudgetTable from './budget-table/budget-table'
import { BudgetSummary } from './budget-summary'
import { SubcategoryGoalConfig } from './subcategory-goal-config'
import { useState } from 'react'
import type { Payment } from './budget-table/columns'

const initialData = [
  {
    id: '1',
    category: 'Incomes',
    amount: 1000,
    subRows: [
      {
        id: '1-1',
        category: 'Incomes',
        subcategory: 'Salary',
        amount: 1000,
      },
    ],
  },
  {
    id: '2',
    category: 'Expenses',
    amount: 300,
    goal: {
      amount: 500,
      type: 'required' as const,
    },
    subRows: [
      {
        id: '2-1',
        category: 'Expenses',
        subcategory: 'Food',
        amount: 100,
        goal: {
          amount: 200,
          type: 'wanted' as const,
        },
      },
      {
        id: '2-2',
        category: 'Expenses',
        subcategory: 'Auto',
        amount: 200,
        goal: {
          amount: 300,
          type: 'required' as const,
        },
      },
    ],
  },
]

const BudgetPage = () => {
  const [data, setData] = useState<Payment[]>(initialData)
  const [selectedSubcategoryId, setSelectedSubcategoryId] = useState<
    string | null
  >(null)

  const updateAmount = (id: string, newAmount: number) => {
    setData((prevData) => {
      const updateRow = (rows: Payment[]): Payment[] => {
        return rows.map((row) => {
          if (row.id === id) {
            return { ...row, amount: newAmount }
          }
          if (row.subRows) {
            return {
              ...row,
              subRows: updateRow(row.subRows),
              amount:
                row.id === id.split('-')[0]
                  ? row.subRows.reduce(
                      (sum, subRow) =>
                        subRow.id === id
                          ? sum + newAmount
                          : sum + subRow.amount,
                      0
                    )
                  : row.amount,
            }
          }
          return row
        })
      }
      return updateRow(prevData)
    })
  }

  const updateGoal = (
    id: string,
    amount: number,
    type: 'required' | 'wanted'
  ) => {
    setData((prevData) => {
      const updateRow = (rows: Payment[]): Payment[] => {
        return rows.map((row) => {
          if (row.id === id) {
            return {
              ...row,
              goal: { amount, type },
            }
          }
          if (row.subRows) {
            return {
              ...row,
              subRows: updateRow(row.subRows),
            }
          }
          return row
        })
      }
      return updateRow(prevData)
    })
  }

  const selectedSubcategory = selectedSubcategoryId
    ? data
        .flatMap((category) => category.subRows || [])
        .find((subcategory) => subcategory.id === selectedSubcategoryId)
    : null

  return (
    <div className="container flex flex-col mx-auto gap-6">
      <PageTitle title="Budgets" />
      <div className="flex items-start gap-6">
        <BudgetTable
          data={data}
          updateAmount={updateAmount}
          onSubcategorySelect={setSelectedSubcategoryId}
          selectedSubcategoryId={selectedSubcategoryId}
        />
        <div className="flex flex-col gap-4">
          <BudgetSummary data={data} />
          {selectedSubcategory && (
            <SubcategoryGoalConfig
              subcategory={selectedSubcategory}
              onUpdate={updateGoal}
              onClose={() => setSelectedSubcategoryId(null)}
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default BudgetPage

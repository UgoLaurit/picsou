'use client'

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getExpandedRowModel,
  ExpandedState,
  TableMeta,
} from '@tanstack/react-table'
import { useState } from 'react'
import { cn } from '@/lib/utils'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Payment } from './columns'

interface TableMetaType extends TableMeta<Payment> {
  updateAmount?: (id: string, newAmount: number) => void
}

interface DataTableProps {
  columns: ColumnDef<Payment>[]
  data: Payment[]
  updateAmount?: (id: string, newAmount: number) => void
  onSubcategorySelect: (id: string | null) => void
  selectedSubcategoryId: string | null
}

export function DataTable({
  columns,
  data,
  updateAmount,
  onSubcategorySelect,
  selectedSubcategoryId,
}: DataTableProps) {
  const [expanded, setExpanded] = useState<ExpandedState>({})

  const table = useReactTable<Payment>({
    data,
    columns,
    state: {
      expanded,
    },
    meta: {
      updateAmount,
    } as TableMetaType,
    onExpandedChange: setExpanded,
    getSubRows: (row) => row.subRows,
    getCoreRowModel: getCoreRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    getRowCanExpand: (row) => Boolean(row.original.subRows?.length),
    enableExpanding: true,
  })

  const handleRowClick = (row: Payment) => {
    if (row.subcategory) {
      onSubcategorySelect(selectedSubcategoryId === row.id ? null : row.id)
    }
  }

  return (
    <div className="w-full rounded-md border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                )
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            <>
              {table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                  className={cn(
                    row.depth > 0 ? 'bg-muted/50' : undefined,
                    row.original.subcategory &&
                      'cursor-pointer hover:bg-muted/80',
                    selectedSubcategoryId === row.original.id && 'bg-muted'
                  )}
                  onClick={() => handleRowClick(row.original)}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </>
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}

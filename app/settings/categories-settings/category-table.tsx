'use client'

import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Pencil, Plus, Trash2 } from 'lucide-react'
import { Category, Subcategory } from './types'
import { TransactionType } from '@prisma/client'

interface CategoryTableProps {
  categories: Category[]
  onEditCategory: (category: Category) => void
  onDeleteCategory: (id: string) => Promise<void>
  onAddSubcategory: (categoryId: string) => void
  onEditSubcategory: (subcategory: Subcategory) => void
  onDeleteSubcategory: (id: string) => Promise<void>
}

export const CategoryTable = ({
  categories,
  onEditCategory,
  onDeleteCategory,
  onAddSubcategory,
  onEditSubcategory,
  onDeleteSubcategory,
}: CategoryTableProps) => (
  <div className="w-full">
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[80%]">Name</TableHead>
          <TableHead className="w-[20%] text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {categories.map((category) => (
          <>
            <TableRow key={category.id} className="bg-muted/50">
              <TableCell className="font-medium">
                <div className="flex items-center">
                  <Badge
                    variant={
                      category.type === TransactionType.income
                        ? 'success'
                        : 'warning'
                    }
                  >
                    {category.name}
                  </Badge>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex gap-2 justify-end">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onAddSubcategory(category.id)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onEditCategory(category)}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onDeleteCategory(category.id)}
                    disabled={category.subcategories.length > 0}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
            {category.subcategories.map((subcategory) => (
              <TableRow key={subcategory.id} className="text-muted-foreground">
                <TableCell className="pl-8">{subcategory.name}</TableCell>
                <TableCell>
                  <div className="flex gap-2 justify-end">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onEditSubcategory(subcategory)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onDeleteSubcategory(subcategory.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </>
        ))}
      </TableBody>
    </Table>
  </div>
)

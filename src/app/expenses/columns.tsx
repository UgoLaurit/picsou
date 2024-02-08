"use client";

import { type ColumnDef } from "@tanstack/react-table";
import { type Transaction } from "~/types/transaction";
import { FormattedValue } from "~/app/_components/format/formatted-value";
import { FormattedCategory } from "~/app/_components/format/formatted-category";

export const columns: ColumnDef<Transaction>[] = [
  {
    accessorKey: "subcategory",
    header: "Catégorie",
    cell: ({ row }) => {
      return (
        <FormattedCategory
          name={row.original.subcategory.name}
          color={row.original.subcategory.category.color}
        />
      );
    },
  },

  {
    accessorKey: "label",
    header: "Libellé",
    cell: ({ row }) => {
      const label = row.original.label;
      return <div className="w-96 truncate">{label}</div>;
    },
  },

  {
    accessorKey: "value",
    header: () => <div className="text-right">Montant</div>,
    cell: ({ row }) => {
      const value = row.original.value;
      return <FormattedValue value={value} />;
    },
  },
];

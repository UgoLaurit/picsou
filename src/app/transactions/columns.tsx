"use client";

import { type ColumnDef } from "@tanstack/react-table";
import { type Transaction } from "~/types/transaction";
import { FormattedValue } from "~/app/_components/format/formatted-value";
import { FormattedCategory } from "~/app/_components/format/formatted-category";
import { MdOutlineClose } from "react-icons/md";
import { deleteTransaction } from "~/actions/transactions";

export const columns: ColumnDef<Transaction>[] = [
  {
    accessorKey: "bankAccount",
    header: "Compte",
    cell: ({ row }) => {
      const bankAccount = row.original.bankAccount;
      return bankAccount.bank.name + " - " + bankAccount.name;
    },
  },

  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => {
      const date = row.original.date;
      return date.toLocaleDateString("fr-FR");
    },
  },

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

  {
    accessorKey: "id",
    header: "",
    cell: ({ row }) => {
      const handleDelete = async () => {
        await deleteTransaction(row.original.id);
      };

      return (
        <div className="flex flex-row justify-end">
          <button onClick={handleDelete}>
            <MdOutlineClose className="mt-1" size={20} />
          </button>
        </div>
      );
    },
  },
];

"use client";

import { type ColumnDef } from "@tanstack/react-table";
import { FormattedValue } from "~/app/_components/format/formatted-value";
import { FormattedCategory } from "~/app/_components/format/formatted-category";
import { MdOutlineClose } from "react-icons/md";
import { deleteTransaction } from "~/actions/transaction";
import { toast } from "sonner";
import { type ScheduledTransaction } from "~/types/scheduled-transaction";
import { FREQUENCIES } from "~/assets/constants";

export const columns: ColumnDef<ScheduledTransaction>[] = [
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => {
      const date = row.original.date;
      return date.toLocaleDateString("fr-FR");
    },
  },

  {
    accessorKey: "frequency",
    header: "Fréquence",
    cell: ({ row }) => {
      const frequency = row.original.frequency;
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      return <div>{FREQUENCIES[frequency]}</div>;
    },
  },

  {
    accessorKey: "lastDate",
    header: "Échéance",
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
        const response = await deleteTransaction(row.original.id);
        if (response.id) {
          toast("Transaction supprimée");
        } else {
          toast("Une erreur est survenue");
        }
      };

      return (
        <div className="flex flex-row justify-end">
          <button onClick={handleDelete}>
            <MdOutlineClose className="mt-1" size={20} />
          </button>
          <button onClick={handleDelete}>
            <MdOutlineClose className="mt-1" size={20} />
          </button>
        </div>
      );
    },
  },
];

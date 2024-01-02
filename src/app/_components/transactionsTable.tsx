"use client";

import { Table } from "~/app/_components/table";
import { type CellContext, createColumnHelper } from "@tanstack/react-table";
import { type Decimal } from "@prisma/client/runtime/library";
import { type AllTransactions } from "~/types/transaction";

type TransactionsTableProps = {
  transactions: AllTransactions;
};

const TransactionsTable = ({ transactions }: TransactionsTableProps) => {
  const columnHelper = createColumnHelper<AllTransactions>();

  const columns = [
    columnHelper.accessor("bankAccount", {
      header: "Compte",
      cell: (
        info: CellContext<AllTransactions, AllTransactions["bankAccount"]>,
      ) => {
        const bankAccount = info.row.original.bankAccount;
        return bankAccount.bank.name + " - " + bankAccount.name;
      },
    }),

    columnHelper.accessor("date", {
      header: "Date",
      cell: (info: CellContext<AllTransactions, Date>) => {
        const date = info.row.original.date;
        return date.toLocaleDateString("fr-FR");
      },
    }),

    columnHelper.accessor("subcategory.name", {
      header: "Catégorie",
      cell: (info: CellContext<AllTransactions, string>) => info.renderValue(),
    }),

    columnHelper.accessor("label", {
      header: "Libellé",
      cell: (info: CellContext<AllTransactions, string>) => info.renderValue(),
    }),

    columnHelper.accessor("value", {
      header: "Montant",
      cell: (info: CellContext<AllTransactions, Decimal>) => info.renderValue(),
    }),

    // columnHelper.accessor("id", {
    //   header: "",
    //   cell: (info) => (
    //     <button onClick={() => removeLine(info.row.index)}>X</button>
    //   ),
    // }),
  ];

  return <Table columns={columns} data={transactions} />;
};

export default TransactionsTable;

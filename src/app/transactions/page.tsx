import { columns } from "./columns";
import { DataTable } from "~/app/_components/table/data-table";
import ImportTransactions from "~/app/transactions/import-transactions";
import { getAllTransactions } from "~/actions/transactions";

const TransactionsPage = async () => {
  const allTransactions = await getAllTransactions();

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-row gap-4 self-end">
        <ImportTransactions />
      </div>

      <DataTable columns={columns} data={allTransactions} />
    </div>
  );
};

export default TransactionsPage;

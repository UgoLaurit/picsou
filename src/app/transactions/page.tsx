import { columns } from "./columns";
import { DataTable } from "~/app/_components/table/data-table";
import ImportTransactions from "~/app/transactions/import-transactions";
import { Toaster } from "~/app/_components/ui/sonner";
import { getTransactionsByMonth } from "~/actions/transaction";

const TransactionsPage = async ({
  searchParams,
}: {
  searchParams?: { month?: number; year?: number };
}) => {
  const month = Number(searchParams?.month) || new Date().getMonth();
  const year = Number(searchParams?.year) || new Date().getFullYear();

  const transactions = await getTransactionsByMonth({ month, year });

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-row gap-4 self-end">
        <ImportTransactions />
      </div>

      {/*add loading state*/}
      <DataTable
        columns={columns}
        data={transactions}
        // isLoading={isLoading}
      />

      <Toaster />
    </div>
  );
};

export default TransactionsPage;

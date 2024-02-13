import ImportTransactions from "~/app/transactions/import-transactions";
import { Toaster } from "~/app/_components/ui/sonner";
import BankSelect from "~/app/_components/header/bank-select";
import { getBankAccounts } from "~/actions/bank-account";
import { getTransactionsByMonth } from "~/actions/transaction";
import { DataTable } from "~/app/_components/table/data-table";
import { columns } from "~/app/transactions/columns";

const TransactionsPage = async ({
  searchParams,
}: {
  searchParams?: {
    owner?: string;
    bankAccount?: string;
    month?: number;
    year?: number;
  };
}) => {
  const ownerId = searchParams?.owner;
  const bankAccountId = searchParams?.bankAccount;
  const month = Number(searchParams?.month) || new Date().getMonth();
  const year = Number(searchParams?.year) || new Date().getFullYear();

  const bankAccounts = await getBankAccounts({ ownerId });

  const transactions = await getTransactionsByMonth({
    bankAccountId,
    month,
    year,
  });

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-row justify-between">
        <BankSelect bankAccounts={bankAccounts} />
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

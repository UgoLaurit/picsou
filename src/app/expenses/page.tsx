import { DataTable } from "~/app/_components/table/data-table";
import { columns } from "~/app/expenses/columns";
import { getTransactionsByMonth } from "~/actions/transactions";

const ExpensesPage = async ({
  searchParams,
}: {
  searchParams?: { month?: number; year?: number };
}) => {
  const month = Number(searchParams?.month) || new Date().getMonth();
  const year = Number(searchParams?.year) || new Date().getFullYear();

  const transactions = await getTransactionsByMonth({ month, year });

  return <DataTable columns={columns} data={transactions} />;
};

export default ExpensesPage;

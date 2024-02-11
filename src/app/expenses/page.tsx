import { getTransactionsByMonth } from "~/actions/transaction";
import ExpensesChart from "~/app/_components/charts/expenses-chart";
import { getExpensesChartData, getIncomesChartData } from "~/lib/transaction";
import { getAllSubcategories } from "~/actions/category";

const ExpensesPage = async ({
  searchParams,
}: {
  searchParams?: { month?: number; year?: number };
}) => {
  const month = Number(searchParams?.month) || new Date().getMonth();
  const year = Number(searchParams?.year) || new Date().getFullYear();

  const subcategories = await getAllSubcategories();
  const transactions = await getTransactionsByMonth({ month, year });

  return (
    <div className="flex h-body-screen w-full flex-row gap-40 px-12">
      <ExpensesChart data={getIncomesChartData(transactions, subcategories)} />

      <ExpensesChart data={getExpensesChartData(transactions, subcategories)} />
    </div>
  );
};

export default ExpensesPage;

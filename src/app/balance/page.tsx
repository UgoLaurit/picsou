import { getTransactionsByMonth } from "~/actions/transaction";
import BalanceChart from "~/app/_components/charts/balance-chart";
import { getBalance } from "~/actions/balance";
import { calculateBalanceOfMonth } from "~/lib/balance";

const BalancePage = async ({
  searchParams,
}: {
  searchParams?: { month?: number; year?: number };
}) => {
  const month = Number(searchParams?.month) || new Date().getMonth();
  const year = Number(searchParams?.year) || new Date().getFullYear();

  const transactions = await getTransactionsByMonth({ month, year });
  const balance = await getBalance({
    bankAccountId: "clsj5jfay000108l37wjlamrv",
    month,
    year,
  });

  if (!balance) {
    throw new Error("Balance not found");
  }

  const balanceData = calculateBalanceOfMonth(
    balance.value,
    transactions,
    month,
    year,
  );

  const chartData = [
    {
      id: "balance",
      data: balanceData.map((item) => ({
        x: item.date,
        y: item.balance,
      })),
    },
  ];

  return (
    <div className="flex h-body-screen w-full flex-row gap-40 px-12">
      <BalanceChart data={chartData} />
    </div>
  );
};

export default BalancePage;

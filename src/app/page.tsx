import { api } from "~/trpc/server";
import TransactionsTable from "~/app/_components/transactionsTable";

const Home = async () => {
  const allTransactions = await api.transaction.getAll.query();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
        <TransactionsTable transactions={allTransactions} />
      </div>
    </main>
  );
};

export default Home;

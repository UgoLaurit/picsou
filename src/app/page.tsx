const Home = async () => {
  // const allTransactions = await api.transaction.getAll.query();
  // const addTransactions = async (transactions) => {
  //   await api.transaction.addTransactions.mutation({
  //     transactions,
  //   });
  // };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      {/*<AddTransactionsButton addTransactions={addTransactions} />*/}
      {/*<TransactionsTable transactions={allTransactions} />*/}
    </main>
  );
};

export default Home;

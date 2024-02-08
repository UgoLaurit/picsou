import { DataTable } from "~/app/_components/table/data-table";
import { Toaster } from "~/app/_components/ui/sonner";
import { getAllScheduledTransactions } from "~/actions/scheduled-transactions";
import { columns } from "~/app/scheduled/columns";
import AddScheduledTransaction from "~/app/scheduled/add-scheduled-transaction";

const ScheduledPage = async () => {
  const allScheduledTransactions = await getAllScheduledTransactions();

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-row gap-4 self-end">
        <AddScheduledTransaction />
      </div>

      <DataTable columns={columns} data={allScheduledTransactions} />

      <Toaster />
    </div>
  );
};

export default ScheduledPage;

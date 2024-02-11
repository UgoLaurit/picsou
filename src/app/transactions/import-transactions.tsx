"use client";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/app/_components/ui/dialog";
import { Button } from "~/app/_components/ui/button";
import { Input } from "~/app/_components/ui/input";
import { type ChangeEvent, useState } from "react";
import { IoCloudUpload } from "react-icons/io5";
import { parseCSV } from "~/lib/csv";
import { type TransactionDTO } from "~/types/transaction";
import { addTransactions } from "~/actions/transaction";
import { toast } from "sonner";

const ImportTransactions = () => {
  const [newTransactions, setNewTransactions] = useState<
    Omit<TransactionDTO, "bankAccountId">[]
  >([]);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (e) => {
      const text = e.target?.result;
      setNewTransactions(await parseCSV(text as string));
    };
    reader.readAsText(file);
  };

  const addNewTransactions = async () => {
    const response = await addTransactions(
      newTransactions.map((transaction) => ({
        ...transaction,
        bankAccountId: "clqpq9smf001hfogpvbqkispp",
      })),
    );

    if (response.count) {
      toast(`${response.count} transactions ajoutées`);
    } else {
      toast("Une erreur est survenue");
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default">
          <IoCloudUpload className="mt-0.5" size={16} /> Importer
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Importer des transactions</DialogTitle>
        </DialogHeader>

        <div className="my-8 flex flex-col items-center justify-center gap-4 p-4">
          <Input
            className="w-72"
            type="file"
            accept=".csv"
            onChange={handleFileChange}
          />
          {newTransactions.length > 0 ? (
            <div>
              {`${newTransactions.length} nouvelles transactions trouvées`}
            </div>
          ) : null}
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button
              type="submit"
              disabled={newTransactions.length === 0}
              onClick={addNewTransactions}
            >
              Ajouter
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ImportTransactions;

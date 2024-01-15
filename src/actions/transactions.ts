"use server";

import { type TransactionDTO } from "~/types/transaction.dto";
import { db } from "~/server/db";
import { type Transaction } from "~/types/transaction";
import { revalidatePath } from "next/cache";

export const getAllTransactions = async (): Promise<Transaction[]> => {
  return db.transaction.findMany({
    include: {
      bankAccount: {
        include: {
          bank: true,
        },
      },
      subcategory: {
        include: {
          category: true,
        },
      },
    },
  });
};

export const addTransactions = async (transactions: TransactionDTO[]) => {
  const response = await db.transaction.createMany({
    data: transactions,
  });
  revalidatePath("/transactions");
  return response;
};

export const deleteTransaction = async (id: string) => {
  const response = await db.transaction.delete({
    where: {
      id,
    },
  });
  revalidatePath("/transactions");
  return response;
};

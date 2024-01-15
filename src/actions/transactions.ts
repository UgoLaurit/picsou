"use server";

import { type Transaction, type TransactionDTO } from "~/types/transaction";
import { db } from "~/server/db";
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

"use server";

import { type Transaction, type TransactionDTO } from "~/types/transaction";
import { db } from "~/server/db";
import { revalidatePath } from "next/cache";

export const getTransactionsByMonth = async ({
  month,
  year,
}: {
  month: number;
  year: number;
}): Promise<Transaction[]> => {
  return db.transaction.findMany({
    where: {
      date: {
        gte: new Date(year, month - 1, 1),
        lte: new Date(year, month, 0),
      },
    },
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

export const getTransactionsByYear = async ({
  year,
}: {
  year: number;
}): Promise<Transaction[]> => {
  return db.transaction.findMany({
    where: {
      date: {
        gte: new Date(year, 0, 1),
        lte: new Date(year + 1, 0, 0),
      },
    },
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

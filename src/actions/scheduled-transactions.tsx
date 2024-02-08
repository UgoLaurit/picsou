"use server";

import { db } from "~/server/db";
import { revalidatePath } from "next/cache";
import {
  type ScheduledTransaction,
  type ScheduledTransactionDTO,
} from "~/types/scheduled-transaction";

export const getAllScheduledTransactions = async (): Promise<
  ScheduledTransaction[]
> => {
  return db.scheduledTransaction.findMany({
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

export const addScheduledTransactions = async (
  transactions: ScheduledTransactionDTO[],
) => {
  const response = await db.scheduledTransaction.createMany({
    data: transactions,
  });
  revalidatePath("/transactions");
  return response;
};

export const deleteScheduledTransaction = async (id: string) => {
  const response = await db.scheduledTransaction.delete({
    where: {
      id,
    },
  });
  revalidatePath("/transactions");
  return response;
};

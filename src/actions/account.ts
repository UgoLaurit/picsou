"use server";

import { db } from "~/server/db";
import { type BankAccount } from "~/types/bank-account";

export const getAllBankAccounts = async (): Promise<BankAccount[]> => {
  return await db.bankAccount.findMany({
    include: {
      bank: true,
    },
  });
};

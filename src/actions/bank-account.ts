"use server";

import { db } from "~/server/db";
import { type BankAccount } from "~/types/bank-account";

export const getBankAccounts = async ({
  ownerId,
}: {
  ownerId: string;
}): Promise<BankAccount[]> => {
  return await db.bankAccount.findMany({
    where: {
      ownerId: ownerId,
    },
    include: {
      bank: true,
    },
  });
};

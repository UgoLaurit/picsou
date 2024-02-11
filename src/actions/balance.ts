import { db } from "~/server/db";
import { type Balance } from "~/types/balance";

export const getBalance = async ({
  bankAccountId,
  month,
  year,
}: {
  bankAccountId: string;
  month: number;
  year: number;
}): Promise<Balance | null> => {
  return await db.balance.findFirst({
    where: {
      bankAccountId,
      date: {
        gte: new Date(year, month - 1, 1),
        lt: new Date(year, month, 1),
      },
    },
  });
};

import { type Prisma } from "@prisma/client";

export type AllTransactions = Prisma.TransactionGetPayload<{
  include: {
    bankAccount: {
      include: {
        bank: true;
      };
    };
    subcategory: {
      include: {
        category: true;
      };
    };
  };
}>;

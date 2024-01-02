import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const transactionRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.db.transaction.findMany({
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
  }),
});

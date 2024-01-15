"use server";

import { db } from "~/server/db";
import { type Subcategory } from "~/types/subcategory";

export const getAllSubcategories = async (): Promise<Subcategory[]> => {
  return await db.transactionSubcategory.findMany({
    include: {
      category: true,
    },
  });
};

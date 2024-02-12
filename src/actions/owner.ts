"use server";

import { db } from "~/server/db";
import { type Owner } from "~/types/owner";

export const getAllOwners = async (): Promise<Owner[]> => {
  return await db.owner.findMany({});
};

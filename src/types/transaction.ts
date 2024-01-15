import { type BankAccount } from "~/types/bank-account";
import { type Subcategory } from "~/types/subcategory";

export type Transaction = {
  id: string;
  bankAccountId: string;
  date: Date;
  label: string;
  value: number;
  subcategoryId: string;
  bankAccount: BankAccount;
  subcategory: Subcategory;
};

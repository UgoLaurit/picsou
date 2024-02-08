import { type BankAccount } from "~/types/bank-account";
import { type Subcategory } from "~/types/subcategory";
import { type FREQUENCIES } from "~/assets/constants";

export type ScheduledTransaction = {
  id: string;
  bankAccountId: string;
  date: Date;
  label: string;
  value: number;
  subcategoryId: string;
  bankAccount: BankAccount;
  subcategory: Subcategory;
  frequency: typeof FREQUENCIES;
  firstDate: Date;
  lastDate: Date;
  active: boolean;
};

export type ScheduledTransactionDTO = {
  bankAccountId: string;
  date: string;
  label: string;
  value: number;
  subcategoryId: string;
  frequency: typeof FREQUENCIES;
  firstDate: Date;
  lastDate: Date;
  active: boolean;
};

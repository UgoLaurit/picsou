export type BankAccount = {
  id: string;
  name: string;
  type: string;
  bankId: string;
  ownerId: string | null;
  bank: {
    color: string;
    id: string;
    name: string;
  };
};

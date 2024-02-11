import { type Transaction } from "~/types/transaction";
import { isSameDay } from "~/lib/date";

export const calculateBalanceOfMonth = (
  initialBalance: number,
  transactions: Transaction[],
  month: number,
  year: number,
): { date: Date; balance: number }[] => {
  const numDaysInMonth = new Date(year, month, 0).getDate();
  const balanceOfMonth: { date: Date; balance: number }[] = [];

  for (let i = 1; i <= numDaysInMonth; i++) {
    const date = new Date(year, month - 1, i);

    const transactionsOnDate = transactions.filter((transaction) =>
      isSameDay(transaction.date, date),
    );

    const balance = transactionsOnDate.reduce(
      (acc, transaction) => acc + transaction.value,
      0,
    );

    if (i === 1) {
      balanceOfMonth.push({ date, balance: initialBalance + balance });
    } else {
      balanceOfMonth.push({
        date,
        balance: balanceOfMonth[i - 2]!.balance + balance,
      });
    }
  }

  return balanceOfMonth;
};

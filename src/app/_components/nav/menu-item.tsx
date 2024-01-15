"use client";

import { WalletIcon } from "~/assets/nav-icons/wallet-icon";
import { BalanceIcon } from "~/assets/nav-icons/balance-icon";
import { ScheduledIcon } from "~/assets/nav-icons/scheduled-icon";
import { TransactionsIcon } from "~/assets/nav-icons/transactions-icon";
import { ExpensesIcon } from "~/assets/nav-icons/expenses-icon";
import { SavingsIcon } from "~/assets/nav-icons/savings-icon";
import { LoansIcon } from "~/assets/nav-icons/loans-icon";
import { WealthIcon } from "~/assets/nav-icons/wealth-icon";
import { SimulationIcon } from "~/assets/nav-icons/simulation-icon";
import { TaxesIcon } from "~/assets/nav-icons/taxes-icon";
import { usePathname } from "next/navigation";

export type MenuItemProps = {
  link: string;
};

const DEFAULT_COLOR = "#d8dee9";
const ACTIVE_COLOR = "#eceff4";

export const MenuItem = ({ link }: MenuItemProps) => {
  const pathname = usePathname();

  const getNavIcon = (link: string) => {
    switch (link) {
      case "wallet":
        return (
          <WalletIcon
            iconColor={pathname === "/wallet" ? ACTIVE_COLOR : DEFAULT_COLOR}
          />
        );
      case "balance":
        return (
          <BalanceIcon
            iconColor={pathname === "/balance" ? ACTIVE_COLOR : DEFAULT_COLOR}
          />
        );
      case "scheduled":
        return (
          <ScheduledIcon
            iconColor={pathname === "/scheduled" ? ACTIVE_COLOR : DEFAULT_COLOR}
          />
        );
      case "transactions":
        return (
          <TransactionsIcon
            iconColor={
              pathname === "/transactions" ? ACTIVE_COLOR : DEFAULT_COLOR
            }
          />
        );
      case "expenses":
        return (
          <ExpensesIcon
            iconColor={pathname === "/expenses" ? ACTIVE_COLOR : DEFAULT_COLOR}
          />
        );
      case "savings":
        return (
          <SavingsIcon
            iconColor={pathname === "/savings" ? ACTIVE_COLOR : DEFAULT_COLOR}
          />
        );
      case "loans":
        return (
          <LoansIcon
            iconColor={pathname === "/loans" ? ACTIVE_COLOR : DEFAULT_COLOR}
          />
        );
      case "wealth":
        return (
          <WealthIcon
            iconColor={pathname === "/wealth" ? ACTIVE_COLOR : DEFAULT_COLOR}
          />
        );
      case "simulation":
        return (
          <SimulationIcon
            iconColor={
              pathname === "/simulation" ? ACTIVE_COLOR : DEFAULT_COLOR
            }
          />
        );
      case "taxes":
        return (
          <TaxesIcon
            iconColor={pathname === "/taxes" ? ACTIVE_COLOR : DEFAULT_COLOR}
          />
        );
      default:
        return null;
    }
  };

  return (
    <>
      <div
        className={`flex w-full flex-row items-center justify-center px-4 py-5 text-snow-storm-200 hover:bg-polar-night-400 ${
          "/" + link === pathname ? "bg-polar-night-300" : ""
        }`}
      >
        {getNavIcon(link)}
      </div>
    </>
  );
};

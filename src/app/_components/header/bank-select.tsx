"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/app/_components/ui/select";
import { useEffect, useState } from "react";
import { type BankAccount } from "~/types/bank-account";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const BankSelect = ({ bankAccounts }: { bankAccounts: BankAccount[] }) => {
  if (bankAccounts.length === 0 || bankAccounts[0] === undefined) {
    throw new Error("No bank accounts found");
  }

  const [selectedBankAccount, setSelectedBankAccount] = useState(
    bankAccounts[0].id,
  );

  const searchParams = useSearchParams();
  const pathname = usePathname();
  // eslint-disable-next-line @typescript-eslint/unbound-method
  const { replace } = useRouter();

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    if (params.has("bankAccount")) {
      params.set("bankAccount", String(selectedBankAccount));
    } else {
      params.append("bankAccount", String(selectedBankAccount));
    }
    replace(`${pathname}?${params.toString()}`);
  }, [selectedBankAccount]);

  return (
    <Select
      value={selectedBankAccount}
      onValueChange={(newValue) => setSelectedBankAccount(newValue)}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {bankAccounts.map((bankAccount) => (
          <SelectItem key={bankAccount.id} value={bankAccount.id}>
            {bankAccount.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default BankSelect;

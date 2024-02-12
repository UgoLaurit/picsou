"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/app/_components/ui/select";
import { useEffect, useState } from "react";
import { type Owner } from "~/types/owner";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const OwnerSelect = ({ owners }: { owners: Owner[] }) => {
  const [selectedOwner, setSelectedOwner] = useState(owners[0]!.id);

  const searchParams = useSearchParams();
  const pathname = usePathname();
  // eslint-disable-next-line @typescript-eslint/unbound-method
  const { replace } = useRouter();

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    if (params.has("owner")) {
      params.set("owner", String(selectedOwner));
    } else {
      params.append("owner", String(selectedOwner));
    }
    replace(`${pathname}?${params.toString()}`);
  }, [selectedOwner]);

  return (
    <Select value={selectedOwner} onValueChange={setSelectedOwner}>
      <SelectTrigger className="w-[180px]">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {owners.map((owner) => (
          <SelectItem key={owner.id} value={owner.id}>
            {owner.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default OwnerSelect;

"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/app/_components/ui/select";
import { useState } from "react";

const OwnerSelect = () => {
  const [value, setValue] = useState("Ugo");

  return (
    <Select value={value} onValueChange={setValue}>
      <SelectTrigger className="w-[180px]">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="Ugo">Ugo</SelectItem>
        <SelectItem value="Join">Compte joint</SelectItem>
      </SelectContent>
    </Select>
  );
};

export default OwnerSelect;

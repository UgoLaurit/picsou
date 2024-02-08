"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/app/_components/ui/select";
import { useState } from "react";

const BankSelect = () => {
  const [value, setValue] = useState("LCL");

  return (
    <Select value={value} onValueChange={setValue}>
      <SelectTrigger className="w-[180px]">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="LCL">LCL</SelectItem>
        <SelectItem value="N26">N26</SelectItem>
      </SelectContent>
    </Select>
  );
};

export default BankSelect;

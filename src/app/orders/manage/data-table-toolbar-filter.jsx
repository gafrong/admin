import * as React from "react";

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { statuses } from "./data/data";

export function DataTableToolbarFilter({ table }) {
  const [value, setValue] = React.useState("all");
  const column = table.getColumn("status");

  const handleValueChange = (value) => {
    setValue(value);
    const newValue = value === "All" ? undefined : value;
    column?.setFilterValue(newValue);
  };

  return (
    <RadioGroup
      className="flex flex-wrap gap-8 border w-full p-4 rounded-md md:w-full md:grid-cols-2"
      defaultValue="Ordered"
      onValueChange={handleValueChange}
    >
      {statuses.map((status) => (
        <div key={status.value} className="flex items-center space-x-2 whitespace-nowrap">
          <RadioGroupItem value={status.value} id={status.value} />
          <Label htmlFor={status.value}>{status.label}</Label>
        </div>
      ))}
    </RadioGroup>
  );
}

"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const ButtonSorting = ({ column, children }) => {
  return (
    <Button
      variant="ghost"
      onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      className="px-0"
    >
      {children}
      <ArrowUpDown className="ml-2 h-4 w-4" />
    </Button>
  );
};

const CellHeaderCheckbox = ({ table }) => (
  <Checkbox
    checked={
      table.getIsAllPageRowsSelected() ||
      (table.getIsSomePageRowsSelected() && "indeterminate")
    }
    onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
    aria-label="Select all"
  />
);

const CellRowCheckbox = ({ row }) => (
  <Checkbox
    checked={row.getIsSelected()}
    onCheckedChange={(value) => row.toggleSelected(!!value)}
    aria-label="Select row"
  />
);

const CellStatus = ({ row }) => (
  <div className="capitalize">{row.getValue("status")}</div>
);

const CellHeaderDate = ({ column }) => (
  <ButtonSorting column={column}>Date</ButtonSorting>
);

const CellEmail = ({ row }) => (
  <div className="lowercase">{row.getValue("email")}</div>
);

const CellAmount = ({ row }) => {
  const amount = parseFloat(row.getValue("amount"));
  // Format the amount as a dollar amount
  const formatted = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);

  return <div className="text-right font-medium">{formatted}</div>;
};

const CellHeaderAmount = () => <div className="text-right">Amount</div>;

const CellActionsDropdown = ({ row }) => {
  const payment = row.original;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuItem
          onClick={() => navigator.clipboard.writeText(payment.id)}
        >
          Copy payment ID
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>View customer</DropdownMenuItem>
        <DropdownMenuItem>View payment details</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export const columns = [
  {
    id: "select",
    header: CellHeaderCheckbox,
    cell: CellRowCheckbox,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: CellStatus,
  },
  {
    accessorKey: "email",
    header: CellHeaderDate,
    cell: CellEmail,
  },
  {
    accessorKey: "amount",
    header: CellHeaderAmount,
    cell: CellAmount,
  },
  {
    id: "actions",
    enableHiding: false,
    cell: CellActionsDropdown,
  },
];

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

import Image from "next/image";

// Table components
// ----------------

// General sorting button, add to any column to make it sortable
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

// Date
const CellDate = ({ row }) => (
  <div className="flex flex-col space-y-2">
    <div className="whitespace-nowrap">{row.getValue("dateGroup").date}</div>
    <div className="whitespace-nowrap">{row.getValue("dateGroup").time}</div>
  </div>
);

// Product Description
const CellProductDescription = ({ row }) => (
  <div className="flex flex-col space-y-2 max-w-sm">
    {/* <div className="flex space-x-4">
      <img className="w-16 h-16" src={row.getValue("productImage")} />
    </div> */}
    <div>{row.getValue("productGroup").productDescription}</div>

    <div>color: {row.getValue("productGroup").productAdjective1}</div>
    <div>{row.getValue("productGroup").productAdjective2}</div>
    <div>{row.getValue("productGroup").productAdjective3}</div>
  </div>
);

// select all rows in table
const HeaderSelectAll = ({ table }) => (
    <Checkbox
      checked={
        table.getIsAllPageRowsSelected() ||
        (table.getIsSomePageRowsSelected() && "indeterminate")
      }
      onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
      aria-label="Select all"
    />
);

// Select
const CellSelectCheckbox = ({ row }) => (
  <Checkbox
    checked={row.getIsSelected()}
    onCheckedChange={(value) => row.toggleSelected(!!value)}
    aria-label="Select row"
  />
);

// not used. checkbox with status underneath
// const CellSelect = ({ row }) => (
//   <div className="flex flex-col space-y-4">
//     <Checkbox
//       checked={row.getIsSelected()}
//       onCheckedChange={(value) => row.toggleSelected(!!value)}
//       aria-label="Select row"
//     />
//     <div className="capitalize whitespace-nowrap">{row.original.status}</div>
//   </div>
// );

// Status
const CellStatus = ({ row }) => (
  <div className="capitalize">{row.getValue("status")}</div>
);

// Name
const HeaderName = ({ column }) => (
  <ButtonSorting column={column}>User</ButtonSorting>
);

const CellName = ({ row }) => (
  <div className="flex-col space-y-2">
    <div className="lowercase">{row.getValue("name")}</div>
    <div className="lowercase">johnnyname</div>
    <div className="lowercase">(5)</div>
  </div>
);

// Quantity
const HeaderQuantity = ({ column }) => (
  <ButtonSorting column={column}>Qty</ButtonSorting>
);

// Image
const CellProductImage = ({ row }) => (
  <div className="flex w-24 overflow-hidden">
    <Image
      src={row.getValue("productImage")}
      width={160}
      height={160}
      // layout="fixed"
      alt="product image"
    />
  </div>
);

// Amount
const CellAmount = ({ row }) => {
  const amount = parseFloat(row.getValue("amount"));
  // Format the amount as a dollar amount
  const formatted = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "KRW",
  }).format(amount);

  return <div className="text-right font-medium">{formatted}</div>;
};

const HeaderAmount = () => <div className="text-right">Payment</div>;

// Price
const HeaderPrice = () => <div className="text-right">Price</div>;

const CellPrice = ({ row }) => {
  const amount = parseFloat(row.getValue("price"));
  // Format the amount as a dollar amount
  const formatted = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "KRW",
  }).format(amount);
  return <div className="text-right font-medium">{formatted}</div>;
};

// Actions
const CellActions = ({ row }) => {
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

// Table configuration
// -------------------

export const columns = [
  {
    cell: CellSelectCheckbox,
    enableHiding: false,
    enableSorting: false,
    header: HeaderSelectAll,
    id: "select",
  },
  {
    accessorKey: "status",
    cell: CellStatus,
    filterFn: (row, id, value) => value.includes(row.getValue(id)),
    header: "Status",
  },
  {
    accessorKey: "dateGroup",
    cell: CellDate,
    header: "Date",
    visibilityLabel: "Date",
  },
  {
    accessorKey: "orderNumber",
    header: "Order #",
    visibilityLabel: "Order Number",
  },
  {
    accessorKey: "name",
    cell: CellName,
    header: HeaderName,
  },
  {
    accessorKey: "productImage",
    cell: CellProductImage,
    header: "",
    visibilityLabel: "Product Image",
  },
  {
    accessorKey: "productGroup",
    cell: CellProductDescription,
    header: "Product",
    visibilityLabel: "Product Details",
  },
  {
    accessorKey: "quantity",
    header: HeaderQuantity,
  },
  {
    accessorKey: "price",
    cell: CellPrice,
    header: HeaderPrice,
  },
  {
    accessorKey: "amount",
    cell: CellAmount,
    header: HeaderAmount,
  },
  {
    accessorKey: "method",
    header: "Method",
  },
  {
    accessorKey: "memo",
    header: "Memo",
  },
  {
    cell: CellActions,
    enableHiding: false,
    id: "actions",
  },
];

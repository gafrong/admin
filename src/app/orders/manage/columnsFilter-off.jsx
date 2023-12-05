"use client";

import { Badge } from "@/registry/new-york/ui/badge";
import { Checkbox } from "@/registry/new-york/ui/checkbox";

import { labels, priorities, statuses } from "../data/data";
import { DataTableColumnHeader } from "./data-table-column-header";
import { DataTableRowActions } from "./data-table-row-actions";

// Table components
// ----------------

// Select
const HeaderSelect = ({ table }) => (
  <Checkbox
    checked={
      table.getIsAllPageRowsSelected() ||
      (table.getIsSomePageRowsSelected() && "indeterminate")
    }
    onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
    aria-label="Select all"
    className="translate-y-[2px]"
  />
);

const CellSelect = ({ row }) => (
  <Checkbox
    checked={row.getIsSelected()}
    onCheckedChange={(value) => row.toggleSelected(!!value)}
    aria-label="Select row"
    className="translate-y-[2px]"
  />
);

// Id
const HeaderId = ({ column }) => (
  <DataTableColumnHeader column={column} title="Task" />
);

const CellId = ({ row }) => (
  <div className="w-[80px]">{row.getValue("id")}</div>
);

//Title
const HeaderTitle = ({ column }) => (
  <DataTableColumnHeader column={column} title="Title" />
);

const CellTitle = ({ row }) => {
  const label = labels.find((label) => label.value === row.original.label);

  return (
    <div className="flex space-x-2">
      {label && <Badge variant="outline">{label.label}</Badge>}
      <span className="max-w-[500px] truncate font-medium">
        {row.getValue("title")}
      </span>
    </div>
  );
};

// Status
const HeaderStatus = ({ column }) => (
  <DataTableColumnHeader column={column} title="Status" />
);

const CellStatus = ({ row }) => {
  const status = statuses.find(
    (status) => status.value === row.getValue("status")
  );

  if (!status) {
    return null;
  }

  return (
    <div className="flex w-[100px] items-center">
      {status.icon && (
        <status.icon className="mr-2 h-4 w-4 text-muted-foreground" />
      )}
      <span>{status.label}</span>
    </div>
  );
};

//Priority
const HeaderPriority = ({ column }) => (
  <DataTableColumnHeader column={column} title="Priority" />
);

const CellPriority = ({ row }) => {
  const priority = priorities.find(
    (priority) => priority.value === row.getValue("priority")
  );

  if (!priority) {
    return null;
  }

  return (
    <div className="flex items-center">
      {priority.icon && (
        <priority.icon className="mr-2 h-4 w-4 text-muted-foreground" />
      )}
      <span>{priority.label}</span>
    </div>
  );
};

// Actions
const CellActions = ({ row }) => <DataTableRowActions row={row} />;

// Table configuration
// -------------------

export const columns = [
  {
    id: "select",
    header: HeaderSelect,
    cell: CellSelect,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "id",
    header: HeaderId,
    cell: CellId,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "title",
    header: HeaderTitle,
    cell: CellTitle,
  },
  {
    accessorKey: "status",
    header: HeaderStatus,
    cell: CellStatus,
    filterFn: (row, id, value) => value.includes(row.getValue(id)),
  },
  {
    accessorKey: "priority",
    header: HeaderPriority,
    cell: CellPriority,
    filterFn: (row, id, value) => value.includes(row.getValue(id)),
  },
  {
    id: "actions",
    cell: CellActions,
  },
];

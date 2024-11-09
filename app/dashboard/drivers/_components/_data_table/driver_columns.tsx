"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTableRowActions } from "./data-table-row-actions";
import { DataTableColumnHeader } from "@/components/table/data-table-column-header";

// Define a type for Driver to ensure columns match the structure
interface Driver {
  id: number;
  fullName: string;
  phoneNumber: string;
  cardId: string;
  driverCardId: string;
  nearestFraindName: string;
  nearestFraindPhone: string;
  liveIn: number;
}

export const driver_columns: ColumnDef<Driver>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-0.5"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-0.5"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "fullName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Full Name" />
    ),
    cell: ({ row }) => (
      <div className="w-[150px] capitalize">{row.getValue("fullName")}</div>
    ),
  },
  {
    accessorKey: "phoneNumber",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Phone Number" />
    ),
    cell: ({ row }) => (
      <div className="w-[150px]">{row.getValue("phoneNumber")}</div>
    ),
  },
  {
    accessorKey: "cardId",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Card ID" />
    ),
    cell: ({ row }) => (
      <div className="w-[100px]">{row.getValue("cardId")}</div>
    ),
  },
  {
    accessorKey: "driverCardId",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Driver Card ID" />
    ),
    cell: ({ row }) => (
      <div className="w-[100px]">{row.getValue("driverCardId")}</div>
    ),
  },
  {
    accessorKey: "nearestFraindName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Nearest Friend Name" />
    ),
    cell: ({ row }) => (
      <div className="w-[150px]">{row.getValue("nearestFraindName")}</div>
    ),
  },
  {
    accessorKey: "nearestFraindPhone",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Nearest Friend Phone" />
    ),
    cell: ({ row }) => (
      <div className="w-[150px]">{row.getValue("nearestFraindPhone")}</div>
    ),
  },
  {
    accessorKey: "liveIn",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Live In" />
    ),
    cell: ({ row }) => (
      <div className="w-[100px]">{row.getValue("liveIn")}</div>
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];

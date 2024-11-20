"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/components/table/data-table-column-header";
import { DataTableRowActions } from "./data-table-row-actions";
import { Queue } from "@/Types/types";

export const queue_columns: ColumnDef<Queue>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="رقم في الطبور الطابور" />
    ),
    cell: ({ row }) => (
      <div className="w-[20px] text-gray-700 font-medium">
        {row.getValue("id")}
      </div>
    ),
    size: 100,
  },
  {
    accessorKey: "workId",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="رقم الشاحنة" />
    ),
    cell: ({ row }) => (
      <div className="w-[100px] text-gray-700 font-medium">
        {row.getValue("workId")}
      </div>
    ),
  },
  {
    accessorKey: "driverName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="اسم السائق" />
    ),
    cell: ({ row }) => (
      <div className="w-[150px] text-gray-700 font-medium">
        {row.getValue("driverName")}
      </div>
    ),
  },

 
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];

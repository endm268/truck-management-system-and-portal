"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/components/table/data-table-column-header";
import { DataTableRowActions } from "./data-table-row-actions";
import { Queue } from "@/Types/types";

export const getQueueColumns = (userType: string): ColumnDef<Queue>[] => {
  const columns: ColumnDef<Queue>[] = [
    {
      accessorFn: (row) => row.id, // Use accessorFn if accessorKey is unavailable
      id: "id", // Required when using accessorFn
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="رقم في الطابور" />
      ),
      cell: ({ row }) => (
        <div className="w-[20px] text-gray-700 font-medium">
          {row.getValue("id")}
        </div>
      ),
      size: 100,
    },
    {
      accessorFn: (row) => row.workId,
      id: "workId",
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
      accessorFn: (row) => row.driverName,
      id: "driverName",
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

  // Conditionally add a column after "driverName"
  if (userType === "admin") {
    const additionalColumn: ColumnDef<Queue> = {
      accessorFn: (row) => row.areaName, // Use accessorFn for conditional columns
      id: "areaName",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="الساحة" />
      ),
      cell: ({ row }) => (
        <div className="w-[150px] text-gray-700 font-medium">
          {row.getValue("areaName")}
        </div>
      ),
    };

    const driverNameIndex = columns.findIndex(
      (column) => column.id === "driverName"
    );

    if (driverNameIndex !== -1) {
      columns.splice(driverNameIndex + 1, 0, additionalColumn);
    }
  }

  return columns;
};

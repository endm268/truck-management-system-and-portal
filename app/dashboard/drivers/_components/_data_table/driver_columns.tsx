"use client";

import { ColumnDef } from "@tanstack/react-table";

import { DataTableColumnHeader } from "@/components/table/data-table-column-header";
import { DataTableRowActions } from "./data-table-row-actions";
import { Driver } from "@/Types/types";

// Function to get driver columns dynamically
export function getDriverColumns(userType: string): ColumnDef<Driver>[] {
  const driver_columns: ColumnDef<Driver>[] = [
    {
      accessorKey: "driverId",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="معرف" />
      ),
      cell: ({ row }) => (
        <div className="w-[20px] capitalize text-gray-700 font-medium">
          {row.getValue("driverId")}
        </div>
      ),
      size: 100,
    },
    {
      accessorKey: "fullName",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="الاسم الكامل" />
      ),
      cell: ({ row }) => (
        <div className="w-[150px] capitalize text-gray-700 font-medium">
          {row.getValue("fullName")}
        </div>
      ),
    },
    {
      accessorKey: "phoneNumber",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="رقم الهاتف" />
      ),
      cell: ({ row }) => (
        <div className="w-[150px] text-gray-700 font-medium">
          {row.getValue("phoneNumber")}
        </div>
      ),
    },
    {
      accessorKey: "cardId",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="رقم البطاقة" />
      ),
      cell: ({ row }) => (
        <div className="w-[100px] text-gray-700 font-medium">
          {row.getValue("cardId")}
        </div>
      ),
    },
    {
      accessorKey: "driverCardId",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="رقم رخصة السائق" />
      ),
      cell: ({ row }) => (
        <div className="w-[100px] text-gray-700 font-medium">
          {row.getValue("driverCardId")}
        </div>
      ),
    },
    {
      accessorKey: "nearestFraindName",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="اسم الصديق الأقرب" />
      ),
      cell: ({ row }) => (
        <div className="w-[150px] text-gray-700 font-medium">
          {row.getValue("nearestFraindName")}
        </div>
      ),
    },
    {
      accessorKey: "nearestFraindPhone",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="هاتف الصديق الأقرب" />
      ),
      cell: ({ row }) => (
        <div className="w-[150px] text-gray-700 font-medium">
          {row.getValue("nearestFraindPhone")}
        </div>
      ),
    },
    {
      accessorKey: "liveInName",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="يعيش في" />
      ),
      cell: ({ row }) => (
        <div className="w-[100px] text-gray-700 font-medium">
          {row.getValue("liveInName")}
        </div>
      ),
    },
    {
      id: "actions",
      cell: ({ row }) => <DataTableRowActions row={row} />,
    },
  ];

  // Conditionally add the "areaName" column after "driverCardId" for admins
  if (userType === "admin") {
    const areaNameColumn: ColumnDef<Driver> = {
      accessorKey: "areaName",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="ساحة" />
      ),
      cell: ({ row }) => (
        <div className="w-[150px] capitalize text-gray-700 font-medium">
          {row.getValue("areaName")}
        </div>
      ),
    };

    const driverCardIdIndex = driver_columns.findIndex(
      (column) => column.accessorKey === "driverCardId"
    );

    if (driverCardIdIndex !== -1) {
      driver_columns.splice(driverCardIdIndex + 1, 0, areaNameColumn);
    }
  }

  return driver_columns;
}

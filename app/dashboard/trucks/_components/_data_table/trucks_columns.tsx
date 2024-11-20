"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/components/table/data-table-column-header";
import { DataTableRowActions } from "./data-table-row-actions";
import { Truck } from "@/Types/types";
import { log } from "console";

export async function getDriverColumns(
  userType: string
): Promise<ColumnDef<Truck>[]> {
  const driver_columns: ColumnDef<Truck>[] = [
    {
      accessorKey: "carId",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="معرف" />
      ),
      cell: ({ row }) => (
        <div className="w-[20px] capitalize text-gray-700 font-medium">
          {row.getValue("carId")}
        </div>
      ),
      size: 100,
    },
    {
      accessorKey: "workNumber",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="رقم العمل" />
      ),
      cell: ({ row }) => (
        <div className="w-[150px] capitalize text-gray-700 font-medium">
          {row.getValue("workNumber")}
        </div>
      ),
    },
    {
      accessorKey: "boardNumber",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="رقم طارقة" />
      ),
      cell: ({ row }) => (
        <div className="w-[150px] capitalize text-gray-700 font-medium">
          {row.getValue("boardNumber")}
        </div>
      ),
    },
    {
      accessorKey: "trailerNumber",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="رقم مقطور" />
      ),
      cell: ({ row }) => (
        <div className="w-[150px] capitalize text-gray-700 font-medium">
          {row.getValue("trailerNumber")}
        </div>
      ),
    },
    {
      accessorKey: "carTypeName",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="نوع الشاحنة" />
      ),
      cell: ({ row }) => (
        <div className="w-[150px] capitalize text-gray-700 font-medium">
          {row.getValue("carTypeName")}
        </div>
      ),
    },
    {
      accessorKey: "colorName",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="اللون" />
      ),
      cell: ({ row }) => {
        const colorName = row.original.colorName; // Access Arabic color name
        const colorNameInEnglish =
          row.original.colorNameInEnglish || "transparent"; // Fallback to "transparent"

        return (
          <div className="flex items-center w-[150px] gap-2 text-gray-700 font-medium capitalize">
            <div
              className="w-8 h-8 rounded-full border border-black dark:border-white mr-2"
              style={{ backgroundColor: colorNameInEnglish }}
            ></div>
            {colorName}
          </div>
        );
      },
    },
    {
      accessorKey: "driverName",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="الاسم الكامل" />
      ),
      cell: ({ row }) => (
        <div className="w-[150px] capitalize text-gray-700 font-medium">
          {row.getValue("driverName")}
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

  // Conditionally add the "areaName" column for admins
  if (userType === "admin") {
    driver_columns.push({
      accessorKey: "areaName",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="ساحة" />
      ),
      cell: ({ row }) => (
        <div className="w-[150px] capitalize text-gray-700 font-medium">
          {row.getValue("areaName")}
        </div>
      ),
    });
  }

  return driver_columns;
}

"use client";

import { Cross2Icon } from "@radix-ui/react-icons";
import { Table } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DataTableFacetedFilter } from "./data-table-faceted-filter";
import { DataTableViewOptions } from "./data-table-view-options";
import { TrashIcon } from "lucide-react";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { areaName } from "@/constants/data";
import { DataTableExportExcel } from "./data-table-export-excel";
import { DataTableExportPDF } from "./data-table-export-pdf";
import { DataTableExportCSV } from "./data-table-export-csv";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function DataTableToolbar<TData extends Record<string, any>[]>({
  table,
}: DataTableToolbarProps<TData>) {
  const { data: session } = useSession(); // Get session data
  const userType = session?.user?.type || ""; // Get user type from session
  const isAdmin = userType === "admin"; // Check if the user is an admin

  const isFiltered = table.getState().columnFilters.length > 0;

  const [dateRange, setDateRange] = useState<{ from: Date; to: Date }>({
    from: new Date(new Date().getFullYear(), 0, 1),
    to: new Date(),
  });

  // Handle date filtering
  const handleDateSelect = ({ from, to }: { from: Date; to: Date }) => {
    setDateRange({ from, to });
    table.getColumn("date")?.setFilterValue([from, to]);
  };

  // Get filtered data for export
  const filteredData = table
    .getFilteredRowModel()
    .rows.map((row) => row.original);
  const headers = table.getAllColumns().map((col) => col.id); // Extract column headers

  return (
    <div className="flex flex-wrap items-center justify-between px-6">
      <div className="flex flex-1 flex-wrap items-center gap-2">
        {/* Global Search Input */}
        <Input
          placeholder="بحث ..."
          value={(table.getState().globalFilter as string) ?? ""}
          onChange={(event) => {
            table.setGlobalFilter(event.target.value);
          }}
          className="h-8 w-[150px] lg:w-[250px]"
        />

        {/* Admin-Specific Filters */}
        {isAdmin && table.getColumn("areaName") && (
          <DataTableFacetedFilter
            column={table.getColumn("areaName")}
            title="الفئة"
            options={areaName}
          />
        )}

        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            إعادة تعيين
            <Cross2Icon className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>

      <div className="flex items-center gap-2">
        {/* Action Buttons */}
        {table.getFilteredSelectedRowModel().rows.length > 0 ? (
          <Button variant="outline" size="sm">
            <TrashIcon className="mr-2 size-4" aria-hidden="true" />
            حذف ({table.getFilteredSelectedRowModel().rows.length})
          </Button>
        ) : null}

        {/* Export Buttons */}
        <DataTableExportExcel data={filteredData} fileName="table_data.xlsx" />
        <DataTableExportCSV data={filteredData} fileName="table_data.csv" />
        <DataTableExportPDF
          data={filteredData} // Get filtered data from the table
          headers={headers} // Get headers from the table
          fileName="filtered_table_data.pdf"
        />

        {/* View Options */}
        <DataTableViewOptions table={table} tableKey="data-table" />
      </div>
    </div>
  );
}

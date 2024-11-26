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
import { areaName, columnNamesView } from "@/constants/data";
import { DataTableExportExcel } from "./data-table-export-excel";
import { HelloWorldPrint } from "./data-table-export-pdf";
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

  // Limit to 8 visible columns, excluding "action"
  const [visibleColumns, setVisibleColumns] = useState<string[]>(
    table
      .getAllColumns()
      .map((col) => col.id)
      .filter((col) => col !== "action")
      .slice(0, 8) // Limit to first 8 columns
  );

  const [showPrintOptions, setShowPrintOptions] = useState<boolean>(false);

  // Toggle column visibility with a maximum limit of 8
  const handleToggleColumn = (column: string) => {
    setVisibleColumns((prev) => {
      if (prev.includes(column)) {
        return prev.filter((col) => col !== column); // Remove column if already selected
      } else if (prev.length < 8) {
        return [...prev, column]; // Add column if limit is not reached
      }
      return prev; // Ignore if limit is reached
    });
  };

  // Get filtered data for export
  const filteredData = table
    .getFilteredRowModel()
    .rows.map((row) => row.original);

  return (
    <>
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
          {/* Export Buttons */}
          <DataTableExportExcel
            data={filteredData}
            fileName="table_data.xlsx"
          />
          
          <Button
            onClick={() => setShowPrintOptions((prev) => !prev)}
            variant="outline"
            size="sm"
          >
            {showPrintOptions ? "إخفاء خيارات الطباعة" : "عرض خيارات الطباعة"}
          </Button>

          <DataTableExportCSV data={filteredData} fileName="table_data.csv" />
          <HelloWorldPrint
            data={filteredData}
            headers={table
              .getAllColumns()
              .map((col) => col.id)
              .filter((col) => col !== "action")} // Exclude "action" column from headers
            visibleColumns={visibleColumns}
            handleToggleColumn={handleToggleColumn}
          />

          {/* View Options */}
          <DataTableViewOptions table={table} tableKey="data-table" />
        </div>
      </div>

      {/* Print Options */}
      {showPrintOptions && (
        <div className="flex flex-col mt-4 bg-gray-100 p-4 rounded-md">
          <h3 className="text-xl font-cairo mb-2">
            عرض او اخفاء الاعمدة للطباعة (حد أقصى 8)
          </h3>
          <div className="flex flex-wrap gap-2">
            {table
              .getAllColumns()
              .filter((col) => col.id !== "action") // Exclude "action" column
              .map((col) => (
                <label
                  key={col.id}
                  className="flex items-center space-x-2 gap-2"
                >
                  <input
                    type="checkbox"
                    checked={visibleColumns.includes(col.id)}
                    onChange={() => handleToggleColumn(col.id)}
                    disabled={
                      !visibleColumns.includes(col.id) &&
                      visibleColumns.length >= 8
                    } // Disable if limit is reached and not already selected
                    className="w-4 h-4 ml-4"
                  />
                  <span className="text-sm">
                    {columnNamesView[col.id] || col.id}
                  </span>
                </label>
              ))}
          </div>
        </div>
      )}
    </>
  );
}

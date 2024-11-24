"use client";

import { Table } from "@tanstack/react-table";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { SlidersHorizontal } from "lucide-react";
import { useEffect } from "react";


// Column name translations
import { columnNamesView } from "@/constants/data";
import { useColumnVisibilityStore } from "@/stores/useColumnVisibilityStore";

interface DataTableViewOptionsProps<TData> {
  table: Table<TData>;
  tableKey: string; // Unique key for the table
}

export function DataTableViewOptions<TData>({
  table,
  tableKey,
}: DataTableViewOptionsProps<TData>) {
  const { getVisibility, setVisibility } = useColumnVisibilityStore();

  // Load visibility settings on mount
  useEffect(() => {
    const savedVisibility = getVisibility(tableKey);
    if (savedVisibility) {
      table.setColumnVisibility(savedVisibility);
    }
  }, [tableKey, table, getVisibility]);

  // Save visibility settings whenever they change
  useEffect(() => {
    const visibilityState = table.getState().columnVisibility;
    setVisibility(tableKey, visibilityState);
  }, [tableKey, table, setVisibility, table.getState().columnVisibility]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="hidden h-8 lg:flex text-black dark:text-gray-100 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300 rounded-md rtl:flex-row-reverse"
        >
          <SlidersHorizontal className="mr-2 h-4 w-4 text-black dark:text-gray-100" />
          عرض او اخفاء الاعميدة
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="start"
        className="w-[300px] max-h-[200px] overflow-y-auto bg-white dark:bg-gray-800 text-black dark:text-gray-100 border-gray-300 dark:border-gray-700 shadow-lg rounded-md rtl:text-right rtl:direction-rtl"
      >
        <DropdownMenuSeparator className="bg-gray-300 dark:bg-gray-700" />
        {table
          .getAllColumns()
          .filter(
            (column) =>
              typeof column.accessorFn !== "undefined" && column.getCanHide()
          )
          .map((column) => (
            <DropdownMenuCheckboxItem
              className="flex justify-between items-center text-black dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300 rounded-sm p-2 rtl:flex-row-reverse"
              key={column.id}
              checked={column.getIsVisible()}
              onCheckedChange={(value) => column.toggleVisibility(!!value)}
            >
              {columnNamesView[column.id] || column.id}
            </DropdownMenuCheckboxItem>
          ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

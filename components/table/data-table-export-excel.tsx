"use client";

import * as XLSX from "xlsx";
import { Button } from "@/components/ui/button";

interface ExportExcelProps<TData> {
  data: TData[];
  fileName?: string;
}

export function DataTableExportExcel<TData>({
  data,
  fileName = "export.xlsx",
}: ExportExcelProps<TData>) {
  const handleExport = () => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Data");
    XLSX.writeFile(workbook, fileName);
  };

  return (
    <Button onClick={handleExport} variant="outline" size="sm">
      تصدير إلى Excel
    </Button>
  );
}

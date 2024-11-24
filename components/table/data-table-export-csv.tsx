"use client";

import * as XLSX from "xlsx";
import { Button } from "@/components/ui/button";

interface ExportCSVProps<TData> {
  data: TData[];
  fileName?: string;
}

export function DataTableExportCSV<TData>({
  data,
  fileName = "export.csv",
}: ExportCSVProps<TData>) {
  const handleExport = () => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const csvOutput = XLSX.utils.sheet_to_csv(worksheet, { FS: "," });
    const blob = new Blob([csvOutput], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.setAttribute("download", fileName);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Button onClick={handleExport} variant="outline" size="sm">
      تصدير إلى CSV
    </Button>
  );
}

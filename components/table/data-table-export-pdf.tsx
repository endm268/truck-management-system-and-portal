"use client";

import { useRef } from "react";
import { Button } from "@/components/ui/button";
import html2pdf from "html2pdf.js";

interface ExportPDFProps<TData extends Record<string, any>> {
  data: TData[];
  headers: string[];
  fileName?: string;
}

export function DataTableExportPDF<TData extends Record<string, any>>({
  data,
  headers,
  fileName = "table_data.pdf",
}: ExportPDFProps<TData>) {
  const printRef = useRef<HTMLDivElement>(null);

  const handleExport = () => {
    if (data.length === 0) {
      alert("لا توجد بيانات للتصدير!");
      return;
    }

    if (printRef.current) {
      console.log("Exporting content:", printRef.current.innerHTML); // Debug content
      const element = printRef.current;
      const options = {
        margin: [10, 10, 10, 10] as [number, number, number, number],
        filename: fileName,
        html2canvas: { scale: 2 },
        jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
      };
      html2pdf().from(element).set(options).save();
    }
  };

  return (
    <>
      <div
        ref={printRef}
        style={{ position: "absolute", top: "-10000px", left: "-10000px" }}
        className="p-6 bg-white text-black dark:bg-gray-800 dark:text-white"
      >
        <h1 className="text-center text-xl font-bold mb-4">تقرير البيانات</h1>
        <table className="w-full border-collapse border border-gray-300 dark:border-gray-700">
          <thead>
            <tr className="bg-gray-200 dark:bg-gray-700">
              {headers.map((header, index) => (
                <th
                  key={index}
                  className="border border-gray-300 dark:border-gray-700 p-2 text-right"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className="odd:bg-gray-100 dark:odd:bg-gray-700"
              >
                {headers.map((header, colIndex) => (
                  <td
                    key={colIndex}
                    className="border border-gray-300 dark:border-gray-700 p-2 text-right"
                  >
                    {row[header]?.toString() || ""}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Button onClick={handleExport} variant="outline" size="sm">
        تصدير إلى PDF
      </Button>
    </>
  );
}

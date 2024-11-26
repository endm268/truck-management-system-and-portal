"use client";

import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { columnNamesView } from "@/constants/data"; // Import columnNamesView

interface PrintProps<TData extends Record<string, any>> {
  data: TData[];
  headers: string[];
  visibleColumns: string[];
  handleToggleColumn: (column: string) => void;
}

export function HelloWorldPrint<TData extends Record<string, any>>({
  data,
  headers,
  visibleColumns = [], // Default to an empty array
  handleToggleColumn,
}: PrintProps<TData>) {
  const printRef = useRef<HTMLDivElement>(null);

  const handlePrint = () => {
    if (printRef.current) {
      const printWindow = window.open("", "_blank");
      if (printWindow) {
        printWindow.document.write(`<!DOCTYPE html>
          <html dir="rtl" lang="ar">
            <head>
              <title>Print</title>
              <style>
                body {
                  font-family: Arial, sans-serif;
                  margin: 20px;
                  padding: 0;
                  direction: rtl;
                  text-align: right;
                }
                table {
                  width: 100%;
                  border-collapse: collapse;
                  margin-top: 20px;
                }
                th, td {
                  border: 1px solid #ddd;
                  text-align: right;
                  padding: 8px;
                  word-wrap: break-word;
                }
                th {
                  background-color: #f4f4f4;
                }
              </style>
            </head>
            <body>
              ${printRef.current.innerHTML}
            </body>
          </html>
        `);
        printWindow.document.close();
        printWindow.focus();
        printWindow.print();
        printWindow.close();
      }
    }
  };

  return (
    <>
      {/* Hidden content for printing */}
      <div ref={printRef} style={{ display: "none" }}>
        <table>
          <thead>
            <tr>
              {visibleColumns.map((header, index) => (
                <th key={index}>{columnNamesView[header] || header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {visibleColumns.map((header, colIndex) => (
                  <td key={colIndex}>{row[header]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Button to trigger printing */}
      <Button onClick={handlePrint} variant="outline" size="sm">
        Print
      </Button>
    </>
  );
}

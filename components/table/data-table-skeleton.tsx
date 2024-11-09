// app/dashboard/users/_components/data-table-skeleton.tsx
import React from "react";
import { Skeleton } from "../ui/skeleton";


const DataTableSkeleton = () => {
  return (
    <div className="flex flex-col gap-4 border-white">
      {/* Skeleton Toolbar */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex gap-4">
          <Skeleton className="h-8 w-32" />{" "}
          {/* Placeholder for a toolbar button */}
          <Skeleton className="h-8 w-24" />{" "}
          {/* Placeholder for another toolbar button */}
          <Skeleton className="h-8 w-24" />
        </div>{" "}
        <Skeleton className="h-8 w-24" />{" "}
      </div>

      {/* Skeleton Table */}
      <div className="rounded-md border border-gray-200 dark:border-gray-500">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead>
            <tr>
              {/* Table header skeletons */}
              {[...Array(6)].map((_, idx) => (
                <th
                  key={idx}
                  className="px-6 py-3 bg-gray-100 dark:bg-gray-800"
                >
                  <Skeleton className="h-4 w-20" />{" "}
                  {/* Placeholder for column header */}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {/* Table body rows skeleton */}
            {[...Array(5)].map((_, rowIdx) => (
              <tr
                key={rowIdx}
                className="hover:bg-gray-200 dark:hover:bg-gray-700"
              >
                {[...Array(6)].map((_, cellIdx) => (
                  <td key={cellIdx} className="px-6 py-4">
                    <Skeleton className="h-4 w-full" />{" "}
                    {/* Placeholder for table cell */}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Skeleton Pagination */}
      <div className="flex justify-end mt-4">
        <Skeleton className="h-8 w-48" />{" "}
        {/* Placeholder for pagination controls */}
      </div>
    </div>
  );
};

export default DataTableSkeleton;

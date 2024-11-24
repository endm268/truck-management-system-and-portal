import React from "react";

export function GraphsSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 animate-pulse">
      {/* Bar Chart Skeleton */}
      <div className="col-span-1 lg:col-span-3 xl:col-span-6 bg-gray-200 dark:bg-gray-700 h-40 rounded"></div>

      {/* Area Chart Skeleton */}
      <div className="col-span-1 lg:col-span-4 xl:col-span-4 bg-gray-200 dark:bg-gray-700 h-40 rounded"></div>

      {/* Pie Chart Skeleton */}
      <div className="col-span-1 md:col-span-2 xl:col-span-2 bg-gray-200 dark:bg-gray-700 h-40 rounded"></div>
    </div>
  );
}

// app/dashboard/drivers/_components/drivers_listing.tsx
"use client";

import React, { useEffect, useState } from "react";
import { DataTable } from "@/components/table/data-table";
import { driver_columns } from "./_data_table/trucks_columns";
import DataTableSkeleton from "@/components/table/data-table-skeleton";
import { Driver } from "@/Types/types";
import {  getTrucks } from "@/lib/services/driverService";


const Trucks_listing = () => {
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDriverData = async () => {
      try {
        const data = await getTrucks();
        console.log("data", data);
        
        setDrivers(data);
      } catch (error) {
        console.error("An error occurred while fetching drivers:", error);
        setError("An error occurred while fetching drivers.");
      } finally {
        setLoading(false);
      }
    };

    fetchDriverData();
  }, []);

  return (
    <div className="container mx-auto py-10">
      {loading ? (
        <DataTableSkeleton />
      ) : error ? (
        <div className="text-red-500 text-center">{error}</div>
      ) : (
        <DataTable columns={driver_columns} data={drivers} />
      )}
    </div>
  );
};

export default Trucks_listing;

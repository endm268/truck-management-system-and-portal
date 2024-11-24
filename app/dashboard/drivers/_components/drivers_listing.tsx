"use client";

import React, { useEffect, useState } from "react";
import { DataTable } from "@/components/table/data-table";
import { getDriverColumns } from "./_data_table/driver_columns"; // Dynamic columns
import DataTableSkeleton from "@/components/table/data-table-skeleton";
import { Driver } from "@/Types/types";
import { getDrivers } from "@/lib/services/driverService";
import { getSession } from "next-auth/react";

const DriversListing = () => {
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [columns, setColumns] = useState<any[]>([]); // Dynamic columns
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDriverData = async () => {
      try {
        const session = await getSession();
        if (session) {
          const userType = session.user.type; // Retrieve user type
          const dynamicColumns = await getDriverColumns(userType);
          setColumns(dynamicColumns); // Set columns dynamically
        }
        const data = await getDrivers();
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
        <DataTable columns={columns} data={drivers} />
      )}
    </div>
  );
};

export default DriversListing;

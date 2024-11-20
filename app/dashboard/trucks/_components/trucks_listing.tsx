"use client";

import React, { useEffect, useState } from "react";
import { DataTable } from "@/components/table/data-table";
import { getDriverColumns } from "./_data_table/trucks_columns"; // Function for dynamic columns
import DataTableSkeleton from "@/components/table/data-table-skeleton";
import { Truck } from "@/Types/types";
import { getCars } from "@/lib/services/trucksService";
import { getSession } from "next-auth/react";

const TrucksListing = () => {
  const [trucks, setTrucks] = useState<Truck[]>([]);
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
        const data = await getCars();
        setTrucks(data);
      } catch (error) {
        console.error("An error occurred while fetching trucks:", error);
        setError("An error occurred while fetching trucks.");
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
        <DataTable columns={columns} data={trucks} />
      )}
    </div>
  );
};

export default TrucksListing;

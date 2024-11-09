// app/dashboard/drivers/_components/drivers_listing.tsx
"use client";
import { DataTable } from "@/components/table/data-table";
import React, { useEffect, useState } from "react";
import { driver_columns } from "./_data_table/driver_columns";
import DataTableSkeleton from "@/components/table/data-table-skeleton";
import { getUsers } from "@/lib/actions/tsest";

const DriversListing = () => {
 const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const userData = await getUsers();
        setUsers(userData);
      } catch (error) {
        console.error("Failed to fetch users:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  return (
    <div className="container mx-auto py-10">
      {loading ? (
        <DataTableSkeleton /> // Use skeleton while loading
      ) : (
        <DataTable columns={driver_columns} data={users} />
      )}
    </div>
  );
};

export default DriversListing;

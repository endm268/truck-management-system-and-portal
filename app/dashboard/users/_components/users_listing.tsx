// app/dashboard/users/_components/users_listing.tsx
"use client";

import { DataTable } from "@/components/table/data-table";
import React, { useEffect, useState } from "react";
import { user_columns } from "./_data_table/user_columns";
;
import DataTableSkeleton from "@/components/table/data-table-skeleton";


const Users_listing = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   const fetchUsers = async () => {
  //     try {
  //       const userData = await getUsers();
  //       setUsers(userData);
  //     } catch (error) {
  //       console.error("Failed to fetch users:", error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   fetchUsers();
  // }, []);

  return (
    <div className="container mx-auto py-10">
      {loading ? (
        <DataTableSkeleton /> // Use skeleton while loading
      ) : (
        <DataTable columns={user_columns} data={users}  type="users"/>
      )}
    </div>
  );
};

export default Users_listing;

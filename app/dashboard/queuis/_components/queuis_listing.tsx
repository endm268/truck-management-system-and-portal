"use client";

import React, { useEffect, useState } from "react";
import { DataTable } from "@/components/table/data-table";
import DataTableSkeleton from "@/components/table/data-table-skeleton";
import {
  getQueuedCars,
  addCarToQueue,
  removeCarFromQueue,
} from "@/lib/services/queuService";
import { Queue } from "@/Types/types";
import { getQueueColumns } from "./_data_table/queue_columns"; // Updated import
import { getSession } from "next-auth/react";

const QueuisListing = () => {
  const [queues, setQueues] = useState<Queue[]>([]);
  const [columns, setColumns] = useState<any[]>([]); // Dynamic columns
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchQueueData = async () => {
      try {
        const session = await getSession();
        if (session) {
          const userType = session.user.type; // Retrieve user type
          const dynamicColumns = getQueueColumns(userType);
          setColumns(dynamicColumns); // Set columns dynamically
        }
        const data = await getQueuedCars();
        setQueues(data);
      } catch (error) {
        console.error("An error occurred while fetching queues:", error);
        setError("An error occurred while fetching queue data.");
      } finally {
        setLoading(false);
      }
    };

    fetchQueueData();
  }, []);

  return (
    <div className="container mx-auto py-10">
      {loading ? (
        <DataTableSkeleton />
      ) : error ? (
        <div className="text-red-500 text-center">{error}</div>
      ) : (
        <div>
          <DataTable columns={columns} data={queues} />
        </div>
      )}
    </div>
  );
};

export default QueuisListing;

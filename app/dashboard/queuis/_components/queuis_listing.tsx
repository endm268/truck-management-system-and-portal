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
import { queue_columns } from "./_data_table/driver_columns";

const QueuisListing = () => {
  const [queues, setQueues] = useState<Queue[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchQueueData = async () => {
      try {
        const data = await getQueuedCars();
        console.log("Queue data:", data);

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
          <DataTable columns={queue_columns} data={queues} />
        </div>
      )}
    </div>
  );
};

export default QueuisListing;

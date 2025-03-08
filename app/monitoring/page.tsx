"use client";
import StatusCards from "@/components/monitoring/count_animation";
import { monitoringColumns } from "@/components/monitoring/monitoring_columns";
import { MonitoringTable } from "@/components/monitoring/monitoring_table";
import { useStatusMonitoring } from "@/services/monitoring/monitoring.queries";
import { Suspense } from "react";

export default function Monitoring() {
  const { status, statusError } = useStatusMonitoring();
  if (statusError) return <p>Error: {statusError.message}</p>;
  return (
    <div className="container mx-auto py-2">
      <h1 className="text-2xl font-bold mb-4">Monitoring</h1>
      <div className="">
        <StatusCards statuses={status} />
      </div>
      <Suspense>
        <MonitoringTable columns={monitoringColumns} />
      </Suspense>
    </div>
  );
}

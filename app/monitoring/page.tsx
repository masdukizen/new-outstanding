"use client";
import StatusCards from "@/components/monitoring/count_animation";
import { monitoringColumns } from "@/components/monitoring/monitoring_columns";
import { MonitoringTable } from "@/components/monitoring/monitoring_table";
import {
  // useMonitoring,
  useStatusMonitoring,
} from "@/services/monitoring/monitoring.queries";
import { Suspense } from "react";

export default function Monitoring() {
  // const { data: monitoring, error: errorMonitoring } = useMonitoring();
  const { status, statusError } = useStatusMonitoring();

  // if (errorMonitoring) return <p>Error: {errorMonitoring.message}</p>;
  {
    /* <p>Total PO : {monitoring?.totalPO ?? "Loading..."}</p>
  <ul>
    {monitoring?.countsByCreator.map(
      (item: { name: string; count: number }) => (
        <li key={item.name}>
          {item.name}: {item.count}
        </li>
      )
    ) ?? <p>Loading...</p>}
  </ul> */
  }
  if (statusError) return <p>Error: {statusError.message}</p>;
  return (
    <div className="container mx-auto py-2">
      <div className="">
        <StatusCards statuses={status} />
      </div>
      <Suspense>
        <MonitoringTable columns={monitoringColumns} />
      </Suspense>
    </div>
  );
}

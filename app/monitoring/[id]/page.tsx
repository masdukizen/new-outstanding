import MonitoringDetails from "@/components/monitoring/monitoring details";
import { Suspense } from "react";

export default function MonitoringId() {
  return (
    <div className="container mx-auto py-2">
      <Suspense>
        <MonitoringDetails />
      </Suspense>
    </div>
  );
}

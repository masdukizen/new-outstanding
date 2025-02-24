"use client";
import { Po } from "@/types/po";
import { useEffect, useState } from "react";
import { Skeleton } from "../ui/skeleton";
import { formatDate } from "@/lib/utils";

export default function MonitoringDetails() {
  const [monitoringData, setMonitoringData] = useState<Po | null>(null);
  const [hasChecked, setHasChecked] = useState(false);
  useEffect(() => {
    const stored = sessionStorage.getItem("monitoringData");
    if (stored) {
      setMonitoringData(JSON.parse(stored));
    }
    setHasChecked(true);
  }, [setMonitoringData]);
  if (!hasChecked)
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:max-w-[90%] gap-4 bg-gray-50 p-5 rounded-2xl">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((_, index) => (
          <div key={index} className="border-b space-y-2">
            <Skeleton className="h-5 w-1/2" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        ))}
      </div>
    );

  return (
    <>
      {!monitoringData ? (
        <p>Data hanya dapat diakses melalui table Monitoring!</p>
      ) : (
        <section className="mb-10">
          <h1 className="text-lg font-semibold underline underline-offset-2 mb-7">
            Po Details
          </h1>
          <article className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:max-w-[90%] gap-4 bg-gray-50 p-5 rounded-2xl">
            {[
              { label: "Po Number", value: monitoringData?.po_number },
              { label: "Po item", value: monitoringData?.po_items },
              { label: "Order Date", value: monitoringData?.create_at },
              { label: "File Name", value: monitoringData?.file_name },
              {
                label: "Aging Supply",
                value: monitoringData?.aging_supply
                  ? monitoringData?.aging_supply
                  : "Aging supply is remaining...",
              },
              { label: "Due Date", value: monitoringData?.due_date },
              { label: "Plan Date", value: monitoringData?.plan_date },
              { label: "Ready Date", value: monitoringData?.ready_date },
              {
                label: "Remarks On Supply",
                value: monitoringData?.remarks_on_supply,
              },
              { label: "Status", value: monitoringData?.status },
              { label: "Create By", value: monitoringData?.createdBy?.name },
              { label: "Supplier", value: monitoringData?.supplier?.name },
            ].map((item, index) => (
              <div key={index} className="border-b">
                <small className="text-gray-500">{item.label}:</small>
                <p className="text-sm">
                  {item.label.includes("Date")
                    ? formatDate(
                        typeof item.value === "number"
                          ? new Date(item.value)
                          : item.value ?? undefined
                      )
                    : String(item.value ?? "-")}
                </p>
              </div>
            ))}
          </article>
        </section>
      )}
    </>
  );
}

import { formatDate } from "@/lib/utils";
import { Po } from "@/types/po";
import { useEffect, useState } from "react";
import { Skeleton } from "../ui/skeleton";
export default function ArchiveDetails() {
  const [archiveData, setArchiveData] = useState<Po | null>(null);
  const [hasChecked, setHasChecked] = useState(false);

  useEffect(() => {
    const stored = sessionStorage.getItem("archiveData");
    if (stored) {
      setArchiveData(JSON.parse(stored));
    }
    setHasChecked(true);
  }, [setArchiveData]);
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
      {!archiveData ? (
        <p>Data hanya dapat diakses melalui table archive!</p>
      ) : (
        <section className="mb-10">
          <h1 className="text-lg font-semibold underline underline-offset-2 mb-7">
            Po Details
          </h1>
          <article className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:max-w-[90%] gap-4 bg-gray-50 p-5 rounded-2xl">
            {[
              { label: "Po Number", value: archiveData?.po_number },
              { label: "Po item", value: archiveData?.po_items },
              { label: "Order Date", value: archiveData?.create_at },
              { label: "File Name", value: archiveData?.file_name },
              { label: "Aging Supply", value: archiveData?.aging_supply },
              { label: "Due Date", value: archiveData?.due_date },
              { label: "Plan Date", value: archiveData?.plan_date },
              { label: "Ready Date", value: archiveData?.ready_date },
              {
                label: "Remarks On Supply",
                value: archiveData?.remarks_on_supply,
              },
              { label: "Status", value: archiveData?.status },
              { label: "Create By", value: archiveData?.createdBy?.name },
              { label: "Supplier", value: archiveData?.supplier?.name },
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

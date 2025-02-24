"use client";
import { Po } from "@/types/po";
import { Skeleton } from "../ui/skeleton";
import { formatDate } from "@/lib/utils";
import ActionOrder from "./ActionOrder";
import { useEffect, useState } from "react";
import { User } from "@/types/user";

interface PoProps {
  po?: Po;
  isLoading: boolean;
}
export default function ItemDescription({ po, isLoading }: PoProps) {
  const [session, setSession] = useState<User | null>(null);
  const [isSessionLoaded, setIsSessionLoaded] = useState<boolean>(false);
  useEffect(() => {
    const fetchSession = async () => {
      const res = await fetch("/api/auth/session");
      const data = await res.json();
      setSession(data);
      setIsSessionLoaded(true);
    };
    fetchSession();
  }, []);
  return (
    <>
      <section className="mb-10">
        <h1 className="text-lg font-semibold underline underline-offset-2 mb-7">
          Po Details
        </h1>
        <article className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:max-w-[90%] gap-4 bg-gray-50 p-5 rounded-2xl">
          {isLoading
            ? [1, 2, 3, 4, 5, 6, 7, 8].map((_, index) => (
                <div key={index} className="border-b space-y-2">
                  <Skeleton className="h-5 w-1/2" />
                  <Skeleton className="h-4 w-3/4" />
                </div>
              ))
            : [
                { label: "PO Number", value: po?.po_number },
                { label: "PO Items", value: po?.po_items },
                { label: "Order Date", value: po?.create_at },
                { label: "Due Date", value: po?.due_date || "-" },
                { label: "Plan Date", value: po?.plan_date || "-" },
                { label: "Raedy Date", value: po?.ready_date || "-" },
                {
                  label: "Remarks On Supply",
                  value: po?.remarks_on_supply || "-",
                },
                { label: "Status", value: po?.status },
              ].map((item, index) => (
                <div key={index} className="border-b">
                  <small className="text-gray-500">{item.label}:</small>
                  <p className="text-sm">
                    {item.label.includes("Date")
                      ? formatDate(item.value)
                      : String(item.value ?? "-")}
                  </p>
                </div>
              ))}
        </article>
      </section>
      <section>
        {!isLoading && isSessionLoaded && session?.role === "Supplier" ? (
          <ActionOrder data={po} />
        ) : null}
      </section>
    </>
  );
}

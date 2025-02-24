"use client";
import SupplierDetails from "@/components/supplier/supplier_details";
import { useParams } from "next/navigation";
import { Suspense } from "react";

export default function DetailSupplier() {
  const params = useParams();
  const id = typeof params.id === "string" ? params.id : "";
  return (
    <Suspense>
      <SupplierDetails id={id} />
    </Suspense>
  );
}

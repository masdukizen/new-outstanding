"use client";
import FpaData from "@/components/fpa/fpa_details";
import { useParams } from "next/navigation";
import { Suspense } from "react";

export default function FpaDetails() {
  const params = useParams();
  const id = typeof params.id === "string" ? params.id : "";

  return (
    <div className="container mx-auto py-2">
      <h1 className="mb-10 font-bold text-2xl">FPA Details</h1>
      <Suspense>
        <FpaData fpaId={id} />
      </Suspense>
    </div>
  );
}

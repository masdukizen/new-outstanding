"use client";
import ItemDetails from "@/components/ordered_items/item_details";
import { Box } from "lucide-react";
import { useParams } from "next/navigation";
import { Suspense } from "react";

export default function OrderedItemDetails() {
  const params = useParams();
  const id = typeof params.id === "string" ? params.id : "";
  return (
    <div className="container mx-auto py-2">
      <div className="flex gap-2 items-center mb-14 ">
        <Box size={22} /> <h1 className="text-2xl">Item Details</h1>
      </div>
      <Suspense>
        <ItemDetails poId={id} />
      </Suspense>
    </div>
  );
}

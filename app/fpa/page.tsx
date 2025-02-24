import { FpaTable } from "@/components/fpa/fpa_table";
import { Suspense } from "react";

export default function Fpa() {
  return (
    <div className="container mx-auto py-2">
      <Suspense>
        <FpaTable />
      </Suspense>
    </div>
  );
}

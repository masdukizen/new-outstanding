import { SupplierTable } from "@/components/supplier/supplier_table";
import { Suspense } from "react";

export default function Supplier() {
  return (
    <div className="container mx-auto py-2">
      <Suspense>
        <SupplierTable />
      </Suspense>
    </div>
  );
}

import { auth } from "@/auth";
import { FpaTable } from "@/components/fpa/fpa_table";
import { FpaTableSupplier } from "@/components/fpa/fpa_table_supplier";
import { Suspense } from "react";

export default async function Fpa() {
  const session = await auth();
  return (
    <div className="container mx-auto py-2">
      {session?.user.role === "Supplier" ? (
        <Suspense>
          <FpaTableSupplier name={session?.user.name ?? ""} />
        </Suspense>
      ) : (
        <Suspense>
          <FpaTable />
        </Suspense>
      )}
    </div>
  );
}

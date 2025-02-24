import { auth } from "@/auth";
import { archiveColumns } from "@/components/archive/archive_columns";
import { ArchiveTable } from "@/components/archive/archive_table";
import { ArchiveTableSupplier } from "@/components/archive/archive_table_supplier";
import { Suspense } from "react";

export default async function Archive() {
  const session = await auth();
  return (
    <div className="container mx-auto py-2">
      {session?.user.role === "Supplier" ? (
        <Suspense>
          <ArchiveTableSupplier
            columns={archiveColumns}
            name={session?.user.name ?? ""}
          />
        </Suspense>
      ) : (
        <Suspense>
          <ArchiveTable columns={archiveColumns} />
        </Suspense>
      )}
    </div>
  );
}

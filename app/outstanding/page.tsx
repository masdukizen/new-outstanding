import { OutstandingTable } from "@/components/outstanding/outstanding-table";
import { Suspense } from "react";
import { columns } from "@/components/outstanding/columns";
import { auth } from "@/auth";
import { OrderedItemsTable } from "@/components/ordered_items/ordered_table";
import { columnsOrdered } from "@/components/ordered_items/columns";

export default async function Outstanding() {
  const session = await auth();
  return (
    <div className="container mx-auto py-2">
      {session?.user.role === "Supplier" ? (
        <Suspense>
          <OrderedItemsTable
            columns={columnsOrdered}
            name={session?.user.name ?? ""}
          />
        </Suspense>
      ) : (
        <Suspense>
          <OutstandingTable
            columns={columns}
            createdBy={session?.user.name ?? ""}
            role={session?.user.role ?? ""}
          />
        </Suspense>
      )}
    </div>
  );
}

import { columns } from "@/components/ordered_items/columns";
import { OrderedItemsTable } from "@/components/ordered_items/ordered_table";
import { Suspense } from "react";

export default function OrderedItems() {
  return (
    <div className="container mx-auto py-2">
      <Suspense>
        <OrderedItemsTable columns={columns} />
      </Suspense>
    </div>
  );
}

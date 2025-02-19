import { OutstandingTable } from "@/components/outstanding/outstanding-table";
import { Suspense } from "react";
import { columns } from "@/components/outstanding/columns";

export default function Outstanding() {
  return (
    <div className="container mx-auto py-2">
      <Suspense>
        <OutstandingTable columns={columns} />
      </Suspense>
    </div>
  );
}

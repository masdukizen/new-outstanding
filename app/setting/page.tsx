import { Suspense } from "react";
import { DataTable } from "../../components/table-user/data-table";

export default function Setting() {
  return (
    <div className="container mx-auto py-2">
      <Suspense>
        <DataTable />
      </Suspense>
    </div>
  );
}

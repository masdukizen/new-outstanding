import AddItemForm from "@/components/fpa/form_fpa";
import { Suspense } from "react";

export default function AddFpa() {
  return (
    <div className="container mx-auto py-2">
      <Suspense>
        <AddItemForm />
      </Suspense>
    </div>
  );
}

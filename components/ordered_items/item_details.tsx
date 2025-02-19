import { useOrdered } from "@/services/ordered_items/ordered.service";
import { Suspense } from "react";
import ItemDescription from "./item_description";

export default function ItemDetails({ poId }: { poId: string }) {
  const { data: po, error: isError, isLoading } = useOrdered(poId);
  if (isError) return <p>Error fetching Po data.</p>;
  return (
    <div>
      <Suspense>
        <ItemDescription po={po} isLoading={isLoading} />
      </Suspense>
    </div>
  );
}

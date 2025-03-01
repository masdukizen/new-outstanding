import { Item } from "@/types/item";
import { Skeleton } from "../ui/skeleton";
import { formatDate } from "@/lib/utils";

export default function FpaShow({
  item,
  isLoading,
}: {
  item?: Item;
  isLoading: boolean;
}) {
  return (
    <section className="mb-10">
      <article className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:max-w-[90%] gap-4 bg-gray-50 p-5 rounded-2xl">
        {isLoading
          ? [1, 2, 3, 4, 5, 6, 7, 8].map((_, index) => (
              <div key={index} className="border-b space-y-2">
                <Skeleton className="h-5 w-1/2" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            ))
          : [
              { label: "Contract No", value: item?.contract_no || "-" },
              {
                label: "Contract No Manual",
                value: item?.contract_no_manual || "-",
              },
              { label: "Efective Date", value: item?.effective_date || null },
              { label: "Expiry Date", value: item?.expiry_date || null },
              { label: "Stock Code", value: item?.stock_code || 0 },
              {
                label: "Stock Description",
                value: item?.stock_description || "-",
              },
              { label: "Part No", value: item?.part_no || "-" },
              { label: "Currency", value: item?.currency },
              { label: "Original Price", value: item?.original_price || 0 },
              { label: "Price USD", value: item?.price_usd || 0 },
              { label: "Discount", value: item?.discount || 0 },
              {
                label: "Price After Discount",
                value: item?.price_after_discount || 0,
              },
              { label: "Stock Class", value: item?.stock_class || "-" },
              { label: "Leadtime", value: item?.leadtime || 0 },
              {
                label: "Last Price Update Date",
                value: item?.last_price_update_date || null,
              },
              { label: "Stock Update", value: item?.stock_update || "-" },
              { label: "Remarks Stock", value: item?.remarks_stock || "-" },
              { label: "Supplier", value: item?.supplier?.name || "-" },
            ].map((item, index) => (
              <div key={index} className="border-b">
                <small className="text-gray-500">{item.label}:</small>
                <p className="text-sm">
                  {item.label.includes("Date") &&
                  (typeof item.value === "string" || item.value instanceof Date)
                    ? formatDate(item.value)
                    : String(item.value ?? "-")}
                </p>
              </div>
            ))}
      </article>
    </section>
  );
}

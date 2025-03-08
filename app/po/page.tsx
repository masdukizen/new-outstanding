import { auth } from "@/auth";
import DataTablePO from "@/components/sheet/data-table";
import { Suspense } from "react";
export default async function Po() {
  const session = await auth();
  return (
    <div>
      <Suspense>
        <DataTablePO
          user={session?.user.name ?? ""}
          role={session?.user.role ?? ""}
        />
      </Suspense>
    </div>
  );
}

// untuk mengecek tipe data dari columns
// function detectColumnTypes<T extends Record<string, unknown>>(data: T[]) {
//   const columnTypes: Record<keyof T, "number" | "date" | "string"> =
//     {} as Record<keyof T, "number" | "date" | "string">;

//   data.forEach((row) => {
//     Object.entries(row).forEach(([key, value]) => {
//       if (!columnTypes[key as keyof T]) {
//         if (typeof value === "number") {
//           columnTypes[key as keyof T] = "number";
//         } else if (typeof value === "string" && !isNaN(Date.parse(value))) {
//           columnTypes[key as keyof T] = "date";
//         } else {
//           columnTypes[key as keyof T] = "string";
//         }
//       }
//     });
//   });

//   return columnTypes;
// }

// const detectedTypes = React.useMemo(
//   () => detectColumnTypes(transformedData),
//   [transformedData]
// );

// console.log("Detected Column Types:", detectedTypes);

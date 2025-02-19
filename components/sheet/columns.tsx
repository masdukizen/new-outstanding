"use client";

import { POData } from "@/types/sheet";
import { HeaderContext, Row } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import ActionButton from "./ActionButton";

const columns = [
  {
    accessorKey: "PO_NO",
    header: ({ column }: HeaderContext<POData, unknown>) => {
      return (
        <section className="flex gap-2 items-center ">
          PO Number
          <div
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            <ArrowUpDown
              size={25}
              className="cursor-pointer hover:bg-gray-200 p-1 rounded-md hover:text-black"
            />
          </div>
        </section>
      );
    },
  },
  {
    accessorKey: "PO_item",
    header: "PO Item",
  },
  {
    accessorKey: "Stock_Code",
    header: "Stock Code",
  },
  {
    accessorKey: "Parts_Number",
    header: "Parts Number",
  },
  {
    accessorKey: "Goods_Description",
    header: "Goods Description",
  },
  {
    accessorKey: "Deskripsi_Pekerjaan",
    header: "Deskripsi Pekerjaan",
  },
  {
    accessorKey: "QTY",
    header: "QTY",
  },
  {
    accessorKey: "UOP",
    header: "UOP",
  },
  {
    accessorKey: "Aging",
    header: "Aging Supply",
  },
  {
    accessorKey: "Availibility",
    header: "Availibility",
  },
  {
    accessorKey: "Purchasing_Officer",
    header: "Purchasing Officer",
  },
  {
    accessorKey: "Supplier_Name",
    header: "Supplier Name",
  },
  {
    accessorKey: "PO_Authorized_Date",
    header: "PO Authorized Date",
  },
  {
    accessorKey: "PO_Due_Date__Estimate_Date",
    header: "PO Due Date / Estimate Date",
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }: { row: Row<POData> }) => <ActionButton row={row} />,
  },
];
export default columns;

"use client";
import { Item } from "@/types/item";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "../ui/button";
import { ArrowUpDown, FileSearch } from "lucide-react";
import { formatDate } from "@/lib/utils";
import Link from "next/link";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export const fpaColumns: ColumnDef<Item>[] = [
  {
    accessorKey: "contract_no",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Contract No
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "contract_no_manual",
    header: "Contract No Manual",
  },
  {
    accessorKey: "effective_date",
    header: "Effective Date",
    cell: ({ row }) => {
      const rawDate = row.original.effective_date;
      const formattedDate = formatDate(rawDate.toLocaleString());
      return <span>{formattedDate}</span>;
    },
  },
  {
    accessorKey: "expiry_date",
    header: "Expiry Date",
    cell: ({ row }) => {
      const rawDate = row.original.expiry_date;
      const formattedDate = formatDate(rawDate.toLocaleString());
      return <span>{formattedDate}</span>;
    },
  },
  {
    accessorKey: "stock_code",
    header: "Stock Code",
  },
  {
    accessorKey: "stock_description",
    header: "Stock Description",
  },
  {
    accessorKey: "part_no",
    header: "Part No",
  },
  {
    accessorKey: "currency",
    header: "Currency",
  },
  {
    accessorKey: "original_price",
    header: "Original Price",
  },
  {
    accessorKey: "price_usd",
    header: "Price USD",
  },
  {
    accessorKey: "discount",
    header: "Discount",
  },
  {
    accessorKey: "price_after_discount",
    header: "Price After Discount",
  },
  {
    accessorKey: "stock_class",
    header: "Stock Class",
  },
  {
    accessorKey: "leadtime",
    header: "Leadtime",
  },
  {
    accessorKey: "last_price_update_date",
    header: "Last Price Update Date",
    cell: ({ row }) => {
      const rawDate = row.original.last_price_update_date;
      const formattedDate = formatDate(rawDate.toLocaleString());
      return <span>{formattedDate}</span>;
    },
  },
  {
    id: "supplierName",
    header: "Supplier Name",
    accessorFn: (row) => row.supplier?.name ?? "",
    cell: ({ getValue }) => getValue() || "-",
  },
  {
    id: "supplierNo",
    header: "Supplier No",
    accessorFn: (row) => row.supplier?.supplier_code ?? "",
    cell: ({ getValue }) => getValue() || "-",
  },
  {
    accessorKey: "stock_update",
    header: "Stock Update",
    cell: ({ row }) => {
      return row.original.stock_update ? (
        row.original.stock_update
      ) : (
        <span>-</span>
      );
    },
  },
  {
    accessorKey: "remarks_stock",
    header: "Remarks Stock",
    cell: ({ row }) => {
      return row.original.remarks_stock ? (
        row.original.remarks_stock
      ) : (
        <span>-</span>
      );
    },
  },
  {
    header: "Action",
    id: "actions",
    cell: ({ row }) => {
      const fpa = row.original;
      return (
        <div className="text-center">
          <Link href={`/fpa/${fpa.id}`}>
            <TooltipProvider delayDuration={100}>
              <Tooltip>
                <TooltipTrigger>
                  <FileSearch
                    size={25}
                    className="border p-1 text-blue-500 border-blue-500 rounded-sm hover:bg-blue-500 hover:text-white"
                  />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Detail</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </Link>
        </div>
      );
    },
  },
];

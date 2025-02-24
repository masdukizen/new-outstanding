"use client";
import { formatDate } from "@/lib/utils";
import { Po } from "@/types/po";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "../ui/button";
import { ArrowUpDown, FileSearch } from "lucide-react";
import Link from "next/link";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export const archiveColumns: ColumnDef<Po>[] = [
  {
    accessorKey: "po_number",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          PO Number
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "po_items",
    header: "PO Item",
  },
  {
    accessorKey: "createdBy.name",
    header: "Create By",
  },
  {
    id: "supplierName",
    header: "Supplier",
    accessorFn: (row) => row.supplier?.name ?? "",
    cell: ({ getValue }) => getValue() || "-",
  },
  {
    accessorKey: "create_at",
    header: "Order Date",
    cell: ({ row }) => {
      const rawDate = row.original.create_at;
      const formattedDate = formatDate(rawDate.toLocaleString());
      return <span>{formattedDate}</span>;
    },
  },
  {
    accessorKey: "due_date",
    header: "Due Date",
    cell: ({ row }) => {
      const rawDate = row.original.due_date;
      const formattedDate = formatDate(rawDate?.toLocaleString());
      return <span>{formattedDate}</span>;
    },
  },
  {
    accessorKey: "aging_supply",
    header: "Aging Supply",
  },
  {
    accessorKey: "plan_date",
    header: "Plan Date",
    cell: ({ row }) => {
      const rawDate = row.original.plan_date;
      const formattedDate = formatDate(rawDate?.toLocaleString());
      return <span>{formattedDate}</span>;
    },
  },
  {
    accessorKey: "ready_date",
    header: "Ready Date",
    cell: ({ row }) => {
      const rawDate = row.original.ready_date;
      const formattedDate = formatDate(rawDate?.toLocaleString());
      return <span>{formattedDate}</span>;
    },
  },
  {
    accessorKey: "file_name",
    header: "File Name",
    cell: ({ row }) => {
      const fileName = row.original.file_name;
      const fileUrl = `/uploads/${fileName}`;
      return (
        <Link
          href={fileUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-blue-800"
        >
          {fileName}
        </Link>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const statusPo = row.original;
      if (statusPo.status === "Finish")
        return <div className="text-zinc-600 font-bold">{statusPo.status}</div>;
    },
    filterFn: "arrIncludesSome",
  },
  {
    header: "Action",
    id: "actions",
    cell: ({ row }) => {
      const po = row.original;
      return (
        <div className="text-center">
          <Link
            href={`/archive/${po.id}`}
            onClick={() => {
              sessionStorage.setItem("archiveData", JSON.stringify(po));
            }}
          >
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

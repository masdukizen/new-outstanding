"use client";
import { formatDate } from "@/lib/utils";
import { Po } from "@/types/po";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "../ui/button";
import { ArrowUpDown } from "lucide-react";
import Link from "next/link";
import agingSupply from "@/lib/aging-supply";

export const columns: ColumnDef<Po>[] = [
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
      const dueDate = row.original.due_date;
      if (dueDate) {
        const formattedDate = formatDate(dueDate.toLocaleString());
        return <span>{formattedDate}</span>;
      }
      return <span>-</span>;
    },
  },
  {
    accessorKey: "aging_supply",
    header: "Aging Supply",
    cell: ({ row }) => {
      const aging = row.original.aging_supply;
      if (aging) {
        return <span>{aging}</span>;
      }
      const dueDate = row.original.due_date;
      const dateToPass =
        dueDate && (typeof dueDate === "string" ? new Date(dueDate) : dueDate);
      if (dateToPass instanceof Date && !isNaN(dateToPass.getTime())) {
        return <span>{agingSupply(dateToPass)}</span>;
      }

      return <span>{agingSupply(null)}</span>;
    },
  },
  {
    accessorKey: "plan_date",
    header: "Plan Date",
    cell: ({ row }) => {
      const planDate = row.original.plan_date;
      if (planDate) {
        const formattedDate = formatDate(planDate.toLocaleString());
        return <span>{formattedDate}</span>;
      }
      return <span>-</span>;
    },
  },
  {
    accessorKey: "ready_date",
    header: "Ready Date",
    cell: ({ row }) => {
      const readyDate = row.original.ready_date;
      if (readyDate) {
        const formattedDate = formatDate(readyDate.toLocaleString());
        return <span>{formattedDate}</span>;
      }
      return <span>-</span>;
    },
  },
  {
    accessorKey: "file_name",
    header: "File Name",
    cell: ({ row }) => {
      const fileName = row.original.file_name;
      const fileUrl = `/uploads/${fileName}`;

      return fileName ? (
        <Link
          href={fileUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-blue-800"
        >
          {fileName}
        </Link>
      ) : (
        <span className="text-gray-400">No File</span>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const statusPo = row.original;
      if (statusPo.status === "Waiting for feedback")
        return <div className="text-red-600 font-bold">{statusPo.status}</div>;
      if (statusPo.status === "Already in feedback")
        return (
          <div className="text-yellow-600 font-bold">{statusPo.status}</div>
        );
      if (statusPo.status === "Plan to delivery")
        return (
          <div className="text-green-600 font-bold">{statusPo.status}</div>
        );
      if (statusPo.status === "Ready to pickup")
        return <div className="text-blue-600 font-bold">{statusPo.status}</div>;
    },
    filterFn: "arrIncludesSome",
  },
  {
    accessorKey: "remarks_on_supply",
    header: "Remaks",
    cell: ({ row }) => {
      const remarks = row.original.remarks_on_supply;
      const remarksData = remarks ? <span>{remarks}</span> : <span>-</span>;
      return remarksData;
    },
  },
  {
    header: "Action",
    id: "actions",
    cell: ({ row }) => {
      const data = row.original;
      return (
        <Link
          href={`/ordered_items/${data.id}`}
          className="text-xs px-3 py-2 rounded-3xl text-center bg-gradient-to-r from-neutral-600 to-neutral-800 text-white hover:from-neutral-700 hover:to-neutral-950 shadow-2xl"
          prefetch={true}
        >
          Detail
        </Link>
      );
    },
  },
];

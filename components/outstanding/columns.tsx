"use client";
import { formatDate } from "@/lib/utils";
import { Po } from "@/types/po";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "../ui/button";
import { ArrowUpDown } from "lucide-react";
import Link from "next/link";
import ActionCell from "./ActionCell";
import agingSupply from "@/lib/aging-supply";
import PoFinishForm from "./ActionFinish";

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
    id: "createdByName",
    header: "Create By",
    accessorFn: (row) => row.createdBy?.name ?? "",
    cell: ({ getValue }) => getValue() || "-",
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
      if (statusPo.status === "Finish")
        return <div className="text-zinc-600 font-bold">{statusPo.status}</div>;
    },
    filterFn: "arrIncludesSome",
  },
  {
    header: "Action",
    id: "actions",
    cell: ({ row }) => {
      const statusPo = row.original.status;
      if (statusPo === "Ready to pickup") {
        return <PoFinishForm data={row.original} />;
      } else if (statusPo === "Finish") {
        return null;
      } else {
        return <ActionCell data={row.original} />;
      }
    },
  },
];

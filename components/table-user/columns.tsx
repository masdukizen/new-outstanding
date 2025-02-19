"use client";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

import { Button } from "@/components/ui/button";

import { User } from "@/types/user";
import Link from "next/link";

const columns: ColumnDef<User>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "phone",
    header: "Phone",
    cell: ({ row }) => {
      return <div className="">{row.original.phone ?? "-"}</div>;
    },
  },
  {
    accessorKey: "supplier_code",
    header: "Supplier Code",
    cell: ({ row }) => {
      return (
        <div className="text-center">{row.original.supplier_code ?? "-"}</div>
      );
    },
  },
  {
    accessorKey: "pic_name",
    header: "Pic Name",
    cell: ({ row }) => {
      return <div className="text-center">{row.original.pic_name ?? "-"}</div>;
    },
  },
  {
    accessorKey: "address",
    header: "Address",
    cell: ({ row }) => {
      return <div className="text-center">{row.original.address ?? "-"}</div>;
    },
  },
  {
    accessorKey: "role",
    header: "Role",
  },
  {
    header: "Action",
    id: "actions",
    cell: ({ row }) => {
      const data = row.original;
      return (
        <Link
          href={`/setting/${data.id}`}
          className="text-xs px-3 py-2 rounded-3xl text-center bg-gradient-to-r from-neutral-600 to-neutral-800 text-white hover:from-neutral-700 hover:to-neutral-950 shadow-2xl"
          prefetch={true}
        >
          Detail
        </Link>
      );
    },
  },
];

export default columns;

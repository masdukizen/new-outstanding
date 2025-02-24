"use client";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, FileSearch } from "lucide-react";

import { Button } from "@/components/ui/button";

import { User } from "@/types/user";
import Link from "next/link";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const columnsSupplier: ColumnDef<User>[] = [
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
      return <div className="">{row.original.supplier_code ?? "-"}</div>;
    },
  },
  {
    accessorKey: "pic_name",
    header: "Pic Name",
    cell: ({ row }) => {
      return <div className="">{row.original.pic_name ?? "-"}</div>;
    },
  },
  {
    accessorKey: "address",
    header: "Address",
    cell: ({ row }) => {
      return <div className="">{row.original.address ?? "-"}</div>;
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
        <div className="text-center">
          <Link href={`/supplier/${data.id}`} prefetch={true}>
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

export default columnsSupplier;

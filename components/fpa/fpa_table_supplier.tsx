"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import * as React from "react";
import {
  ColumnFiltersState,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { Skeleton } from "../ui/skeleton";
import { fpaColumns } from "./fpa_columns";
import { useFpa } from "@/services/fpa/fpa.queries";
import Link from "next/link";
import { User } from "@/types/user";

export function FpaTableSupplier({ name }: { name: string }) {
  const [session, setSession] = React.useState<User | null>(null);
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([
    { id: "supplierName", value: name },
  ]);
  const { data: fpaData, isLoading } = useFpa(columnFilters);
  console.log(fpaData);
  const table = useReactTable({
    data: fpaData || [],
    columns: fpaColumns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
    },
  });
  React.useEffect(() => {
    const fetchSession = async () => {
      const res = await fetch("/api/auth/session");
      const data = await res.json();
      setSession(data);
    };
    fetchSession();
  }, []);
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">FPA</h1>
      <div className="flex items-center py-4 justify-between">
        <div className="min-w-[20rem] max-w-96">
          <Input
            placeholder="Filter Contract No...."
            value={
              (table.getColumn("contract_no")?.getFilterValue() as string) ?? ""
            }
            onChange={(event) =>
              table.getColumn("contract_no")?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
          />
        </div>
        {session?.role !== "Supplier" ? (
          <div className="self-end flex gap-2 items-center justify-center px-2">
            <Link
              href="/fpa/addFpa"
              prefetch={true}
              className="border py-2 px-3 rounded-3xl text-sm hover:bg-gray-100"
            >
              Add Data
            </Link>
          </div>
        ) : null}
      </div>
      <div className="rounded-md border">
        <Table className="w-full table-auto ">
          <TableHeader className="bg-gray-100">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {isLoading ? (
              Array(5)
                .fill(0)
                .map((_, index) => (
                  <TableRow key={index}>
                    {fpaColumns.map((_, i) => (
                      <TableCell key={i}>
                        <Skeleton className="h-6 w-full" />
                      </TableCell>
                    ))}
                  </TableRow>
                ))
            ) : table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => {
                    const columnId = cell.column.id;
                    return (
                      <TableCell
                        key={cell.id}
                        style={
                          [
                            "contract_no_manual",
                            "effective_date",
                            "expiry_date",
                            "stock_description",
                            "stock_class",
                            "last_price_update_date",
                            "supplierName",
                            "remarks_stock",
                            "part_no",
                          ].includes(columnId)
                            ? {
                                width: "250px",
                                minWidth: "200px",
                                maxWidth: "400px",
                                textAlign: "left",
                              }
                            : {}
                        }
                        className=""
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={fpaColumns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-end space-x-2 py-4">
        {isLoading ? (
          <Skeleton className="h-8 w-32" />
        ) : (
          <div className="flex items-center space-x-6 lg:space-x-8">
            <div className="flex items-center space-x-2">
              <p className="text-sm font-medium">Rows per page</p>
              <Select
                value={`${table.getState().pagination.pageSize}`}
                onValueChange={(value) => table.setPageSize(Number(value))}
              >
                <SelectTrigger className="h-8 w-[70px]">
                  <SelectValue
                    placeholder={table.getState().pagination.pageSize}
                  />
                </SelectTrigger>
                <SelectContent side="top">
                  {[10, 20, 30, 40, 50].map((pageSize) => (
                    <SelectItem key={pageSize} value={`${pageSize}`}>
                      {pageSize}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex w-[100px] items-center justify-center text-sm font-medium">
              Page {table.getState().pagination.pageIndex + 1} of{" "}
              {table.getPageCount()}
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                className="hidden h-8 w-8 p-0 lg:flex"
                onClick={() => table.setPageIndex(0)}
                disabled={!table.getCanPreviousPage()}
              >
                <span className="sr-only">Go to first page</span>
                <ChevronsLeft />
              </Button>
              <Button
                variant="outline"
                className="h-8 w-8 p-0"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
              >
                <span className="sr-only">Go to previous page</span>
                <ChevronLeft />
              </Button>
              <Button
                variant="outline"
                className="h-8 w-8 p-0"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
              >
                <span className="sr-only">Go to next page</span>
                <ChevronRight />
              </Button>
              <Button
                variant="outline"
                className="hidden h-8 w-8 p-0 lg:flex"
                onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                disabled={!table.getCanNextPage()}
              >
                <span className="sr-only">Go to last page</span>
                <ChevronsRight />
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

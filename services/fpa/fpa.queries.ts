"use client";
import useSWR from "swr";
import fetcher from "../fetcher";
import { User } from "@/types/user";
import { Item } from "@/types/item";
import { ColumnFiltersState } from "@tanstack/react-table";

export function useFpa(columnFilters: ColumnFiltersState) {
  const supplierNameFilter = columnFilters.find(
    (filter) => filter.id === "supplierName"
  )?.value as string | undefined;
  let url = `/api/fpa`;
  const params = new URLSearchParams();
  if (supplierNameFilter) {
    params.append("supplierName", supplierNameFilter);
  }
  if (params.toString()) {
    url = `/api/fpa?${params.toString()}`;
  }
  console.log("Filters:", columnFilters);
  console.log("Fetching URL:", url);
  const { data, error, mutate, isLoading } = useSWR(url, fetcher, {
    fallbackData: { results: [], totalPages: 1, totalItems: 0 },
  });
  return { data, error, mutate, isLoading };
}

export function useSupplierData() {
  const { data, error, isLoading, mutate } = useSWR<User[]>(
    "api/users/supplier-stats",
    fetcher
  );
  return {
    data,
    error,
    mutate,
    isLoading,
  };
}

export function useFpaById(id: string) {
  return useSWR<Item>(`/api/fpa/${id}`);
}

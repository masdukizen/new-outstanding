"use client";
import useSWR from "swr";
import fetcher from "../fetcher";
import { User } from "@/types/user";

export function useFpa() {
  const { data, error, mutate, isLoading } = useSWR("/api/fpa", fetcher, {
    keepPreviousData: true,
    revalidateOnFocus: false,
    refreshInterval: 300000,
    dedupingInterval: 60000,
    fallbackData: { results: [], totalPages: 1, totalItems: 0 },
  });
  return { data, error, mutate, isLoading };
}

export function useSupplierData() {
  const { data, error, isLoading, mutate } = useSWR<User[]>(
    "api/users/supplier-stats",
    fetcher,
    {
      keepPreviousData: true,
      revalidateOnFocus: false,
      refreshInterval: 300000,
      dedupingInterval: 60000,
    }
  );
  return {
    data,
    error,
    mutate,
    isLoading,
  };
}

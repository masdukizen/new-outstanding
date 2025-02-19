import useSWR from "swr";
import fetcher from "../fetcher";
import { POData } from "@/types/sheet";

export function useSheets() {
  const { data, error, mutate, isValidating } = useSWR<POData[]>(
    `/api/sheets`,
    fetcher,
    {
      keepPreviousData: true,
      revalidateOnFocus: false,
      dedupingInterval: 60000,
      refreshInterval: 300000,
    }
  );

  return {
    data: data || [],
    error,
    mutate,
    isLoading: !data && !error && isValidating,
    totalItems: data ? data.length : 0,
  };
}

export function useSupplier(supplier: string) {
  return useSWR(`/api/users/${supplier}`);
}
export function useUserSession() {
  return useSWR("/api/auth/session");
}

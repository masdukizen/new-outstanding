import useSWR from "swr";
import fetcher from "../fetcher";
import { User } from "@/types/user";
import { ColumnFiltersState } from "@tanstack/react-table";

export function useUsers(
  pageIndex: number,
  pageSize: number,
  columnFilters: ColumnFiltersState
) {
  const roleFilter = columnFilters.find(
    (filter) => filter.id === "role"
  )?.value;
  const { data, error, mutate, isLoading } = useSWR(
    `/api/users?page=${pageIndex + 1}&limit=${pageSize}&role=${roleFilter}`,
    fetcher,
    {
      keepPreviousData: true,
      revalidateOnFocus: false,
      refreshInterval: 300000,
      dedupingInterval: 60000,
      fallbackData: { results: [], totalPages: 1, totalItems: 0 },
    }
  );

  return {
    data,
    totalItems: data?.totalItems || 0,
    error,
    mutate,
    isLoading,
  };
}

export function useUser(id: string) {
  return useSWR<User>(`/api/users/${id}`);
}

export const updateQueryParamAndMutate = (
  key: string,
  value: string,
  mutate: () => void
) => {
  const url = new URL(window.location.href);
  url.searchParams.set(key, value);
  window.history.pushState({}, "", url);
  mutate();
};

import useSWR from "swr";
// import fetcher from "../fetcher";
import { Po } from "@/types/po";
import { fetchToken } from "@/lib/useToken";
import axiosInstance from "../instance-fetch";
import { AxiosError } from "axios";
// import { ColumnFiltersState } from "@tanstack/react-table";

// export function useOrderedItems(columnFilters: ColumnFiltersState) {
//   const statusFilter = columnFilters.find((filter) => filter.id === "status")
//     ?.value as string | string[] | undefined;
//   let url = `/api/po`;
//   if (statusFilter) {
//     if (Array.isArray(statusFilter)) {
//       const params = new URLSearchParams();
//       statusFilter.forEach((status) => params.append("status", status));
//       url = `/api/po?${params.toString()}`;
//     } else {
//       url = `/api/po?status=${encodeURIComponent(statusFilter)}`;
//     }
//   }
//   const { data, error, mutate, isLoading } = useSWR(url, fetcher, {
//     keepPreviousData: true,
//     revalidateOnFocus: false,
//     refreshInterval: 300000,
//     dedupingInterval: 60000,
//     fallbackData: { results: [], totalPages: 1, totalItems: 0 },
//   });
//   return { data, error, mutate, isLoading };
// }

export function useOrdered(id: string) {
  return useSWR<Po>(`/api/po/${id}`);
}

export const updateOrdered = async (
  url: string,
  { arg }: { arg: Partial<Po> }
) => {
  const token = await fetchToken();

  try {
    const response = await axiosInstance.patch(url, arg, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    });

    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError<{
      error?: string;
      message?: string;
    }>;

    const errorMessage =
      axiosError.response?.data?.error ||
      axiosError.response?.data?.message ||
      "Something went wrong";

    throw new Error(errorMessage);
  }
};

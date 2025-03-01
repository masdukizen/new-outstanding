import useSWR, { mutate } from "swr";
import fetcher from "../fetcher";
import { fetchToken } from "@/lib/useToken";
import axiosInstance from "../instance-fetch";
import useSWRMutation from "swr/mutation";
import { useToast } from "@/hooks/use-toast";
import { ColumnFiltersState } from "@tanstack/react-table";
import { Po } from "@/types/po";

export function useOutstanding(columnFilters: ColumnFiltersState) {
  const statusFilter = columnFilters.find((filter) => filter.id === "status")
    ?.value as string | string[] | undefined;
  const supplierNameFilter = columnFilters.find(
    (filter) => filter.id === "supplierName"
  )?.value as string | undefined;
  let url = `/api/po`;
  const params = new URLSearchParams();
  if (statusFilter) {
    if (Array.isArray(statusFilter)) {
      statusFilter.forEach((status) => params.append("status", status));
    } else {
      params.append("status", statusFilter);
    }
  }
  if (supplierNameFilter) {
    params.append("supplierName", supplierNameFilter);
  }

  if (params.toString()) {
    url = `/api/po?${params.toString()}`;
  }
  const { data, error, mutate, isLoading } = useSWR(url, fetcher, {
    keepPreviousData: true,
    revalidateOnFocus: false,
    refreshInterval: 5000,
    dedupingInterval: 60000,
    fallbackData: { results: [], totalPages: 1, totalItems: 0 },
  });
  return { data, error, mutate, isLoading };
}

const uploadFile = async (url: string, { arg }: { arg: FormData }) => {
  const token = await fetchToken();
  const response = await axiosInstance.patch(url, arg, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  return response.data;
};

export function useUpdatePO() {
  const { toast } = useToast();

  return useSWRMutation("/api/po", uploadFile, {
    onSuccess() {
      toast({
        variant: "success",
        title: "Success",
        description: "PO updated successfully",
      });

      mutate("/api/po");
    },
    onError(error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to update PO",
      });
    },
  });
}

export function useOutstandingDetail(id: string) {
  return useSWR<Po>(`/api/po/${id}`);
}

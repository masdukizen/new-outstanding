import useSWR, { mutate } from "swr";
import fetcher from "../fetcher";
// import { fetchToken } from "@/lib/useToken";
import axiosInstance from "../instance-fetch";
import useSWRMutation from "swr/mutation";
import { useToast } from "@/hooks/use-toast";

export function useOutstanding() {
  const { data, error, mutate, isLoading } = useSWR(`/api/po`, fetcher, {
    keepPreviousData: true,
    revalidateOnFocus: false,
    refreshInterval: 300000,
    dedupingInterval: 60000,
    fallbackData: { results: [], totalPages: 1, totalItems: 0 },
  });
  return { data, error, mutate, isLoading };
}

const uploadFile = async (url: string, { arg }: { arg: FormData }) => {
  // const token = await fetchToken();
  const response = await axiosInstance.patch(
    url,
    arg
    //   {
    //   headers: {
    //     Authorization: `Bearer ${token}`,
    //   },
    //   withCredentials: true,
    // }
  );
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

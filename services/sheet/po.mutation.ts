import axiosInstance from "../instance-fetch";
import useSWRMutation from "swr/mutation";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";
import { fetchToken } from "@/lib/useToken";

const uploadPO = async (url: string, { arg }: { arg: FormData }) => {
  const token = await fetchToken();
  const response = await axiosInstance.post(url, arg, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  return response.data;
};

const deletePO = async (url: string, { arg }: { arg: { id: string } }) => {
  const token = await fetchToken();

  const response = await axiosInstance.delete(`${url}?id=${arg.id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  return response.data;
};

export function useDeletePo() {
  const { toast } = useToast();
  return useSWRMutation("/api/po", deletePO, {
    onSuccess() {
      toast({
        variant: "success",
        title: "Success",
        description: "PO deleted successfully",
      });
    },
    onError(error) {
      if (axios.isAxiosError(error) && error.response) {
        const errorMessage =
          error.response.data.error || "Input error occurred";
        toast({
          variant: "destructive",
          title: "Error",
          description: `Error sent PO: ${errorMessage}`,
        });
      }
    },
  });
}
export function useUploadPO() {
  const { toast } = useToast();
  return useSWRMutation("/api/po", uploadPO, {
    onSuccess() {
      toast({
        variant: "success",
        title: "Success",
        description: "PO sent successfully",
      });
    },
  });
}

export const sendMessage = async (body: { nomor: string; pesan: string }) => {
  try {
    return await axiosInstance.post("/api/send-message", body);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Axios Error:", error.response?.data || error.message);
    } else {
      console.error("Unexpected Error:", error);
    }
  }
};

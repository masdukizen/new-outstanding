import { fetchToken } from "@/lib/useToken";
import { Item } from "@/types/item";
import axiosInstance from "../instance-fetch";
import { AxiosError } from "axios";

export const addItem = async (url: string, { arg }: { arg: Partial<Item> }) => {
  const token = await fetchToken();

  try {
    const response = await axiosInstance.post(url, arg, {
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

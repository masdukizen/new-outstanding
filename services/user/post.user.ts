import { AddUserData, User } from "@/types/user";
import axiosInstance from "../instance-fetch";
import { AxiosError } from "axios";
import { fetchToken } from "@/lib/useToken";

export const updateUser = async (
  url: string,
  { arg }: { arg: Partial<User> & { password?: string } }
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

export const addUser = async (
  url: string,
  { arg }: { arg: Partial<AddUserData> }
) => {
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

export const deleteUser = async (url: string) => {
  const token = await fetchToken();
  try {
    const response = await axiosInstance.delete(url, {
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

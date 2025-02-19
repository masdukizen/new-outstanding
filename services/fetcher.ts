import { fetchToken } from "@/lib/useToken";
import axiosInstance from "./instance-fetch";

const fetcher = async (url: string) => {
  const token = await fetchToken();

  return axiosInstance
    .get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    })
    .then((res) => res.data);
};

export default fetcher;
// import { fetchToken } from "@/lib/useToken";
// import axiosInstance from "./instance-fetch";

// const fetcher = async (url: string) => {
//   const token = await fetchToken();

//   return axiosInstance.get(url).then((res) => res.data);
// };

// export default fetcher;

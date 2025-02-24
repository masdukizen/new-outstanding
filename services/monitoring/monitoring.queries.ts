"use client";
import useSWR from "swr";
import fetcher from "../fetcher";

export function useMonitoring() {
  const { data, error } = useSWR("/api/po/stats", fetcher);
  return { data, error };
}

export function useStatusMonitoring() {
  const { data: status, error: statusError } = useSWR(
    "/api/po/status-stats",
    fetcher
  );
  return { status, statusError };
}

export function useMonthlyPOCount() {
  const { data, error } = useSWR("/api/po/monthly-stats", fetcher);

  return {
    monthlyStats: data,
    isLoading: !error && !data,
    error,
  };
}

import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatDate = (date?: string | Date) => {
  if (!date) return "-"; // Tangani undefined/null langsung

  const parsedDate = date instanceof Date ? date : new Date(date);

  if (isNaN(parsedDate.getTime())) return "-"; // Cek apakah tanggal valid

  return new Intl.DateTimeFormat("id-ID", { dateStyle: "medium" }).format(
    parsedDate
  );
};

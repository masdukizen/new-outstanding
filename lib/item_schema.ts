import { z } from "zod";

export const ItemSchema = z.object({
  contract_no: z
    .string()
    .trim()
    .min(1, { message: "Contract No must be at least 1 characters long" })
    .max(50, { message: "Contract No cannot exceed 50 characters" }),
  contract_no_manual: z
    .string()
    .trim()
    .min(1, { message: "Contract No must be at least 1 characters long" })
    .max(50, { message: "Contract No cannot exceed 50 characters" }),
  effective_date: z.coerce
    .date({ required_error: "Effective date is required" })
    .refine((date) => !isNaN(date.getTime()), {
      message: "Invalid date format",
    }),
  expiry_date: z.coerce
    .date({ required_error: "Expiry date is required" })
    .refine((date) => !isNaN(date.getTime()), {
      message: "Invalid date format",
    }),
  stock_code: z
    .number()
    .int()
    .min(1, { message: "Stock Code must be at least 1 number" })
    .positive("Stock Code use positif number"),
  stock_description: z
    .string()
    .trim()
    .min(1, { message: "Stock Description must be at least 1 characters long" })
    .max(50, { message: "Stock Description cannot exceed 50 characters" }),
  part_no: z
    .string()
    .trim()
    .min(1, { message: "Part No must be at least 1 characters long" })
    .max(50, { message: "Part No cannot exceed 50 characters" }),
  original_price: z
    .number()
    .int()
    .min(1, { message: "Original price must be at least 1 number" })
    .positive("Original price use positif number"),
  price_usd: z.number().positive("Price USD must be at least 1 number"),
  discount: z.number().int().positive("Discount use positif number"),
  price_after_discount: z
    .number()
    .int()
    .min(1, { message: "Price After Discount must be at least 1 number" })
    .positive("Price After Discount use positif number"),
  stock_class: z
    .string()
    .trim()
    .min(1, { message: "Stock Class must be at least 1 characters long" })
    .max(50, { message: "Stock Class cannot exceed 50 characters" }),
  leadtime: z
    .number()
    .int()
    .min(1, { message: "Leadtime must be at least 1 number" })
    .max(12, { message: "Leadtime cannot exceed 12 number" })
    .positive("Leadtime use positif number"),
  last_price_update_date: z.coerce
    .date({ required_error: "Last Price Update date is required" })
    .refine((date) => !isNaN(date.getTime()), {
      message: "Invalid date format",
    }),
  supplierId: z
    .string()
    .trim()
    .min(1, { message: "Supplier must be at least 1 characters long" })
    .max(50, { message: "Supplier cannot exceed 50 characters" }),
});

// stock_update: z
//   .string()
//   .trim()
//   .min(1, { message: "Stock Update must be at least 1 characters long" })
//   .max(50, { message: "Stock Update cannot exceed 50 characters" }),
// remarks_stock: z
//   .string()
//   .trim()
//   .min(1, { message: "Remarks Stock must be at least 1 characters long" })
//   .max(50, { message: "Remarks Stock cannot exceed 50 characters" }),

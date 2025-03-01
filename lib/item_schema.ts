import { z } from "zod";

export const ItemSchema = z.object({
  contract_no: z
    .string()
    .trim()
    .min(1, { message: "Contract No must be at least 1 characters long" }),
  contract_no_manual: z
    .string()
    .trim()
    .min(1, { message: "Contract No must be at least 1 characters long" }),
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
  stock_code: z.number().int().nonnegative("Stock Code use positif number"),
  stock_description: z
    .string()
    .trim()
    .min(1, { message: "Stock Description must be at least 1 characters long" })
    .max(100, { message: "Stock Description cannot exceed 50 characters" }),
  part_no: z
    .string()
    .trim()
    .min(1, { message: "Part No must be at least 1 characters long" }),
  original_price: z
    .number()
    .int()
    .min(1, { message: "Original price must be at least 1 number" })
    .positive("Original price use positif number"),
  price_usd: z.number().positive("Price USD must be at least 1 number"),
  discount: z.number().int().nonnegative("Discount use positif number"),
  price_after_discount: z
    .number()
    .int()
    .min(1, { message: "Price After Discount must be at least 1 number" })
    .positive("Price After Discount use positif number"),
  stock_class: z
    .string()
    .trim()
    .min(1, { message: "Stock Class must be at least 1 characters long" }),
  leadtime: z.number().int().nonnegative("Leadtime use positif number"),
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

export const UpdateItemSchema = ItemSchema.omit({ supplierId: true });
export const UpdateItemSuprSchema = z.object({
  stock_update: z
    .string()
    .trim()
    .regex(/^\d+$/, { message: "Stock Update must be a positive number" })
    .min(1, { message: "Stock Update must be at least 1 characters long" }),
  remarks_stock: z
    .string()
    .trim()
    .min(1, { message: "Remarks Stock must be at least 1 characters long" }),
});

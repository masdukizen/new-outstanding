import { z } from "zod";

export const poSchema = z.object({
  po_number: z.string().min(1, "PO Number is required"),
  po_items: z.string().min(1, "PO Items is required"),
  supplierId: z.string(),
  userId: z.string(),
  file: z
    .instanceof(File, { message: "File is required" })
    .refine((file) => file.size > 0, "File cannot be empty"),
});

export const fileSchema = z.object({
  file: z
    .instanceof(File, { message: "File is required" })
    .refine((file) => file.size > 0, "File cannot be empty"),
});

export const dueSchema = z.object({
  remarks_on_supply: z.string().min(1, "Remarks is required"),
  status: z.string(),
  due_date: z.coerce
    .date({ required_error: "Due date is required" })
    .refine((date) => !isNaN(date.getTime()), {
      message: "Invalid date format",
    }),
});

export const planSchema = dueSchema.omit({ due_date: true }).extend({
  plan_date: z.coerce
    .date({ required_error: "Plan date is required" })
    .refine((date) => !isNaN(date.getTime()), {
      message: "Invalid date format",
    }),
});
export const readySchema = dueSchema.omit({ due_date: true }).extend({
  ready_date: z.coerce
    .date({ required_error: "Plan date is required" })
    .refine((date) => !isNaN(date.getTime()), {
      message: "Invalid date format",
    }),
});

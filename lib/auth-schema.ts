import { z } from "zod";

const formSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, { message: "Name must be at least 2 characters long" })
    .max(50, { message: "Name cannot exceed 50 characters" }),
  email: z
    .string()
    .email({ message: "Please enter a valid email address" })
    .min(2)
    .max(50),
  role: z
    .string()
    .refine((val) => ["Admin", "Supplier", "User"].includes(val), {
      message: "Role harus berupa Admin, Supplier, atau User",
    }),
  supplier_code: z.string().trim().optional().default(""),
  pic_name: z.string().trim().optional().default(""),
  phone: z
    .string()
    .optional()
    .default("")
    .refine((val) => !val || /^62\d+$/.test(val), {
      message:
        "Nomor harus diawali dengan '62' dan hanya boleh berisi angka (tanpa spasi atau tanda '-').",
    }),
  address: z.string().trim().optional().default(""),
  password: z
    .string()
    .trim()
    .min(8, { message: "Password must be at least 8 characters long" })
    .max(50, { message: "Password cannot exceed 50 characters" }),
  confirmPassword: z
    .string()
    .trim()
    .min(8, { message: "Confirm password must be at least 8 characters long" })
    .max(50, { message: "Confirm password cannot exceed 50 characters" }),
});

export const signUpSchema = formSchema
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  })
  .superRefine((data, ctx) => {
    if (data.role === "Supplier") {
      if (!data.supplier_code) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Supplier code wajib diisi",
          path: ["supplier_code"],
        });
      }
      if (!data.pic_name) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "PIC Name wajib diisi",
          path: ["pic_name"],
        });
      }
      if (!data.phone) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Nomor telepon wajib diisi",
          path: ["phone"],
        });
      }
      if (!data.address) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Alamat wajib diisi",
          path: ["address"],
        });
      }
    }
  });
export const signInFormSchema = formSchema.pick({
  email: true,
  password: true,
});

export const updateUserSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(2, { message: "Name must be at least 2 characters long" }),
    email: z.string().email({ message: "Please enter a valid email address" }),
    role: z.enum(["Admin", "Supplier", "User"]),
    supplier_code: z.string().trim().optional(),
    pic_name: z.string().trim().optional(),
    phone: z
      .string()
      .refine((val) => /^62\d+$/.test(val), {
        message: "Nomor harus diawali dengan '62'.",
      })
      .optional(),
    address: z.string().trim().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.role === "Supplier") {
      if (!data.supplier_code) {
        ctx.addIssue({
          code: "custom",
          path: ["supplier_code"],
          message: "Supplier Code harus diisi",
        });
      }
      if (!data.pic_name) {
        ctx.addIssue({
          code: "custom",
          path: ["pic_name"],
          message: "PIC Name harus diisi",
        });
      }
      if (!data.phone) {
        ctx.addIssue({
          code: "custom",
          path: ["phone"],
          message: "Phone harus diisi",
        });
      }
      if (!data.address) {
        ctx.addIssue({
          code: "custom",
          path: ["address"],
          message: "Address harus diisi",
        });
      }
    }
  });
export const updatePasswordSchema = z.object({
  password: z.string().min(8, "Password must be at least 8 characters"),
});

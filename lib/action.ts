"use server";

import { signIn, signOut } from "@/auth";
import { signUpSchema } from "./auth-schema";
import { prisma } from "./prisma";
import { hashSync } from "bcrypt-ts";
import { AuthError } from "next-auth";
import { AddUserData } from "@/types/user";

export const signUpCredential = async (data: AddUserData) => {
  const hashPasword = hashSync(data.password, 10);
  try {
    const credentialSignUp = signUpSchema.safeParse(data);

    if (!credentialSignUp.success)
      return { success: false, message: "Invalid data." };

    const existUser = await prisma.user.findFirst({
      where: {
        OR: [{ email: data.email }, { supplier_code: data.supplier_code }],
      },
    });

    if (existUser) {
      if (existUser.email === data.email)
        throw new Error("User with this email already exists.");

      if (existUser.supplier_code === data.supplier_code)
        throw new Error("Supplier code already exists.");
    }

    await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        role: data.role,
        supplier_code: data.supplier_code,
        pic_name: data.pic_name,
        phone: data.phone,
        address: data.address,
        password: hashPasword,
      },
    });

    return { success: true, message: "Success create account" };
  } catch (error) {
    return { success: false, message: `${error}` };
  }
};

export const signInCredential = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: "/dashboard",
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { message: "Invalid password" };
        default:
          return { message: "User not found" };
      }
    }
    throw error;
  }
};

export const handleSignOut = async () => {
  await signOut({ redirectTo: "/" });
};

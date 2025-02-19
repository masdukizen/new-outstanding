import { prisma } from "@/lib/prisma";
import { User } from "@/types/user";
import { Prisma } from "@prisma/client";

export const getUsers = async (skip: number, take: number): Promise<User[]> => {
  return await prisma.user.findMany({
    skip,
    take,
    orderBy: {
      id: "asc",
    },
  });
};

export const getCountUsers = async () => {
  return await prisma.user.count();
};

export const getUserByIdentifier = async (where: {
  id?: string;
  name?: string;
}): Promise<User> => {
  try {
    return await prisma.user.findFirstOrThrow({
      where,
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2025") throw Error(`Data not found`);
    }
    throw new Error("Database error: " + (error as Error).message);
  }
};

export const createUser = async (
  data: Prisma.UserCreateInput
): Promise<User> => {
  try {
    return await prisma.user.create({
      data,
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002")
        throw Error(`Field ${error?.meta?.target} already axist!`);
    }
    throw new Error("Database error: " + (error as Error).message);
  }
};

export const updateUser = async (
  id: string,
  data: Prisma.UserUpdateInput
): Promise<User> => {
  try {
    if (data.email) {
      const existingEmailUser = await prisma.user.findUnique({
        where: { email: data.email as string },
      });
      if (existingEmailUser && existingEmailUser.id !== id) {
        throw new Error(`Email : "${data.email}" already axist!`);
      }
    }

    if (data.supplier_code) {
      const existingSupplierCodeUser = await prisma.user.findUnique({
        where: { supplier_code: data.supplier_code as string },
      });
      if (existingSupplierCodeUser && existingSupplierCodeUser.id !== id) {
        throw new Error(
          `Supplier code : "${data.supplier_code}" already axist!`
        );
      }
    }
    return prisma.user.update({
      where: {
        id,
      },
      data,
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        throw new Error(`Field ${error?.meta?.target} sudah ada!`);
      }
    }
    throw new Error((error as Error).message);
  }
};

export const deleteUser = async (id: string): Promise<void> => {
  await prisma.user.delete({
    where: {
      id,
    },
  });
};

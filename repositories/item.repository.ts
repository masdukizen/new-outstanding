import { prisma } from "@/lib/prisma";
import { Item } from "@/types/item";
import { Prisma } from "@prisma/client";

export const getItems = async (supplierName?: string): Promise<Item[]> => {
  return await prisma.item.findMany({
    where: {
      ...(supplierName ? { supplier: { name: supplierName } } : {}),
    },
    include: {
      supplier: true,
    },
  });
};

export const createitem = async (
  data: Prisma.ItemCreateInput
): Promise<Item> => {
  try {
    return await prisma.item.create({
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

export const getItemById = async (id: string): Promise<Item> => {
  try {
    return await prisma.item.findFirstOrThrow({
      where: {
        id,
      },
      include: {
        supplier: true,
      },
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2025") throw Error(`Data not found`);
    }
    throw new Error("Database error: " + (error as Error).message);
  }
};

export const updateItem = async (
  id: string,
  data: Prisma.ItemUpdateInput
): Promise<Item> => {
  try {
    if (data.stock_code) {
      const existingStockCode = await prisma.item.findUnique({
        where: { stock_code: data.stock_code as number },
      });
      if (existingStockCode && existingStockCode.id !== id) {
        throw new Error(`Stock Code : "${data.stock_code}" already already!`);
      }
    }

    return prisma.item.update({
      where: {
        id,
      },
      data,
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        throw new Error(`Field ${error?.meta?.target} already already!`);
      }
    }
    throw new Error((error as Error).message);
  }
};

export const deleteItem = async (id: string): Promise<void> => {
  await prisma.item.delete({
    where: {
      id,
    },
  });
};

import { prisma } from "@/lib/prisma";
import { Item } from "@/types/item";
import { Prisma } from "@prisma/client";

export const getItems = async (): Promise<Item[]> => {
  return await prisma.item.findMany({
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

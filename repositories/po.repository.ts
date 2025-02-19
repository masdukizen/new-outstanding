import { prisma } from "@/lib/prisma";
import { Po } from "@/types/po";
import { Prisma } from "@prisma/client";

export const getPO = async (): Promise<Po[]> => {
  return await prisma.po.findMany({
    include: {
      createdBy: true,
    },
  });
};

export const createPo = async (
  data: Prisma.PoUncheckedCreateInput
): Promise<Po> => {
  try {
    return await prisma.po.create({
      data,
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002")
        throw Error(`field ${error?.meta?.target} already axist`);
    }
    throw new Error("Database error: " + (error as Error).message);
  }
};

export const existingPo = async ({
  po_number,
  po_items,
}: {
  po_number: string;
  po_items: string;
}) => {
  return await prisma.po.findFirst({
    where: {
      po_number,
      po_items,
    },
  });
};

export const existingFile = async (file_name: string) => {
  return await prisma.po.findFirst({
    where: {
      file_name,
    },
  });
};

export const getPoById = async (id: string): Promise<Po | null> => {
  try {
    return await prisma.po.findFirstOrThrow({
      where: { id },
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2025") throw Error(`Data not found`);
    }
    throw new Error("Database error: " + (error as Error).message);
  }
};

export const updatePo = async ({
  id,
  file_name,
}: {
  id: string;
  file_name: string;
}): Promise<Po> => {
  try {
    return await prisma.po.update({
      where: {
        id,
      },
      data: {
        file_name,
      },
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2025") throw Error(`Data not found`);
    }
    throw new Error("Database error: " + (error as Error).message);
  }
};

export const deletePo = async (id: string): Promise<void> => {
  await prisma.po.delete({
    where: {
      id,
    },
  });
};

export const updatedOrderedItem = async (
  id: string,
  data: Prisma.PoUpdateInput
): Promise<Po> => {
  try {
    return await prisma.po.update({
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

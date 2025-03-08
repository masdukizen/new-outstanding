import { prisma } from "@/lib/prisma";
import { Po } from "@/types/po";
import { Prisma } from "@prisma/client";

export const getPO = async ({
  status,
  supplierName,
  createdBy,
}: {
  status?: string[];
  supplierName?: string;
  createdBy?: string;
}): Promise<Po[]> => {
  return await prisma.po.findMany({
    where: {
      ...(status && status.length > 0 ? { status: { in: status } } : {}),
      ...(supplierName ? { supplier: { name: supplierName } } : {}),
      ...(createdBy ? { createdBy: { name: createdBy } } : {}),
    },
    include: {
      createdBy: true,
      supplier: true,
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

export const getPOCountsWithCreatorNames = async (): Promise<
  { name: string; count: number }[]
> => {
  const groups = await prisma.po.groupBy({
    by: ["userId"],
    _count: { id: true },
    where: { userId: { not: null } },
  });

  // Untuk setiap group, ambil nama user dari tabel User
  const countsWithNames = await Promise.all(
    groups.map(async (group) => {
      const user = await prisma.user.findUnique({
        where: { id: group.userId! },
      });
      return {
        name: user?.name || "Unknown",
        count: group._count.id,
      };
    })
  );
  return countsWithNames;
};

export const getPOCountsByStatus = async (): Promise<
  { status: string; count: number }[]
> => {
  const groups = await prisma.po.groupBy({
    by: ["status"],
    _count: { id: true },
  });
  // Map hasil agar sesuai dengan format yang diinginkan
  return groups.map((group) => ({
    status: group.status,
    count: group._count.id,
  }));
};

export const getTotalPO = async (): Promise<number> => {
  return await prisma.po.count();
};

export const getMonthlyPOCount = async () => {
  const monthlyData = await prisma.$queryRaw<{ month: Date; total: bigint }[]>`
    SELECT DATE_TRUNC('month', "create_at") AS month, COUNT(*) AS total
    FROM "Po"
    GROUP BY month
    ORDER BY month;
  `;

  // Jika perlu konversi misalnya total ke number
  return monthlyData.map((data) => ({
    month: data.month,
    total: Number(data.total),
  }));
};

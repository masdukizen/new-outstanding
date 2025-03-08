import { Po } from "@/types/po";
import { Prisma } from "@prisma/client";
import * as PoRepository from "@/repositories/po.repository";

export const fetchPo = async ({
  status,
  supplierName,
  createdBy,
}: {
  status?: string[];
  supplierName?: string;
  createdBy?: string;
}): Promise<Po[]> => {
  return await PoRepository.getPO({ status, supplierName, createdBy });
};

export const addPo = async (
  data: Prisma.PoUncheckedCreateInput
): Promise<Po> => {
  return await PoRepository.createPo(data);
};

export const getExistingPo = async ({
  po_number,
  po_items,
}: {
  po_number: string;
  po_items: string;
}) => {
  return await PoRepository.existingPo({ po_number, po_items });
};

export const getPoByFileName = async (file_name: string) => {
  return await PoRepository.existingFile(file_name);
};

export const fetchPoById = async (id: string) => {
  return await PoRepository.getPoById(id);
};

export const updatePoById = async ({
  id,
  file_name,
}: {
  id: string;
  file_name: string;
}): Promise<Po | null> => {
  return await PoRepository.updatePo({ id, file_name });
};

export const removePo = async (id: string): Promise<void> => {
  await PoRepository.getPoById(id);
  await PoRepository.deletePo(id);
};

export const modifyPo = async (
  id: string,
  data: Prisma.PoUpdateInput
): Promise<Po> => {
  return await PoRepository.updatedOrderedItem(id, data);
};

export const getPOStats = async (): Promise<{
  totalPO: number;
  countsByCreator: { name: string; count: number }[];
}> => {
  // Mendapatkan jumlah total PO dari repository
  const totalPO = await PoRepository.getTotalPO();
  // Mendapatkan jumlah PO per createdBy dari fungsi groupBy (misalnya getPOCountsWithCreatorNames)
  const countsByCreator = await PoRepository.getPOCountsWithCreatorNames();

  return { totalPO, countsByCreator };
};

// export const getPOStatsByStatus = async (): Promise<
//   { status: string; count: number }[]
// > => {
//   return await PoRepository.getPOCountsByStatus();
// };
export const getPOStatsByStatus = async (): Promise<
  { status: string; count: number }[]
> => {
  const defaultStatuses = [
    "Waiting for feedback",
    "Already in feedback",
    "Plan to delivery",
    "Ready to pickup",
    "Finish",
  ];

  const groups = await PoRepository.getPOCountsByStatus();
  // Buat object lookup untuk count dari group
  const countsLookup = groups.reduce((acc, { status, count }) => {
    acc[status] = count;
    return acc;
  }, {} as Record<string, number>);

  return defaultStatuses.map((status) => ({
    status,
    count: countsLookup[status] || 0,
  }));
};

export const fetchPoByMonth = async () => {
  return await PoRepository.getMonthlyPOCount();
};

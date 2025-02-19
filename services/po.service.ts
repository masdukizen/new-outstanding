import { Po } from "@/types/po";
import { Prisma } from "@prisma/client";
import * as PoRepository from "@/repositories/po.repository";

export const fetchPo = async (): Promise<Po[]> => {
  return await PoRepository.getPO();
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

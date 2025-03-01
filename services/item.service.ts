import * as ItemRepository from "@/repositories/item.repository";
import { Item } from "@/types/item";
import { Prisma } from "@prisma/client";

export const fetchItems = async (supplierName?: string): Promise<Item[]> => {
  return await ItemRepository.getItems(supplierName);
};

export const addItem = async (data: Prisma.ItemCreateInput): Promise<Item> => {
  return await ItemRepository.createitem(data);
};

export const fetchItemById = async (id: string): Promise<Item> => {
  return await ItemRepository.getItemById(id);
};

export const modifyItem = async (
  id: string,
  data: Prisma.ItemUpdateInput
): Promise<Item> => {
  await ItemRepository.getItemById(id);

  return await ItemRepository.updateItem(id, data);
};

export const removeItem = async (id: string): Promise<void> => {
  await ItemRepository.getItemById(id);
  await ItemRepository.deleteItem(id);
};

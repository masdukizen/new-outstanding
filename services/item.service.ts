import * as ItemRepository from "@/repositories/item.repository";
import { Item } from "@/types/item";
import { Prisma } from "@prisma/client";

export const fetchItems = async (): Promise<Item[]> => {
  return await ItemRepository.getItems();
};

export const addItem = async (data: Prisma.ItemCreateInput): Promise<Item> => {
  return await ItemRepository.createitem(data);
};

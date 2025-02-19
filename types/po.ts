import { User } from "./user";

export type Po = {
  id: string;
  po_number: string;
  po_items: string;
  create_at: Date;
  file_name: string;
  aging_supply?: number | null;
  due_date?: Date | null;
  plan_date?: Date | null;
  ready_date?: Date | null;
  remarks_on_supply?: string | null;
  status: string;
  supplierId?: string | null;
  userId?: string | null;
  createdBy?: User | null;
};

export type PoUncheckedCreateInput = {
  po_number: string;
  po_items: string;
  create_at?: Date | string;
  file_name: string;
  supplierId?: string | null;
  userId?: string | null;
};

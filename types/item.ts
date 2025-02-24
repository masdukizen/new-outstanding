import { User } from "./user";

export type Item = {
  id: string;
  contract_no: string;
  contract_no_manual: string;
  effective_date: Date;
  expiry_date: Date;
  stock_code: number;
  stock_description: string;
  part_no: string;
  currency: string;
  original_price: number;
  price_usd: number;
  discount: number;
  price_after_discount: number;
  stock_class: string;
  leadtime: number;
  last_price_update_date: Date;
  stock_update?: string | null;
  remarks_stock?: string | null;
  supplierId?: string | null;
  supplier?: User | null;
};

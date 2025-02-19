export type User = {
  id: string;
  name: string;
  email: string;
  password?: string;
  supplier_code?: string | null;
  pic_name?: string | null;
  phone?: string | null;
  address?: string | null;
  role: string;
};

export interface ServerActionResponse {
  success: boolean;
  message: string;
}

export type AddUserData = {
  name: string;
  email: string;
  role: string;
  password: string;
  confirmPassword: string;
  supplier_code?: string;
  pic_name?: string;
  phone?: string;
  address?: string;
};

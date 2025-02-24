import { User } from "@/types/user";
import * as UserRepository from "@/repositories/user.repository";
import { Prisma } from "@prisma/client";
import { hash, hashSync } from "bcrypt-ts";

export const fetchUsers = async ({
  skip,
  take,
  role,
}: {
  skip: number;
  take: number;
  role?: string;
}): Promise<User[]> => {
  return await UserRepository.getUsers({ skip, take, role });
};

export const countUser = async ({ role }: { role?: string }) => {
  return await UserRepository.getCountUsers({ role });
};

export const fetchUserByIdentifier = async (
  identifier: string,
  isCUID: boolean
): Promise<User> => {
  const where = isCUID ? { id: identifier } : { name: identifier };
  return await UserRepository.getUserByIdentifier(where);
};

export const addUser = async (data: Prisma.UserCreateInput): Promise<User> => {
  const hashedPassword = await hash(data.password, 10);
  const userData = {
    ...data,
    password: hashedPassword,
  };
  return await UserRepository.createUser(userData);
};

export const modifyUser = async (
  id: string,
  isCUID: boolean,
  data: Prisma.UserUpdateInput
): Promise<User> => {
  const where = isCUID ? { id } : { name: id };
  await UserRepository.getUserByIdentifier(where);

  if (data.password) {
    if (typeof data.password !== "string") {
      data.password = (data.password as { set: string }).set;
    }

    const hashedPassword = hashSync(data.password, 10);

    const userPass: Prisma.UserUpdateInput = {
      password: { set: hashedPassword },
    };

    return await UserRepository.updateUser(id, userPass);
  }
  const userDataToUpdate: Prisma.UserUpdateInput = {
    ...data,
  };
  delete userDataToUpdate.password;

  return await UserRepository.updateUser(id, userDataToUpdate);
};

export const removeUser = async (
  id: string,
  isCUID: boolean
): Promise<void> => {
  const where = isCUID ? { id } : { name: id };
  await UserRepository.getUserByIdentifier(where);
  await UserRepository.deleteUser(id);
};

export const fetchAllUser = async (): Promise<Pick<User, "id" | "name">[]> => {
  return await UserRepository.getAllUser();
};

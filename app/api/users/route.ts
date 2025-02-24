import * as UserService from "@/services/user.service";
import { verifyAuthToken } from "@/services/route-auth";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const isAuthorized = await verifyAuthToken(request);
  if (isAuthorized instanceof NextResponse) return isAuthorized;

  try {
    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get("page") || "1", 10);
    const limit = parseInt(url.searchParams.get("limit") || "10", 10);
    const role = url.searchParams.get("role");
    const skip = (page - 1) * limit;
    const take = limit;

    const users = await UserService.fetchUsers({
      skip,
      take,
      role: role ?? undefined,
    });
    const totalItems = await UserService.countUser({ role: role ?? undefined });
    const totalPages = Math.ceil(totalItems / limit);

    return NextResponse.json({
      results: users,
      totalPages: totalPages,
      currentPage: page,
      totalItems: totalItems,
    });
  } catch (error) {
    return NextResponse.json(
      {
        message: "Failed to fetch users",
        error: (error as Error).message,
      },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  const isAuthorized = await verifyAuthToken(request);
  if (isAuthorized instanceof NextResponse) return isAuthorized;

  try {
    const userData = await request.json();
    const user = await UserService.addUser(userData);
    return NextResponse.json(user, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 400 }
    );
  }
}

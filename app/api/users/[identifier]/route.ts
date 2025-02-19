import { verifyAuthToken } from "@/services/route-auth";
import { NextRequest, NextResponse } from "next/server";
import * as UserService from "@/services/user.service";
const cuidRegex = /^c[a-z0-9]{24}$/;

export async function GET(request: NextRequest) {
  const isAuthorized = await verifyAuthToken(request);
  if (isAuthorized instanceof NextResponse) return isAuthorized;

  try {
    const identifier = decodeURIComponent(
      request.nextUrl.pathname.split("/").pop() || ""
    );

    if (!identifier) {
      return NextResponse.json(
        { message: "Identifier is required" },
        { status: 400 }
      );
    }

    const isCUID = cuidRegex.test(identifier);

    const user = await UserService.fetchUserByIdentifier(identifier, isCUID);

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch user", error: (error as Error).message },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  const isAuthorized = await verifyAuthToken(request);
  if (isAuthorized instanceof NextResponse) return isAuthorized;

  try {
    const id = decodeURIComponent(
      request.nextUrl.pathname.split("/").pop() || ""
    );
    if (!id) {
      return NextResponse.json(
        { message: "User ID is required" },
        { status: 400 }
      );
    }
    const isCUID = cuidRegex.test(id);
    const body = await request.json();
    const user = await UserService.modifyUser(id, isCUID, body);

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to update user", error: (error as Error).message },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  const isAuthorized = await verifyAuthToken(request);
  if (isAuthorized instanceof NextResponse) return isAuthorized;

  try {
    const id = decodeURIComponent(
      request.nextUrl.pathname.split("/").pop() || ""
    );
    if (!id) {
      return NextResponse.json(
        { message: "User ID is required" },
        { status: 400 }
      );
    }
    const isCUID = cuidRegex.test(id);
    await UserService.removeUser(id, isCUID);
    return NextResponse.json(
      { message: "User deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to delete user", error: (error as Error).message },
      { status: 500 }
    );
  }
}

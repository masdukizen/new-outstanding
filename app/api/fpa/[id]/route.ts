import { NextRequest, NextResponse } from "next/server";
import * as ItemService from "@/services/item.service";
export async function GET(request: NextRequest) {
  try {
    const id = request.nextUrl.pathname.split("/").pop() || "";
    if (!id) {
      return NextResponse.json(
        { message: "Identifier is required" },
        { status: 400 }
      );
    }
    const item = await ItemService.fetchItemById(id);
    return NextResponse.json(item, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch user", error: (error as Error).message },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const id = request.nextUrl.pathname.split("/").pop() || "";

    if (!id) {
      return NextResponse.json({ message: "ID is required" }, { status: 400 });
    }
    const body = await request.json();
    const item = await ItemService.modifyItem(id, body);

    if (!item) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json(item, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to update user", error: (error as Error).message },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const id = request.nextUrl.pathname.split("/").pop() || "";
    if (!id) {
      return NextResponse.json({ message: "ID is required" }, { status: 400 });
    }
    await ItemService.removeItem(id);
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

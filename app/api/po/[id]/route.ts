import { NextRequest, NextResponse } from "next/server";
import * as PoService from "@/services/po.service";
import { verifyAuthToken } from "@/services/route-auth";

export async function GET(request: NextRequest) {
  const isAuthorized = await verifyAuthToken(request);
  if (isAuthorized instanceof NextResponse) return isAuthorized;

  try {
    const id = request.nextUrl.pathname.split("/").pop() || "";
    if (!id) {
      return NextResponse.json(
        { message: "Identifier is required" },
        { status: 400 }
      );
    }
    const po = await PoService.fetchPoById(id);
    return NextResponse.json(po, { status: 200 });
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
    const id = request.nextUrl.pathname.split("/").pop() || "";
    if (!id) {
      return NextResponse.json(
        { message: "User ID is required" },
        { status: 400 }
      );
    }
    const body = await request.json();
    const po = await PoService.modifyPo(id, body);

    if (!po) {
      return NextResponse.json({ message: "Po not found" }, { status: 404 });
    }

    return NextResponse.json(po, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to update user", error: (error as Error).message },
      { status: 500 }
    );
  }
}

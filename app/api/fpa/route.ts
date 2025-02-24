import { NextRequest, NextResponse } from "next/server";
import * as ItemService from "@/services/item.service";
import { verifyAuthToken } from "@/services/route-auth";

export async function GET(request: NextRequest) {
  const isAuthorized = await verifyAuthToken(request);
  if (isAuthorized instanceof NextResponse) return isAuthorized;
  try {
    const items = await ItemService.fetchItems();
    return NextResponse.json(items, { status: 200 });
  } catch (error) {
    console.error("Error fetching items:", error);
    return NextResponse.json(
      {
        message: "Failed to fetch items",
        error: (error as Error).message,
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  const isAuthorized = await verifyAuthToken(request);
  if (isAuthorized instanceof NextResponse) return isAuthorized;
  try {
    const itemData = await request.json();
    const item = await ItemService.addItem(itemData);
    return NextResponse.json(item, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 400 }
    );
  }
}

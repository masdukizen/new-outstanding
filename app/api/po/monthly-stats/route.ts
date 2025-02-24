import { fetchPoByMonth } from "@/services/po.service";
import { verifyAuthToken } from "@/services/route-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const isAuthorized = await verifyAuthToken(request);
  if (isAuthorized instanceof NextResponse) return isAuthorized;
  try {
    const monthlyStats = await fetchPoByMonth();
    return NextResponse.json(monthlyStats);
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

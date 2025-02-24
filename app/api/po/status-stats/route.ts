import { NextRequest, NextResponse } from "next/server";
import { getPOStatsByStatus } from "@/services/po.service";
import { verifyAuthToken } from "@/services/route-auth";

export async function GET(request: NextRequest) {
  const isAuthorized = await verifyAuthToken(request);
  if (isAuthorized instanceof NextResponse) return isAuthorized;
  try {
    const statsByStatus = await getPOStatsByStatus();
    return NextResponse.json(statsByStatus);
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

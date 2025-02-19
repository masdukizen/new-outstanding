import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function verifyAuthToken(
  request: Request
): Promise<boolean | NextResponse> {
  const authHeader = request.headers.get("Authorization");
  const token = authHeader?.split(" ")[1];

  if (!token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const decodedToken = await getToken({
    req: request,
    secret: process.env.AUTH_SECRET,
  });

  if (!decodedToken) {
    return NextResponse.json({ message: "Invalid token" }, { status: 401 });
  }

  return true;
}

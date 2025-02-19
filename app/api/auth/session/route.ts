import { auth } from "@/auth";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await auth();

  if (!session) {
    return NextResponse.json({ user: null }, { status: 401 });
  }
  return NextResponse.json(session.user, { status: 200 });
}

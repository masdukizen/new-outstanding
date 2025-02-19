// import { cookies } from "next/headers";
// import { NextResponse } from "next/server";

// export async function GET() {
//   const cookieStore = await cookies();
//   const token = cookieStore.get("authjs.session-token")?.value;

//   if (!token) {
//     return NextResponse.json(
//       { success: false, message: "Unauthorized" },
//       { status: 401 }
//     );
//   }

//   return NextResponse.json({ token });
// }
// __Secure-authjs.session-token
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get("__Secure-authjs.session-token")?.value;
  console.log("🔍 Token dari cookie:", token);
  if (!token) {
    console.error("❌ Token tidak ditemukan, return 401");
    return NextResponse.json(
      { success: false, message: "Unauthorized" },
      { status: 401 }
    );
  }
  console.log("✅ Token diterima, lanjutkan validasi:", token);
  return NextResponse.json({ token });
}

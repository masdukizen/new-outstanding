export async function fetchToken(): Promise<string> {
  const tokenRes = await fetch("/api/auth/token", { credentials: "include" });
  if (!tokenRes.ok) {
    console.error("❌ Gagal mengambil token:", tokenRes.status);
    throw new Error("Unauthorized");
  }

  const { token } = await tokenRes.json();
  console.log("✅ Token berhasil diambil:", token);
  return token;
}

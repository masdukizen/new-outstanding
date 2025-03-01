export async function fetchToken(): Promise<string> {
  const tokenRes = await fetch("/api/auth/token", { credentials: "include" });
  if (!tokenRes.ok) {
    throw new Error("Unauthorized");
  }

  const { token } = await tokenRes.json();
  return token;
}

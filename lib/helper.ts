// helper.ts
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth"; // Adjust the import path as necessary

export async function getAuthHeaders() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user || !session.user.token) {
    throw new Error("Not authenticated");
  }

  const token = session.user.token;

  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
}

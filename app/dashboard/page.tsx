import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth"; // Adjust the import path as necessary
import { redirect } from "next/navigation";

export default async function Dashboard() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/auth/login");
  }

  redirect("/dashboard/overview");

  return null;
}

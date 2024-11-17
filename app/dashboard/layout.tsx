import MobileNav from "@/components/shared/mobileNav";
import Sidebar from "@/components/shared/sidebar";
import Header from "@/components/shared/header";
import { Toaster } from "@/components/ui/toaster";
import { Separator } from "@/components/ui/separator";
import { redirect, useRouter } from "next/navigation";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useSession } from "next-auth/react";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

const Layout = async ({ children }: { children: React.ReactNode }) => {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/login");
  }
  // Extract user data
  const user = session.user;
  const typee = user.type as string;

  return (
    <main className="root dark:bg-gray-900">
      <Sidebar role={typee} />
      <MobileNav />
      <div className="root-container bg-gray-100 dark:bg-gray-800">
        <div className="wrapper">
          <Header />

          <ScrollArea
            className="h-full w-full rounded-md border bg-white dark:bg-gray-900 dark:border-gray-700 p-4"
            dir="rtl"
          >
            {children}
          </ScrollArea>
        </div>
      </div>
      <Toaster />
    </main>
  );
};

export default Layout;

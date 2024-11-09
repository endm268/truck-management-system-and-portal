"use client";
import React, { useEffect, useState } from "react";
import MobileNav from "@/components/shared/mobileNav";
import Sidebar from "@/components/shared/sidebar";
import Header from "@/components/shared/header";
import { Toaster } from "@/components/ui/toaster";
import { Separator } from "@/components/ui/separator";
import { useRouter } from "next/navigation";
import { ScrollArea } from "@/components/ui/scroll-area";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="root dark:bg-gray-900">
      <Sidebar role={"admin"} />
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

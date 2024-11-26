"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "../ui/button";
import { ChevronLeft, ChevronRight, LogOut } from "lucide-react";
import { useState } from "react";
import { navLinks } from "@/constants/navLinks";
import { signOut } from "next-auth/react"; // Import signOut from NextAuth

interface SidebarProps {
  role: string;
}

const Sidebar = ({ role }: SidebarProps) => {
  const [collapse, setCollapse] = useState<boolean>(false);
  const pathname = usePathname();

  const handleLogout = () => {
      signOut({ callbackUrl: "/auth/login" });
  };

  return (
    <div className="sidebar">
      <div className="sidebar-container">
        {/* Sidebar toggle button */}
        <div className="sidebar-toggle">
          <Button onClick={() => setCollapse(!collapse)}>
            {!collapse ? (
              <ChevronRight className="w-4 h-4" />
            ) : (
              <ChevronLeft className="w-4 h-4" />
            )}
          </Button>
        </div>

        {/* Sidebar content */}
        {!collapse ? (
          <div className="sidebar-expanded mt-8">
            {/* Navigation */}
            <nav className="flex flex-col overflow-auto lg:flex">
              <ul className="flex w-full flex-col items-start gap-2 md:flex">
                {navLinks.map((link) => {
                  if (role && !link.visible?.includes(role)) return null;

                  const isActive = link.route === pathname;
                  const IconComponent = link.icon;

                  return (
                    <li
                      key={link.route}
                      className={`flex w-full whitespace-nowrap rounded-xl ${
                        isActive
                          ? "text-white bg-black dark:bg-white dark:text-black"
                          : ""
                      }`}
                    >
                      <Link
                        className="p-16-semibold flex justify-between size-full gap-4 p-4"
                        href={link.route}
                      >
                        <div className="flex items-center gap-4 text-xl">
                          <IconComponent className="h-5 w-5" />
                          {link.label}
                        </div>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>

            {/* Expanded Logout Button */}
            <Button
              onClick={handleLogout}
              className="mt-8 w-full bg-rose-700 hover:bg-rose-500 text-white flex gap-4"
            >
              <LogOut />
              <span>تسجيل الخروج</span>
            </Button>
          </div>
        ) : (
          <div className="sidebar-collapsed mt-8">
            {/* Collapsed Navigation */}
            <nav className="flex flex-col overflow-auto lg:flex">
              <ul className="flex w-full flex-col items-start gap-2 md:flex">
                {navLinks.map((link) => {
                  const isActive = link.route === pathname;
                  const IconComponent = link.icon;

                  if (link.visible?.includes(role))
                    return (
                      <li
                        key={link.route}
                        className={`flex w-full whitespace-nowrap rounded-xl ${
                          isActive
                            ? "text-white bg-black dark:bg-white dark:text-black"
                            : ""
                        }`}
                      >
                        <Link
                          className="p-16-semibold flex justify-center size-full gap-4 p-4"
                          href={link.route}
                        >
                          <IconComponent className="h-5 w-5" />
                        </Link>
                      </li>
                    );
                })}
              </ul>
            </nav>

            {/* Collapsed Logout Button */}
            <Button
              onClick={handleLogout}
              className="mt-8 w-full bg-rose-700 hover:bg-rose-500 text-white flex justify-center"
            >
              <LogOut className="h-5 w-5" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;

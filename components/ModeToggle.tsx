"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function ModeToggle() {
  const { setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <Sun className="rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 relative" />
          <Moon className="absolute rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">تغيير المظهر</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="start"
        className="flex flex-col justify-start items-end w-32 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 shadow-md dark:shadow-lg"
      >
        <DropdownMenuItem
          onClick={() => setTheme("light")}
          className="w-full flex justify-end cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          فاتح
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setTheme("dark")}
          className="w-full flex justify-end cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          داكن
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setTheme("system")}
          className="w-full flex justify-end cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          نظام
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

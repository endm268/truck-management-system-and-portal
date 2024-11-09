"use client";
import React from "react";
import { ModeToggle } from "../ModeToggle";
const Header = () => {
  return (
    <div className="hidden lg:flex justify-between items-center mb-4 p-4 rounded-md border bg-white dark:bg-gray-900">
      <div>
        <h1 className="text-2xl font-cairo">نظام ادارة الشاحنات و البوابة</h1>
      </div>
      <div className="flex items-center gap-4">
        <ModeToggle />
      </div>
    </div>
  );
};

export default Header;

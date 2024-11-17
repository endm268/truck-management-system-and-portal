"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { LucideIcon } from "lucide-react";

interface InputNumberIconProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  icon: LucideIcon;
}

const InputNumberIcon = React.forwardRef<
  HTMLInputElement,
  InputNumberIconProps
>(({ icon: Icon, className, ...props }, ref) => {
  return (
    <div className="relative flex items-center">
      {/* Left Side: Country Code */}
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
        <span className="mr-1 text-sm">218</span>
        <span className="text-sm">+</span>
      </div>

      {/* Input Field */}
      <Input
        ref={ref}
        className={`pl-16 pr-10 ${className}`} // Add padding for both left and right icons
        {...props}
      />

      {/* Right Side: Icon */}
      <div className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500">
        <Icon size={16} strokeWidth={2} aria-hidden="true" />
      </div>
    </div>
  );
});

InputNumberIcon.displayName = "InputNumberIcon";

export default InputNumberIcon;

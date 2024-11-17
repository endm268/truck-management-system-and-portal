// InputWithEndIcon.tsx
"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { LucideIcon } from "lucide-react";

interface InputWithEndIconProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  icon: LucideIcon;
}

const InputWithEndIcon = React.forwardRef<
  HTMLInputElement,
  InputWithEndIconProps
>(({ icon: Icon, className, ...props }, ref) => {
  return (
    <div className="relative">
      <Input ref={ref} className={`peer pr-9 ${className}`} {...props} />
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-muted-foreground/80 peer-disabled:opacity-50">
        <Icon size={16} strokeWidth={2} aria-hidden="true" />
      </div>
    </div>
  );
});

InputWithEndIcon.displayName = "InputWithEndIcon";

export default InputWithEndIcon;

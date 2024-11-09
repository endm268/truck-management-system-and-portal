// components/HeaderPage.tsx
"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";


interface HeaderPageProps {
  title: string;
  disabled?: boolean;
  route?: string;
  icon?: React.ReactNode;
  buttonIcon?: React.ReactNode;
  buttonTitle?: string;
}

const HeaderPage: React.FC<HeaderPageProps> = ({
  title,
  disabled = false,
  route,
  icon,
  buttonIcon ,
  buttonTitle = "رجوع",
}) => {
  const router = useRouter();

  const handleBack = () => {
    if (route) {
      router.push(route);
    } else {
      router.back();
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="header-page p-4 rounded-xl flex flex-col md:flex-row justify-between items-center gap-4 md:gap-0">
        <div className="flex items-center gap-2 text-center md:text-left">
          {icon && <span className="text-lg md:text-2xl">{icon}</span>}
          <h1 className="text-lg md:text-2xl font-semibold">{title}</h1>
        </div>
        <div className="flex items-center gap-2">
          <Button
            onClick={handleBack}
            className="flex items-center gap-2 text-sm md:text-base"
          >
            <span>{buttonTitle}</span>
            {buttonIcon && <span>{buttonIcon}</span>}
          </Button>
        </div>
      </div>
      <Separator />
    </div>
  );
};

export default HeaderPage;

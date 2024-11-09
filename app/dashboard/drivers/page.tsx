import React from "react";
import HeaderPage from "@/components/shared/headerPage";
import { ArrowLeft, User } from "lucide-react";
import Drivers_listing from "./_components/drivers_listing";

const drivers = () => {
  return (
    <div className="flex flex-col gap-4">
      <HeaderPage
        title="ارادة السائقين"
        icon={<User className="h-6 w-6 text-gray-600 dark:text-gray-300" />}
        buttonIcon={
          <ArrowLeft className="h-4 w-4 text-gray-300 dark:text-gray-300" />
        }
        disabled
      />
      <div>
        <Drivers_listing />
      </div>
    </div>
  );
};

export default drivers;

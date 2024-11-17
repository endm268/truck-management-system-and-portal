import React from "react";
import HeaderPage from "@/components/shared/headerPage";
import { ArrowLeft, KeySquare, Plus, User } from "lucide-react";
import Drivers_listing from "./_components/drivers_listing";

const drivers = () => {
  return (
    <div className="flex flex-col gap-4">
      <HeaderPage
        title="ادارة سائقين"
        icon={
          <KeySquare className="h-6 w-6 text-gray-600 dark:text-gray-300" />
        }
        buttonIcon={
          <Plus className="h-4 w-4 text-gray-300 dark:text-gray-300" />
        }
        route="/dashboard/drivers/create"
        buttonTitle="اضافة سائق"
      />
      <div>
        <Drivers_listing />
      </div>
    </div>
  );
};

export default drivers;

import HeaderPage from "@/components/shared/headerPage";
import { KeySquare, Redo2 } from "lucide-react";
import React from "react";
import DriverForm from "../../_components/driver_from";

const Update_user = ({ params }: { params: { driversid: string } }) => { 
  return (
    <div className="flex flex-col gap-4">
      <HeaderPage
        title="تعديل سائق"
        icon={
          <KeySquare className="h-6 w-6 text-gray-600 dark:text-gray-300" />
        }
        buttonIcon={
          <Redo2 className="h-4 w-4 text-gray-300 dark:text-gray-300" />
        }
      />
      <div className="container px-2">
        <DriverForm isUpdateMode={true} id={params.driversid} />
      </div>
    </div>
  );
};

export default Update_user;

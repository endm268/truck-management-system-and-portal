import React from "react";
import HeaderPage from "@/components/shared/headerPage";
import { ArrowLeft, Plus, User } from "lucide-react";
import Users_listing from "./_components/users_listing";

const Users = () => {
  return (
    <div className="flex flex-col gap-4">
      <HeaderPage
        title="ارادة المستخدمين"
        icon={<User className="h-6 w-6 text-gray-600 dark:text-gray-300" />}
        buttonIcon={
          <Plus className="h-4 w-4 text-gray-300 dark:text-gray-300" />
        }
        route="/dashboard/users/create"
        buttonTitle="اضافة مستخدم"
      />
      <div>
        <Users_listing />
      </div>
    </div>
  );
};

export default Users;

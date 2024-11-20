import HeaderPage from '@/components/shared/headerPage';
import { NotepadText, Plus } from 'lucide-react';
import React from 'react'
import Queuis_listing from './_components/queuis_listing';

const Queuis = () => {
  return (
    <div className="flex flex-col gap-4">
      <HeaderPage
        title="ادارة شاحنات"
        icon={
          <NotepadText className="h-6 w-6 text-gray-600 dark:text-gray-300" />
        }
        buttonIcon={
          <Plus className="h-4 w-4 text-gray-300 dark:text-gray-300" />
        }
        route="/dashboard/queuis/create"
        buttonTitle="اضافة لقائمة الانتظار"
      />
      <div>
        <Queuis_listing />
      </div>
    </div>
  );
}

export default Queuis
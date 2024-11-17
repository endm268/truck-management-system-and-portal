import HeaderPage from '@/components/shared/headerPage';
import { KeySquare, Plus, Redo2 } from 'lucide-react';
import React from 'react'
import Driver_from from '../_components/driver_from';

const Create_user = () => {
  return (
    <div className="flex flex-col gap-4">
      <HeaderPage
        title="اضافىة سائق"
        icon={
          <KeySquare className="h-6 w-6 text-gray-600 dark:text-gray-300" />
        }
        buttonIcon={
          <Redo2 className="h-4 w-4 text-gray-300 dark:text-gray-300" />
        }
      />
      <div className='container px-2'>
        <Driver_from />
      </div>
    </div>
  );
}

export default Create_user
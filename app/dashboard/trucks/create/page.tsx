import HeaderPage from '@/components/shared/headerPage';
import { KeySquare, Plus, Redo2 } from 'lucide-react';
import React from 'react'
import Truck_from from '../_components/trucks_from';

const Create_Trucks = () => {
  return (
    <div className="flex flex-col gap-4">
      <HeaderPage
        title="اضافىة شحنة"
        icon={
          <KeySquare className="h-6 w-6 text-gray-600 dark:text-gray-300" />
        }
        buttonIcon={
          <Redo2 className="h-4 w-4 text-gray-300 dark:text-gray-300" />
        }
      />
      <div className='container px-2'>
        <Truck_from />
      </div>
    </div>
  );
}

export default Create_Trucks;
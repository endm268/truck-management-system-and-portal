import HeaderPage from '@/components/shared/headerPage';
import { Car, KeySquare, Plus } from 'lucide-react';
import React from 'react'
import Trucks_listing from './_components/trucks_listing';

const Trucks = () => {
  return (
    <div className="flex flex-col gap-4">
      <HeaderPage
        title="ادارة شاحنات"
        icon={
          <Car className="h-6 w-6 text-gray-600 dark:text-gray-300" />
        }
        buttonIcon={
          <Plus className="h-4 w-4 text-gray-300 dark:text-gray-300" />
        }
        route="/dashboard/trucks/create"
        buttonTitle="اضافة شحنة"
      />
      <div>
        <Trucks_listing />
      </div>
    </div>
  );
}

export default Trucks
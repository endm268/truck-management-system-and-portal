import HeaderPage from '@/components/shared/headerPage';
import { NotebookPen, Redo2 } from 'lucide-react';
import React from 'react'
import Queu_from from '../_components/queu_from';

const Create_queue = () => {
  return (
    <div className="flex flex-col gap-4">
      <HeaderPage
        title="اضافىة لقائمة الانتظار"
        icon={
          <NotebookPen className="h-6 w-6 text-gray-600 dark:text-gray-300" />
        }
        buttonIcon={
          <Redo2 className="h-4 w-4 text-gray-300 dark:text-gray-300" />
        }
      />
      <div className="container px-2">
        <Queu_from />
      </div>
    </div>
  );
}

export default Create_queue
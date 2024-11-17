"use client";
import React, { useState } from "react";
import { useDriverStore } from "@/stores/useDriverStore";
import { Button } from "@/components/ui/button";
import { KeySquare, Pen, Printer, Redo2, Trash, ArrowLeft } from "lucide-react";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { useRouter } from "next/navigation";
import HeaderPage from "@/components/shared/headerPage";

const Truck_view = () => {
  const { selectedDriver, setSelectedDriver } = useDriverStore();
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const router = useRouter();

  const handleEdit = () => {
    router.push("/dashboard/drivers/update");
  };

  const handleDelete = () => {
    console.log("Delete action confirmed for:", selectedDriver);
    setIsAlertOpen(false);
  };

  const handlePrint = () => {
    router.push("/dashboard/drivers/print");
  };

  const handleReturn = () => {
    router.push("/dashboard/drivers");
  };

  if (!selectedDriver) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-gray-600 p-4">
        <p className="mb-4">لم يتم تحديد سائق للعرض.</p>
        <Button onClick={handleReturn} className="flex items-center space-x-1">
          <ArrowLeft className="h-4 w-4" />
          <span>العودة إلى قائمة السائقين</span>
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 p-6 bg-white shadow-md rounded-lg">
      <HeaderPage
        title="معلومات سائق"
        icon={
          <KeySquare className="h-6 w-6 text-gray-600 dark:text-gray-300" />
        }
        buttonIcon={
          <Redo2 className="h-4 w-4 text-gray-300 dark:text-gray-300" />
        }
      />

      {/* Top bar with action buttons */}
      <div className="flex justify-end gap-4 mb-6" dir="rtl">
        <Button
          variant="outline"
          onClick={handleEdit}
          className="text-gray-700 flex items-center space-x-1 rtl:space-x-reverse"
        >
          <Pen className="h-4 w-4" />
          <span>تحديث</span>
        </Button>

        <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
          <AlertDialogTrigger asChild>
            <Button
              variant="outline"
              className="text-gray-700 flex items-center space-x-1 rtl:space-x-reverse"
            >
              <Trash className="h-4 w-4" />
              <span>حذف</span>
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent dir="rtl">
            <AlertDialogHeader>
              <AlertDialogTitle className="text-red-500 text-right">
                تأكيد الحذف
              </AlertDialogTitle>
              <AlertDialogDescription className="text-right">
                هل أنت متأكد أنك تريد حذف هذا السجل؟ لا يمكن التراجع عن هذا
                الإجراء.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter className="flex rtl:space-x-reverse">
              <AlertDialogCancel onClick={() => setIsAlertOpen(false)}>
                إلغاء
              </AlertDialogCancel>
              <AlertDialogAction onClick={handleDelete}>حذف</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>

      {/* Driver details */}
      <div className="p-6">
        <h2 className="text-xl font-semibold mb-4 text-blue-600">
          عرض تفاصيل السائق
        </h2>
        <div className="space-y-3">
          <p className="text-gray-700">
            <span className="font-semibold text-gray-900">الاسم الكامل:</span>{" "}
            {selectedDriver.fullName}
          </p>
          <p className="text-gray-700">
            <span className="font-semibold text-gray-900">رقم الهاتف:</span>{" "}
            {selectedDriver.phoneNumber}
          </p>
          <p className="text-gray-700">
            <span className="font-semibold text-gray-900">رقم البطاقة:</span>{" "}
            {selectedDriver.cardId}
          </p>
          <p className="text-gray-700">
            <span className="font-semibold text-gray-900">
              رقم رخصة القيادة:
            </span>{" "}
            {selectedDriver.driverCardId}
          </p>
          <p className="text-gray-700">
            <span className="font-semibold text-gray-900">اسم أقرب صديق:</span>{" "}
            {selectedDriver.nearestFraindName}
          </p>
          <p className="text-gray-700">
            <span className="font-semibold text-gray-900">
              رقم هاتف أقرب صديق:
            </span>{" "}
            {selectedDriver.nearestFraindPhone}
          </p>
          <p className="text-gray-700">
            <span className="font-semibold text-gray-900">العنوان:</span>{" "}
            {selectedDriver.liveIn}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Truck_view;

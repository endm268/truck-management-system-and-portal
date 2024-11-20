"use client";
import React, { useState } from "react";
import { useTruckStore } from "@/stores/useTruckStore";
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

import { useToast } from "@/hooks/use-toast";
import { deleteCar } from "@/lib/services/trucksService";


const Truck_view = () => {
  const { selectedTruck, setSelectedTruck } = useTruckStore();
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const handleEdit = () => {
    if (selectedTruck) {
      router.push(`/dashboard/trucks/${selectedTruck.id}/update`);
    }
  };

  const handleDelete = async () => {
    if (!selectedTruck) return;

    try {
      await deleteCar(selectedTruck.id);
      toast({
        title: "نجاح",
        description: `تم حذف الشاحنة بنجاح.`,
      });
      setSelectedTruck(null); // Clear the selected truck
      router.push("/dashboard/trucks"); // Navigate back to the truck list
    } catch (error) {
      console.error("Error deleting truck:", error);
      toast({
        variant: "destructive",
        title: "حدث خطأ",
        description: "تعذر حذف الشاحنة. حاول مجددًا لاحقًا.",
      });
    }

    setIsAlertOpen(false); // Close the alert dialog
  };

  const handlePrint = () => {
    if (selectedTruck) {
      router.push(`/dashboard/trucks/${selectedTruck.id}/print`);
    }
  };

  const handleReturn = () => {
    router.push("/dashboard/trucks");
  };

  if (!selectedTruck) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-gray-600 p-4">
        <p className="mb-4">لم يتم تحديد شاحنة للعرض.</p>
        <Button onClick={handleReturn} className="flex items-center space-x-1">
          <ArrowLeft className="h-4 w-4" />
          <span>العودة إلى قائمة الشاحنات</span>
        </Button>
      </div>
    );
  }
  
  return (
    <div className="flex flex-col gap-6 p-6 bg-white shadow-md rounded-lg">
      <HeaderPage
        title="معلومات الشاحنة"
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

      {/* Truck details */}
      <div className="p-6">
        <h2 className="text-xl font-semibold mb-4 text-blue-600">
          عرض تفاصيل الشاحنة
        </h2>
        <div className="space-y-3">
          <p className="text-gray-700">
            <span className="font-semibold text-gray-900">رقم العمل:</span>{" "}
            {selectedTruck.workId}
          </p>
          <p className="text-gray-700">
            <span className="font-semibold text-gray-900">رقم الطارقة:</span>{" "}
            {selectedTruck.boardNumber}
          </p>
          <p className="text-gray-700">
            <span className="font-semibold text-gray-900">رقم المقطورة:</span>{" "}
            {selectedTruck.trailerNumber}
          </p>
          <p className="text-gray-700">
            <span className="font-semibold text-gray-900">نوع الشاحنة:</span>{" "}
            {selectedTruck.typeeName}
          </p>
          <p className="text-gray-700">
            <span className="font-semibold text-gray-900">اللون:</span>{" "}
            {selectedTruck.colorName}
          </p>
          <p className="text-gray-700">
            <span className="font-semibold text-gray-900">السائق:</span>{" "}
            {selectedTruck.driverName}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Truck_view;

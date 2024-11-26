"use client";

import React, { useState } from "react";
import { useTruckStore } from "@/stores/useTruckStore";
import { Button } from "@/components/ui/button";
import { KeySquare, Pen, Redo2, Trash, User } from "lucide-react";
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
import { deleteCar, changeCarOwner } from "@/lib/services/trucksService";
import DriverDropdown from "./input/DriverDropdown";

const Truck_view = () => {
  const { selectedTruck, setSelectedTruck } = useTruckStore();
  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);
  const [isChangeOwnerAlertOpen, setIsChangeOwnerAlertOpen] = useState(false);
  const [newDriverId, setNewDriverId] = useState<string | undefined>(undefined);
  const [isChangingOwner, setIsChangingOwner] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const handleEdit = () => {
    if (selectedTruck) {
      router.push(`/dashboard/trucks/${selectedTruck.carId}/update`);
    }
  };

  const handleDelete = async () => {
    if (!selectedTruck) return;

    try {
      await deleteCar(selectedTruck.carId);
      toast({
        title: "نجاح",
        description: `تم حذف الشاحنة بنجاح.`,
      });
      setSelectedTruck(null);
      router.push("/dashboard/trucks");
    } catch (error) {
      console.error("Error deleting truck:", error);
      toast({
        variant: "destructive",
        title: "حدث خطأ",
        description: "تعذر حذف الشاحنة. حاول مجددًا لاحقًا.",
      });
    }
    setIsDeleteAlertOpen(false);
  };

  const handleChangeOwner = async () => {
    if (!selectedTruck || !newDriverId) return;

    console.log("Truck ID:", selectedTruck.carId);
    console.log("New Driver ID:", newDriverId);

    setIsChangingOwner(true);
    try {
      await changeCarOwner(selectedTruck.carId, parseInt(newDriverId, 10));
      toast({
        title: "نجاح",
        description: `تم تغيير مالك الشاحنة بنجاح.`,
      });
      setIsChangeOwnerAlertOpen(false);
      router.push("/dashboard/trucks");
    } catch (error) {
      console.error("Error changing owner for truck ID:", selectedTruck.carId);
      console.error("Error details:", error);
      toast({
        variant: "destructive",
        title: "حدث خطأ",
        description: "تعذر تغيير مالك الشاحنة. حاول مجددًا لاحقًا.",
      });
    }
    setIsChangingOwner(false);
  };

  if (!selectedTruck) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-gray-600 p-4">
        <p className="mb-4">لم يتم تحديد شاحنة للعرض.</p>
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
        {/* Edit Button */}
        <Button
          variant="outline"
          onClick={handleEdit}
          className="text-gray-700 flex items-center space-x-1 rtl:space-x-reverse"
        >
          <Pen className="h-4 w-4" />
          <span>تحديث</span>
        </Button>

        {/* Change Owner Button */}
        <AlertDialog
          open={isChangeOwnerAlertOpen}
          onOpenChange={setIsChangeOwnerAlertOpen}
        >
          <AlertDialogTrigger asChild>
            <Button
              variant="outline"
              className="text-gray-700 flex items-center space-x-1 rtl:space-x-reverse"
            >
              <User className="h-4 w-4" />
              <span>تغيير المالك</span>
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent dir="rtl">
            <AlertDialogHeader>
              <AlertDialogTitle>تغيير مالك الشاحنة</AlertDialogTitle>
              <AlertDialogDescription>
                اختر المالك الجديد للشاحنة من القائمة أدناه.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <div className="p-4">
              <DriverDropdown
                value={newDriverId}
                onChange={(value) => setNewDriverId(value)}
              />
            </div>
            <AlertDialogFooter>
              <AlertDialogCancel
                onClick={() => setIsChangeOwnerAlertOpen(false)}
              >
                إلغاء
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={handleChangeOwner}
                disabled={isChangingOwner || !newDriverId}
              >
                {isChangingOwner ? "جارٍ التغيير..." : "تغيير"}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        {/* Delete Button */}
        <AlertDialog
          open={isDeleteAlertOpen}
          onOpenChange={setIsDeleteAlertOpen}
        >
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
              <AlertDialogTitle>تأكيد الحذف</AlertDialogTitle>
              <AlertDialogDescription>
                هل أنت متأكد أنك تريد حذف هذا السجل؟ لا يمكن التراجع عن هذا
                الإجراء.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => setIsDeleteAlertOpen(false)}>
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
            {selectedTruck.workNumber}
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
            {selectedTruck.carTypeName}
          </p>
          <p className="text-gray-700">
            <span className="font-semibold text-gray-900">اللون:</span>{" "}
            {selectedTruck.colorName}
          </p>
          <p className="text-gray-700">
            <span className="font-semibold text-gray-900">المنطقة:</span>{" "}
            {selectedTruck.areaName}
          </p>
          <p className="text-gray-700">
            <span className="font-semibold text-gray-900">آخر تحديث:</span>{" "}
            {new Date(selectedTruck.lastUpdateDate).toLocaleString()}
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

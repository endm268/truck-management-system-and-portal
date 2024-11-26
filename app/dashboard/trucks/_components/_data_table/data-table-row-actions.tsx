"use client";
import { Row } from "@tanstack/react-table";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useTruckStore } from "@/stores/useTruckStore";
import { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Eye, Pen, Trash, User } from "lucide-react";
import { deleteCar, changeCarOwner } from "@/lib/services/trucksService";
import { useToast } from "@/hooks/use-toast";
import DriverDropdown from "../input/DriverDropdown";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function DataTableRowActions<
  TData extends {
    carId: number;
  }
>({ row }: DataTableRowActionsProps<TData>) {
  const router = useRouter();
  const setSelectedTruck = useTruckStore((state) => state.setSelectedTruck);
  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);
  const [isChangeOwnerAlertOpen, setIsChangeOwnerAlertOpen] = useState(false);
  const [isChangingOwner, setIsChangingOwner] = useState(false);
  const [newOwnerId, setNewOwnerId] = useState<string | undefined>();
  const { toast } = useToast();

  const id = row.original.carId;

  const handleView = () => {
    if (!id) return;
    setSelectedTruck(row.original);
    router.push(`/dashboard/trucks/${id}`);
  };

  const handleEdit = () => {
    if (!id) return;
    setSelectedTruck(row.original);
    router.push(`/dashboard/trucks/${id}/update`);
  };

  const handleDelete = async () => {
    if (!id) return;

    try {
      const result = await deleteCar(id);
      toast({
        variant: "default",
        title: "تم الحذف بنجاح",
        description: `تم حذف الشاحنة ذات المعرف ${id} بنجاح.`,
      });
      window.location.reload();
      setIsDeleteAlertOpen(false);
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "حدث خطأ",
        description: "تعذر حذف الشاحنة. حاول مجددًا لاحقًا.",
      });
    }
  };

  const handleChangeOwner = async () => {
    if (!id || !newOwnerId) return;

    setIsChangingOwner(true);
    try {
      const result = await changeCarOwner(id, parseInt(newOwnerId, 10));
      toast({
        variant: "default",
        title: "تم التغيير بنجاح",
        description: `تم تغيير مالك الشاحنة بنجاح.`,
      });
      setNewOwnerId(undefined);
      setIsChangeOwnerAlertOpen(false);
      window.location.reload();
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "حدث خطأ",
        description: "تعذر تغيير مالك الشاحنة. حاول مجددًا لاحقًا.",
      });
    } finally {
      setIsChangingOwner(false);
    }
  };

  return (
    <div className="flex space-x-2 rtl:space-x-reverse" dir="rtl">
      {/* View Button */}
      <Button variant="outline" onClick={handleView}>
        <Eye className="h-4 w-4" />
      </Button>

      {/* Edit Button */}
      <Button variant="outline" onClick={handleEdit}>
        <Pen className="h-4 w-4" />
      </Button>

      {/* Change Owner Button */}
      <AlertDialog
        open={isChangeOwnerAlertOpen}
        onOpenChange={setIsChangeOwnerAlertOpen}
      >
        <AlertDialogTrigger asChild>
          <Button variant="outline">
            <User className="h-4 w-4" />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent dir="rtl">
          <AlertDialogHeader>
            <AlertDialogTitle>تغيير المالك</AlertDialogTitle>
            <AlertDialogDescription>
              اختر المالك الجديد للشاحنة.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="p-4">
            <DriverDropdown
              value={newOwnerId}
              onChange={(value) => setNewOwnerId(value)}
            />
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setIsChangeOwnerAlertOpen(false)}>
              إلغاء
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleChangeOwner}
              disabled={isChangingOwner || !newOwnerId}
            >
              {isChangingOwner ? "جارٍ التغيير..." : "تغيير"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Delete Button */}
      <AlertDialog open={isDeleteAlertOpen} onOpenChange={setIsDeleteAlertOpen}>
        <AlertDialogTrigger asChild>
          <Button variant="outline">
            <Trash className="h-4 w-4" />
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
  );
}

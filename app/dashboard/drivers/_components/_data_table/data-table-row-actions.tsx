import { Row } from "@tanstack/react-table";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useDriverStore } from "@/stores/useDriverStore";
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
import { Eye, Pen, Trash } from "lucide-react";
import { deleteDriver } from "@/lib/services/driverService";
import { useToast } from "@/hooks/use-toast";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function DataTableRowActions<
  TData extends {
    driverId: any;
    id?: any;
  }
>({ row }: DataTableRowActionsProps<TData>) {
  const router = useRouter();
  const setSelectedDriver = useDriverStore((state) => state.setSelectedDriver);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const { toast } = useToast();

  // Extract the driver's ID from the row
  const id = row.original.driverId;

  const handleView = () => {
    if (!id) return;
    setSelectedDriver(row.original);
    router.push(`/dashboard/drivers/${id}`);
  };

  const handleEdit = () => {
    if (!id) return;
    setSelectedDriver(row.original);
    router.push(`/dashboard/drivers/${id}/update`);
  };

  const handleDelete = async () => {
    if (!id) return;

    try {
      const result = await deleteDriver(id as number);
      toast({
        variant: "default",
        title: "تم الحذف بنجاح",
        description: `تم حذف السائق ذو المعرف ${id} بنجاح.`,
      });
      window.location.reload();
    } catch (error: any) {
      console.error("Error during delete request:", error);

      toast({
        variant: "destructive",
        title: "حدث خطأ",
        description: "تعذر حذف السائق. حاول مجددًا لاحقًا.",
      });
    }

    setIsAlertOpen(false);
  };

  return (
    <div className="flex space-x-2 rtl:space-x-reverse" dir="rtl">
      <Button variant="outline" onClick={handleView}>
        <Eye className="h-4 w-4" />
      </Button>

      <Button variant="outline" onClick={handleEdit}>
        <Pen className="h-4 w-4" />
      </Button>

      <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
        <AlertDialogTrigger asChild>
          <Button variant="outline">
            <Trash className="h-4 w-4" />
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
  );
}

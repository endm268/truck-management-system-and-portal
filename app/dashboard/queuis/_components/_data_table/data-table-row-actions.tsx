"use client";

import { Row } from "@tanstack/react-table";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
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
import { Trash } from "lucide-react";
import { removeCarFromQueue } from "@/lib/services/queuService"; // Updated import
import { useToast } from "@/hooks/use-toast";
import Invoice_print from "./invoice_print";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function DataTableRowActions<
  TData extends {
    id?: string | number;
  }
>({ row }: DataTableRowActionsProps<TData>) {
  const router = useRouter();
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const { toast } = useToast();

  // Extract the queue item's ID from the row
  const id = row.original.id;

  const handleDelete = async () => {
    if (!id) return;

    try {
      const result = await removeCarFromQueue(id as number); // Use queue delete API
      console.log("Queue item deleted successfully:", result.message);

      // Show success toast notification
      toast({
        variant: "default",
        title: "تم الحذف بنجاح",
        description: `تم حذف العنصر ذو المعرف ${id} بنجاح.`,
      });

      // Optionally refresh the page or trigger a state update
      window.location.reload();
    } catch (error: any) {
      console.error("Error during delete request:", error);

      // Show error toast notification
      toast({
        variant: "destructive",
        title: "حدث خطأ",
        description: "تعذر حذف العنصر. حاول مجددًا لاحقًا.",
      });
    }

    // Close the alert dialog
    setIsAlertOpen(false);
  };

  return (
    <div className="flex space-x-2 rtl:space-x-reverse justify-end" dir="rtl">
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
      
      <Invoice_print />
    </div>
  );
}

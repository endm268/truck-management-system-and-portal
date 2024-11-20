"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { useTruckStore } from "@/stores/useTruckStore";
import InputWithEndIcon from "./input/Input-with-end-icon";
import { Car } from "lucide-react";
import { addCar, updateCar } from "@/lib/services/trucksService";

import CarTypeDropdown from "./input/CarTypeDropdown";
import CarColorDropdown from "./input/CarColorDropdown";
import CarAreaDropdown from "./input/CarArewaDropdown";
import DriverDropdown from "./input/DriverDropdown";

// Define form schema with Zod
const formSchema = z.object({
  workId: z
    .string()
    .regex(/^\d+$/, { message: "يجب أن يحتوي رقم العمل على أرقام فقط." }),
  boardNumber: z.string().min(1, { message: "يجب إدخال رقم الطارقة." }),
  trailerNumber: z.string().min(1, { message: "يجب إدخال رقم المقطورة." }),
  typee: z.string().min(1, { message: "يرجى اختيار نوع السيارة." }),
  color: z.string().min(1, { message: "يرجى اختيار لون السيارة." }),
  // placeId: z.string().min(1, { message: "يرجى اختيار المنطقة." }),
  driverId: z.string().min(1, { message: "يرجى اختيار السائق." }),
});

interface Truck_fromProps {
  isUpdateMode?: boolean;
  id?: string;
}

const Truck_from = ({ isUpdateMode = false, id }: Truck_fromProps) => {
  const { toast } = useToast();
  const { selectedTruck } = useTruckStore(); // Get the selected truck from the store
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Initialize the form with default values
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues:
      isUpdateMode && selectedTruck
        ? {
            workId: selectedTruck.workNumber?.toString() || "",
            boardNumber: selectedTruck.boardNumber || "",
            trailerNumber: selectedTruck.trailerNumber || "",
            typee: selectedTruck.carTypeId?.toString() || "",
            color: selectedTruck.colorId?.toString() || "",
            // placeId: selectedTruck.areaId?.toString() || "",
            driverId: selectedTruck.driverId?.toString() || "",
          }
        : {
            workId: "",
            boardNumber: "",
            trailerNumber: "",
            typee: "",
            color: "",
            // placeId: "",
            driverId: "",
          },
  });

  // Define the submit handler for creating or updating
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    console.log("values", values);
    
    const carData = {
      id: isUpdateMode && id ? parseInt(id, 10) : 0,
      workId: parseInt(values.workId, 10),
      boardNumber: values.boardNumber,
      trailerNumber: values.trailerNumber,
      typee: parseInt(values.typee, 10), // Convert to integer
      color: parseInt(values.color, 10), // Convert to integer
      // placeId: parseInt(values.placeId, 10), // Convert to integer
      driverId: parseInt(values.driverId, 10),
    };

    try {
      if (isUpdateMode && id) {
        await updateCar(parseInt(id, 10), carData);
        toast({
          title: "نجاح",
          description: "تم تحديث بيانات السيارة بنجاح",
        });
      } else {
        await addCar(carData);
        toast({
          title: "نجاح",
          description: "تم إضافة السيارة بنجاح",
        });
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast({
        title: "خطأ",
        description: "حدثت مشكلة أثناء تقديم النموذج. حاول مرة أخرى لاحقًا.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="workId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>رقم العمل</FormLabel>
              <FormControl>
                <InputWithEndIcon
                  icon={Car}
                  placeholder="ادخل رقم العمل"
                  type="text"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="boardNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>رقم الطارقة</FormLabel>
              <FormControl>
                <InputWithEndIcon
                  icon={Car}
                  placeholder="ادخل رقم الطارقة"
                  type="text"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="trailerNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>رقم المقطورة</FormLabel>
              <FormControl>
                <InputWithEndIcon
                  icon={Car}
                  placeholder="ادخل رقم المقطورة"
                  type="text"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="typee"
            render={({ field }) => (
              <FormItem>
                <FormLabel>نوع السيارة</FormLabel>
                <FormControl>
                  <CarTypeDropdown
                    value={field.value}
                    onChange={(value) => field.onChange(value)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="color"
            render={({ field }) => (
              <FormItem>
                <FormLabel>اللون</FormLabel>
                <FormControl>
                  <CarColorDropdown
                    value={field.value}
                    onChange={(value) => field.onChange(value)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        {/* <FormField
          control={form.control}
          name="placeId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>الموقع</FormLabel>
              <FormControl>
                <CarAreaDropdown
                  value={field.value}
                  onChange={(value) => field.onChange(value)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        /> */}
        <FormField
          control={form.control}
          name="driverId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>السائق</FormLabel>
              <FormControl>
                <DriverDropdown
                  value={field.value}
                  onChange={(value) => field.onChange(value)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "جارٍ الإرسال..." : isUpdateMode ? "تحديث" : "إنشاء"}
        </Button>
      </form>
    </Form>
  );
};

export default Truck_from;

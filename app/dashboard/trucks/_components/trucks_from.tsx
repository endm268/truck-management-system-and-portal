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
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import InputWithEndIcon from "./input/Input-with-end-icon";
import { Phone, User } from "lucide-react";
import InputNumberIcon from "./input/Input-number-icon";
import { useDriverStore } from "@/stores/useDriverStore";
import { addDriver, updateDriver } from "@/lib/services/driverService"; // Import the service functions
import { log } from "console";

// Define form schema with Zod
const formSchema = z.object({
  fullName: z
    .string()
    .min(2, { message: "يجب أن يكون الاسم الكامل مكونًا من حرفين على الأقل." }),
  phoneNumber: z
    .string()
    .min(2, { message: "يجب أن يحتوي رقم الهاتف على حرفين على الأقل." })
    .regex(/^\d+$/, { message: "يجب أن يحتوي رقم الهاتف على أرقام فقط." }),
  cardId: z
    .string()
    .min(2, { message: "يجب أن يحتوي رقم البطاقة على حرفين على الأقل." })
    .regex(/^\d+$/, { message: "يجب أن يحتوي رقم البطاقة على أرقام فقط." }),
  driverCardId: z
    .string()
    .min(2, { message: "يجب أن يحتوي رقم رخصة القيادة على حرفين على الأقل." })
    .regex(/^\d+$/, {
      message: "يجب أن يحتوي رقم رخصة القيادة على أرقام فقط.",
    }),
  nearestFraindName: z
    .string()
    .min(2, { message: "يجب أن يحتوي اسم أقرب صديق على حرفين على الأقل." }),
  nearestFraindPhone: z
    .string()
    .min(2, { message: "يجب أن يحتوي رقم هاتف الصديق على حرفين على الأقل." })
    .regex(/^\d+$/, { message: "يجب أن يحتوي رقم هاتف الصديق على أرقام فقط." }),
  liveIn: z
    .string()
    .min(1, { message: "يجب أن يحتوي العنوان على حرفين على الأقل." }),
});

// Define component with props for update mode
interface DriverFormProps {
  isUpdateMode?: boolean;
  id?: string; // Add id parameter for identifying the driver in update mode
}

const Truck_from = ({ isUpdateMode = false, id }: DriverFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const { selectedDriver, setSelectedDriver } = useDriverStore();
  console.log(id);
  // Define form setup with default values based on update mode
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues:
      isUpdateMode && selectedDriver
        ? {
            ...selectedDriver,
            liveIn: String(selectedDriver.liveIn), // Convert liveIn to a string
          }
        : {
            fullName: "",
            phoneNumber: "",
            cardId: "",
            driverCardId: "",
            nearestFraindName: "",
            nearestFraindPhone: "",
            liveIn: "", // Ensure liveIn is an empty string by default
          },
  });

  // Define the submit handler for creating or updating
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    try {
      if (isUpdateMode && id !== undefined) {
        await updateDriver(id, values); // Ensure this call is correct
        toast({
          title: "نجاح",
          description: "تم تحديث بيانات السائق بنجاح",
        });
      } else {
        await addDriver(values); // Ensure this call is correct
        toast({
          title: "نجاح",
          description: "تم إنشاء السائق بنجاح",
        });
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast({
        title: "خطأ",
        description:
          "حدثت مشكلة أثناء تقديم النموذج. تحقق من إدخالاتك أو حاول مرة أخرى لاحقًا.",
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
          name="fullName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>اسم السائق ثلاثي</FormLabel>
              <FormControl>
                <InputWithEndIcon
                  icon={User}
                  placeholder="ادخل اسم  السائق ثلاثي"
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
          name="phoneNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>رقم الهاتف</FormLabel>
              <FormControl>
                <InputNumberIcon
                  icon={Phone}
                  placeholder="ادخل رقم  الهاتف "
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
          name="cardId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>رقم البطاقة الشخصية</FormLabel>
              <FormControl>
                <InputWithEndIcon
                  icon={User}
                  placeholder="ادخل رقم  البطاقة الشخصية"
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
          name="driverCardId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>رقم رخصة القيادة</FormLabel>
              <FormControl>
                <InputWithEndIcon
                  icon={User}
                  placeholder="ادخل رقم  رخصة القيادة"
                  type="text"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
          <FormField
            control={form.control}
            name="nearestFraindName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>اسم اقرب صديق</FormLabel>
                <FormControl>
                  <InputWithEndIcon
                    icon={User}
                    placeholder="ادخل اسم  اقرب صديق"
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
            name="nearestFraindPhone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>رقم الهاتف</FormLabel>
                <FormControl>
                  <InputNumberIcon
                    icon={Phone}
                    placeholder="ادخل رقم  الهاتف "
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
            name="liveIn"
            render={({ field }) => (
              <FormItem>
                <FormLabel>عنوان السكن</FormLabel>
                <FormControl>
                  <InputWithEndIcon
                    icon={User}
                    placeholder="ادخل عنوان السكن"
                    type="text"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "جارٍ الإرسال..." : isUpdateMode ? "تحديث" : "إنشاء"}
        </Button>
      </form>
    </Form>
  );
};

export default Truck_from;

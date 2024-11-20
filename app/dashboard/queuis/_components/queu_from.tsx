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
import InputWithEndIcon from "./input/Input-with-end-icon";
import { Car } from "lucide-react";
import { addCarToQueue } from "@/lib/services/queuService";

// Define form schema with Zod
const formSchema = z.object({
  carWorkId: z
    .string()
    .regex(/^\d+$/, { message: "يجب أن يحتوي رقم العمل على أرقام فقط." })
    .nonempty({ message: "يرجى إدخال رقم العمل." }),
});

interface QueuFromProps {
  isUpdateMode?: boolean;
}

const Queu_from = ({ isUpdateMode = false }: QueuFromProps) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Initialize the form with default values
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      carWorkId: "",
    },
  });

  // Define the submit handler
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);

    try {
      // Call the API to add a car to the queue
      await addCarToQueue(parseInt(values.carWorkId, 10));

      // Show success toast notification
      toast({
        title: "نجاح",
        description: "تم إضافة السيارة إلى الطابور بنجاح",
      });

      // Reset the form
      form.reset();
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
          name="carWorkId"
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
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "جارٍ الإرسال..." : isUpdateMode ? "تحديث" : "إضافة"}
        </Button>
      </form>
    </Form>
  );
};

export default Queu_from;

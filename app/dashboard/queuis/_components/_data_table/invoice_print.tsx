import React, { useRef, useState } from "react";
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
import { Button } from "@/components/ui/button";
import { Printer, Coins, User, Pin, MapPinned, Binary } from "lucide-react";
import InputWithEndIcon from "../input/Input-with-end-icon";
import { numberToArabicWords } from "@/lib/helper";

// Helper function to convert numbers to Arabic words

const Invoice_print = () => {
  const [date] = useState(new Date().toISOString().split("T")[0]);
  const [invoiceValue, setInvoiceValue] = useState("");
  const [name, setName] = useState("");
  const [invoiceInWords, setInvoiceInWords] = useState("");
  const [workNumber, setWorkNumber] = useState("");
  const [trailerNumber, setTrailerNumber] = useState("");
  const [location, setLocation] = useState("");

  const printRef = useRef<HTMLDivElement>(null);

  const handleInvoiceValueChange = (value: string) => {
    const numericValue = parseFloat(value);
    if (!isNaN(numericValue)) {
      setInvoiceValue(value);
      setInvoiceInWords(numberToArabicWords(numericValue));
    } else {
      setInvoiceValue("");
      setInvoiceInWords("");
    }
  };

  const handlePrint = () => {
    if (printRef.current) {
      const printContent = printRef.current.innerHTML;
      const originalContent = document.body.innerHTML;

      // Replace the body content with the printable section
      document.body.innerHTML = printContent;

      // Print the page
      window.print();

      // Restore the original content after printing
      document.body.innerHTML = originalContent;

      // Reload the page to restore event listeners
      window.location.reload();
    }
  };

  return (
    <>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button
            variant="outline"
            className="text-gray-700 flex items-center space-x-1 rtl:space-x-reverse"
          >
            <Printer className="h-4 w-4" />
            <span>طباعة فاتورة</span>
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent dir="rtl">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-right">
              تفاصيل الفاتورة
            </AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogDescription className="space-y-4 text-right">
            <div className="text-black">
              <label htmlFor="invoiceValue" className="block mb-1">
                قيمة الفاتورة
              </label>
              <InputWithEndIcon
                icon={Coins}
                placeholder="أدخل قيمة الفاتورة"
                type="number"
                value={invoiceValue}
                onChange={(e) => handleInvoiceValueChange(e.target.value)}
              />
            </div>
            <div className="text-black">
              <label htmlFor="name" className="block mb-1">
                الاسم
              </label>
              <InputWithEndIcon
                icon={User}
                placeholder="أدخل اسم المستلم"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="text-black">
              <label htmlFor="invoiceInWords" className="block mb-1">
                قيمة الفاتورة كتابة
              </label>
              <InputWithEndIcon
                icon={Pin}
                placeholder="قيمة الفاتورة كتابة"
                type="text"
                value={invoiceInWords}
                disabled
              />
            </div>
            <div className="text-black">
              <label htmlFor="location" className="block mb-1">
                مقابل
              </label>
              <InputWithEndIcon
                icon={MapPinned}
                placeholder="أدخل المكان"
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
            <div className="text-black">
              <label htmlFor="workNumber" className="block mb-1">
                رقم العمل
              </label>
              <InputWithEndIcon
                icon={Binary}
                placeholder="أدخل رقم العمل"
                type="number"
                value={workNumber}
                onChange={(e) => setWorkNumber(e.target.value)}
              />
            </div>
            <div className="text-black">
              <label htmlFor="trailerNumber" className="block mb-1">
                رقم المقطورة
              </label>
              <InputWithEndIcon
                icon={Binary}
                placeholder="أدخل رقم المقطورة"
                type="number"
                value={trailerNumber}
                onChange={(e) => setTrailerNumber(e.target.value)}
              />
            </div>
          </AlertDialogDescription>
          <AlertDialogFooter className="flex justify-end items-center gap-6">
            <AlertDialogCancel>إلغاء</AlertDialogCancel>
            <AlertDialogAction onClick={handlePrint}>طباعة</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Printable Section */}
      <div ref={printRef} className="hidden">
        <div
          dir="rtl"
          className="p-6 text-right border border-gray-300 rounded-md shadow-md"
          style={{
            fontFamily: "'Cairo', sans-serif",
            width: "220mm", // A5 width 210mm
            height: "140mm", // A5 height 148mm
            padding: "20mm",
            boxSizing: "border-box",
          }}
        >
          <h2 className="text-lg font-bold mb-2 text-center">
            اتحاد النقل البري <br />
            مصراتة
          </h2>
          <p className="text-sm mb-2 text-center">إيصال قبض</p>
          <div className="text-sm text-left mb-2">
            <strong>التاريخ:</strong> {date}
          </div>
          <hr className="my-2" />

          <table className="w-full text-sm mb-4 border-collapse">
            <tbody>
              <tr>
                <td className="border px-2 py-1"> المبلغ بالدينار</td>
                <td className="border px-2 py-1">{invoiceValue}</td>
              </tr>
             
            </tbody>
          </table>

          <p className="text-sm mb-2">
            <strong>استلمت من الأخ:</strong>{" "}
            <span className="font-medium">{name}</span>
          </p>
          <p className="text-sm mb-2">
            <strong>المبلغ بالحروف:</strong>{" "}
            <span className="font-medium">{invoiceInWords} دينار فقط لا غير</span>
          </p>
          <p className="text-sm mb-2">
            <strong>وذلك مقابل:</strong>{" "}
            <span className="font-medium">{location}</span>
          </p>
          <p className="text-sm mb-2">
            <strong>رقم الشاحنة:</strong>{" "}
            <span className="font-medium">{workNumber}</span>
          </p>
          <p className="text-sm mb-2">
            <strong>رقم المقطورة:</strong>{" "}
            <span className="font-medium">{trailerNumber}</span>
          </p>
          <hr className="my-2" />
          <div className="text-sm mt-4 ml-28">
            <div className="flex justify-between">
              <div>
                <strong>توقيع المستلم : {name}</strong>
              </div>
              <div className="text-center">
                <strong>الختم</strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Invoice_print;

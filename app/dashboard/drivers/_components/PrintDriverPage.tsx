// app/dashboard/drivers/_components/PrintDriverPage.tsx

"use client";

import { useEffect } from "react";
import { useDriverStore } from "@/stores/useDriverStore"; // Import Zustand store

const PrintDriverPage = () => {
  const selectedDriver = useDriverStore((state) => state.selectedDriver);

  useEffect(() => {
    // Trigger the print dialog when the component mounts
    window.print();
  }, []);

  if (!selectedDriver) {
    return <div>لا توجد بيانات للطباعة.</div>; // Display a message if no driver is selected
  }

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">تفاصيل السائق</h1>
      <p>
        <strong>الاسم الكامل:</strong> {selectedDriver.fullName}
      </p>
      <p>
        <strong>رقم الهاتف:</strong> {selectedDriver.phoneNumber}
      </p>
      <p>
        <strong>رقم البطاقة:</strong> {selectedDriver.cardId}
      </p>
      <p>
        <strong>رقم رخصة السائق:</strong> {selectedDriver.driverCardId}
      </p>
      <p>
        <strong>اسم الصديق الأقرب:</strong> {selectedDriver.nearestFraindName}
      </p>
      <p>
        <strong>هاتف الصديق الأقرب:</strong> {selectedDriver.nearestFraindPhone}
      </p>
      <p>
        <strong>يعيش في:</strong> {selectedDriver.liveIn}
      </p>
    </div>
  );
};

export default PrintDriverPage;

"use client";

import React, { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getDrivers } from "@/lib/services/driverService";

interface DriverDropdownProps {
  value: string | undefined;
  onChange: (value: string) => void;
}

const DriverDropdown: React.FC<DriverDropdownProps> = ({ value, onChange }) => {
  const [drivers, setDrivers] = useState<
    { driverId: number; fullName: string }[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchDrivers() {
      try {
        const driverData = await getDrivers();
        setDrivers(driverData || []);
      } catch (err) {
        console.error("Error fetching drivers:", err);
        setError(
          "فشل في تحميل قائمة السائقين. يرجى التحقق من الاتصال بالإنترنت."
        );
      } finally {
        setLoading(false);
      }
    }
    fetchDrivers();
  }, []);

  if (loading) {
    return <p className="text-gray-500 text-right">جارٍ تحميل السائقين...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <Select onValueChange={onChange} value={value} dir="rtl">
      <SelectTrigger className="w-full text-right">
        <SelectValue placeholder="اختر السائق" />
      </SelectTrigger>
      <SelectContent className="text-right">
        {drivers.map((driver) => (
          <SelectItem key={driver.driverId} value={driver.driverId.toString()}>
            {driver.fullName}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default DriverDropdown;

"use client";

import React, { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getColors } from "@/lib/services/globallService";


interface CarColorDropdownProps {
  value: string | undefined;
  onChange: (value: string) => void;
}

const CarColorDropdown: React.FC<CarColorDropdownProps> = ({
  value,
  onChange,
}) => {
  const [types, setTypes] = useState<{ id: number; byan: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCarTypes() {
      try {
        const typeData = await getColors();
        setTypes(typeData);
      } catch (err) {
        console.error("Error fetching car types:", err);
        setError(
          "فشل في تحميل أنواع السيارات. يرجى التحقق من الاتصال بالإنترنت."
        );
      } finally {
        setLoading(false);
      }
    }
    fetchCarTypes();
  }, []);

  if (loading) {
    return (
      <p className="text-gray-500 text-right">جارٍ تحميل أنواع السيارات...</p>
    );
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <Select onValueChange={onChange} value={value} dir="rtl">
      <SelectTrigger className="w-full text-right">
        <SelectValue placeholder="اختر نوع السيارة" />
      </SelectTrigger>
      <SelectContent className="text-right">
        {types.map((type) => (
          <SelectItem key={type.id} value={type.id.toString()}>
            {type.byan}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default CarColorDropdown;

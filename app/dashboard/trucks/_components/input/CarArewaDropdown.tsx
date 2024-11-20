"use client";

import React, { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getAreas } from "@/lib/services/globallService";

interface CarAreaDropdownProps {
  value: string | undefined;
  onChange: (value: string) => void;
}

const CarAreaDropdown: React.FC<CarAreaDropdownProps> = ({
  value,
  onChange,
}) => {
  const [areas, setAreas] = useState<{ id: number; byan: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchAreas() {
      try {
        const areaData = await getAreas();
        setAreas(areaData || []); // Ensure fallback to an empty array
      } catch (err) {
        console.error("Error fetching areas:", err);
        setError("فشل في تحميل المناطق. يرجى التحقق من الاتصال بالإنترنت.");
      } finally {
        setLoading(false);
      }
    }
    fetchAreas();
  }, []);

  if (loading) {
    return <p className="text-gray-500 text-right">جارٍ تحميل المناطق...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <Select onValueChange={onChange} value={value} dir="rtl">
      <SelectTrigger className="w-full text-right">
        <SelectValue placeholder="اختر المنطقة" />
      </SelectTrigger>
      <SelectContent className="text-right">
        {areas.map((area) => (
          <SelectItem key={area.id} value={area.id.toString()}>
            {area.byan}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default CarAreaDropdown;

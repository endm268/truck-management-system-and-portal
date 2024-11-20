"use client";

import React, { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getCities } from "@/lib/services/globallService";



interface CityDropdownProps {
  value: string | undefined;
  onChange: (value: string) => void;
}

const CityDropdown: React.FC<CityDropdownProps> = ({ value, onChange }) => {
  const [cities, setCities] = useState<{ id: number; byan: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCities() {
      try {
        const cityData = await getCities();
        setCities(cityData);
      } catch (err) {
        console.error("Error fetching cities:", err);
        setError("فشل في تحميل قائمة المدن. يرجى التحقق من الاتصال بالإنترنت.");
      } finally {
        setLoading(false);
      }
    }
    fetchCities();
  }, []);

  if (loading) {
    return <p className="text-gray-500 text-right">جارٍ تحميل المدن...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <Select onValueChange={onChange} value={value} dir="rtl">
      <SelectTrigger className="w-full text-right">
        <SelectValue placeholder="اختر المدينة" />
      </SelectTrigger>
      <SelectContent className="text-right">
        {cities.map((city) => (
          <SelectItem key={city.id} value={city.id.toString()}>
            {city.byan}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default CityDropdown;

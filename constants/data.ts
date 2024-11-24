// constants/data.ts

import { ComponentType } from "react";

export const incomeType = [
  { id: 1, label: "Income", value: "income" },
  { id: 2, label: "Expense", value: "expense" },
];

export const areaName: {
  id: number;
  label: string;
  value: string;
  icon?: ComponentType<{ className?: string }>;
}[] = [
  { id: 1, label: "البطاح", value: "البطاح" },
  { id: 2, label: "الجرار", value: "الجرار" },
  { id: 3, label: "المطريش", value: "المطريش" },
];

export const columnNamesView: Record<string, string> = {
  driverId: "رقم السائق",
  driverName: " اسم السائق",
  phoneNumber: "رقم الهاتف السائق",
  cardId: "رقم للبطاقة الشخصية",
  driverCardId: "رقم رخصة السائق",
  nearestFraindName: "اسم الصديق القريب",
  nearestFraindPhone: "رقم هاتف الصديق القريب",
  liveInName: "اسم المنزل",
  carId: "رقم السيارة",
  workNumber: "رقم العمل",
  boardNumber: "رقم اللوحة",
  trailerNumber: "رقم المقطورة",
  carTypeName: "نوع السيارة",
  carTypeId: "رقم نوع السيارة",
  colorName: "لون السيارة",
  areaName: "اسم المنطقة",
  fullName: "اسم السائق",
};


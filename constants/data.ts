// constants/data.ts

import { ComponentType } from "react";

export const incomeType = [
  { id: 1, label: "Income", value: "income" },
  { id: 2, label: "Expense", value: "expense" },
];

export const categories: {
  id: number;
  label: string;
  value: string;
  icon?: ComponentType<{ className?: string }>;
}[] = [
  { id: 1, label: "Food", value: "food" },
  { id: 2, label: "Transportation", value: "transportation" },
  { id: 3, label: "Entertainment", value: "entertainment" },
  { id: 4, label: "Health", value: "health" },
  { id: 5, label: "Education", value: "education" },
  { id: 6, label: "Utilities", value: "utilities" },
  { id: 7, label: "Groceries", value: "groceries" },
  { id: 8, label: "Rent", value: "rent" },
  { id: 9, label: "Travel", value: "travel" },
  { id: 10, label: "Miscellaneous", value: "miscellaneous" },
];

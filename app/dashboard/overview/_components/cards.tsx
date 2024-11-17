import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartCandlestick, KeySquare, SquarePlus, TicketSlash } from "lucide-react";

interface CardsProps {
  role: string;
}

const Cards: React.FC<CardsProps> = ({ role }) => {
  return (
    <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
      {/* Card 1 - Visible to admin and user */}
      {(role === "admin" ) && (
        <Card
          className="
    dark:odd:border-b-customColors-darkPrimary dark:even:border-b-customColors-darkSecondary 
    odd:border-b-customColors-lightPrimary even:border-b-customColors-lightSecondary border-b-4 border-transparent bg-gray-100 
    transition-all duration-300
    hover:shadow-lg dark:bg-gray-800
    
  "
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              عدد السائقين في كل الساحات
            </CardTitle>
            <KeySquare className="h-4 w-4 text-muted-foreground dark:text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              15,567
            </div>
            <p className="text-xs text-muted-foreground dark:text-gray-400">
              ثم اضافة 986 سائق من الشهر الفائت
            </p>
          </CardContent>
        </Card>
      )}

      {/* Card 2 - Visible to admin only */}
      {role === "admin" || role === "bitah" && (
        <Card
          className="
    dark:odd:border-b-customColors-darkPrimary dark:even:border-b-customColors-darkSecondary 
    odd:border-b-customColors-lightPrimary even:border-b-customColors-lightSecondary border-b-4 border-transparent bg-gray-100 
    transition-all duration-300
    hover:shadow-lg dark:bg-gray-800
    
  "
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              عدد السائقين في بطاح
            </CardTitle>
            <KeySquare className="h-4 w-4 text-muted-foreground dark:text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              11,987
            </div>
            <p className="text-xs text-muted-foreground dark:text-gray-400">
              ثم اضافة 752 سائق من الشهر الفائت
            </p>
          </CardContent>
        </Card>
      )}

      {/* Card 3 - Visible to admin and user */}
      {(role === "admin" || role === "matarrish") && (
        <Card
          className="
    dark:odd:border-b-customColors-darkPrimary dark:even:border-b-customColors-darkSecondary 
    odd:border-b-customColors-lightPrimary even:border-b-customColors-lightSecondary border-b-4 border-transparent bg-gray-100 
    transition-all duration-300
    hover:shadow-lg dark:bg-gray-800
    
  "
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              عدد السائقين في المطاريش
            </CardTitle>
            <KeySquare className="h-4 w-4 text-muted-foreground dark:text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              12,234
            </div>
          </CardContent>
        </Card>
      )}

      {/* Card 4 - Visible to admin only */}
      {role === "admin" || role === "jiraar" && (
        <Card
          className="
    dark:odd:border-b-customColors-darkPrimary dark:even:border-b-customColors-darkSecondary 
    odd:border-b-customColors-lightPrimary even:border-b-customColors-lightSecondary border-b-4 border-transparent bg-gray-100 
    transition-all duration-300
    hover:shadow-lg dark:bg-gray-800
    
  "
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              عدد السائقين في الجرار
            </CardTitle>
            <KeySquare className="h-4 w-4 text-muted-foreground dark:text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              573
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Cards;

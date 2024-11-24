"use client";

import { useEffect, useState } from "react";
import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis, Tooltip } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltipContent,
} from "@/components/ui/chart";

// Chart description
export const description = "مخطط عمودي متعدد";

// Arabic month names
const arabicMonths = [
  "يناير",
  "فبراير",
  "مارس",
  "أبريل",
  "مايو",
  "يونيو",
  "يوليو",
  "أغسطس",
  "سبتمبر",
  "أكتوبر",
  "نوفمبر",
  "ديسمبر",
];

// Mock static data for server rendering
const staticChartData = Array.from({ length: 6 }).map((_, i) => ({
  month: arabicMonths[i],
  بتاح: 0,
  جرار: 0,
  المطاريش: 0,
}));

// Define chart configuration
const chartConfig: ChartConfig = {
  بتاح: {
    label: "بتاح",
    color: "hsl(var(--chart-1))",
  },
  جرار: {
    label: "جرار",
    color: "hsl(var(--chart-2))",
  },
  المطاريش: {
    label: "المطاريش",
    color: "hsl(var(--chart-3))",
  },
};

export function BarChartMultiple() {
  const [chartData, setChartData] = useState(staticChartData);

  // Generate dynamic data on the client
  useEffect(() => {
    const today = new Date();
    const dynamicData = Array.from({ length: 6 }).map((_, i) => {
      const date = new Date(today.getFullYear(), today.getMonth() - i, 1);
      const monthName = arabicMonths[date.getMonth()];
      return {
        month: monthName,
        بتاح: Math.floor(Math.random() * 300) + 100,
        جرار: Math.floor(Math.random() * 200) + 50,
        المطاريش: Math.floor(Math.random() * 250) + 75,
      };
    });
    setChartData(dynamicData.reverse());
  }, []);

  // Calculate the total visitors and percentage increase for the current month
  const currentMonthData = chartData[chartData.length - 1];
  const previousMonthData = chartData[chartData.length - 2];
  const totalCurrentMonthVisitors =
    currentMonthData?.بتاح +
      currentMonthData?.جرار +
      currentMonthData?.المطاريش || 0;
  const totalPreviousMonthVisitors =
    previousMonthData?.بتاح +
      previousMonthData?.جرار +
      previousMonthData?.المطاريش || 0;
  const percentageIncrease =
    totalPreviousMonthVisitors > 0
      ? ((totalCurrentMonthVisitors - totalPreviousMonthVisitors) /
          totalPreviousMonthVisitors) *
        100
      : 0;

  return (
    <Card dir="rtl" className="dark:bg-gray-800 dark:text-gray-100">
      <CardHeader>
        <CardTitle>مخطط عمودي - متعدد</CardTitle>
        <CardDescription>البيانات للأشهر الستة الماضية</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[280px] w-full"
        >
          <BarChart
            data={chartData}
            margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <Tooltip content={<ChartTooltipContent />} />
            <Bar
              dataKey="بتاح"
              fill={chartConfig.بتاح.color}
              radius={[4, 4, 0, 0]}
            />
            <Bar
              dataKey="جرار"
              fill={chartConfig.جرار.color}
              radius={[4, 4, 0, 0]}
            />
            <Bar
              dataKey="المطاريش"
              fill={chartConfig.المطاريش.color}
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-6 text-base">
        <div className="flex gap-2 text-lg font-semibold leading-none">
          زيادة بنسبة {percentageIncrease.toFixed(1)}٪ هذا الشهر{" "}
          <TrendingUp
            className={`h-5 w-5 ${
              percentageIncrease >= 0 ? "text-green-600" : "text-red-600"
            }`}
          />
        </div>
        <div className="text-lg leading-none text-muted-foreground">
          إجمالي الزوار هذا الشهر: {totalCurrentMonthVisitors.toLocaleString()}
        </div>
        <div className="mt-2 flex w-full items-center justify-between text-base">
          <div className="leading-none text-muted-foreground">
            بتاح: {currentMonthData?.بتاح?.toLocaleString()}
          </div>
          <div className="leading-none text-muted-foreground">
            جرار: {currentMonthData?.جرار?.toLocaleString()}
          </div>
          <div className="leading-none text-muted-foreground">
            المطاريش: {currentMonthData?.المطاريش?.toLocaleString()}
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}

'use client';

import { TrendingUp } from 'lucide-react';
import { Bar, BarChart, CartesianGrid, XAxis, Tooltip } from 'recharts';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltipContent
} from '@/components/ui/chart';

// Chart description
export const description = 'مخطط عمودي متعدد';

// Arabic month names
const arabicMonths = [
  'يناير',
  'فبراير',
  'مارس',
  'أبريل',
  'مايو',
  'يونيو',
  'يوليو',
  'أغسطس',
  'سبتمبر',
  'أكتوبر',
  'نوفمبر',
  'ديسمبر'
];

// Function to generate the last 6 months of data dynamically
function generateLastSixMonthsData() {
  const data = [];
  const today = new Date();

  for (let i = 5; i >= 0; i--) {
    const date = new Date(today.getFullYear(), today.getMonth() - i, 1);
    const monthName = arabicMonths[date.getMonth()];
    data.push({
      month: monthName,
      desktop: Math.floor(Math.random() * 300) + 100, // Random desktop data
      mobile: Math.floor(Math.random() * 200) + 50, // Random mobile data
      laptop: Math.floor(Math.random() * 250) + 75 // Random laptop data
    });
  }

  return data;
}

// Fetch dynamically generated data
const chartData = generateLastSixMonthsData();

// Define chart configuration
const chartConfig: ChartConfig = {
  desktop: {
    label: 'سطح المكتب',
    color: 'hsl(var(--chart-1))'
  },
  mobile: {
    label: 'الهاتف المحمول',
    color: 'hsl(var(--chart-2))'
  },
  laptop: {
    label: 'الحاسوب المحمول',
    color: 'hsl(var(--chart-3))'
  }
};

// Calculate the total visitors and percentage increase for the current month
const currentMonthData = chartData[chartData.length - 1];
const previousMonthData = chartData[chartData.length - 2];
const totalCurrentMonthVisitors =
  currentMonthData.desktop + currentMonthData.mobile + currentMonthData.laptop;
const totalPreviousMonthVisitors =
  previousMonthData.desktop +
  previousMonthData.mobile +
  previousMonthData.laptop;
const percentageIncrease =
  ((totalCurrentMonthVisitors - totalPreviousMonthVisitors) /
    totalPreviousMonthVisitors) *
  100;

export function BarChartMultiple() {
  return (
    <Card
      dir="rtl"
      className="
     dark:bg-gray-800
     dark:text-gray-100
  "
    >
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
              dataKey="desktop"
              fill={chartConfig.desktop.color}
              radius={[4, 4, 0, 0]}
            />
            <Bar
              dataKey="mobile"
              fill={chartConfig.mobile.color}
              radius={[4, 4, 0, 0]}
            />
            <Bar
              dataKey="laptop"
              fill={chartConfig.laptop.color}
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-6 text-base">
        <div className="flex gap-2 text-lg font-semibold leading-none">
          زيادة بنسبة {percentageIncrease.toFixed(1)}٪ هذا الشهر{' '}
          <TrendingUp
            className={`h-5 w-5 ${
              percentageIncrease >= 0 ? 'text-green-600' : 'text-red-600'
            }`}
          />
        </div>
        <div className="text-lg leading-none text-muted-foreground">
          إجمالي الزوار هذا الشهر: {totalCurrentMonthVisitors.toLocaleString()}
        </div>
        <div className="mt-2 flex w-full items-center justify-between text-base">
          <div className="leading-none text-muted-foreground">
            سطح المكتب: {currentMonthData.desktop.toLocaleString()}
          </div>
          <div className="leading-none text-muted-foreground">
            الهاتف المحمول: {currentMonthData.mobile.toLocaleString()}
          </div>
          <div className="leading-none text-muted-foreground">
            الحاسوب المحمول: {currentMonthData.laptop.toLocaleString()}
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}

// const chartData = [
//   { month: 'January', desktop: 186, mobile: 80 },
//   { month: 'February', desktop: 305, mobile: 200 },
//   { month: 'March', desktop: 237, mobile: 120 },
//   { month: 'April', desktop: 73, mobile: 190 },
//   { month: 'May', desktop: 209, mobile: 130 },
//   { month: 'June', desktop: 214, mobile: 140 }
// ];

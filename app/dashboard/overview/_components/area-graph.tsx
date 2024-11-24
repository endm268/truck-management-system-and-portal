"use client";

import { TrendingUp } from "lucide-react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

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
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

// Updated chart data with Arabic labels
const chartData = [
  { month: "يناير", بتاح: 186, جرار: 80, المطريس: 50 },
  { month: "فبراير", بتاح: 305, جرار: 200, المطريس: 100 },
  { month: "مارس", بتاح: 237, جرار: 120, المطريس: 150 },
  { month: "أبريل", بتاح: 73, جرار: 190, المطريس: 90 },
  { month: "مايو", بتاح: 209, جرار: 130, المطريس: 110 },
  { month: "يونيو", بتاح: 214, جرار: 140, المطريس: 130 },
];

// Updated chart configuration with Arabic labels
const chartConfig = {
  بتاح: {
    label: "بتاح",
    color: "hsl(var(--chart-1))",
  },
  جرار: {
    label: "جرار",
    color: "hsl(var(--chart-2))",
  },
  المطريس: {
    label: "المطريس",
    color: "hsl(var(--chart-3))",
  },
} satisfies ChartConfig;

export function AreaGraph() {
  return (
    <Card
      dir="rtl"
      className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
    >
      <CardHeader>
        <CardTitle>مخطط المساحة - مكدس</CardTitle>
        <CardDescription>
          عرض إجمالي الزوار للأشهر الستة الماضية
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[310px] w-full"
        >
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} stroke="var(--grid-color)" />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dot" />}
            />
            <Area
              dataKey="المطريس"
              type="natural"
              fill={chartConfig.المطريس.color}
              fillOpacity={0.4}
              stroke={chartConfig.المطريس.color}
              stackId="a"
            />
            <Area
              dataKey="جرار"
              type="natural"
              fill={chartConfig.جرار.color}
              fillOpacity={0.4}
              stroke={chartConfig.جرار.color}
              stackId="a"
            />
            <Area
              dataKey="بتاح"
              type="natural"
              fill={chartConfig.بتاح.color}
              fillOpacity={0.4}
              stroke={chartConfig.بتاح.color}
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 font-medium leading-none">
              زيادة بنسبة 5.2٪ هذا الشهر{" "}
              <TrendingUp className="h-4 w-4 text-green-500" />
            </div>
            <div className="flex items-center gap-2 leading-none text-muted-foreground">
              يناير - يونيو 2024
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}

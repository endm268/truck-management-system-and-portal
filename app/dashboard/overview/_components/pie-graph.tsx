"use client";

import * as React from "react";
import { TrendingUp } from "lucide-react";
import { Label, Pie, PieChart } from "recharts";

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

// Chart data with Arabic truck types
const chartData = [
  { type: "قلاب", visitors: 275, fill: "var(--color-qalab)" },
  { type: "سطحة", visitors: 200, fill: "var(--color-sataha)" },
  { type: "قلاب صغير", visitors: 287, fill: "var(--color-qalab-saghir)" },
  { type: "شاحنة", visitors: 173, fill: "var(--color-shahina)" },
  { type: "آخر", visitors: 190, fill: "var(--color-akhir)" },
];

// Chart configuration with Arabic labels
const chartConfig = {
  visitors: {
    label: "الزوار",
  },
  qalab: {
    label: "قلاب",
    color: "hsl(var(--chart-1))",
  },
  sataha: {
    label: "سطحة",
    color: "hsl(var(--chart-2))",
  },
  qalabSaghir: {
    label: "قلاب صغير",
    color: "hsl(var(--chart-3))",
  },
  shahina: {
    label: "شاحنة",
    color: "hsl(var(--chart-4))",
  },
  akhir: {
    label: "آخر",
    color: "hsl(var(--chart-5))",
  },
} satisfies ChartConfig;

export function PieGraph() {
  const totalVisitors = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.visitors, 0);
  }, []);

  return (
    <Card
      dir="rtl"
      className="flex flex-col bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
    >
      <CardHeader className="items-center pb-0">
        <CardTitle>مخطط دائري - شاحنات</CardTitle>
        <CardDescription>بيانات من يناير إلى يونيو 2024</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[360px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="visitors"
              nameKey="type"
              innerRadius={60}
              outerRadius={100}
              strokeWidth={5}
              fillOpacity={1}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {totalVisitors.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground text-base"
                        >
                          إجمالي الزوار
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          زيادة بنسبة 5.2٪ هذا الشهر{" "}
          <TrendingUp className="h-4 w-4 text-green-500" />
        </div>
        <div className="leading-none text-muted-foreground">
          عرض إجمالي الزوار للأشهر الستة الماضية
        </div>
      </CardFooter>
    </Card>
  );
}

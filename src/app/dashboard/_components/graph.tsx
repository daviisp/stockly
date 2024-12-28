"use client";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import { Last14DaysRevenueDto } from "../_data-access/get-last-14-days-revenue";

const chartConfig: ChartConfig = {
  totalRevenue: {
    label: "Receita total:",
  },
};

type GraphProps = {
  data: Last14DaysRevenueDto[];
};

export const Graph = ({ data }: GraphProps) => {
  return (
    <ChartContainer config={chartConfig}>
      <BarChart data={data} accessibilityLayer>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="day"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
        />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Bar dataKey="totalRevenue" radius={4} />
      </BarChart>
    </ChartContainer>
  );
};

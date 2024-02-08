"use client";

import { ComputedDatum, ResponsiveSunburst } from "@nivo/sunburst";
import { ChartData } from "~/types/chart-data";
import { useTheme } from "@nivo/core";

const CustomTooltipComponent = ({
  id,
  value,
  color,
}: ComputedDatum<unknown>) => {
  const theme = useTheme();

  return (
    <strong style={{ ...theme.tooltip.container, color }}>
      {id}: {value}€
    </strong>
  );
};

const ExpensesChart = ({ data }: { data: ChartData }) => {
  const colors: string[] = [];
  data.children.forEach((child) => {
    colors.push(child.color!);
  });

  return (
    <ResponsiveSunburst
      data={data}
      id="name"
      value="value"
      cornerRadius={12}
      borderWidth={6}
      borderColor="#2e3440"
      colors={colors}
      childColor={{
        from: "color",
        modifiers: [["brighter", 0.4]],
      }}
      enableArcLabels={true}
      arcLabel="id"
      arcLabelsRadiusOffset={0.45}
      arcLabelsSkipAngle={8}
      arcLabelsTextColor="#FFFFFF"
      tooltip={CustomTooltipComponent}
    />
  );
};

export default ExpensesChart;

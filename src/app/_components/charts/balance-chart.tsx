"use client";

import { ResponsiveLine } from "@nivo/line";
import { type BalanceChartData } from "~/types/balance-chart-data";
import { FormattedValue } from "~/app/_components/format/formatted-value";
import { formatValue } from "~/lib/money";

const theme = {
  axis: {
    fontSize: "18px",
    tickColor: "#4c566a",
    ticks: {
      line: {
        stroke: "#4c566a",
      },
      text: {
        fill: "#e5e9f0",
      },
    },
  },
  grid: {
    line: {
      stroke: "#4c566a",
    },
  },
};

const BalanceChart = ({ data }: { data: BalanceChartData }) => (
  <ResponsiveLine
    data={data}
    margin={{ top: 20, right: 20, bottom: 40, left: 80 }}
    xScale={{ type: "point" }}
    yScale={{
      type: "linear",
      min: -1250,
      max: 3750,
      stacked: true,
      reverse: false,
    }}
    colors="#5e81ac"
    xFormat="time:%d/%m/%Y"
    yFormat={(value) => <FormattedValue value={parseFloat(value.toString())} />}
    curve="monotoneX"
    lineWidth={3}
    axisTop={null}
    axisRight={null}
    axisBottom={{
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      legendOffset: 36,
      legendPosition: "middle",
      format: (value) => value.getDate(),
    }}
    axisLeft={{
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      legendOffset: -40,
      legendPosition: "middle",
      format: (value) => formatValue(value as number),
    }}
    enableGridX={false}
    gridYValues={[-1000, 0, 1000, 2000, 3000, 4000, 5000]}
    enablePoints={false}
    useMesh={true}
    theme={theme}
  />
);

export default BalanceChart;

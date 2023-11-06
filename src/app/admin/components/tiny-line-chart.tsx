import React, { PureComponent } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const TinyLineChart = ({ data, x }: any) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart width={300} height={100} data={data}>
        <XAxis dataKey="date" hide />
        <YAxis hide />
        <Tooltip
          wrapperStyle={{ zIndex: 1000 }}
          contentStyle={{
            background: "transparent",
            border: "none",
            fontSize: 13,
          }}
          labelStyle={{ background: "transparent", border: "none" }}
          position={{ x: -10, y: 75 }}
        />
        <Line
          type="monotone"
          dataKey={x}
          stroke="#16a34a"
          strokeWidth={2}
          dot={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default TinyLineChart;

import React, { PureComponent } from "react";
import {
  PieChart,
  Pie,
  Sector,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";

const data = [
  { name: "ACCEPTED", value: 400 },
  { name: "PENDING", value: 400 },
  { name: "DECLINED", value: 0 },
];
const COLORS = ["#16a34a", "#60a5fa", "#ef4444"];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  name,
  value,
  index,
}: any) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 1.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill={COLORS[index % COLORS.length]}
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {/* <tspan>{name}</tspan> */}
      {/* <tspan x={x} y={y+15}>{value}</tspan> */}
      {value}
    </text>
  );
};

const SimplePieChart = ({ datax }: any) => {
  return (
    <div style={{ width: "100%", height: 250 }}>
      <ResponsiveContainer>
        <PieChart margin={{ top: 10, right: 10, bottom: 10, left: 10 }}>
          <Pie
            className="text-xs"
            data={data}
            innerRadius="60%"
            outerRadius="80%"
            fill="#8884d8"
            dataKey="value"
            // label
            label={renderCustomizedLabel}
            labelLine={false}
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Legend
            wrapperStyle={{ fontSize: "12px", paddingTop: "10px"}}
            iconSize={10}
            height={50}
            verticalAlign="bottom"
            margin={{ top: 10, right: 0, left: 0, bottom: 0 }}
          />
          <Tooltip
            contentStyle={{
              background: "white",
              fontSize: 13,
            }}
            labelStyle={{ background: "transparent", border: "none" }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SimplePieChart;

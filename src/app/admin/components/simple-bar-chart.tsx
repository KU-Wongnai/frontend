import React, { PureComponent } from "react";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LabelList,
} from "recharts";

class CustomTick extends PureComponent<any, any> {
  render() {
    const { x, y, payload } = this.props;

    return (
      <foreignObject
        transform={`translate(0,${y - 30})`}
        width="200"
        height="100%"
      >
        <g
          transform={`translate(${x},${y})`}
          style={{ flex: 1, flexWrap: "wrap" }}
        >
          <text
            className="text-xs"
            textAnchor="end"
            fill="#666"
            style={{ flex: 1, flexWrap: "wrap", flexDirection: "row" }}
          >
            {payload.value}
          </text>
        </g>
      </foreignObject>

      // <foreignObject x="0" y={y} width="200" height="100%">
      //   <text
      //     className="text-xs"
      //     textAnchor="end"
      //     fill="#666"
      //     style={{
      //       flex: 1,
      //       flexWrap: "wrap",
      //       flexDirection: "row",
      //     }}
      //   >
      //     {payload.value}
      //   </text>
      // </foreignObject>
    );
  }
}

function findLongestName(obj: any) {
  let longestNameLength = 0;
  for (const item in obj) {
    if (obj[item].name.length > longestNameLength) {
      longestNameLength = obj[item].name.length;
    }
  }
  return longestNameLength;
}

const SimpleBarChart = ({ data }: any) => {
  const longestLabelLength = findLongestName(data);
  return (
    <ResponsiveContainer width="99%" height={data.length * 50}>
      <BarChart
        data={data}
        layout="vertical"
        barGap={2}
        barSize={30}
        margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
      >
        <XAxis hide axisLine={false} type="number" />
        <YAxis
          className=""
          // width={longestLabelLength * 2.5}
          width={200}
          yAxisId={0}
          dataKey="name"
          type="category"
          axisLine={false}
          tickLine={false}
          tick={{ fontSize: 11 }}
          // tick={<CustomTick />}
        />
        <Bar dataKey="value" fill="#16a34a">
          <LabelList dataKey="value" position="right" fontSize={15} />
        </Bar>

        <Tooltip
          contentStyle={{
       
            fontSize: 13,
          }}
          labelClassName="text-black rounded-sm"
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default SimpleBarChart;

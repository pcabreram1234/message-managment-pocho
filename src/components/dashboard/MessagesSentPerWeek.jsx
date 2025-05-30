import React from "react";
import { Card } from "antd";
import {
  ResponsiveContainer,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Bar,
  LabelList,
  BarChart,
} from "recharts";
import dayjs from "dayjs";
import isoWeek from "dayjs/plugin/isoWeek";
dayjs.extend(isoWeek);

const MessagesSentPerWeek = ({ weeklyData }) => {
  return (
    <Card
      title="📈 Messages Sent per Week"
      bordered={false}
      style={{
        borderRadius: 12,
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
      }}
    >
      <ResponsiveContainer width="100%" height={350}>
        <BarChart
          data={weeklyData}
          margin={{ top: 20, right: 30, left: 0, bottom: 50 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="week"
            angle={-35}
            textAnchor="end"
            interval={0}
            tick={{ fontSize: 12 }}
          />
          <YAxis
            allowDecimals={false}
            tick={{ fontSize: 12 }}
            label={{
              value: "Messages",
              angle: -90,
              position: "insideLeft",
              style: { textAnchor: "middle" },
            }}
          />
          <Tooltip
            contentStyle={{ borderRadius: 8 }}
            formatter={(value) => [`${value} messages`, "Total"]}
          />
          <Bar
            dataKey="count"
            fill="#8884d8"
            radius={[8, 8, 0, 0]}
            animationDuration={800}
          >
            <LabelList dataKey="count" position="top" />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default MessagesSentPerWeek;

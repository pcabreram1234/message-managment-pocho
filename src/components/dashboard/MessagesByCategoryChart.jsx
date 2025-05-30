import React from "react";
import { Card } from "antd";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#00C49F"];

const MessagesByCategoryChart = ({ messagesByCategory }) => {
  if (!messagesByCategory) return <div>loading...</div>;

  const categoryCount = {};

  messagesByCategory?.rows?.forEach((message) => {
    const categories = message.categories;
    if (categories) {
      categories.forEach((category) => {
        const categoryName =
          typeof category === "string" ? category : category.categorie_name;

        if (categoryName) {
          categoryCount[categoryName] = (categoryCount[categoryName] || 0) + 1;
        }
      });
    }
  });

  const categoryData = Object.entries(categoryCount).map(([name, value]) => ({
    name,
    value,
  }));

  return (
    <Card title="Messages by Category" style={{ width: "500px" }}>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={categoryData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={100}
            fill="#8884d8"
            label
          >
            {categoryData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
                wi
              />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default MessagesByCategoryChart;

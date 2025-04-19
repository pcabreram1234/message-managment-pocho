import React from "react";
import { Card, Typography } from "antd";
const StatsCard = ({ title, value, color }) => {
  const { Title, Text } = Typography;
  return (
    <Card
      style={{
        borderLeft: `5px solid ${color}`,
        maxWidth: "380px",
        minWidth: "200px",
      }}
      title={title}
    >
      <Text strong style={{ fontSize: 17 }}>
        {value}
      </Text>
    </Card>
  );
};

export default StatsCard;

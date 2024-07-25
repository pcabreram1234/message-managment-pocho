import React from "react";
import { Card, Typography } from "antd";

const MessageAsociateToContactCard = ({ data }) => {
  const { Paragraph } = Typography;
  return (
    <Card style={{ textAlign: "center" }}>
      <Paragraph>{data.message}</Paragraph>
    </Card>
  );
};

export default MessageAsociateToContactCard;

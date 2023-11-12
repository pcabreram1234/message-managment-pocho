import React from "react";
import { Card, List, Typography } from "antd";

const MessageAsociateToContactCard = ({ data }) => {
  const { Paragraph, Text } = Typography;
  const { Item } = List;
  return (
    <Card style={{ textAlign: "center" }}>
      <Paragraph>{data.message}</Paragraph>
      <List
        style={{ display: "flex", justifyContent: "center" }}
        itemLayout="vertical"
      >
        {data.categories.map((category) => {
          return (
            <Item key={category.id}>
              <Text type="secondary" strong style={{ color: "green" }}>
                {category.categorie_name}
              </Text>
            </Item>
          );
        })}
      </List>
    </Card>
  );
};

export default MessageAsociateToContactCard;

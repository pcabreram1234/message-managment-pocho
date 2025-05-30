import React, { useEffect, useState } from "react";
import { Card, Table, Typography, Space, Tag, Spin, message } from "antd";
import { WarningOutlined } from "@ant-design/icons";
// import axios from "axios";

const { Title, Text } = Typography;

const FailedMessages = ({ data }) => {
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      width: 80,
    },
    {
      title: "Recipient",
      dataIndex: "recipient",
      key: "recipient",
    },
    {
      title: "Content",
      dataIndex: "message_content",
      key: "message_content ",
      ellipsis: true,
      render: (text) => (
        <Text ellipsis={{ tooltip: text }} style={{ maxWidth: 200 }}>
          {text}
        </Text>
      ),
    },
    {
      title: "Reason of failure",
      dataIndex: "error_message",
      key: "error_message",
      render: (motivo) => <Tag color="red">{motivo}</Tag>,
    },
    {
      title: "Scheduled Date",
      dataIndex: "scheduled_date",
      key: "scheduled_date",
      render: (fecha) => new Date(fecha).toLocaleString(),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
  ];

  return (
    <Card
      title={
        <Space>
          <WarningOutlined style={{ color: "red" }} />
          <Title level={4} style={{ margin: 0 }}>
            Messages Failed{" "}
          </Title>
        </Space>
      }
    >
      <Table
        dataSource={data}
        columns={columns}
        rowKey="id"
        pagination={{ pageSize: 10 }}
        locale={{ emptyText: "No hay mensajes fallidos." }}
      />
    </Card>
  );
};

export default FailedMessages;

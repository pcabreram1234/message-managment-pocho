// components/PendingMessagesTable.jsx
import React, { useState } from "react";
import { Table, Tag, Card, Empty, Typography } from "antd";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);

const { Paragraph } = Typography;

const EstadoTag = ({ estado }) => {
  const colorMap = {
    Pending: "orange",
    Completed: "green",
    Error: "red",
  };

  return (
    <Tag color={colorMap[estado] || "default"}>{estado.toUpperCase()}</Tag>
  );
};

const PendingMessagesTable = ({ data }) => {
  const columns = [
    {
      title: "Message",
      dataIndex: "message",
      key: "message",
      render: (_, record) => (
        <Paragraph
          ellipsis={{
            rows: 1,
            expandable: "collapsible",
            tooltip: record?.message,
          }}
        >
          {record?.message}
        </Paragraph>
      ),
    },
    {
      title: "Recipient",
      dataIndex: "recipient",
      key: "recipient",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (estado) => <EstadoTag estado={estado} />,
    },
    {
      title: "Sent at",
      dataIndex: "scheduled_date",
      key: "scheduled_date",
      render: (_, record) =>
        dayjs(record?.end_date).format("DD/MM/YYYY HH:mm:ss"),
    },
  ];

  return (
    <Card title="⏳ Individual messages about to be sent   ">
      {data?.length > 0 ? (
        <Table
          rowKey="id"
          columns={columns}
          dataSource={data}
          pagination={{ pageSize: 3 }}
        />
      ) : (
        <Empty description="There are no pending messages to send." />
      )}
    </Card>
  );
};

export default PendingMessagesTable;

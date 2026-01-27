import React from "react";
import { Table, Tag, Typography, Tooltip, Button } from "antd";
import dayjs from "dayjs";

const { Text } = Typography;

const FailedCampaignMessagesTab = ({ data = [], loading }) => {
  console.log(data);
  const columns = [
    {
      title: "Campaign",
      dataIndex: "campaignName",
      render: (text, record) => (
        <>
          <Text strong>{text}</Text>
          <br />
          <Tag color={record.campaignStatus === "active" ? "blue" : "default"}>
            {record.campaignStatus}
          </Tag>
        </>
      ),
    },
    {
      title: "Message",
      dataIndex: "messageContent",
      ellipsis: true,
      render: (text) => (
        <Tooltip title={text}>
          <Text>{text}</Text>
        </Tooltip>
      ),
    },
    {
      title: "Contact",
      dataIndex: "contactEmail",
    },
    {
      title: "Error",
      dataIndex: "errorMessage",
      render: (text) => <Tag color="red">{text}</Tag>,
    },
    {
      title: "Attempts",
      dataIndex: "attempts",
    },
    {
      title: "Failed At",
      dataIndex: "failedAt",
      render: (date) => dayjs(date).format("DD/MM/YYYY HH:mm"),
    },
    {
      title: "Actions",
      render: (_, record) => (
        <>
          <Button size="small">Retry</Button>
          <Button size="small" type="link">
            View Campaign
          </Button>
        </>
      ),
    },
  ];

  return (
    <Table
      rowKey={(r) => `${r.campaignId}-${r.messageId}-${r.contactId}`}
      columns={columns}
      dataSource={data}
      loading={loading}
      pagination={{ pageSize: 10 }}
    />
  );
};

export default FailedCampaignMessagesTab;

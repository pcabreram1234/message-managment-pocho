import React from "react";
import { fetchData } from "../../utility/fetchData";
import { Card, Table, Tag } from "antd";

const TopCampaigns = ({ campaignsData }) => {
  const API =
    import.meta.env.VITE_API_URL +
    import.meta.env.VITE_API_URL_ROUTER +
    "campaigns/findTopCampaignsByMessagesSended";

  const data = fetchData(API, "GET");

  const columns = [
    {
      title: "📢 Campaign Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <strong>{text}</strong>,
    },
    {
      title: "Messages Sent",
      dataIndex: "messagesSent",
      key: "messagesSent",
      sorter: (a, b) => a.messagesSent - b.messagesSent,
      render: (text) => <Tag color="purple">{text}</Tag>,
      align: "center",
    },
  ];

  return (
    <Card
      title="🏆 Top Campaigns by Messages Sent"
      bordered={false}
      style={{ borderRadius: 12, boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}
    >
      <Table
        dataSource={data?.map((c) => ({
          name: c?.["Campaign.name"],
          messagesSent: c?.messagesSent,
        }))}
        columns={columns}
        pagination={false}
        rowKey="id"
        size="middle"
      />
    </Card>
  );
};

export default TopCampaigns;

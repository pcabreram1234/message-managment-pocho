import React from "react";
import { Table, Tag, Card } from "antd";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);

const EstadoTag = ({ estado }) => {
  const colorMap = {
    pending: "orange",
    completed: "green",
    active: "blue",
    paused: "gray",
    cancelled: "red",
  };

  return (
    <Tag color={colorMap[estado] || "default"}>{estado.toUpperCase()}</Tag>
  );
};

const CamapignsAboutTosent = ({ data }) => {
  const columns = [
    {
      title: "Start date",
      dataIndex: "start_date",
      key: "start_date",
      render: (_, record) =>
        dayjs(record?.start_date).format("DD/MM/YYYY HH:mm:ss"),
    },
    {
      title: "End date",
      dataIndex: "end_date",
      key: "sent_time",
      render: (_, record) =>
        dayjs(record?.end_date).format("DD/MM/YYYY HH:mm:ss"),
    },
    {
      title: "Campaign Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Destination / Group",
      dataIndex: "email",
      key: "email",
      render: (_, record) =>
        record?.CampaignRecipients?.length > 2 ? (
          <Tag color="blue-inverse">{record?.CampaignRecipients?.length}</Tag>
        ) : (
          record?.CampaignRecipients?.map((recipient, id) => {
            return (
              <Tag key={id} color="blue-inverse">
                {recipient?.Contact?.email}
              </Tag>
            );
          })
        ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => <EstadoTag estado={status} />,
    },
  ];

  return (
    <Card title="⏳ Campaigns about to be sent" style={{ textAlign: "center" }}>
      <Table
        rowKey="id"
        columns={columns}
        dataSource={data}
        pagination={{ pageSize: 5 }}
      />
    </Card>
  );
};

export default CamapignsAboutTosent;

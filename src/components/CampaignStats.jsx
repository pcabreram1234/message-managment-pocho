// src/components/CampaignStats.jsx
import React from "react";
import { Card, Col, Row, Statistic, Tag } from "antd";
import { CheckCircleOutlined, ClockCircleOutlined, SendOutlined, RocketOutlined } from "@ant-design/icons";

const CampaignStats = ({ stats }) => {
  const {
    total,
    active,
    scheduledToday,
    totalRecipients,
  } = stats;

  return (
    <Row gutter={[16, 16]}>
      <Col xs={24} sm={12} md={6}>
        <Card bordered={false}>
          <Statistic
            title="Total Campaigns"
            value={total}
            prefix={<RocketOutlined />}
          />
        </Card>
      </Col>
      <Col xs={24} sm={12} md={6}>
        <Card bordered={false}>
          <Statistic
            title="Active Campaigns"
            value={active}
            valueStyle={{ color: "#52c41a" }}
            prefix={<CheckCircleOutlined />}
          />
        </Card>
      </Col>
      <Col xs={24} sm={12} md={6}>
        <Card bordered={false}>
          <Statistic
            title="Scheduled Today"
            value={scheduledToday}
            valueStyle={{ color: "#faad14" }}
            prefix={<ClockCircleOutlined />}
          />
        </Card>
      </Col>
      <Col xs={24} sm={12} md={6}>
        <Card bordered={false}>
          <Statistic
            title="Recipients Reached"
            value={totalRecipients}
            suffix="contacts"
            prefix={<SendOutlined />}
          />
        </Card>
      </Col>
    </Row>
  );
};

export default CampaignStats;

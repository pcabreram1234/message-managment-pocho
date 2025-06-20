import React, { useEffect, useState } from "react";
import StatsCard from "../components/StatsCard";
import ChartsAndIndicators from "./dasboard/ChartsAndIndicators";
import UpcomingScheduledShipmets from "./dasboard/UpcomingScheduledShipmets";
import AlertsAndNotifications from "./dasboard/AlertsAndNotifications";
import QuickActions from "./dasboard/QuickActions";
import { fetchData } from "../utility/fetchData";
import { submitData } from "../utility/submitData";
import { Row, Col, Layout, Typography, Divider } from "antd";

import { useActionEffect } from "../hooks/useActionEffect";

const API =
  import.meta.env.VITE_API_URL +
  import.meta.env.VITE_API_URL_ROUTER +
  "configuration/getUserStatistics";

const Dashboard = () => {
  const { Header, Content } = Layout;
  const [statistics, setStatistics] = useState([]);

  const fetchDashBoardInfo = () => {
    submitData(API, "", "GET").then((resp) => {
      setStatistics(resp);
    });
  };

  useEffect(() => {
    fetchDashBoardInfo();
  }, []);

  useActionEffect(
    { type: "update", target: "dashboard-overview" },
    fetchDashBoardInfo
  );

  return (
    <Layout>
      <Header style={{ backgroundColor: "transparent" }}>
        <Typography.Title>Dashboard</Typography.Title>
      </Header>

      <Divider />
      <Layout>
        <Header style={{ backgroundColor: "transparent" }}>
          <Typography.Title level={3}>🧭 Overview</Typography.Title>
        </Header>
        <Content>
          <Row
            justify={"space-between"}
            gutter={[16, { xs: 8, sm: 16, md: 24, lg: 32 }]}
          >
            <Col>
              <StatsCard
                title="Messages Saved"
                value={statistics?.allMessages}
                color="#1890ff"
              />
            </Col>
            <Col>
              <StatsCard
                title="Messages Sended"
                value={statistics?.sended}
                color="#52c41a"
              />
            </Col>
            <Col>
              <StatsCard
                title="Messages Scheduled"
                value={statistics?.scheduled}
                color="lightblue"
              />
            </Col>
            <Col>
              <StatsCard
                title="Messages Failed"
                value={statistics?.failed}
                color="#f5222d"
              />
            </Col>

            <Col>
              <StatsCard
                title="Active Camapigns"
                value={statistics?.ActiveCampaigns}
                color="lightblue"
              />
            </Col>
            <Col>
              <StatsCard
                title="Paused Camapigns"
                value={statistics?.PausedCampaigs}
                color="gray"
              />
            </Col>
          </Row>
        </Content>
      </Layout>

      <Divider />
      <QuickActions />

      <Divider />
      <ChartsAndIndicators />

      <Divider />
      <UpcomingScheduledShipmets />

      <Divider />
      <AlertsAndNotifications />
    </Layout>
  );
};
export default Dashboard;

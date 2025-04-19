import React from "react";
import { fetchData } from "../utility/fetchData";
import StatsCard from "../components/StatsCard";
import { Row, Col, Layout, Typography, Divider } from "antd";

const API =
  import.meta.env.VITE_API_URL +
  import.meta.env.VITE_API_URL_ROUTER +
  "configuration/getUserStatistics";

const Dashboard = () => {
  const { Header, Content } = Layout;
  const statistics = fetchData(API);
  console.log(statistics);
  return (
    <Layout>
      <Header style={{ backgroundColor: "transparent" }}>
        <Typography.Title>Dashboard</Typography.Title>
      </Header>
      <Divider />
      <Typography.Title level={3}> Messages Resume</Typography.Title>
      <Content>
        <Row justify={"space-evenly"}>
          <Col span={5}>
            <StatsCard
              title="Total"
              value={statistics?.allMessages}
              color="#1890ff"
            />
          </Col>
          <Col span={5}>
            <StatsCard
              title="Sended"
              value={statistics?.sended}
              color="#52c41a"
            />
          </Col>
          <Col span={5}>
            <StatsCard
              title="Scheduled"
              value={statistics?.scheduled}
              color="lightblue"
            />
          </Col>
          <Col span={5}>
            <StatsCard
              title="Failed"
              value={statistics?.failed}
              color="#f5222d"
            />
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};
export default Dashboard;

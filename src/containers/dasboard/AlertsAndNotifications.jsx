import React from "react";
import { Layout, Typography, Row, Col } from "antd";
import FailedMessages from "../../components/dashboard/FailedMessages";
import { fetchData } from "../../utility/fetchData";

const { Content, Header } = Layout;
const AlertsAndNotifications = () => {
  const API_FAILED_MESSAGES =
    import.meta.env.VITE_API_URL +
    import.meta.env.VITE_API_URL_ROUTER +
    "failedMessages";

  const failedMessagesData = fetchData(API_FAILED_MESSAGES, "GET");

  return (
    <Layout>
      <Header style={{ backgroundColor: "transparent" }}>
        <Typography.Title level={3}>
          ⚠️Alerts and/or Important Notifications
        </Typography.Title>
      </Header>
      <Content>
        <Row
          gutter={[16, { xs: 8, sm: 16, md: 24, lg: 32 }]}
          justify={"space-evenly"}
        >
          <Col>
            <FailedMessages data={failedMessagesData} />
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default AlertsAndNotifications;

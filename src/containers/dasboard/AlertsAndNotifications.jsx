import React from "react";
import { Layout, Typography, Row, Col, Tabs } from "antd";
import FailedMessages from "../../components/dashboard/FailedMessages";
import FailedCampaignMessagesTab from "../../components/tabs/FailedCampaignMessagesTab";
import { fetchData } from "../../utility/fetchData";

const { Content, Header } = Layout;
const { TabPane } = Tabs;

const AlertsAndNotifications = () => {
  const API_FAILED_MESSAGES =
    import.meta.env.VITE_API_URL +
    import.meta.env.VITE_API_URL_ROUTER +
    "failedMessages";

  const API_FAILED_CAMPAIGN_MESSAGES =
    import.meta.env.VITE_API_URL +
    import.meta.env.VITE_API_URL_ROUTER +
    "campaigns/failedMessages";

  const failedMessagesData = fetchData(API_FAILED_MESSAGES, "GET");
  const failedCampaignMessagesData = fetchData(
    API_FAILED_CAMPAIGN_MESSAGES,
    "GET",
  );

  return (
    <Layout>
      <Header style={{ backgroundColor: "transparent" }}>
        <Typography.Title level={3}>
          ⚠️ Alerts and Important Notifications
        </Typography.Title>
      </Header>

      <Content>
        <Tabs defaultActiveKey="standalone" size="large">
          {/* ===============================
              Tab 1: Mensajes sin campaña
          =============================== */}
          <TabPane tab="Failed Messages (Standalone)" key="standalone">
            <Row justify="center">
              <Col span={24}>
                <FailedMessages data={failedMessagesData} />
              </Col>
            </Row>
          </TabPane>

          {/* ===============================
              Tab 2: Mensajes con campaña
          =============================== */}
          <TabPane tab="Failed Campaign Messages" key="campaigns">
            <Row justify="center">
              <Col span={24}>
                <FailedCampaignMessagesTab
                  data={failedCampaignMessagesData?.result}
                />
              </Col>
            </Row>
          </TabPane>
        </Tabs>
      </Content>
    </Layout>
  );
};

export default AlertsAndNotifications;

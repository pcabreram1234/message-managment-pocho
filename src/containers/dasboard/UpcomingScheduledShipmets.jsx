import React from "react";
import { Layout, Typography, Row, Col } from "antd";
import CamapignsAboutTosent from "../../components/dashboard/CamapignsAboutTosent";
import PendingMessagesTable from "../../components/dashboard/PendingMessagesTable";
import { fetchData } from "../../utility/fetchData";

const { Content, Header } = Layout;
const UpcomingScheduledShipmets = () => {
  const API_CAMPAIGNS_ABOUT_TO_SENT =
    import.meta.env.VITE_API_URL +
    import.meta.env.VITE_API_URL_ROUTER +
    "campaigns/getCampaignsAboutToSent";

  const API_MESSAGES_ABOUT_TO_SENT =
    import.meta.env.VITE_API_URL +
    import.meta.env.VITE_API_URL_ROUTER +
    "configuration/findMessagesAboutToSent";

  const campaignsAboutToSentData = fetchData(
    API_CAMPAIGNS_ABOUT_TO_SENT,
    "GET"
  );

  const messagesAboutToSent = fetchData(API_MESSAGES_ABOUT_TO_SENT, "GET");

    return (
    <Layout>
      <Header style={{ backgroundColor: "transparent" }}>
        <Typography.Title level={3}>
        ⏳Upcoming scheduled shipments
        </Typography.Title>
      </Header>
      <Content>
        <Row
          gutter={[16, { xs: 8, sm: 16, md: 24, lg: 32 }]}
          justify={"space-evenly"}
        >
          <Col>
            <CamapignsAboutTosent data={campaignsAboutToSentData} />
          </Col>

          <Col>
            <PendingMessagesTable data={messagesAboutToSent} />
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default UpcomingScheduledShipmets;

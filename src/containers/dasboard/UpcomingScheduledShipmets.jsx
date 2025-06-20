import React, { useEffect, useState } from "react";
import { Layout, Typography, Row, Col } from "antd";
import CamapignsAboutTosent from "../../components/dashboard/CamapignsAboutTosent";
import PendingMessagesTable from "../../components/dashboard/PendingMessagesTable";
import { useActionEffect } from "../../hooks/useActionEffect";
import { submitData } from "../../utility/submitData";

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

  const [campaignsAboutToSentData, setCampaignsAboutToSentData] = useState([]);
  const [messagesAboutToSent, setMessagesAboutToSent] = useState([]);

  const handleDateFetching = async () => {
    const campaignFetching = await submitData(
      API_CAMPAIGNS_ABOUT_TO_SENT,
      "",
      "GET"
    );
    const messagesAboutToSentFething = await submitData(
      API_MESSAGES_ABOUT_TO_SENT,
      "",
      "GET"
    );
    setCampaignsAboutToSentData(campaignFetching);
    setMessagesAboutToSent(messagesAboutToSentFething);
  };

  useEffect(() => {
    handleDateFetching();
  }, []);

  useActionEffect(
    { type: "update", target: "dashboard-overview" },
    handleDateFetching
  );

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

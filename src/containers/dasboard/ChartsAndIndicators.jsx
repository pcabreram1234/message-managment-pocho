import React from "react";
import TopCampaigns from "../../components/dashboard/Topcampaigns";
import SuccessErrorRateChart from "../../components/dashboard/SucessErrorRateChart";
import MessagesSentPerWeek from "../../components/dashboard/MessagesSentPerWeek";
import MessagesByCategoryChart from "../../components/dashboard/MessagesByCategoryChart";
import { Layout, Typography, Row, Col } from "antd";
import { fetchData } from "../../utility/fetchData";
const { Content, Header } = Layout;
const ChartsAndIndicators = () => {
  const API_MESSAGES_PER_WEEK =
    import.meta.env.VITE_API_URL +
    import.meta.env.VITE_API_URL_ROUTER +
    "configuration/findMessagesSendedPerWeek";

  const API_MESSAGES_BY_CATEGORY =
    import.meta.env.VITE_API_URL +
    import.meta.env.VITE_API_URL_ROUTER +
    "configuration/findSendedMessages";

  const API_SUCCESS_ERROR_RATE_BY_CAMPAIGN =
    import.meta.env.VITE_API_URL +
    import.meta.env.VITE_API_URL_ROUTER +
    "campaigns/getSuccessErrorRateByCampaign";
  const rateData = fetchData(API_SUCCESS_ERROR_RATE_BY_CAMPAIGN, "GET");

  const weeklyData = fetchData(API_MESSAGES_PER_WEEK, "GET");
  const messagesByCategory = fetchData(API_MESSAGES_BY_CATEGORY, "GET");

  return (
    <Layout>
      <Header style={{ backgroundColor: "transparent" }}>
        <Typography.Title level={3}>📈Charts and indicators</Typography.Title>
      </Header>
      <Content>
        <Row
          gutter={[16, { xs: 8, sm: 16, md: 24, lg: 32 }]}
          justify={"space-evenly"}
        >
          <Col>
            <MessagesSentPerWeek weeklyData={weeklyData} />
          </Col>

          <Col>
            <TopCampaigns />
          </Col>
          <Col>
            <MessagesByCategoryChart messagesByCategory={messagesByCategory} />
          </Col>

          <Col>
            <SuccessErrorRateChart rateData={rateData} />
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default ChartsAndIndicators;

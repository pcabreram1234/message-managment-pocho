import React, { useState } from "react";
import MessageConfigTable from "../components/layout/MessageConfigTable";
import ConfigMessageModal from "../components/modals/ConfigMessageModal";
import ConfigurateButton from "../components/buttons/ConfigurateButton";
import ConfigMessagesModal from "../components/modals/ConfigMessagesModal";
import { Layout, Typography, Row, Col } from "antd";
import { fetchData } from "../utility/fetchData";

const { Header, Content } = Layout;
const { Title } = Typography;

const ConfigurationPanel = () => {
  const [id, setId] = useState({});
  const [showConfigurationModal, setShowConfigurationModal] = useState(false);
  const [showConfigurationButton, setShowConfigurationButton] = useState(false);
  const [showConfigurationMessagesModal, setShowConfigurationMessagesModal] =
    useState(false);
  const [messages, setMesssages] = useState([]);
  

  const API_GET_DATE =
    import.meta.env.VITE_API_URL +
    import.meta.env.VITE_API_URL_ROUTER +
    "configuration/getCurrentDate";

  const currentDate = fetchData(API_GET_DATE, "GET");
  const handleData = (id) => {
    setId(id);
  };

  return (
    <Layout>
      <Header style={{ background: "transparent" }}>
        <Row
          gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
          justify="start"
          align="middle"
          style={{ width: "100%", height: "100%" }}
        >
          <Col style={{ position: "relative" }}>
            <Title level={3} style={{ margin: "auto" }}>
              Messages Automations
            </Title>
          </Col>

          <Col style={{ position: "relative" }}>
            {showConfigurationButton && (
              <ConfigurateButton cbModal={setShowConfigurationMessagesModal} />
            )}
          </Col>
        </Row>
      </Header>

      <Content style={{ margin: "5px 0 5px 5px" }}>
        <MessageConfigTable
          handleData={handleData}
          setShowModal={setShowConfigurationModal}
          setShowConfigurationButton={setShowConfigurationButton}
          setMesssages={setMesssages}
        />
      </Content>

      {showConfigurationModal && (
        <ConfigMessageModal
          id={id}
          cbShowModal={setShowConfigurationModal}
          currentDate={currentDate}
        />
      )}

      {showConfigurationMessagesModal && (
        <ConfigMessagesModal
          cbShowModal={setShowConfigurationMessagesModal}
          messages={messages}
          currentDate={currentDate}
        />
      )}
    </Layout>
  );
};

export default ConfigurationPanel;

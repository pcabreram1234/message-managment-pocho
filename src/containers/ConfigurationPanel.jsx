import React, { useState } from "react";
import MessageConfigTable from "../components/layout/MessageConfigTable";
import ConfigMessageModal from "../components/modals/ConfigMessageModal";
import ConfigurateButton from "../components/buttons/ConfigurateButton";
import ConfigMessagesModal from "../components/modals/ConfigMessagesModal";
import FooterPage from "../components/layout/Footer";
import { Layout, Typography } from "antd";
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
      <Header>
        <Title style={{ color: "white", textAlign: "center" }}>
          Messages Delivery Configuration
        </Title>
      </Header>

      <Content style={{ margin: "5px 0 5px 5px" }}>
        {showConfigurationButton && (
          <ConfigurateButton cbModal={setShowConfigurationMessagesModal} />
        )}
      </Content>

      <Content>
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
      <FooterPage />
    </Layout>
  );
};

export default ConfigurationPanel;

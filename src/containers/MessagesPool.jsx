import React, { useState } from "react";
import { Layout, Typography } from "antd";
import AddMessage from "../components/AddMessages";
import MessageMant from "../components/layout/MessageMat";
import PopUpModal from "../components/modals/PopUpModal";
import SendToModal from "../components/modals/SendToModal";

const { Header, Content, Footer } = Layout;
const { Title } = Typography;

const MessagesPool = () => {
  const [isLoading, setIsloading] = useState(false);
  const [modalMessage, setModallMessage] = useState("");
  const [alertModalType, setAlertModalType] = useState("");
  const [modalInfoText, setModalInfoText] = useState("");
  const [showSendToModal, setShowSendToModal] = useState(false);
  const [messageTosend, setMessageToSend] = useState("");

  /* Funcion que se encarga de recibir las acciones tipo CRUD disparando el modal correspondiente */
  function handleModal(message, alertType, infoText) {
    setModallMessage(message);
    setAlertModalType(alertType);
    setModalInfoText(infoText);
  }

  const closeModal = () => {
    if (alertModalType === "success") {
      setModallMessage("");
      setAlertModalType("");
      setModalInfoText("");
      setIsloading(false);
    }
  };

  const startLoading = () => {
    setIsloading(true);
  };

  const stopLoading = () => {
    setIsloading(false);
  };

  /* Bloque de codigo que determina cuando cerrar o mantener abieto el modal */
  if (isLoading === true || alertModalType === "success") {
    setTimeout(() => {
      closeModal();
      stopLoading();
    }, 1500);
  } else {
    closeModal();
  }

  return (
    <Layout>
      <Header>
        <Title style={{ color: "white", textAlign: "center" }}>
          Predefined Messages
        </Title>
      </Header>
      <Content>
        {!isLoading && (
          <MessageMant
            setShowSendToModal={setShowSendToModal}
            handleModal={handleModal}
            startLoading={startLoading}
            setMessageToSend={setMessageToSend}
          />
        )}
        {isLoading && (
          <PopUpModal
            isModalVisible={true}
            modalMessage={modalMessage}
            alertModalType={alertModalType}
            modalInfoText={modalInfoText}
            stopLoading={stopLoading}
          />
        )}

        {showSendToModal && (
          <SendToModal
            setShowSendToModal={setShowSendToModal}
            message={messageTosend}
          />
        )}
      </Content>

      <Footer style={{ background: "#bfbfbf" }}>
        <AddMessage startLoading={startLoading} handleModal={handleModal} />
      </Footer>
    </Layout>
  );
};

export default MessagesPool;

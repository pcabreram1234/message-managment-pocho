import React, { useState } from "react";
import { Modal, Input } from "antd";
import PopUpModal from "../modals/PopUpModal";
import MessagesConfigFooter from "../buttons/MessagesConfigFooter";

const ConfigMessageModal = ({ messages, cbShowModal, currentDate }) => {
  /* Modal state */
  const [isVisible, setIsVisble] = useState(true);
  const [showPopUpModal, setShowPopUpModal] = useState(false);
  /* PopUpModal States */
  const [popUpModalInfo, setPopUpModalInfo] = useState({
    modalMessage: "",
    alertModalType: "",
    modalInfoText: "",
  });

  const handleOnCancel = () => {
    setIsVisble(false);
    cbShowModal(false);
  };

  const renderMessageComponent = messages.map((message) => {
    if (message.length !== 0) {
      return (
        <Input.TextArea
          key={message.key}
          value={message.message}
          disabled
          style={{
            color: "black",
            height: "100px",
            margin: "10px 0 10px 5px",
          }}
        />
      );
    }
  });

  return (
    <Modal
      title="Config Messages"
      visible={isVisible}
      closable={true}
      onCancel={handleOnCancel}
      centered={true}
      bodyStyle={{ overflow: "scroll", height: "290px" }}
      footer={
        <MessagesConfigFooter
          setShowPopUpModal={setShowPopUpModal}
          setPopUpModalInfo={setPopUpModalInfo}
          handleOnCancel={handleOnCancel}
          messages={messages}
        />
      }
    >
      {renderMessageComponent}
      {showPopUpModal && (
        <PopUpModal
          alertModalType={popUpModalInfo.alertModalType}
          cb={setShowPopUpModal}
          isModalVisible={showPopUpModal}
          modalInfoText={popUpModalInfo.modalInfoText}
          modalMessage={popUpModalInfo.modalMessage}
        />
      )}
    </Modal>
  );
};

export default ConfigMessageModal;

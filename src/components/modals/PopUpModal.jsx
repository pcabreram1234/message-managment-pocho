import React, { useState, useEffect } from "react";
import { Modal, Spin, Alert, Typography } from "antd";
const { Text } = Typography;

const PopUpModal = ({
  isModalVisible,
  modalMessage,
  alertModalType,
  modalInfoText,
  cb,
}) => {
  const [currentVisible, setCurrentVisible] = useState(isModalVisible);
  const [showMessage, setShowMessage] = useState(false);

  const handleClose = () => {
    if (cb) {
      cb(false);
    }
    setCurrentVisible(false);
  };

  useEffect(() => {
    setTimeout(() => {
      setShowMessage(true);
    }, 500);
  }, []);

  return (
    <Modal
      visible={currentVisible}
      closable={true}
      cancelButtonProps={{ disabled: true }}
      okButtonProps={{ disabled: true }}
      onCancel={handleClose}
      onOk={handleClose}
      style={{ display: "flex", flexDirection: "column", textAlign: "center" }}
    >
      <Text>{modalMessage}</Text>
      <Spin />
      {showMessage && <Alert message={modalInfoText} type={alertModalType} />}
    </Modal>
  );
};

export default PopUpModal;

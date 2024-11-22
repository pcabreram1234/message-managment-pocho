import React, { useState, useEffect } from "react";
import { Modal, Spin, Alert, Typography, Space } from "antd";
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
      open={currentVisible}
      closable={true}
      cancelButtonProps={{ disabled: true, hidden: true }}
      okButtonProps={{ disabled: true, hidden: true }}
      footer={null}
      onCancel={handleClose}
      onOk={handleClose}
      style={{ display: "flex", flexDirection: "column", textAlign: "center" }}
    >
      <Space direction="vertical">
        <Space>
          <Spin size="large" />
          <Text>{modalMessage}</Text>
        </Space>
        {showMessage && <Alert message={modalInfoText} type={alertModalType} />}
      </Space>
    </Modal>
  );
};

export default PopUpModal;

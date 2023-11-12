import React, { useState } from "react";
import { Modal, Alert, Spin, Typography } from "antd";
import { DeleteFilled } from "@ant-design/icons";
import { deleteDataFuntion } from "../../utility/Funtions";

const { Text } = Typography;
const API_URL = "http://localhost:3120/api/v1/contacts/deleteContact";
const DeleteContactModal = ({ id, setReloadTable, setShowDeleteModal }) => {
  const [showModal, setShowModal] = useState(true);
  const [showMessage, setShowMessage] = useState(false);
  const [alertModalType, setAlertModalType] = useState("");
  const [modalMessage, setModallMessage] = useState("");

  const onCancel = () => {
    setShowModal(false);
    setShowDeleteModal(false);
  };

  const handleResultModalInfo = (message, alertModalType) => {
    setModallMessage(message);
    setAlertModalType(alertModalType);
  };

  return (
    <Modal
      visible={showModal}
      closable
      title={"Do you want do delete this contact?"}
      okButtonProps={{ icon: <DeleteFilled /> }}
      okType="danger"
      okText="Yes"
      cancelText="No"
      onCancel={onCancel}
      onOk={() => {
        deleteDataFuntion(API_URL, id, handleResultModalInfo);
        setTimeout(() => {
          setShowMessage(true);
        }, 900);
        setTimeout(() => {
          setReloadTable(true);
        }, 1500);
      }}
    >
      {showMessage && (
        <>
          <Spin />
          <Text>Deleting Contact</Text>
          <Alert message={modalMessage} type={alertModalType} />
        </>
      )}
    </Modal>
  );
};

export default DeleteContactModal;

import React, { useState } from "react";
import { Modal, Alert, Spin, Typography } from "antd";
import { DeleteFilled } from "@ant-design/icons";
import { deleteDataFuntion } from "../../utility/Funtions";

const { Text } = Typography;
const API_URL = "http://localhost:3120/api/v1/contacts/deleteContacts";
const DeleteContacstModal = ({
  id,
  setReloadTable,
  setShowDeleteContactsModal,
}) => {
  const [showModal, setShowModal] = useState(true);
  const [showMessage, setShowMessage] = useState(false);
  const [alertModalType, setAlertModalType] = useState("");
  const [modalMessage, setModallMessage] = useState("");

  const onCancel = () => {
    setShowModal(false);
    setShowDeleteContactsModal(false);
  };

  const handleResultModalInfo = (message, alertModalType) => {
    setModallMessage(message);
    setAlertModalType(alertModalType);
  };

  console.log(id);

  return (
    <Modal
      visible={showModal}
      closable
      title={"Do you want do delete these contacts?"}
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
          <Text>Deleting Contacts</Text>
          <Alert message={modalMessage} type={alertModalType} />
        </>
      )}
    </Modal>
  );
};

export default DeleteContacstModal;

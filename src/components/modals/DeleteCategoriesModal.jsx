import React, { useState } from "react";
import { Modal, Alert, Spin, Typography } from "antd";
import { DeleteFilled } from "@ant-design/icons";
import { deleteDataFuntion } from "../../utility/Funtions";

const { Text } = Typography;
const API_URL =
  import.meta.env.VITE_API_URL +
  import.meta.env.VITE_API_URL_ROUTER +
  "categories/deleteCategories";
const DeleteCategoriesModal = ({ id, setShowDeleteCategoriesModal }) => {
  const [showModal, setShowModal] = useState(true);
  const [showMessage, setShowMessage] = useState(false);
  const [alertModalType, setAlertModalType] = useState("");
  const [modalMessage, setModallMessage] = useState("");

  const onCancel = () => {
    setShowModal(false);
    setShowDeleteCategoriesModal(false);
  };

  const handleResultModalInfo = (message, alertModalType) => {
    setModallMessage(message);
    setAlertModalType(alertModalType);
  };

  return (
    <Modal
      visible={showModal}
      closable
      title={"Do you want do delete these categories?"}
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
          window.location.href = "";
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

export default DeleteCategoriesModal;

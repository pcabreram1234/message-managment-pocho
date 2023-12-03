import React, { useState } from "react";
import { Modal } from "antd";
import { DeleteFilled } from "@ant-design/icons";
import { deleteDataFuntion } from "../../utility/Funtions";

const API_URL = "http://localhost:3120/api/v1/messages/deleteMessages/";
const DeleteMessageModal = ({
  id,
  setShowDeleteModal,
  setPopUpModalInfo,
  titleModal,
}) => {
  const [showModal, setShowModal] = useState(true);

  const onCancel = () => {
    setShowModal(false);
    setShowDeleteModal(false);
  };

  return (
    <Modal
      visible={showModal}
      closable
      title={titleModal}
      okButtonProps={{ icon: <DeleteFilled /> }}
      okType="danger"
      okText="Yes"
      cancelText="No"
      onCancel={onCancel}
      onOk={() => {
        deleteDataFuntion(API_URL, { id }, setPopUpModalInfo);
      }}
      style={{ textAlign: "center" }}
    ></Modal>
  );
};

export default DeleteMessageModal;

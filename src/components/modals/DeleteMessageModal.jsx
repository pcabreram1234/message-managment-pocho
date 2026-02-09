import React, { useState } from "react";
import { message, Modal } from "antd";
import { DeleteFilled } from "@ant-design/icons";
import useSubmitData from "../../hooks/useSubmitData";
import { useActionContext } from "../../context/ActionContext";

const API_URL =
  import.meta.env.VITE_API_URL +
  import.meta.env.VITE_API_URL_ROUTER +
  "messages/deleteMessages";
const DeleteMessageModal = ({
  id,
  setShowDeleteModal,
  setPopUpModalInfo,
  titleModal,
}) => {
  const [showModal, setShowModal] = useState(true);
  const { submitData } = useSubmitData();
  const { dispatchAction } = useActionContext();

  const handleOk = () => {
    submitData(API_URL, { id }, "DELETE").then((resp) => {
      if (typeof resp.result === "number" || resp.result === 1) {
        message.info("Message Deleted");
        dispatchAction("refresh", "messagesTable");
        setShowDeleteModal(false);
      } else {
        message.error("Error: " + resp?.message);
      }
    });
  };

  const onCancel = () => {
    setShowModal(false);
    setShowDeleteModal(false);
  };

  return (
    <Modal
      open={showModal}
      closable
      title={titleModal}
      okButtonProps={{ icon: <DeleteFilled /> }}
      okType="danger"
      okText="Yes"
      cancelText="No"
      onCancel={onCancel}
      onOk={handleOk}
      style={{ textAlign: "center" }}
    ></Modal>
  );
};

export default DeleteMessageModal;

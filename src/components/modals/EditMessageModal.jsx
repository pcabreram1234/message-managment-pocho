import React, { useState } from "react";
import { Modal, message } from "antd";
import { EditOutlined } from "@ant-design/icons";
import Message from "../forms/Message";
import useSubmitData from "../../hooks/useSubmitData";
import { useActionContext } from "../../context/ActionContext";
const { info, error } = message;

const EditMessageModal = ({ data, setShowEditMessageModal }) => {
  if (!data) return null;

  const { id, message, Categories = [], Contacts = [] } = data;

  const { submitData } = useSubmitData();
  const { dispatchAction } = useActionContext();

  /* Fields state */
  const [messageText, setMessageText] = useState(message);
  const [categoriesEdit, setCategoriesEdit] = useState(Categories);
  const [associateTo, setAssociateTo] = useState(Contacts);
  const [fieldsCompleted, setFieldsCompleted] = useState(false);

  /* API */
  const API_URL =
    import.meta.env.VITE_API_URL +
    import.meta.env.VITE_API_URL_ROUTER +
    "messages/editMessage";

  const handleCancel = () => {
    setShowEditMessageModal(false);
  };

  const handleMessageInfo = (msg, contacts, categories) => {
    setMessageText(msg);
    setAssociateTo(contacts);
    setCategoriesEdit(categories);
  };

  const payload = {
    id,
    message: messageText,
    Contacts: associateTo,
    Categories: categoriesEdit,
  };

  const handleOk = () => {
    if (!fieldsCompleted) return;

    submitData(API_URL, payload, "PATCH").then((resp) => {
      if (typeof resp.result === "number" || resp.result === 1) {
        info("Message Saved");
        dispatchAction("refresh", "messagesTable");
        setShowEditMessageModal(false);
      } else {
        error("Error: " + resp?.message);
      }
    });
  };

  return (
    <Modal
      title="Edit Message"
      open={true}
      centered
      okText="Save changes"
      okButtonProps={{
        icon: <EditOutlined />,
      }}
      onCancel={handleCancel}
      onOk={handleOk}
      destroyOnClose
    >
      <Message
        data={payload}
        handleMessageInfo={handleMessageInfo}
        setFieldsCompleted={setFieldsCompleted}
        config={false}
      />
    </Modal>
  );
};

export default EditMessageModal;

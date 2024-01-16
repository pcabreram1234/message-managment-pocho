import React, { useState } from "react";
import { Modal } from "antd";
import { EditFilled } from "@ant-design/icons";
import { editDataFuntion } from "../../utility/Funtions";
import Message from "../forms/Message";

const EditMessageModal = ({
  data,
  setShowEditMessageModal,
  setShowPopUpModal,
  setPopUpModalInfo,
}) => {
  /* Destructuring data object */
  const { id, messageTosend, categories, contacts } = data;
  /* Fields states */
  const [message, setMessage] = useState(messageTosend);
  const [categoriesEdit, setCategoriesEdit] = useState(categories);
  const [associate_to, setAssociateTo] = useState(contacts);
  const [fieldsCompleted, setFieldsCompleted] = useState(false);

  /* Service URL API */
  const API_URL = "http://localhost:3120/api/v1/messages/editMessage/";

  /* Modal states */
  const [isVisible, setIsVisible] = useState(true);

  const handleOnCancel = () => {
    setIsVisible(false);
    setShowEditMessageModal(false);
  };

  const handleMessageInfo = (message, associate_to, categories) => {
    setMessage(message);
    setCategoriesEdit(categories);
    setAssociateTo(associate_to);
  };

  let dataToSend = {
    id: parseInt(id),
    message: message,
    Contacts: associate_to,
    Categories: categoriesEdit,
  };

  return (
    <Modal
      title="Edit Message"
      visible={isVisible}
      closable={true}
      onCancel={handleOnCancel}
      okButtonProps={{
        icon: <EditFilled />,
        htmlType: "submit",
      }}
      centered={true}
      okText={"Save"}
      onOk={() => {
        if (fieldsCompleted) {
          setShowPopUpModal(true);
          editDataFuntion(API_URL, dataToSend, setPopUpModalInfo);
        }
      }}
    >
      <Message
        data={dataToSend}
        handleMessageInfo={handleMessageInfo}
        setFieldsCompleted={setFieldsCompleted}
        config={false}
      />
    </Modal>
  );
};

export default EditMessageModal;

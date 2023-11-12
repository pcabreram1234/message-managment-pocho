import React, { useEffect, useState } from "react";
import { Modal, Alert, Spin, Typography } from "antd";
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
  const { id, messageTosend, categoriesEdit, associateTo } = data;
  /* Fields states */
  const [message, setMessage] = useState(messageTosend);
  const [categories, setCategoriesEdit] = useState(categoriesEdit);
  const [associate_to, setAssociateTo] = useState(associateTo);
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
    associate_to: associate_to,
    categories: categories,
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

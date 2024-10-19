import React, { useState, useEffect } from "react";
import Contact from "../forms/Contact";
import { saveDataFuntion } from "../../utility/Funtions";
import { EditFilled } from "@ant-design/icons";
import { Modal, Alert, Spin, Typography } from "antd";

const API_URL =
  import.meta.env.VITE_API_URL +
  import.meta.env.VITE_API_URL_ROUTER +
  "contacts/editContact";
const { Text } = Typography;

const EditContactModal = ({ data, setShowModal }) => {
  const { id, name, phone, email } = data;
  const [isModalLoading, setIsModalLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [idEdit, setIdEdit] = useState(id);
  const [nameEdit, setNameEdit] = useState(name);
  const [phoneEdit, setPhoneEdit] = useState(phone);
  const [emailEdit, setEmailEdit] = useState(email);
  const [alertModalType, setAlertModalType] = useState("");
  const [modalMessage, setModallMessage] = useState("");
  const [modalInfoText, setModalInfoText] = useState("");

  useEffect(() => {
    setTimeout(() => {
      setShowAlert(true);
    }, 900);
  }, [isModalLoading]);

  const handleOnCancel = () => {
    setShowModal(false);
    setIsVisible(false);
  };

  const handleResultModalInfo = (message, alertModalType, infoText) => {
    setIsModalLoading(true);
    setModallMessage(message);
    setAlertModalType(alertModalType);
    setModalInfoText(infoText);
  };

  const handleContactInfo = ({ id, name, phone, email }) => {
    setIdEdit(id);
    setNameEdit(name);
    setPhoneEdit(phone);
    setEmailEdit(email);
  };

  let dataToSend = {
    id: parseInt(idEdit),
    name: nameEdit,
    phone: phoneEdit,
    email: emailEdit,
  };

  if (isModalLoading === true && alertModalType === "success") {
    setTimeout(() => {
      setIsModalLoading(false);
    }, 900);
    setTimeout(() => {
      handleOnCancel();
    }, 900);
  }

  return (
    <Modal
      visible={isVisible}
      closable={true}
      onCancel={handleOnCancel}
      okButtonProps={{
        icon: <EditFilled />,
      }}
      centered={true}
      okText={"Save"}
      onOk={() => {
        saveDataFuntion(API_URL, dataToSend, handleResultModalInfo);
      }}
      destroyOnClose
    >
      <Contact
        id={id}
        name={name}
        phone={phone}
        email={email}
        handleContactInfo={handleContactInfo}
      />

      {isModalLoading && (
        <>
          <Text>{modalMessage}</Text>
          <Spin />
          {showAlert && <Alert type={alertModalType} message={modalInfoText} />}
        </>
      )}
    </Modal>
  );
};

export default EditContactModal;

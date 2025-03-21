import React, { useState, useEffect } from "react";
import Category from "../forms/Category";
import { editDataFuntion } from "../../utility/Funtions";
import { EditFilled } from "@ant-design/icons";
import { Modal, Alert, Spin, Typography } from "antd";
import { submitData } from "../../utility/submitData";

const API_URL =
  import.meta.env.VITE_API_URL +
  import.meta.env.VITE_API_URL_ROUTER +
  "categories/editCategory";

const { Text } = Typography;

const EditCategoryModal = (props) => {
  const { id, name, associate_to, setShowEditCategoryModal } = props;
  const [isModalLoading, setIsModalLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [idEdit, setIdEdit] = useState(id);
  const [nameEdit, setNameEdit] = useState(name);
  const [associateTo, setAssociateTo] = useState(associate_to);
  const [alertModalType, setAlertModalType] = useState("");
  const [modalMessage, setModallMessage] = useState("");
  const [modalInfoText, setModalInfoText] = useState("");

  useEffect(() => {
    setTimeout(() => {
      setShowAlert(true);
    }, 900);
  }, [isModalLoading]);

  const handleOnCancel = () => {
    setShowEditCategoryModal(false);
    setIsVisible(false);
  };

  const handleResultModalInfo = (message, alertModalType, infoText) => {
    setIsModalLoading(true);
    setModallMessage(message);
    setAlertModalType(alertModalType);
    setModalInfoText(infoText);
  };

  let dataToSend = {
    id: parseInt(idEdit),
    categorie_name: nameEdit,
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
        handleResultModalInfo(
          "Editando Registro(s)",
          "info",
          "Editando los mensajes asociados a esta categoria"
        );
        editDataFuntion(API_URL, dataToSend, handleResultModalInfo);
      }}
      destroyOnClose
    >
      <Category
        name={name}
        associateTo={associate_to}
        setNameEdit={setNameEdit}
        setAssociateTo={setAssociateTo}
      />

      {isModalLoading && (
        <div
          style={{
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Text>{modalMessage}</Text>
          <Spin />
          {showAlert && <Alert type={alertModalType} message={modalInfoText} />}
        </div>
      )}
    </Modal>
  );
};

export default EditCategoryModal;

import React, { useState, useEffect } from "react";
import Category from "../forms/Category";
import { editDataFuntion } from "../../utility/Funtions";
import { EditFilled } from "@ant-design/icons";
import { Modal, Alert, Spin, Typography } from "antd";
import { submitData } from "../../utility/submitData";

const API_URL = "http://localhost:3120/api/v1/categories/editCategory";

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

  const API_UPDATE_MESSAGE =
    "http://localhost:3120/api/v1/messages/updateMessageCategories/";
  const API_VERIFY_CATEGORY = `http://localhost:3120/api/v1/categories/categoriesName/${nameEdit}`;
  const API_GET_MESSAGE_ASSOCIATE_AT_CATEGORY = `http://localhost:3120/api/v1/messages/getMesageAssociateAtCategory/${id}${nameEdit}`;

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
    associateTo: associateTo,
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
        submitData(API_VERIFY_CATEGORY, null, "GET").then((resp) => {
          const { result } = resp;
          if (result.count > 0 && result.rows[0].id !== idEdit) {
            handleResultModalInfo(
              "Error al intentar modificar esta categoría",
              "error",
              "Esta categoría ya esta registrada"
            );
          } else {
            handleResultModalInfo(
              "Editando Registro(s)",
              "info",
              "Editando los mensajes asociados a esta categoria"
            );
            submitData(API_GET_MESSAGE_ASSOCIATE_AT_CATEGORY, null, "GET").then(
              (resp) => {
                const { rows } = resp.result;
                const messagestoUpdate = rows.forEach((row) => {
                  let categories = [];
                  row.categories.forEach((category) => {
                    if (category.id === id.toString()) {
                      categories.push({
                        id: category.id,
                        categorie_name: nameEdit,
                      });
                    } else {
                      categories.push({
                        id: category.id,
                        categorie_name: category.categorie_name,
                      });
                    }
                    submitData(
                      API_UPDATE_MESSAGE,
                      {
                        id: row.id,
                        categories: categories,
                      },
                      "PATCH"
                    );
                  });
                });

                setTimeout(() => {
                  handleResultModalInfo(
                    "Editando Registro(s)",
                    "success",
                    "Registro(s) editado(s)"
                  );
                }, 500);

                setTimeout(() => {
                  editDataFuntion(API_URL, dataToSend, handleResultModalInfo);
                }, 800);
              }
            );
          }
        });
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

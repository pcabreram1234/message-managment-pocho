import React, { useContext, useEffect, useState } from "react";
import { Modal } from "antd";
import { SettingFilled } from "@ant-design/icons";
import { fetchData } from "../../utility/fetchData";
import { submitData } from "../../utility/submitData";
import { compareDates, reloadPage } from "../../utility/Funtions";
import PopUpModal from "../modals/PopUpModal";
import Message from "../forms/Message";
import UserContext from "../../context/UserContext";

const ConfigMessageModal = ({ id, cbShowModal, currentDate }) => {
  /* Modal state */
  const [isVisible, setIsVisble] = useState(true);
  const [showPopUpModal, setShowPopUpModal] = useState(false);
  /* Message states */
  const [messageToSave, setMessageToSave] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [categoriesEdit, setCategories] = useState([]);
  const [dateOnSend, setDateOnSend] = useState([]);

  /* Form States */
  const [fieldsCompleted, setFieldsCompleted] = useState(false);
  const userInfo = useContext(UserContext);

  /* PopUpModal States */
  const [popUpModalInfo, setPopUpModalInfo] = useState({
    modalMessage: "Guardando Registro",
    alertModalType: "",
    modalInfoText: "",
  });

  const API_URL = `http://localhost:3120/api/v1/messages/getMessage/${id}`;
  const data = fetchData(API_URL);

  const API_ADD_MESSAGES =
    "http://localhost:3120/api/v1/configuration/addMesageConfiguration/";

  const API_VERIFY_MESSAGE =
    "http://localhost:3120/api/v1/configuration/verifyMessage/";

  const handleOnCancel = () => {
    setIsVisble(false);
    cbShowModal(false);
  };

  const handleMessageInfo = ({
    messageToSave,
    contacts,
    categoriesEdit,
    dateOnSend,
  }) => {
    setMessageToSave(messageToSave);
    setContacts(contacts);
    setCategories(categoriesEdit);
    setDateOnSend(dateOnSend);
  };

  const dataToSend = {
    message_id: id,
    message: messageToSave,
    categories: categoriesEdit,
    send_to: contacts,
    send_on_date: dateOnSend,
    user_id: userInfo.id,
  };

  const confirmSendTo = () => {
    if (contacts.length === 0) {
      alert("Favor de elegir por lo menos un destinatario");
      return true;
    }
  };

  const onOk = () => {
    if (fieldsCompleted === true) {
      const dateCompared = compareDates(dateOnSend, currentDate);
      if (dateCompared > 0) {
        alert("La fecha introducida debe ser a partir de la actual");
      } else {
        if (!confirmSendTo()) {
          submitData(API_VERIFY_MESSAGE, dataToSend).then((resp) => {
            const { result } = resp;
            setShowPopUpModal(true);
            if (result.count > 0) {
              setPopUpModalInfo({
                alertModalType: "error",
                modalInfoText:
                  "Este mensaje ya ha sido configurado para uno o varios de los destinatarios seleccionados en la fecha indicada",
              });
            } else {
              submitData(API_ADD_MESSAGES, dataToSend).then((resp) => {
                if (resp.result.rowsInserted) {
                  const rowsInserted = resp.result.rowsInserted;
                  if (rowsInserted === contacts.length) {
                    setPopUpModalInfo({
                      modalMessage: "Registro guardado",
                      alertModalType: "success",
                      modalInfoText: "Guardando Resgistro",
                    });
                    reloadPage();
                  } else {
                    setPopUpModalInfo({
                      modalMessage: `${resp.error}`,
                      alertModalType: "error",
                      modalInfoText: "Guardando Resgistro",
                    });
                  }
                } else {
                  setPopUpModalInfo({
                    modalMessage:
                      "Ha ocurrido un error favor de tratar de nuevo",
                    alertModalType: "error",
                    modalInfoText: "Guardando Resgistro",
                  });
                  setTimeout(() => {
                    reloadPage();
                  }, 2500);
                }
              });
            }
          });
        }
      }
    }
  };

  return (
    <Modal
      title="Configurate Message"
      visible={isVisible}
      closable={true}
      onCancel={handleOnCancel}
      okButtonProps={{
        icon: <SettingFilled />,
      }}
      centered={true}
      okText={"Save"}
      onOk={onOk}
    >
      {/* Aqui le indicamos a React el renderizar el componente Message
      solo cuando se actualice la variable message */}
      {data.length !== 0 && (
        <Message
          data={data}
          handleMessageInfo={handleMessageInfo}
          config={true}
          setFieldsCompleted={setFieldsCompleted}
          currentDate={currentDate}
        />
      )}

      {showPopUpModal && (
        <PopUpModal
          alertModalType={popUpModalInfo.alertModalType}
          cb={setShowPopUpModal}
          isModalVisible={showPopUpModal}
          modalInfoText={popUpModalInfo.modalInfoText}
          modalMessage={popUpModalInfo.modalMessage}
        />
      )}
    </Modal>
  );
};

export default ConfigMessageModal;

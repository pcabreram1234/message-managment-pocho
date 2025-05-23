import React, { useContext, useEffect, useState } from "react";
import { Modal } from "antd";
import { SettingFilled } from "@ant-design/icons";
import { fetchData } from "../../utility/fetchData";
import { compareDates, reloadPage } from "../../utility/Funtions";
import PopUpModal from "../modals/PopUpModal";
import Message from "../forms/Message";
import { AuthContext } from "../../context/UserContext";
import useSubmitData from "../../hooks/useSubmitData";

const ConfigMessageModal = ({ id, cbShowModal, currentDate }) => {
  /* Modal state */
  const [isVisible, setIsVisble] = useState(true);
  const [showPopUpModal, setShowPopUpModal] = useState(false);
  /* Message states */
  const [messageToSave, setMessageToSave] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [categoriesEdit, setCategories] = useState([]);
  const [dateOnSend, setDateOnSend] = useState([]);
  const { submitData } = useSubmitData();

  /* Form States */
  const [fieldsCompleted, setFieldsCompleted] = useState(false);
  const userInfo = useContext(AuthContext);

  /* PopUpModal States */
  const [popUpModalInfo, setPopUpModalInfo] = useState({
    modalMessage: "Saving Information",
    alertModalType: "",
    modalInfoText: "",
  });

  const API_URL =
    import.meta.env.VITE_API_URL +
    import.meta.env.VITE_API_URL_ROUTER +
    `messages/getMessage/${id}`;
  const data = fetchData(API_URL);

  const API_ADD_MESSAGES =
    import.meta.env.VITE_API_URL +
    import.meta.env.VITE_API_URL_ROUTER +
    "configuration/addMesageConfiguration";

  const API_VERIFY_MESSAGE =
    import.meta.env.VITE_API_URL +
    import.meta.env.VITE_API_URL_ROUTER +
    "configuration/verifyMessage";

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
    MessageId: id,
    message: messageToSave,
    categories: categoriesEdit,
    send_to: contacts,
    send_on_date: dateOnSend,
    user_id: userInfo.id,
  };

  const confirmSendTo = () => {
    console.log(dataToSend);
    if (contacts.length === 0) {
      // alert("Please choose at least one recipient");
      return true;
    }
  };

  const onOk = async () => {
    setShowPopUpModal(true);
    const reqAddMessage = await submitData(API_ADD_MESSAGES, dataToSend);

    if (reqAddMessage?.result?.rowsInserted > 0) {
      setPopUpModalInfo({
        modalMessage: "Saved",
        alertModalType: "success",
        modalInfoText: "Saving Information",
      });

      setTimeout(() => {
        handleOnCancel();
      }, 2000);
    }

    if (reqAddMessage?.message) {
      setPopUpModalInfo({
        modalMessage: "Error",
        alertModalType: "error",
        modalInfoText: reqAddMessage?.message,
      });
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

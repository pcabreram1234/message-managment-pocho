import React, { useState, useEffect } from "react";
import { Modal, Form, Input,Select, Spin, Alert, Typography } from "antd";
import { useHookstate } from "@hookstate/core";
import { userToEdit } from "../../context/userHookState";
import { saveDataFuntion } from "../../utility/Funtions";
const {Text}=Typography

const EditUserModal = ({ isVisible, cb }) => {
  /* Modals states */
  const [showModal, setShowModal] = useState(isVisible);
  const [showPopUpModal, setShowPopUpModal] = useState(false);
  const [alertModalType, setAlertModalType] = useState("");
  const [modalMessage, setModalMessage] = useState("");
  const [modalInfoText, setModalInfoText] = useState("");
  const [isModalLoading, setIsModalLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);


  useEffect(() => {
    setTimeout(() => {
      setShowAlert(true);
    }, 900);
  }, [isModalLoading]);

  const API_url =
    import.meta.env.VITE_API_URL +
    import.meta.env.VITE_API_URL_ROUTER +
    "users/edituser";
  /* Form States */
  const userState = useHookstate(userToEdit);
  const { id, type_user, user_name, email } = userState.get();
  const [form] = Form.useForm();

  const onCancel = () => {
    cb(false);
    setShowModal(false);
  };



  const handleResultModalInfo = (message, alertModalType, infoText) => {
    setIsModalLoading(true);
    setModalMessage(message);
    setAlertModalType(alertModalType);
    setModalInfoText(infoText);
  };

  return (
    <Modal
      title="Edition of user"
      open={showModal}
      onCancel={onCancel}
      onOk={() => {
        saveDataFuntion(API_url, form.getFieldsValue(), handleResultModalInfo);
      }}
      destroyOnClose
    >
      <Form
        style={{
          width: "400px",
          justifyContent: "center",
          alignContent: "center",
          display: "grid",
          gridTemplateRows: "repeat (3, 1fr)",
          gridTemplateColumns: "1fr",
          margin: "auto",
        }}
        form={form}
      >
        <Form.Item name="id" initialValue={id} style={{ display: "none" }}>
          <Input />
        </Form.Item>

        <Form.Item
          initialValue={user_name}
          name={"user_name"}
          rules={[
            {
              required: true,
              message: "Please enter a valid User Name",
              pattern: /[a-z]{3}/g,
              type: "string",
            },
          ]}
        >
          <Input placeholder="user name" />
        </Form.Item>

        <Form.Item
          required
          name="email"
          initialValue={email}
          rules={[
            {
              type: "email",
              required: true,
              message: "The input must be a valid email",
            },
          ]}
        >
          <Input placeholder="abcad@example.com" />
        </Form.Item>

        <Form.Item
          name="type_user"
          initialValue={type_user}
          rules={[
            {
              required: true,
              message: "The input must be a valid email",
            },
          ]}
        >
          <Select
            options={[
              { value: "guest", label: "User" },
              { value: "adm", label: "Administrator" },
            ]}
          ></Select>
        </Form.Item>
      </Form>

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

export default EditUserModal;

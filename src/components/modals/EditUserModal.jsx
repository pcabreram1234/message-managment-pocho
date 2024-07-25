import React, { useState } from "react";
import { Modal, Form, Input, Button, Select } from "antd";
import { SaveOutlined } from "@ant-design/icons";
import PopUpModal from "./PopUpModal";
import { useHookstate } from "@hookstate/core";
import { userToEdit } from "../../context/userHookState";
import { submitData } from "../../utility/submitData";
import { useHistory } from "react-router";

const EditUserModal = ({ isVisible, cb }) => {
  const history = useHistory();
  /* Modals states */
  const [showModal, setShowModal] = useState(isVisible);
  const [showPopUpModal, setShowPopUpModal] = useState(false);
  const [alertModalType, setAlertModalType] = useState("");
  const [modalMessage, setModalMessage] = useState("");
  const [modalInfoText, setModalInfoText] = useState("");

  const API_url = "http://localhost:3120/api/v1/users/edituser";
  /* Form States */
  const userState = useHookstate(userToEdit);
  const { id, type_user, user_name, email } = userState.get();
  const [form] = Form.useForm();

  const onCancel = () => {
    cb(false);
    setShowModal(false);
  };

  return (
    <Modal
      title="Edition of user"
      visible={showModal}
      onCancel={onCancel}
      okButtonProps={{ disabled: true }}
      cancelButtonProps={{ disabled: true }}
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

        <Form.Item>
          <Button
            icon={<SaveOutlined />}
            style={{ width: "100%" }}
            type="primary"
            onClick={() => {
              setShowPopUpModal(true);
              submitData(API_url, form.getFieldsValue()).then((resp) => {
                if (resp.isBoom) {
                  setAlertModalType("error");
                  setModalInfoText(resp.output.payload.message);
                } else {
                  setAlertModalType("info");
                  setModalInfoText("User Saved");
                  setTimeout(() => {
                    setShowModal(false);
                  }, 1200);
                  setTimeout(() => {
                    history.go(0);
                  }, 500);
                }
              });
            }}
          >
            Save User
          </Button>
        </Form.Item>

        {showPopUpModal && (
          <PopUpModal
            alertModalType={alertModalType}
            isModalVisible={showPopUpModal}
            modalMessage={modalMessage}
            modalInfoText={modalInfoText}
            cb={setShowPopUpModal}
          />
        )}
      </Form>
    </Modal>
  );
};

export default EditUserModal;

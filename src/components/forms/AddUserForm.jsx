import React, { useState } from "react";
import { Form, Input, Button, Select } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";
import { submitData } from "../../utility/submitData";
import { useHistory } from "react-router";
import PopUpModal from "../modals/PopUpModal";

const AddUserForm = () => {
  const API_url =
    import.meta.env.VITE_API_URL +
    import.meta.env.VITE_API_URL_ROUTER +
    "users/adduser";
  const [form] = Form.useForm();
  const [showModal, setShowModal] = useState(false);
  const [alertModalType, setAlertModalType] = useState("");
  const [modalMessage, setModalMessage] = useState("");
  const [modalInfoText, setModalInfoText] = useState("");
  const history = useHistory();
  return (
    <Form
      style={{
        width: "400px",
        justifyContent: "center",
        alignContent: "center",
        display: "grid",
        gridTemplateRows: "repeat (3, 1fr)",
        gridTemplateColumns: "1fr",
        margin: "auto",
        height: "100vh",
      }}
      form={form}
    >
      <Form.Item
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
        name={"password"}
        rules={[
          {
            required: true,
            min: 8,
            pattern: /([a-z]{1}|[0-9]{1}|[A-Z]{1}){8}/g,
            type: "string",
            message:
              "The passwod must have at least an Upper Character, a number and the lengh must be min 8",
          },
        ]}
      >
        <Input.Password placeholder="password" />
      </Form.Item>

      <Form.Item
        name="type_user"
        rules={[
          {
            required: true,
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
          icon={<PlusCircleOutlined />}
          style={{ width: "100%" }}
          type="primary"
          onClick={() => {
            submitData(API_url, form.getFieldsValue()).then((resp) => {
              setShowModal(true);
              if (resp.isBoom) {
                setAlertModalType("error");
                setModalInfoText(resp.output.payload.message);
              }

              if (resp.user_name) {
                if (resp.user_name === form.getFieldValue("user_name")) {
                  setAlertModalType("info");
                  setModalInfoText("User Saved");
                  setTimeout(() => {
                    setShowModal(false);
                  }, 1200);
                  setTimeout(() => {
                    history.go(0);
                  }, 500);
                }
              }
            });
          }}
        >
          Add User
        </Button>
      </Form.Item>

      {showModal && (
        <PopUpModal
          alertModalType={alertModalType}
          isModalVisible={showModal}
          modalMessage={modalMessage}
          modalInfoText={modalInfoText}
          cb={setShowModal}
        />
      )}
    </Form>
  );
};

export default AddUserForm;

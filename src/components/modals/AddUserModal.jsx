import React, { useState } from "react";
import { Modal, Form, Input, Button, Select } from "antd";
import { SaveOutlined } from "@ant-design/icons";
import PopUpModal from "./PopUpModal";
import { useNavigate } from "react-router";
import useSubmitData from "../../hooks/useSubmitData";

const AddUserModal = ({ isVisible, cb }) => {
  const history = useNavigate();
  /* Modals states */
  const [showModal, setShowModal] = useState(isVisible);
  const [showPopUpModal, setShowPopUpModal] = useState(false);
  const [alertModalType, setAlertModalType] = useState("");
  const [modalMessage, setModalMessage] = useState("");
  const [modalInfoText, setModalInfoText] = useState("");
  const { submitData } = useSubmitData();
  /*Form states */
  const [type_user, setTypeUser] = useState("guest");
  const [user_name, setUsername] = useState([]);
  const [email, setEmail] = useState([]);
  const [password, setPassword] = useState([]);

  const API_url =
    import.meta.env.VITE_API_URL +
    import.meta.env.VITE_API_URL_ROUTER +
    "users/adduser";
  /* Form States */
  const [form] = Form.useForm();

  const onCancel = () => {
    cb(false);
    setShowModal(false);
  };

  const onSubmit = () => {
    form.validateFields().then(async () => {
      setShowPopUpModal(true);
      const req = await submitData(API_url, form.getFieldsValue());
      if (req.isBoom) {
        setAlertModalType("error");
        setModalInfoText(req.message);
      } else {
        setAlertModalType("info");
        setModalInfoText("User Saved");
        setTimeout(() => {
          setShowModal(false);
        }, 1200);
        setTimeout(() => {
          history(-1);
        }, 500);
      }
    });
  };

  return (
    <Modal
      title="Adding user"
      open={showModal}
      onCancel={onCancel}
      okButtonProps={{ disabled: true, hidden: true }}
      cancelButtonProps={{ disabled: true, hidden: true }}
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
          <Input
            placeholder="user name"
            onInput={(e) => {
              setUsername(e.currentTarget.value);
            }}
          />
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
          <Input
            placeholder="abcad@example.com"
            onInput={(e) => {
              setEmail(e.currentTarget.value);
            }}
          />
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
            onChange={(e) => {
              setTypeUser(e.value);
            }}
          />
        </Form.Item>

        <Form.Item
          name="password"
          initialValue={password}
          rules={[
            {
              required: true,
              message:
                "The password must have at least one uppercase letter and one special character",
              pattern:
                /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/g,
            },
          ]}
        >
          <Input.Password placeholder="Password" />
        </Form.Item>

        <Form.Item
          name="active"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select
            options={[
              { label: "Yes", value: true },
              { label: "No", value: false },
            ]}
          />
        </Form.Item>

        <Form.Item>
          <Button
            icon={<SaveOutlined />}
            style={{ width: "100%" }}
            type="primary"
            onClick={onSubmit}
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

export default AddUserModal;

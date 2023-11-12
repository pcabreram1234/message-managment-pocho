import React, { useEffect, useState, useContext } from "react";
import { SaveFilled } from "@ant-design/icons";
import { Form, Input, Modal } from "antd";
import { submitData } from "../../utility/submitData";
import { reloadPage } from "../../utility/Funtions";
import PopUpModal from "./PopUpModal";
import SelectCategories from "../buttons/SelectCategories";
import UserContext from "../../context/UserContext";
const API_URL = "http://localhost:3120/api/v1/contacts/addContact";

const AddContactModal = ({ setShowAddContactmodal }) => {
  const [showModal, setShowModal] = useState(true);
  const [addContactForm] = Form.useForm();
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [categories, setCategories] = useState([]);
  const [phone, setPhone] = useState();
  const [isChange, setIsChange] = useState(false);
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [popUpModalInfo, setPopUpModalInfo] = useState({
    modalMessage: "Guardando Registro",
    alertModalType: "",
    modalInfoText: "",
  });

  const userInfo = useContext(UserContext);
  const [data, setData] = useState({
    name: name,
    email: email,
    phone: phone,
    categories: categories,
    userId: userInfo.id,
  });

  const onCancel = () => {
    setShowModal(false);
    setShowAddContactmodal(false);
  };

  const validateFields = () => {
    return addContactForm.validateFields();
  };

  const setContactValue = () => {
    setData({
      name: name,
      email: email,
      phone: phone,
      categories: categories,
      userId: userInfo.id,
    });
  };

  const handleSubmit = () => {
    console.log(data);
    setTimeout(() => {
      setShowSaveModal(true);
    }, 500);
    submitData(API_URL, data)
      .then((resp) => {
        if (resp.message) {
          setPopUpModalInfo({
            alertModalType: "error",
            modalInfoText: resp.message,
          });
        } else {
          setPopUpModalInfo({
            alertModalType: "success",
            modalInfoText: "Registro Guardado",
          });

          reloadPage();
        }
      })
      .catch((err) => {
        alert(err);
      });
  };

  const onOk = () => {
    validateFields().then((resp) => {
      if (!resp.errorFields) {
        setShowSaveModal(true);
        handleSubmit();
      }
    });
  };

  useEffect(() => {
    setContactValue();
  }, [isChange === true]);

  return (
    <Modal
      visible={showModal}
      title="Create a new Contact"
      closable
      onCancel={onCancel}
      okButtonProps={{
        icon: <SaveFilled />,
        type: "primary",
        htmlType: "submit",
      }}
      okText="Save"
      onOk={onOk}
    >
      <Form form={addContactForm}>
        <Form.Item
          label="Name"
          required
          name={"name"}
          rules={[{ required: true }, { type: "string" }, { min: 3 }]}
        >
          <Input
            placeholder="Phillip"
            autoFocus
            value={name}
            onKeyUp={() => {
              setIsChange(false);
            }}
            onChange={(n) => {
              setName(n.currentTarget.value);
              setIsChange(true);
            }}
          />
        </Form.Item>

        <Form.Item
          required
          label="Phone Number"
          name={"phone"}
          rules={[
            { required: true },
            { type: "regexp" },
            {
              pattern: /[0-9]{3}[\-]{1}[0-9]{3}[\-]{1}[0-9]{4}/,
              message: "Allowed format 888-222-4444",
            },
          ]}
        >
          <Input
            placeholder="888-111-4444"
            value={phone}
            onKeyUp={() => {
              setIsChange(false);
            }}
            onChange={(p) => {
              setPhone(p.currentTarget.value);
              setIsChange(true);
            }}
          />
        </Form.Item>

        <Form.Item
          label="Email"
          name={"email"}
          required
          rules={[{ required: true }, { type: "email" }]}
        >
          <Input
            type={"email"}
            value={email}
            onKeyUp={() => {
              setIsChange(false);
            }}
            onChange={(e) => {
              setEmail(e.currentTarget.value);
              setIsChange(true);
            }}
          />
        </Form.Item>

        <Form.Item label="Selec a least one category">
          <SelectCategories setCategories={setCategories} />
        </Form.Item>
      </Form>
      {showSaveModal && (
        <PopUpModal
          isModalVisible={showSaveModal}
          modalMessage={popUpModalInfo.modalMessage}
          alertModalType={popUpModalInfo.alertModalType}
          modalInfoText={popUpModalInfo.modalInfoText}
          cb={setShowSaveModal}
        />
      )}
    </Modal>
  );
};

export default AddContactModal;

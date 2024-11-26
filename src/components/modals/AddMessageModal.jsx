import React, { useState, useEffect, useContext } from "react";
import { SaveFilled } from "@ant-design/icons";
import { Modal, Input, Form } from "antd";
import { reloadPage } from "../../utility/Funtions";
import { submitData } from "../../utility/submitData";
import CurrentCategories from "../buttons/CurrentCategories";
import ContactsAssociate from "../buttons/ContactsAsociate";
import { AuthContext } from "../../context/UserContext";

const API_URL =
  import.meta.env.VITE_API_URL +
  import.meta.env.VITE_API_URL_ROUTER +
  "messages/addMessage";

const { TextArea } = Input;

const AddMessageModal = ({
  setShowAddMessageModal,
  setPopUpModalInfo,
  setShowPopUpModal,
}) => {
  const [showModal, setShowModal] = useState(true);
  const [addMessageForm] = Form.useForm();
  const [message, setMessage] = useState();
  const [categories, setCategories] = useState([]);
  const [associateTo, setAssociateTo] = useState([]);
  const [isChange, setIsChange] = useState(false);
  const userInfo = useContext(AuthContext);
  const { user } = userInfo;
  const [data, setData] = useState({
    message: message,
    categories: categories,
    associateTo: associateTo,
    userId: userInfo.user.id,
  });

  const setMessageValue = () => {
    setData({
      message: message,
      categories: categories,
      associateTo: associateTo,
      userId: user?.id,
    });
  };

  const getSelectedCategories = (selCat) => {
    setIsChange(true);
    setCategories(selCat);
  };

  const getSelectedContacts = (selContc) => {
    setIsChange(true);
    setAssociateTo(selContc);
  };

  const validateFields = () => {
    return addMessageForm.validateFields();
  };

  const handleSubmit = async () => {
    const req = await submitData(API_URL, data);
    console.log(req);
    if (req?.message) {
      setPopUpModalInfo("Something was wrong", "error", resp?.message);
    } else {
      setPopUpModalInfo("Saving Information", "success", "Saved");
      setTimeout(() => {
        reloadPage();
      }, 200);
    }
  };

  const onCancel = () => {
    setShowModal(false);
    setShowAddMessageModal(false);
  };

  const onOk = () => {
    validateFields().then((resp) => {
      if (!resp.errorFields) {
        setShowAddMessageModal(true);
        setShowPopUpModal(true);
        handleSubmit();
      }
    });
  };

  useEffect(() => {
    setMessageValue();
    setTimeout(() => {
      setIsChange(false);
    }, 200);
  }, [isChange === true]);

  return (
    <Modal
      visible={showModal}
      title="Create a new Contact"
      closable
      okButtonProps={{
        icon: <SaveFilled />,
        type: "primary",
        htmlType: "submit",
      }}
      onOk={onOk}
      onCancel={onCancel}
      okText="Save"
    >
      <Form form={addMessageForm}>
        <Form.Item
          label="Message"
          required
          name={"message"}
          rules={[
            { required: true },
            { type: "string" },
            { min: 10 },
            { max: 2000 },
          ]}
        >
          <TextArea
            placeholder="Insert the message you want to store"
            autoFocus
            maxLength={2000}
            style={{ height: 120 }}
            value={message}
            onChange={(n) => {
              setMessage(n.currentTarget.value);
              setIsChange(true);
            }}
          />
        </Form.Item>

        <Form.Item label="Categories">
          <CurrentCategories
            categories={[]}
            getCurrentCategories={getSelectedCategories}
          />
        </Form.Item>

        <Form.Item label="Associate to ">
          <ContactsAssociate
            associateTo={[]}
            setAssociateTo={getSelectedContacts}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};
export default AddMessageModal;

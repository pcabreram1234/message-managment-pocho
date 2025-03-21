import React, { useContext, useState } from "react";
import { Form, Input, Button, Select } from "antd";
import { SaveFilled } from "@ant-design/icons";
import { fetchData } from "../../utility/fetchData";
import { submitData } from "../../utility/submitData";
import { reloadPage, compareDates } from "../../utility/Funtions";
import { AuthContext } from "../../context/UserContext";

const MessagesConfigFooter = ({
  setShowPopUpModal,
  messages,
  setPopUpModalInfo,
  handleOnCancel,
}) => {
  const [associateTo, seteAssociateTo] = useState("");
  const [dateTosend, setDateOnSend] = useState("");
  let dataTosend = [];
  const userInfo = useContext(AuthContext);
  const [MessageForm] = Form.useForm();

  const API_ASSOCIATE_TO_URL =
    import.meta.env.VITE_API_URL +
    import.meta.env.VITE_API_URL_ROUTER +
    "contacts/contactsEmail";
  const API_ADD_MESSAGES =
    import.meta.env.VITE_API_URL +
    import.meta.env.VITE_API_URL_ROUTER +
    "configuration/addMesagesConfiguration";

  const API_VERIFY_MESSAGE =
    import.meta.env.VITE_API_URL +
    import.meta.env.VITE_API_URL_ROUTER +
    "configuration/verifyMessages";

  const getCurrentAssociate = (contacts) => {
    seteAssociateTo(contacts);
  };

  const contacts = fetchData(API_ASSOCIATE_TO_URL);

  const setDataToSend = () => {
    messages.forEach((message) => {
      dataTosend.push({
        message: message.message,
        message_id: message.key,
        send_to: associateTo,
        send_on_date: dateTosend,
        categories: message.categories,
        user_id: userInfo.id,
      });
    });
  };

  const onOk = () => {
    MessageForm.validateFields()
      .then(async (resp) => {
        setDataToSend();
      })
      .then(async () => {
        setShowPopUpModal(true);
        const reqAddMessage = await submitData(API_ADD_MESSAGES, dataTosend);

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
      });
  };

  return (
    <Form form={MessageForm}>
      <Form.Item
        label="Send to"
        name="Send to"
        required
        rules={[{ required: true }]}
      >
        <Select
          onChange={(contacts) => {
            getCurrentAssociate(contacts);
          }}
          mode="multiple"
        >
          {contacts.length > 0 &&
            contacts.map((contact) => {
              return <Select.Option key={contact}>{contact}</Select.Option>;
            })}
        </Select>
      </Form.Item>

      <Form.Item
        label="Send On Date"
        name="Send on Date"
        required
        rules={[{ required: true }]}
      >
        <Input
          type={"datetime-local"}
          onChange={(e) => {
            setDateOnSend(e.target.value);
          }}
        />
      </Form.Item>

      <Form.Item>
        <Button htmlType="submit" onClick={onOk}>
          <SaveFilled />
          Save
        </Button>
      </Form.Item>
    </Form>
  );
};

export default MessagesConfigFooter;

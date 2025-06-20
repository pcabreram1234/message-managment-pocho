import React, { useState, useEffect } from "react";
import { Input, Form } from "antd";
import CurrentCategories from "../buttons/CurrentCategories";
import ContactsAssociate from "../buttons/ContactsAsociate";
import { validateForm } from "../../utility/Funtions";

const { TextArea } = Input;

const Message = ({ data, handleMessageInfo, config, setFieldsCompleted }) => {
  /* Destructuring data object */
  const { message, Categories, Contacts } = data;

  /* Form Hook */
  const [formMessage] = Form.useForm();

  /* Messsage States */
  const [messageToSave, setMessageToSave] = useState(message);
  const [contacts, setContacts] = useState(Contacts);
  const [categoriesEdit, setCategories] = useState(Categories);
  const [dateOnSend, setDateOnSend] = useState([]);

  const handleInput = (e, cb) => {
    cb(e.target.value);
  };

  const getCurrentCategories = (selectedCategories) => {
    setCategories(selectedCategories);
  };

  const getCurrentAssociate = (selectedAssociated) => {
    setContacts(selectedAssociated);
  };

  const handleDataAfterValidateForm = () => {
    switch (config) {
      case true:
        handleMessageInfo({
          messageToSave,
          contacts,
          categoriesEdit,
          dateOnSend,
        });
        break;

      default:
        handleMessageInfo(messageToSave, contacts, categoriesEdit);
        break;
    }
  };

  useEffect(() => {
    validateForm(formMessage, handleDataAfterValidateForm, setFieldsCompleted);
  }, [handleInput || getCurrentAssociate || getCurrentCategories]);

  return (
    <Form style={{ marginTop: "10%" }} form={formMessage}>
      <Form.Item
        name={"message"}
        label={"Message"}
        rules={[
          {
            type: "string",
            min: 1,
            message: "Message must be at least 10 characters",
            required: true,
          },
        ]}
        initialValue={messageToSave}
        required
      >
        <TextArea
          value={messageToSave}
          onChange={(e) => {
            handleInput(e, setMessageToSave);
          }}
          style={{ height: "150px" }}
        />
      </Form.Item>

      <Form.Item label="Categories">
        <CurrentCategories
          getCurrentCategories={getCurrentCategories}
          categories={Categories}
        />
      </Form.Item>

      <Form.Item
        label="Associate To/Send To"
        required
        // name="contacts"
        initialValue={contacts}
        rules={[{ required: true, message: "Please select a contact" }]}
      >
        <ContactsAssociate
          associateTo={contacts}
          setAssociateTo={getCurrentAssociate}
        />
      </Form.Item>

      {config && (
        <Form.Item
          label="Send On Date"
          name="SendOnDate"
          required
          initialValue={dateOnSend}
          rules={[{ required: true }]}
        >
          <Input
            type={"datetime-local"}
            onChange={(e) => {
              handleInput(e, setDateOnSend);
            }}
          />
        </Form.Item>
      )}
    </Form>
  );
};

export default Message;

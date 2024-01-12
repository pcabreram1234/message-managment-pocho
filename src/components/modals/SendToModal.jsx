import React, { useState } from "react";
import { Modal, Select, Button, Input, Divider } from "antd";
import { MailFilled } from "@ant-design/icons";
import { fetchData } from "../../utility/fetchData";
import ContactsAssociate from "../buttons/ContactsAsociate";

const API_URL = "http://localhost:3120/api/v1/contacts";
const { TextArea } = Input;

const SendToModal = ({
  setShowSendToModal,
  message,
  associateTo,
  setAssociateTo,
}) => {
  const [showModal, setShowModal] = useState(true);

  let children = [];
  const onCancel = () => {
    setShowModal(false);
    setShowSendToModal(false);
  };

  const renderAssociateContacts = () => {
    if (associateTo.length > 0) {
      children = associateTo.map((contact) => {
        return <Select.Option key={contact.id}>{contact.email}</Select.Option>;
      });
    } else {
      const contacts = fetchData(API_URL);
      if (contacts.length > 0) {
        children = contacts.map((contact) => {
          return (
            <Select.Option key={contact.id}>{contact.email}</Select.Option>
          );
        });
      }
    }
  };

  renderAssociateContacts();

  return (
    <Modal visible={showModal} title="Send To?" closable onCancel={onCancel}>
      <Input.Group>
        <TextArea value={message} size="large" style={{ height: "200px" }} />
      </Input.Group>
      <Divider />
      <Input.Group>
        <ContactsAssociate
          associateTo={associateTo}
          setAssociateTo={setAssociateTo}
        />
        <Button type="primary">
          Send <MailFilled />
        </Button>
      </Input.Group>
    </Modal>
  );
};

export default SendToModal;

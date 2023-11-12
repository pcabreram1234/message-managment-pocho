import React, { useState } from "react";
import { Modal, Alert } from "antd";
import { fetchData } from "../../utility/fetchData";
import MessageAsociateToContactCard from "../MessageAsociateToContactCard";

const MessagesAssociatedModal = ({ cb, id, contact }) => {
  const [isVisible, setIsVisible] = useState(true);
  const API_URL = `http://localhost:3120/api/v1/messages/messagesAssociated/${contact}`;
  const messages = fetchData(API_URL);
  const onCancel = () => {
    cb(false);
    setIsVisible(false);
  };

  return (
    <Modal
      title={`Message Asociate to: ${contact}`}
      visible={isVisible}
      onCancel={onCancel}
      closable
    >
      {messages.result &&
        messages.result.length !== 0 &&
        messages.result.rows.map((message) => {
          return (
            <MessageAsociateToContactCard
              key={message.id}
              data={message}
              contact={contact}
            />
          );
        })}
      {messages.result && messages.result.count === 0 && (
        <Alert
          type="warning"
          showIcon
          message={`${contact} does not have messages associated`}
        />
      )}
    </Modal>
  );
};

export default MessagesAssociatedModal;

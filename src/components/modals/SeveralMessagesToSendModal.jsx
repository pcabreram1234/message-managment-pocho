import React, { useState } from "react";
import { Modal, Table, Tag } from "antd";
import { SendOutlined } from "@ant-design/icons";

const SeveralMessagesToSendModal = ({ messages, setShowModal }) => {
  const [isVisible, setIsVisible] = useState(true);

  const onCancel = () => {
    setIsVisible(false);
    setShowModal(false);
  };

  let dataSource = [];
  let columns = [
    {
      title: "Message",
      dataIndex: "message",
      key: "message",
    },
    {
      title: "Send To",
      dataIndex: "contacts",
      key: "contacts",
      render: (contacts) => {
        return (
          <>
            {contacts.map((contact) => {
              return (
                <Tag
                  key={contact.id}
                  color={"#9effce"}
                  style={{ color: "black" }}
                >
                  {contact.email}
                </Tag>
              );
            })}
          </>
        );
      },
    },
  ];

  const renderMessagesToSend = () => {
    messages.map((message) => {
      dataSource.push({
        key: message.key,
        message: message.message,
        contacts: message.contacts,
      });
    });
  };

  renderMessagesToSend();

  return (
    <Modal
      visible={isVisible}
      closable
      title={"Send several messages"}
      okButtonProps={{ icon: <SendOutlined /> }}
      okText="Send"
      cancelText="No"
      onCancel={onCancel}
      centered
      width={"60vw"}
    >
      <Table dataSource={dataSource} columns={columns} />
    </Modal>
  );
};

export default SeveralMessagesToSendModal;

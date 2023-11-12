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
      dataIndex: "sendTo",
      key: "associated_to",
      render: (associated_to) => {
        return (
          <>
            {associated_to.map((contact) => {
              return (
                <Tag key={contact} color={"#9effce"} style={{ color: "black" }}>
                  {contact}
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
        sendTo: message.associated_to,
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

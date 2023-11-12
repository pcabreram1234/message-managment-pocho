import React from "react";
import { Button } from "antd";
import { SendOutlined } from "@ant-design/icons";

const SendToButton = ({
  setShowSendToModal,
  setMessageToSend,
  message,
  associateTo,
  setAssociateTo,
}) => {
  return (
    <Button
      style={{
        backgroundColor: "#D6F4FF",
        borderRadius: "5px",
      }}
      onClick={() => {
        setMessageToSend(message);
        setAssociateTo(associateTo);
        setShowSendToModal(true);
      }}
    >
      <SendOutlined />
    </Button>
  );
};

export default SendToButton;

import React from "react";
import { MailFilled } from "@ant-design/icons";
import { Button } from "antd";

const SendButton = ({ setShowModal }) => {
  const onClick = () => {
    setShowModal(true);
  };

  return (
    <Button type="primary" onClick={onClick}>
      Send Messages <MailFilled />
    </Button>
  );
};

export default SendButton;

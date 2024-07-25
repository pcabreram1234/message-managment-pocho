import React from "react";
import { Button } from "antd";
import { SettingFilled } from "@ant-design/icons";

const ConfigMessageButton = ({ setShowModal, id, setId }) => {
  const onClick = () => {
    setShowModal(true);
    setId(id);
  };

  return (
    <Button onClick={onClick}>
      <SettingFilled />
    </Button>
  );
};

export default ConfigMessageButton;

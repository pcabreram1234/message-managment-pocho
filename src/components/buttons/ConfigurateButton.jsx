import React from "react";
import { Button } from "antd";
import { SettingFilled } from "@ant-design/icons";

const ConfigurateButton = ({ cbModal }) => {
  return (
    <Button
      onClick={() => {
        cbModal(true);
      }}
    >
      Configurate Messages
      <SettingFilled />
    </Button>
  );
};

export default ConfigurateButton;

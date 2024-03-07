import React from "react";
import { PlusCircleFilled } from "@ant-design/icons";
import { Button } from "antd";

const AddUserButton = ({ cb }) => {
  return (
    <Button
      type="primary"
      onClick={() => {
        cb(true);
      }}
    >
      <PlusCircleFilled /> Add User
    </Button>
  );
};

export default AddUserButton;

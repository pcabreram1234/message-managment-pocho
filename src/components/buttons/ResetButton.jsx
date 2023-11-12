import React from "react";
import { ClearOutlined } from "@ant-design/icons";
import { Button } from "antd";

const ResetButton = (props) => {
  const { formRef, setName, setPhone, setCategories } = props;

  const handleClick = () => {
    formRef.resetFields();
  };

  return (
    <Button onClick={handleClick}>
      <ClearOutlined style={{ fontSize: "20px" }} /> Reset
    </Button>
  );
};

export default ResetButton;

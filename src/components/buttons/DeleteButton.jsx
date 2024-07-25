import React from "react";
import { Button } from "antd";
import { DeleteTwoTone } from "@ant-design/icons";

const DeleteButton = ({ id, setId, cb }) => {
  const handleClick = () => {
    setId(id);
    cb(true);
  };
  return (
    <Button onClick={handleClick} style={{ borderRadius: "5px" }}>
      <DeleteTwoTone twoToneColor={"Red"} />
    </Button>
  );
};

export default DeleteButton;

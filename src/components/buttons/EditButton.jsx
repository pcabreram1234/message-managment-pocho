import React from "react";
import { Button } from "antd";
import { EditTwoTone } from "@ant-design/icons";

const EditButton = ({ setShowModal, setData, data }) => {
  const handleClick = () => {
    console.log(data);
    setData(data);
    setShowModal(true);
  };

  return (
    <Button onClick={handleClick} style={{ borderRadius: "5px" }}>
      <EditTwoTone twoToneColor={"blue"} />
    </Button>
  );
};

export default EditButton;

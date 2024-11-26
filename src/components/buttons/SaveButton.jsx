import React, { useState } from "react";
import { Button } from "antd";
import { SaveOutlined } from "@ant-design/icons";
import { submitData } from "../../utility/submitData";

const SaveButton = (props) => {
  const { API_URL, data, handleModal, setShowModal } = props;

  const handleSave = () => {
    setShowModal(true);
    submitData(API_URL, data).then((resp) => {
      if (typeof resp.result === "number") {
        handleModal("Saving Information", "success", "Saved");
      } else {
        handleModal("Error", "error", "Sometime was wrong");
      }
    });
  };

  return (
    <Button onClick={handleSave} type="primary">
      Add
      <SaveOutlined style={{ fontSize: "20px" }} />
    </Button>
  );
};

export default SaveButton;

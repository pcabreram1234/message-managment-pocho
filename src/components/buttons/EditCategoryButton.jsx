import React from "react";
import { Button } from "antd";
import { EditTwoTone } from "@ant-design/icons";

const EditCategoryButton = ({
  setShowEditCategoryModal,
  setCategoryData,
  id,
  name,
  associateTo,
}) => {
  const handleClick = () => {
    setShowEditCategoryModal(true);
    setCategoryData({ id, name, associateTo });
  };

  return (
    <Button onClick={handleClick}>
      <EditTwoTone twoToneColor={"blue"} />
    </Button>
  );
};

export default EditCategoryButton;

import React from "react";
import { Select } from "antd";

const CategoriesButton = (props) => {
  const { Option } = Select;

  const children = props.categories.map((category) => {
    return <Option key={Math.random() * 0.5}>{category.name}</Option>;
  });

  return (
    <Select
      mode="multiple"
      allowClear
      style={{ width: "100%" }}
      placeholder="Please select the categories"
    >
      {children}
    </Select>
  );
};

export default CategoriesButton;

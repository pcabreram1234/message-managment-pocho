import React from "react";
import { Select } from "antd";

const CategoriesButton = (props) => {
  const { Option } = Select;

  const children = props.categories?.map((category) => {
    return (
      <Option value={category?.categorie_name}>
        {category?.categorie_name}
      </Option>
    );
  });

  return (
    <Select
      // mode="tags"
      labelInValue
      maxCount={1}
      style={{ width: "100%" }}
      placeholder="Select a Category"
    >
      {children}
    </Select>
  );
};

export default CategoriesButton;

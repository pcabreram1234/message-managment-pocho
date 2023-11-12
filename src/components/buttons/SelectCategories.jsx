import React from "react";
import { Select } from "antd";
import { fetchData } from "../../utility/fetchData";

const API = "http://localhost:3120/api/v1/categories";
const SelectCategories = ({ setCategories }) => {
  const categories = fetchData(API);

  return (
    <Select
      allowClear
      labelInValue
      style={{ width: "100%" }}
      mode="multiple"
      optionLabelProp="children"
      optionFilterProp="children"
      filterOption={(input, option) => {
        return (
          option.children.toLowerCase().indexOf(`${input.toLowerCase()}`, 0) >=
          0
        );
      }}
      onChange={(categories) => {
        let categoriesObject = [];
        categories.map((category) => {
          categoriesObject.push(category.label);
        });
        setCategories(categoriesObject);
      }}
    >
      {categories.length > 0 &&
        categories.map((category) => {
          return (
            <Select.Option key={category.id}>
              {category.categorie_name}
            </Select.Option>
          );
        })}
    </Select>
  );
};

export default SelectCategories;

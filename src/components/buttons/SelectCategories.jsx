import React, { useEffect, useState } from "react";
import { Select } from "antd";
import { fetchData } from "../../utility/fetchData";

const API =
  import.meta.env.VITE_API_URL +
  import.meta.env.VITE_API_URL_ROUTER +
  "categories";
const SelectCategories = ({ setCategories }) => {
  const data = fetchData(API);
  const [options, setOptions] = useState([]);

  const handleSubmitedCategories = () => {
    if (data.categories) {
      console.log(data);
      setOptions(
        data.categories.map((category) => {
          return {
            label: category.categorie_name,
            value: category.categorie_name,
            key: category.id,
          };
        })
      );
    }
  };

  useEffect(() => {
    handleSubmitedCategories();
  }, [data]);

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
      options={options}
    />
  );
};

export default SelectCategories;

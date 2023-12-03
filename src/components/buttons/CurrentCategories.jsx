import React, { useState, useEffect } from "react";
import { Select } from "antd";
import { fetchData } from "../../utility/fetchData";

const CurrentCategories = (props) => {
  const { getCurrentCategories, categories } = props;
  const [categoriesOptions, setCategoriesOptions] = useState([]);
  const [categories_selected, setCategories_selected] = useState([]);
  const API_CATEGORY_URL = "http://localhost:3120/api/v1/categories";
  const categories_submited = fetchData(API_CATEGORY_URL);

  const addCurrentCategoriesToSelectOption = () => {
    if (categories_submited.categories) {
      const idCategoriesToFilter = categories.map((category) => category.id);
      const arrayFilter = categories_submited.categories.filter((category) =>
        idCategoriesToFilter.includes(category.id)
      );
      setCategoriesOptions(
        categories_submited.categories.map((category) => ({
          label: category.categorie_name,
          value: category.categorie_name,
          key: category.id,
        }))
      );

      setCategories_selected(
        categories.map((category) => ({
          label: category.categorie_name,
          value: category.categorie_name,
          key: category.id,
        }))
      );
    }
  };

  /*   funcion que retorna las categorias mediante el callback  */
  const returnSelectedCategories = (categories, cb) => {
    /* Declaramos un objeto para guardar las categorias seleccionadas */
    const categoryObject = categories.map((category) => ({
      categorie_name: category.value,
      id: category.key,
    }));
    cb(categoryObject);
  };

  useEffect(() => {
    addCurrentCategoriesToSelectOption();
  }, [categories_submited]);

  return (
    <Select
      mode="multiple"
      style={{ width: "100%" }}
      allowClear
      labelInValue
      defaultValue={
        categories.length > 0
          ? categories.map((category) => ({
              label: category.categorie_name,
              value: category.categorie_name,
              key: category.id,
            }))
          : []
      }
      optionLabelProp="children"
      optionFilterProp="children"
      filterOption={(input, option) =>
        option.children.toLowerCase().indexOf(`${input.toLowerCase()}`, 0) >= 0
      }
      onChange={(categories) => {
        returnSelectedCategories(categories, getCurrentCategories);
      }}
      options={categoriesOptions}
    />
  );
};

export default CurrentCategories;

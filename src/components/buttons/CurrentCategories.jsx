import React, { useState, useEffect } from "react";
import { Select } from "antd";
import { fetchData } from "../../utility/fetchData";
import { submitData } from "../../utility/submitData";
const API_CATEGORY_URL = "http://localhost:3120/api/v1/categories";
const API_DISTINCT_CATEGORIES_URL =
  "http://localhost:3120/api/v1/categories/distinctCategories/";
const CurrentCategories = (props) => {
  const { getCurrentCategories, categories } = props;
  const [children, setChildren] = useState();

  const selectedCategories =
    categories.length > 0 ??
    categories.map((category) => {
      return category.id;
    });

  useEffect(() => {
    console.log(categories.length);
    const categoriesUnStored = submitData(
      API_DISTINCT_CATEGORIES_URL,
      categories
    )
      .then((unSelectedCategories) => {
        let tmpSelectedCategories = [];
        let tmpUnselectedCategories = [];
        for (let c = 0; c < categories.length; c++) {
          tmpSelectedCategories.push(
            <Select.Option key={parseInt(categories[c].id)}>
              {categories[c].categorie_name}
            </Select.Option>
          );
        }

        for (let i = 0; i < unSelectedCategories.length; i++) {
          tmpUnselectedCategories.push(
            <Select.Option key={unSelectedCategories[i].id}>
              {unSelectedCategories[i].categorie_name}
            </Select.Option>
          );
        }

        setChildren([tmpSelectedCategories, tmpUnselectedCategories]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  /*   funcion que retorna las categorias mediante el callback  */
  const returnSelectedCategories = (categories, cb) => {
    /* Declaramos un objeto para guardar las categorias seleccionadas */
    let categoryObject = [];
    categories.map((category) => {
      /* recorremos el array de categories y vamos agregando o eliminando */
      categoryObject.push({ id: category.key, categorie_name: category.label });
    });
    cb(categoryObject);
  };

  return (
    <Select
      mode="multiple"
      style={{ width: "100%" }}
      allowClear
      labelInValue
      defaultValue={selectedCategories}
      optionLabelProp="children"
      optionFilterProp="children"
      filterOption={(input, option) =>
        option.children.toLowerCase().indexOf(`${input.toLowerCase()}`, 0) >= 0
      }
      onChange={(categories) => {
        returnSelectedCategories(categories, getCurrentCategories);
      }}
    >
      {children}
    </Select>
  );
};

export default CurrentCategories;

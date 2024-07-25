import React, { useState } from "react";
import { Input, Form, Row, Select } from "antd";
import SaveButton from "../buttons/SaveButton";
import ResetButton from "../buttons/ResetButton";
import {
  onlyNumbers,
  phoneNumberInput,
  onlyLetters,
} from "../../utility/patternsInput";
import { fetchData } from "../../utility/fetchData";

const API_CATEGORY_URL = "http://localhost:3120/api/v1/categories";
const API_URL = "http://localhost:3120/api/v1/contacts/addContact";

const CreateContact = ({ handleModal, setShowModal }) => {
  const categoriesList = fetchData(API_CATEGORY_URL).map((category) => {
    return (
      <Select.Option key={category.id}>{category.categorie_name}</Select.Option>
    );
  });

  const [name, setName] = useState([]);
  const [phone, setPhone] = useState([]);
  const [formRef] = Form.useForm();
  const [categories, setCategories] = useState([]);

  let dataToSend = {
    name: name,
    phone: phone,
    categories: categories,
  };

  const handleInput = (e, cb) => {
    cb(e.target.value);
  };

  const returnSelectedCategories = (categories, cb) => {
    /* Declaramos un objeto para guardar las categorias seleccionadas */
    let categoryObject = [];
    categories.map((category) => {
      /* recorremos el array de categories y vamos agregando o eliminando */
      categoryObject.push(category.label);
    });
    cb(categoryObject);
  };

  return (
    <Form
      style={{ width: "30vw", margin: "auto" }}
      form={formRef}
      name="CreateContactForm"
    >
      <Form.Item
        name={"name"}
        label={"Name"}
        rules={[
          {
            type: "string",
            min: 3,
            message: "The input is not valid",
            pattern: /[a-zA-Z\s]/i,
          },
        ]}
        required
      >
        <Input
          type={"text"}
          value={name}
          placeholder="Ana Cabrera"
          onChange={(e) => {
            onlyLetters(e);
            handleInput(e, setName);
          }}
        />
      </Form.Item>

      <Form.Item
        name={"phone"}
        label={"Phone"}
        rules={[
          {
            type: "string",
            min: 12,
            max: 12,
            pattern: /[\d]{3}[\-]{1}[\d]{3}[\-]{1}[\d]{4}/,
            message: "Please insert a phone in this format 829-111-2222",
          },
        ]}
        required
      >
        <Input
          type={"text"}
          value={phone}
          maxLength={12}
          onChange={(e) => {
            setPhone(onlyNumbers(e));
            phoneNumberInput(e.currentTarget.value);
          }}
          placeholder={"809-111-2222"}
        />
      </Form.Item>

      <Form.Item label="Categories" name={"categories"}>
        <Select
          mode="tags"
          style={{ width: "100%" }}
          allowClear
          labelInValue
          onChange={(categories) => {
            returnSelectedCategories(categories, setCategories);
          }}
        >
          {categoriesList}
        </Select>
      </Form.Item>

      <Form.Item>
        <Row style={{ justifyContent: "space-evenly" }}>
          <ResetButton formRef={formRef} />
          <SaveButton
            data={dataToSend}
            API_URL={API_URL}
            handleModal={handleModal}
            setShowModal={setShowModal}
          />
        </Row>
      </Form.Item>
    </Form>
  );
};

export default CreateContact;

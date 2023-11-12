import React from "react";
import { Input, Form } from "antd";
import ContactsAssociate from "../buttons/ContactsAsociate";

import { onlyLetters } from "../../utility/patternsInput";

const Category = (props) => {
  const { setNameEdit, setAssociateTo, associateTo, name } = props;

  const handleInput = (e, cb) => {
    cb(e.target.value);
  };

  /*  const getCurrentContacts = (contacts_Selected) => {
    setAssociateTo(contacts_Selected);
  }; */

  return (
    <Form style={{ marginTop: "10%" }}>
      <Form.Item
        name={"category"}
        label={"Category Name"}
        rules={[
          {
            type: "string",
            min: 3,
            message: "The input is not valid",
          },
        ]}
        initialValue={name}
        required
      >
        <Input
          type={"text"}
          value={name}
          onChange={(e) => {
            onlyLetters(e);
            handleInput(e, setNameEdit);
          }}
        />
      </Form.Item>

      <Form.Item label="Associate To">
        <ContactsAssociate
          associateTo={associateTo}
          setAssociateTo={setAssociateTo}
        />
      </Form.Item>
    </Form>
  );
};

export default Category;

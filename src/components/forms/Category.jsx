import React from "react";
import { Input, Form, Select } from "antd";
import { onlyLetters } from "../../utility/patternsInput";

const Category = (props) => {
  const { setNameEdit, name } = props;

  const handleInput = (e, cb) => {
    cb(e.target.value);
  };

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
    </Form>
  );
};

export default Category;

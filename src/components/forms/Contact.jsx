import React, { useState, useEffect } from "react";
import { Input, Form } from "antd";
import { getObjectProp } from "../../utility/Funtions";

import {
  onlyNumbers,
  phoneNumberInput,
  onlyLetters,
} from "../../utility/patternsInput";

const Contact = (props) => {
  const [name, setName] = useState(props.name);
  const [phone, setPhone] = useState(props.phone);
  const { handleContactInfo, id } = props;

  const handleInput = (e, cb) => {
    cb(e.target.value);
  };

  const getCurrentCategories = (selectedCategories) => {
    setCategories(getObjectProp(selectedCategories, "key"));
  };

  useEffect(() => {
    handleContactInfo({ id, name, phone });
  }, [handleInput]);

  return (
    <Form style={{ marginTop: "10%" }}>
      <Input type={"hidden"} value={id} />
      <Form.Item
        name={"name"}
        label={"name"}
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
            handleInput(e, setName);
          }}
        />
      </Form.Item>

      <Form.Item
        name={"Phone"}
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
        initialValue={phone}
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
    </Form>
  );
};

export default Contact;

import React, { useState } from "react";
import { Select } from "antd";
import { fetchData } from "../../utility/fetchData";

const API =
  import.meta.env.VITE_API_URL +
  import.meta.env.VITE_API_URL_ROUTER +
  "contacts";
const SelectContacts = ({ setAssociateTo }) => {
  const contacts = fetchData(API);

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
      onChange={(contacts) => {
        let contactsObject = [];
        contacts.map((contact) => {
          contactsObject.push(contact.label);
        });
        setAssociateTo(contactsObject);
      }}
    >
      {contacts.length > 0 &&
        contacts.map((contact) => {
          return (
            <Select.Option key={contact.id}>{contact.email}</Select.Option>
          );
        })}
    </Select>
  );
};

export default SelectContacts;

import React, { useEffect, useState } from "react";
import { Select } from "antd";
import { fetchData } from "../../utility/fetchData";

const ContactsAssociate = ({ setAssociateTo, associateTo }) => {
  const API_ASSOCIATE_TO_URL =
    import.meta.env.VITE_API_URL +
    import.meta.env.VITE_API_URL_ROUTER +
    "contacts";

  // Obtener la lista de contactos
  const contacts = fetchData(API_ASSOCIATE_TO_URL);

  // Convertir los contactos a opciones para el Select
  const contactsOptions = contacts.map((contact) => ({
    label: contact.email,
    value: contact.email,
    key: contact.id,
  }));

  // Convertir los contactos seleccionados al formato esperado por el Select
  const selectedContacts = associateTo?.map((contact) => ({
    label: contact.email,
    value: contact.email,
    key: contact.id,
  }));

  // Manejar la selección de contactos
  const handleChange = (selected) => {
    const formattedContacts = selected.map((contact) => ({
      email: contact.value,
      id: contact.key,
    }));
    setAssociateTo(formattedContacts);
  };

  return (
    <Select
      mode="multiple"
      style={{ width: "100%" }}
      allowClear
      defaultValue={selectedContacts} // Usar value en lugar de defaultValue
      labelInValue
      optionLabelProp="children"
      optionFilterProp="children"
      filterOption={(input, option) =>
        option.children.toLowerCase().includes(input.toLowerCase())
      }
      options={contactsOptions}
      onChange={handleChange}
    />
  );
};

export default ContactsAssociate;

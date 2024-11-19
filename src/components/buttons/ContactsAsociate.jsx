import React, { useEffect, useState } from "react";
import { Select } from "antd";
import { fetchData } from "../../utility/fetchData";
const ContactsAssociate = (props) => {
  const API_ASSOCIATE_TO_URL =
    import.meta.env.VITE_API_URL +
    import.meta.env.VITE_API_URL_ROUTER +
    "contacts";
  const contacts = fetchData(API_ASSOCIATE_TO_URL);
  const { setAssociateTo, associateTo } = props;
  const [contactsOptions, setContactsOptions] = useState([]);

  const addCurrentContactsToSelectOption = () => {
    console.log(associateTo);
    if (contacts.length > 0) {
      const idContactsToFilter = contacts.map((contact) => contact.id);
      const arrayFilter = contacts.filter((contact) =>
        idContactsToFilter.includes(contact.id)
      );

      setContactsOptions(
        contacts.map((contact) => ({
          label: contact.email,
          value: contact.email,
          key: contact.id,
        }))
      );
    }
  };

  /*   funcion que retorna las categorias mediante el callback  */
  const returnSelectedConctacts = (contacts, cb) => {
    /* Declaramos un objeto para guardar las categorias seleccionadas */
    const contactObject = contacts.map((contact) => ({
      email: contact.value,
      id: contact.key,
    }));
    cb(contactObject);
    return contactObject;
  };

  useEffect(() => {
    addCurrentContactsToSelectOption();
  }, [contacts]);

  return (
    <Select
      mode="multiple"
      style={{ width: "100%" }}
      allowClear
      defaultValue={
        associateTo !== undefined && associateTo.length > 0
          ? associateTo.map((contact) => ({
              label: contact.email,
              value: contact.email,
              key: contact.id,
            }))
          : []
      }
      labelInValue
      optionLabelProp="children"
      optionFilterProp="children"
      filterOption={(input, option) => {
        return (
          option.children.toLowerCase().indexOf(`${input.toLowerCase()}`, 0) >=
          0
        );
      }}
      options={contactsOptions}
      /* El problema esta en este callback */
      onChange={(contacts) => {
        returnSelectedConctacts(contacts, setAssociateTo);
      }}
    />
  );
};

export default ContactsAssociate;

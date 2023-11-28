import React, { useEffect, useState } from "react";
import { Select } from "antd";
import { submitData } from "../../utility/submitData";
const ContactsAssociate = (props) => {
  const { setAssociateTo, associateTo } = props;
  const [contacts_Selected, setContacts_Selected] = useState(associateTo);
  const [contactsUnselected, setContactsUnselected] = useState([]);
  const [contactsOptions, setContactsOptions] = useState([]);

  const addCurrentContactsToSelectChildren = async () => {
    /* Renderizar contactos si la categoria tiene personas asociadas */
    if (associateTo.length > 0) {
      setContacts_Selected(
        associateTo.map((contact) => (
          <Select.Option key={contact.id}>{contact.email}</Select.Option>
        ))
      );
    }
  };

  const addMissingContactsToSelectChildren = () => {
    const API_ASSOCIATE_TO_URL =
      "http://localhost:3120/api/v1/contacts/distinctContacts";
    submitData(API_ASSOCIATE_TO_URL, associateTo).then((resp) => {
      const { contacts } = resp;
      const allContactsOptions = [...contacts, ...contacts_Selected];
      setContactsOptions(contacts_Selected);
      console.log(contacts_Selected);
      console.log(contacts);
    });
  };

  /*   funcion que retorna las categorias mediante el callback  */
  const returnSelectedConctacts = (contacts, cb) => {
    /* Declaramos un objeto para guardar las categorias seleccionadas */
    let contactObject = [];
    contacts.map((contact) => {
      /* recorremos el array de categories y vamos agregando o eliminando */
      contactObject.push(contact.key);
    });
    cb(contactObject);
  };

  useEffect(() => {
    addMissingContactsToSelectChildren();
  }, [associateTo]);

  return (
    <Select
      mode="multiple"
      style={{ width: "100%" }}
      allowClear
      defaultValue={associateTo.map((contact) => contact.email)}
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

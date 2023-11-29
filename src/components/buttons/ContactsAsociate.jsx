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
      const allContactsOptions = contacts.concat(contacts_Selected);
      setContactsOptions(
        allContactsOptions.map((contact) => ({
          label: contact.email,
          value: contact.email,
          key: contact.id,
        }))
      );
    });
  };

  /*   funcion que retorna las categorias mediante el callback  */
  const returnSelectedConctacts = (contacts, cb) => {
    console.log(associateTo);
    /* Declaramos un objeto para guardar las categorias seleccionadas */
    const contactObject = contacts.map((contact) => ({
      email: contact.value,
      id: contact.key,
    }));
    // contacts.map((contact) => {
    //   console.log(contact);
    //   /* recorremos el array de categories y vamos agregando o eliminando */
    //   contactObject.push({ email: contact.value, id: contact.key });
    // });
    cb(contactObject);
  };

  useEffect(() => {
    addMissingContactsToSelectChildren();
    console.log(associateTo);
  }, [associateTo]);

  return (
    <Select
      mode="multiple"
      style={{ width: "100%" }}
      allowClear
      defaultValue={contacts_Selected.map((contact) => ({
        label: contact.email,
        value: contact.email,
        key: contact.id,
      }))}
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

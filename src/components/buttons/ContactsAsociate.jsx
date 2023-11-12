import React from "react";
import { Select } from "antd";
import { fetchData } from "../../utility/fetchData";
const ContactsAssociate = (props) => {
  let contacts_Selected = [];
  let contactsUnselected = [];
  let children = [];
  const { setAssociateTo, associateTo } = props;
  /* Ene esta URL hacemos un llamado a un endPoint de nuestra app para que nos retorne unicamente los email */
  const API_ASSOCIATE_TO_URL =
    "http://localhost:3120/api/v1/contacts/contactsEmail";
  const contacts_Stored = fetchData(API_ASSOCIATE_TO_URL);

  /* Renderizar contactos si la categoria tiene personas asociadas */
  if (associateTo.length > 0) {
    for (let i = 0; i < associateTo.length; i++) {
      contacts_Selected.push(
        <Select.Option key={associateTo[i]}>{associateTo[i]}</Select.Option>
      );
    }

    /* En cada elemento del array donde estan todos los email
    hacemos verificacion de si el elemento actual existe o no */
    contacts_Stored.forEach((contact) => {
      if (associateTo.indexOf(contact) === -1) {
        contactsUnselected.push(
          <Select.Option key={contact}>{contact}</Select.Option>
        );
      }
    });

    children.push(contacts_Selected);
    children.push(contactsUnselected);
  }

  /* Renderizar todos los contactos en dado caso que la categoria no este asociado a ninguno */
  if (associateTo.length === 0) {
    for (let i = 0; i < contacts_Stored.length; i++) {
      children.push(
        <Select.Option key={contacts_Stored[i]}>
          {contacts_Stored[i]}
        </Select.Option>
      );
    }
  }

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

  return (
    <Select
      mode="multiple"
      style={{ width: "100%" }}
      allowClear
      defaultValue={contacts_Selected}
      labelInValue
      optionLabelProp="children"
      optionFilterProp="children"
      filterOption={(input, option) => {
        return (
          option.children.toLowerCase().indexOf(`${input.toLowerCase()}`, 0) >=
          0
        );
      }}
      /* El problema esta en este callback */
      onChange={(contacts) => {
        returnSelectedConctacts(contacts, setAssociateTo);
      }}
    >
      {children}
    </Select>
  );
};

export default ContactsAssociate;

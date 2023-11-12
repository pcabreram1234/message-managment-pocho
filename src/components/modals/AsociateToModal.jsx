import React, { useState, useEffect } from "react";
import { Modal, Select } from "antd";
import { UserAddOutlined } from "@ant-design/icons";
import { submitData } from "../../utility/submitData";
import { fetchData } from "../../utility/fetchData";
import { reloadPage, getObjectProp } from "../../utility/Funtions";

const API_URL = "http://localhost:3120/api/v1/contacts";
const API_URL_ASOCIATE =
  "http://localhost:3120/api/v1/messages/associate_contact";

const AsociateToModal = ({ setShowAsociateModal, messageId }) => {
  const [showModal, setShowModal] = useState(true);
  const [showSelect, setShowSelect] = useState(false);
  const [data, setData] = useState([]);
  const API_URL_GET_MESSAGE_ASOCIATION = `http://localhost:3120/api/v1/messages/messagesAsociation/${messageId}`;
  const contacts = fetchData(API_URL);
  const asociation = fetchData(API_URL_GET_MESSAGE_ASOCIATION);

  let currenteAsociation = [];
  let noSelectAsociation = [];
  let children = [];

  const onCancel = () => {
    setShowModal(false);
    setShowAsociateModal(false);
  };

  const renderContactsAsociate = () => {
    const uniqueNonSelect = getObjectProp(contacts, "email");
    let uniqueSelect = [];
    /* Acciones a tomar en caso de que el mensaje este asociado a personas */
    if (
      asociation.associate_to !== [] &&
      asociation.associate_to !== undefined
    ) {
      for (let i = 0; i < asociation.associate_to.length; i++) {
        uniqueSelect.push(asociation.associate_to[i]);
        currenteAsociation.push(
          <Select.Option key={asociation.associate_to[i]}>
            {asociation.associate_to[i]}
          </Select.Option>
        );
      }

      uniqueNonSelect.forEach((nonSelect) => {
        if (uniqueSelect.includes(nonSelect) === false) {
          noSelectAsociation.push(
            <Select.Option key={nonSelect}>{nonSelect}</Select.Option>
          );
        }
      });

      children.push(currenteAsociation);
      children.push(noSelectAsociation);
    }

    /* Acciones a tomar en caso de que el mensaje no este asociado a personas */
    if (asociation === [] || asociation === undefined) {
      children = contacts.map((contact) => {
        return <Select.Option key={contact.id}>{contact.email}</Select.Option>;
      });
    }
  };

  const handleAsociateClick = () => {
    submitData(
      API_URL_ASOCIATE,
      { id: messageId, asociateTo: data },
      "PATCH"
    ).then((resp) => {
      if (resp === 1) {
        alert("Categories associate succesfully");
        reloadPage();
      }
    });
  };

  setTimeout(() => {
    setShowSelect(true);
  }, 500);

  renderContactsAsociate();

  return (
    <Modal
      visible={showModal}
      title="Select a least one person to asociate this message"
      closable
      onOk={handleAsociateClick}
      onCancel={onCancel}
      okButtonProps={{ icon: <UserAddOutlined />, type: "primary" }}
      okText="Asociate"
    >
      {showSelect && (
        <Select
          allowClear
          autoFocus
          labelInValue
          style={{ width: "100%" }}
          mode="multiple"
          optionLabelProp="children"
          optionFilterProp="children"
          defaultValue={currenteAsociation}
          filterOption={(input, option) => {
            return (
              option.children
                .toLowerCase()
                .indexOf(`${input.toLowerCase()}`, 0) >= 0
            );
          }}
          onChange={(contacts) => {
            let contactsObject = [];
            contacts.map((contact) => {
              contactsObject.push(contact.label);
            });
            setData(contactsObject);
          }}
        >
          {children}
        </Select>
      )}
    </Modal>
  );
};

export default AsociateToModal;

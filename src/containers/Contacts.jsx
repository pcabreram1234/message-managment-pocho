import React, { useEffect, useState } from "react";
import { Layout, Typography, Table, Tag, Button } from "antd";
import EditButton from "../components/buttons/EditButton";
import DeleteButton from "../components/buttons/DeleteButton";
import EditContactModal from "../components/modals/EditContactModal";
import DeleteContactModal from "../components/modals/DeleteContactModal";
import DeleteContacstModal from "../components/modals/DelectContactsModal";
import AddContactModal from "../components/modals/AddContactModal";
import ShowMessagesButton from "../components/buttons/ShowMessagesButton";
import MessagesAssociatedModal from "../components/modals/MessagesAssociatedModal";
import { PlusCircleFilled, DeleteFilled } from "@ant-design/icons";
import { fetchData } from "../utility/fetchData";
import { getObjectProp } from "../utility/Funtions";
const { Header, Content } = Layout;
const { Title } = Typography;

const API_URL = "http://localhost:3120/api/v1/contacts";

const Contacts = () => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showAddContactModal, setShowAddContactmodal] = useState(false);
  const [showDeleteContactsModal, setShowDeleteContactsModal] = useState(false);
  const [id, setId] = useState([]);
  const [name, setName] = useState();
  const [phone, setPhone] = useState();
  const [categories, setCategories] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [showDeleteButton, setShowDeleteButton] = useState(false);
  const [showMessagesAssociatedModal, setShowAssociatedModal] = useState(false);
  let filterValues = [];

  /* Renderizada que muestra o no el boton para borrar contacto en caso
  de que se seleccione alguna fila */
  useEffect(() => {
    setId(selectedRowKeys);
    if (selectedRowKeys.length > 1) {
      setShowDeleteButton(true);
    } else {
      setShowDeleteButton(false);
    }
  }, [selectedRowKeys]);

  const ContactsCards = fetchData(API_URL);

  let tableDataSource = [];
  let tableColumns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      filtered: true,
      sorter: (a, b) =>
        a.name.toString().charCodeAt(0) < b.name.toString().charCodeAt(0),
      sortDirections: ["ascend", "descend"],
      filterSearch: true,
      filters: filterValues,
      onFilter: (value, record) => record.name.indexOf(value) === 0,
    },
    {
      title: "Phone Number",
      dataIndex: "phone_number",
      key: "phone_number",
    },
    { title: "Email", dataIndex: "email", key: "email" },
    {
      title: "Categories",
      dataIndex: "categories",
      key: "categories",
      render: (categories) => (
        <>
          {categories.map((category) => {
            return (
              <Tag key={category} color={"#9effce"} style={{ color: "black" }}>
                {category}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: "Edit",
      dataIndex: "editButton",
      key: "editButton",
    },
    {
      title: "Delete",
      dataIndex: "deleteButton",
      key: "delete",
    },
    {
      title: "Messages",
      dataIndex: "messages",
      key: "messages",
    },
  ];

  const renderContacts = () => {
    ContactsCards.length > 0 &&
      ContactsCards.map((contact) => {
        tableDataSource.push({
          key: contact.id,
          name: contact.name,
          phone_number: contact.phone_number,
          categories: getObjectProp(contact.categories, "categorie_name"),
          email: contact.email,
          editButton: (
            <EditButton
              setShowModal={setShowEditModal}
              setData={setContactInfo}
              data={contact}
            />
          ),
          deleteButton: (
            <DeleteButton
              id={contact.id}
              setId={setId}
              cb={setShowDeleteModal}
            />
          ),
          messages: (
            <ShowMessagesButton
              cb={setShowAssociatedModal}
              setId={setId}
              id={contact.id}
              name={contact.email}
              setName={setName}
            />
          ),
        });
        filterValues.push({ text: contact.name, value: contact.name });
      });
  };

  const onSelectChange = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const onSelect = (key) => {
    setId(key.key);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
    onSelect: onSelect,
    preserveSelectedRowKeys: true,
    selections: [
      Table.SELECTION_ALL,
      Table.SELECTION_INVERT,
      Table.SELECTION_NONE,
    ],
  };

  function setContactInfo({ id, name, phone, categories }) {
    setId(id);
    setName(name);
    setPhone(phone);
    setCategories(categories);
  }

  const handleShowAddContactModal = () => {
    setShowAddContactmodal(true);
  };

  const handleDeleteContact = () => {
    setShowDeleteContactsModal(true);
  };

  renderContacts();

  return (
    <Layout>
      <Header>
        <Content>
          <Title style={{ color: "white", textAlign: "center" }}>
            Contact Managment
          </Title>
        </Content>
      </Header>
      <Content style={{ margin: "5px 0 5px 5px" }}>
        <Button
          type="primary"
          onClick={handleShowAddContactModal}
          style={{
            color: "white",
            backgroundColor: "green",
            borderColor: "transparent",
          }}
        >
          <PlusCircleFilled /> Add Contact
        </Button>
        {showDeleteButton && (
          <Button
            type="default"
            onClick={handleDeleteContact}
            style={{
              color: "white",
              backgroundColor: "rgb(237 43 43)",
              borderColor: "transparent",
            }}
          >
            <DeleteFilled /> Delete Contacts
          </Button>
        )}
      </Content>
      <Content>
        <Table
          dataSource={tableDataSource}
          columns={tableColumns}
          rowSelection={rowSelection}
        />
      </Content>
      {showEditModal && (
        <EditContactModal
          data={{ id, name, phone, categories }}
          setShowModal={setShowEditModal}
        />
      )}
      {showDeleteModal && (
        <DeleteContactModal id={id} setShowDeleteModal={setShowDeleteModal} />
      )}
      {showDeleteContactsModal && (
        <DeleteContacstModal
          setShowDeleteContactsModal={setShowDeleteContactsModal}
          id={id}
        />
      )}
      {showAddContactModal && (
        <AddContactModal
          setShowAddContactmodal={setShowAddContactmodal}
          id={id}
        />
      )}
      {showMessagesAssociatedModal && (
        <MessagesAssociatedModal
          cb={setShowAssociatedModal}
          id={id}
          contact={name}
        />
      )}
    </Layout>
  );
};

export default Contacts;

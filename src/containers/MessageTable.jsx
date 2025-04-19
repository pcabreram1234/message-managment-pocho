import React, { useState, useEffect } from "react";
import { Table, Tag, Layout, Typography, Input, Button, Col } from "antd";
import { fetchData } from "../utility/fetchData";
import { deleteDuplicateInFilter } from "../utility/Funtions";
import { DeleteFilled, PlusCircleFilled } from "@ant-design/icons";
import AddMessageModal from "../components/modals/AddMessageModal";
import SendToModal from "../components/modals/SendToModal";
import SendToButton from "../components/buttons/SendToButton";
import EditButton from "../components/buttons/EditButton";
import DeleteButton from "../components/buttons/DeleteButton";
import EditMessageModal from "../components/modals/EditMessageModal";
import PopUpModal from "../components/modals/PopUpModal";
import DeleteMessageModal from "../components/modals/DeleteMessageModal";
import SeveralMessagesToSendModal from "../components/modals/SeveralMessagesToSendModal";
import SendButton from "../components/buttons/SendButton";
const API_URL =
  import.meta.env.VITE_API_URL +
  import.meta.env.VITE_API_URL_ROUTER +
  "messages";

const { Content, Header } = Layout;
const { Title } = Typography;
const { TextArea } = Input;

const MessageTable = () => {
  const messages = fetchData(API_URL);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  /* Fields Message States */
  const [id, setId] = useState([]);
  const [messageTosend, setMessageToSend] = useState([]);
  const [categories, setCategories] = useState([]);
  const [contacts, setContacts] = useState([]);

  /* Modal states */
  const [showSendToModal, setShowSendToModal] = useState(false);
  const [showAddMessageModal, setShowAddMessageModal] = useState(false);
  const [showDeleteButton, setShowDeleteButton] = useState(false);
  const [showSendToButton, setShowSendToButton] = useState(false);
  const [showEditMessageModal, setShowEditMessageModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showPopUpModal, setShowPopUpModal] = useState(false);
  const [showSeveralMessagesToSendModal, setShowSeveralMessagesToSendModal] =
    useState(false);

  /* PopUp Modal states */
  const [modalMessage, setModalMessage] = useState([]);
  const [alertModalType, setAlertModalType] = useState();
  const [modalInfoText, setModalInfoText] = useState();

  let categoriesFilter = [];
  let associatedFilter = [];
  let categoriesTmpFilter = [];
  let associateTmpFilter = [];
  let messagesTosend = [];

  let dataSource = [];
  let columns = [
    {
      title: "Message",
      dataIndex: "message",
      key: "message",
    },
    {
      title: "Categories",
      dataIndex: "categories",
      key: "categories",
      width: 150,
      filtered: true,
      filterSearch: true,
      filters: categoriesFilter,
      onFilter: (value, record) =>
        record.categories.some((obj) => obj.categorie_name === value),
      render: (categories) => (
        <>
          {categories.map((category) => {
            return (
              <Tag
                key={category.id}
                color={"rgb(158, 255, 206)"}
                style={{ color: "black" }}
              >
                {category.categorie_name}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: "Contacts associated",
      dataIndex: "contacts",
      key: "contacts",
      width: 100,
      filtered: true,
      filterSearch: true,
      filters: associatedFilter,
      onFilter: (value, record) => {
        return record.contacts.some((obj) => obj.email === value);
      },
      render: (contacts) => (
        <>
          {contacts.map((contact) => {
            return (
              <Tag
                key={contact.id}
                color={"#9effce"}
                style={{ color: "black" }}
              >
                {contact.email}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: "Actions",
      dataIndex: "actions",
      key: "actions",
      width: 100,
      align: "center",
    },
  ];

  const handleShowEditModal = () => {
    setShowEditMessageModal(true);
  };

  const setMessageInfo = ({ id, message, Categories, Contacts }) => {
    setId(id);
    setMessageToSend(message);
    setCategories(Categories);
    setContacts(Contacts);
  };

  const renderMessages = () => {
    console.log(messages);
    const { result } = messages;
    if (result) {
      result.map((message) => {
        dataSource.push({
          key: message.id,
          message: (
            <TextArea
              rows={4}
              value={message.message}
              contentEditable={false}
              size="middle"
            />
          ),
          categories: message.Categories,
          contacts: message.Contacts,
          actions: [
            <Col
              key={message.id}
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                flexWrap: "nowrap",
                gap: "10px",
                wordBreak: "break-all",
              }}
            >
              <EditButton
                data={message}
                setData={setMessageInfo}
                setShowModal={handleShowEditModal}
              />

              <DeleteButton
                setId={setId}
                id={message.id}
                cb={setShowDeleteModal}
              />

              {/* <SendToButton
                setShowSendToModal={setShowSendToModal}
                setMessageToSend={setMessageToSend}
                associateTo={message.Contacts}
                setAssociateTo={setContacts}
                message={message.message}
              /> */}
            </Col>,
          ],
        });
      });
    }

    dataSource.map((data) => {
      const { categories, contacts } = data;
      categories.map((category) => {
        categoriesTmpFilter.push(category.categorie_name);
      });

      contacts.map((contact) => {
        associateTmpFilter.push(contact.email);
      });
    });
    /* Las variables de filtros temporales se les reasigna su valor en base a la 
    funcion que elimina los duplicados */
    categoriesTmpFilter = deleteDuplicateInFilter(categoriesTmpFilter);
    associateTmpFilter = deleteDuplicateInFilter(associateTmpFilter);

    /* Se recorre las dos variables de filtros temporales para que 
    en cada recorrido le agregue las propiedades del objeto que necesita
    la UI para mostrar las opciones de los filtros */
    categoriesTmpFilter.map((category) => {
      categoriesFilter.push({
        text: category,
        value: category,
      });
    });

    associateTmpFilter.map((contact) => {
      associatedFilter.push({ text: contact, value: contact });
    });
  };

  const onSelect = (key, selected) => {
    setSelectedRowKeys(key);
    for (let i = 0; i < selected.length; i++) {
      const { key, contacts, message } = selected[i];
      messagesTosend.push({
        key: key,
        contacts: contacts,
        message: message.props.value,
      });
    }
    setMessageToSend(messagesTosend);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelect,
    onSelect: onSelect,
    onSelectMultiple: onSelect,
    preserveSelectedRowKeys: true,
    selections: [
      Table.SELECTION_ALL,
      Table.SELECTION_INVERT,
      Table.SELECTION_NONE,
    ],
  };

  const onkDeleteButton = () => {
    setId(selectedRowKeys);
    setShowDeleteModal(true);
  };

  const addMessageOnOk = () => {
    setShowAddMessageModal(true);
  };

  const setPopUpModalInfo = (modalMessage, alertModalType, modalInfoText) => {
    setModalMessage(modalMessage);
    setAlertModalType(alertModalType);
    setModalInfoText(modalInfoText);
  };

  useEffect(() => {
    if (selectedRowKeys.length > 1) {
      setShowDeleteButton(true);
      setShowSendToButton(true);
    } else {
      setShowSendToButton(false);
      setShowDeleteButton(false);
    }
  }, [selectedRowKeys]);

  renderMessages();

  return (
    <Layout>
      <Header>
        <Title style={{ color: "white", textAlign: "center" }}>Messages</Title>
      </Header>

      <Content
        style={
          {
            // display: "flex",
            // columnGap: "5px",
            // margin: "5px 0 5px 5px",
          }
        }
      >
        <Button
          type="primary"
          style={{
            color: "white",
            backgroundColor: "green",
            borderColor: "transparent",
          }}
          onClick={addMessageOnOk}
        >
          <PlusCircleFilled /> Add Message
        </Button>
        {showDeleteButton && (
          <Button
            type="default"
            style={{
              color: "white",
              backgroundColor: "rgb(237 43 43)",
              borderColor: "transparent",
            }}
            onClick={onkDeleteButton}
          >
            <DeleteFilled /> Delete Messages
          </Button>
        )}
        {showSendToButton && (
          <SendButton setShowModal={setShowSeveralMessagesToSendModal} />
        )}
        <Table
          loading={dataSource?.length > 0 ? false : true}
          dataSource={dataSource}
          columns={columns}
          rowSelection={rowSelection}
        />
      </Content>

      {showSendToModal && (
        <SendToModal
          setShowSendToModal={setShowSendToModal}
          message={messageTosend}
          associateTo={contacts}
          setAssociateTo={setContacts}
        />
      )}

      {showAddMessageModal && (
        <AddMessageModal
          setShowAddMessageModal={setShowAddMessageModal}
          setShowPopUpModal={setShowPopUpModal}
          setPopUpModalInfo={setPopUpModalInfo}
        />
      )}

      {showEditMessageModal && (
        <EditMessageModal
          data={{ id, messageTosend, categories, contacts }}
          setShowEditMessageModal={setShowEditMessageModal}
          setShowPopUpModal={setShowPopUpModal}
          setPopUpModalInfo={setPopUpModalInfo}
        />
      )}

      {showPopUpModal && (
        <PopUpModal
          isModalVisible={true}
          modalMessage={modalMessage}
          alertModalType={alertModalType}
          modalInfoText={modalInfoText}
        />
      )}

      {showDeleteModal && (
        <DeleteMessageModal
          id={id}
          setShowDeleteModal={setShowDeleteModal}
          setPopUpModalInfo={setPopUpModalInfo}
          titleModal="Do you want do delete this message?"
        />
      )}

      {showSeveralMessagesToSendModal && (
        <SeveralMessagesToSendModal
          messages={messageTosend}
          setShowModal={setShowSeveralMessagesToSendModal}
        />
      )}
    </Layout>
  );
};

export default MessageTable;

import React, { useState, useEffect } from "react";
import { Table, Tag, Layout, Typography, Input, Button, Col } from "antd";
import { fetchData } from "../utility/fetchData";
import { deleteDuplicateInFilter, getObjectProp } from "../utility/Funtions";
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

const API_URL = "http://localhost:3120/api/v1/messages";
const API_URL_DELETE_MESSAGES =
  "http://localhost:3120/api/v1/messages/deleteMessage/";

const { Content, Header } = Layout;
const { Title } = Typography;
const { TextArea } = Input;

const MessageTable = () => {
  const messages = fetchData(API_URL);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  /* Fields Message States */
  const [id, setId] = useState([]);
  const [messageTosend, setMessageToSend] = useState([]);
  const [categoriesEdit, setCategories] = useState([]);
  const [associateTo, setAssociateTo] = useState([]);

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
      onFilter: (value, record) => record.categories.indexOf(value) !== -1,
      render: (categories) => (
        <>
          {categories.map((category) => {
            return (
              <Tag
                key={category}
                color={"rgb(158, 255, 206)"}
                style={{ color: "black" }}
              >
                {category}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: "Associated to",
      dataIndex: "associated_to",
      key: "associated_to",
      width: 100,
      filtered: true,
      filterSearch: true,
      filters: associatedFilter,
      onFilter: (value, record) => record.associated_to.indexOf(value) !== -1,
      render: (associated_to) => (
        <>
          {associated_to.map((contact) => {
            return (
              <Tag key={contact} color={"#9effce"} style={{ color: "black" }}>
                {contact}
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

  const setMessageInfo = ({ id, message, categories, associate_to }) => {
    setId(id);
    setMessageToSend(message);
    setCategories(categories);
    setAssociateTo(associate_to);
  };

  const renderMessages = () => {
    if (messages.length > 0) {
      messages.map((message) => {
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
          categories: getObjectProp(message.categories, "categorie_name"),
          associated_to: message.associate_to,
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

              <SendToButton
                setShowSendToModal={setShowSendToModal}
                setMessageToSend={setMessageToSend}
                associateTo={message.associate_to}
                setAssociateTo={setAssociateTo}
                message={message.message}
              />
            </Col>,
          ],
        });

        /* En dado caso que el mensaje tenga categorias asociadas
         agregar a la variable de filtros temporal*/
        if (message.categories.length > 0) {
          for (const cC of message.categories) {
            categoriesTmpFilter.push(cC.categorie_name);
          }
        }
        /* En dado caso que el mensaje tenga personas asociadas
         agregar a la variable de filtros temporal*/
        if (message.associate_to.length > 0) {
          for (const cA of message.associate_to) {
            associateTmpFilter.push(cA);
          }
        }
      });
    }
    /* Las variables de filtros temporales se les reasigna su valor en base a la 
    funcion que elimina los duplicados */
    categoriesTmpFilter = deleteDuplicateInFilter(categoriesTmpFilter);
    associateTmpFilter = deleteDuplicateInFilter(associateTmpFilter);

    /* Se recorre las dos variables de filtros temporales para que 
    en cada recorrido le agregue las propiedades del objeto que necesita
    la UI para mostrar las opciones de los filtros */
    categoriesTmpFilter.map((category) => {
      categoriesFilter.push({ text: category, value: category });
    });

    associateTmpFilter.map((associate_to) => {
      associatedFilter.push({ text: associate_to, value: associate_to });
    });
  };

  const onSelect = (key, selected) => {
    setSelectedRowKeys(key);
    for (let i = 0; i < selected.length; i++) {
      const { key, associated_to, message } = selected[i];
      messagesTosend.push({
        key: key,
        associated_to: associated_to,
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
        style={{
          display: "flex",
          columnGap: "5px",
          margin: "5px 0 5px 5px",
        }}
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
      </Content>

      <Content>
        <Table
          dataSource={dataSource}
          columns={columns}
          rowSelection={rowSelection}
        />
      </Content>

      {showSendToModal && (
        <SendToModal
          setShowSendToModal={setShowSendToModal}
          message={messageTosend}
          associateTo={associateTo}
          setAssociateTo={setAssociateTo}
          
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
          data={{ id, messageTosend, categoriesEdit, associateTo }}
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

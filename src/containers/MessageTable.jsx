import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  Layout,
  Typography,
  Table,
  Button,
  Card,
  Space,
  Tag,
  Tooltip,
  Empty,
  Modal,
} from "antd";
import {
  PlusOutlined,
  DeleteOutlined,
  EditOutlined,
  SendOutlined,
} from "@ant-design/icons";
import useSubmitData from "../hooks/useSubmitData";
import AddMessageModal from "../components/modals/AddMessageModal";
import EditMessageModal from "../components/modals/EditMessageModal";
import DeleteMessageModal from "../components/modals/DeleteMessageModal";
import SendToModal from "../components/modals/SendToModal";
import MessageStatusResult from "../components/MessageStatusResult";
import AddCamapignModal from "../components/modals/AddCamapignModal";
import { useActionContext } from "../context/ActionContext";
import { useActionEffect } from "../hooks/useActionEffect";

const API_URL =
  import.meta.env.VITE_API_URL +
  import.meta.env.VITE_API_URL_ROUTER +
  "messages";

const API_URL_CONTACTS =
  import.meta.env.VITE_API_URL +
  import.meta.env.VITE_API_URL_ROUTER +
  "contacts/simple";

const { Content, Header } = Layout;
const { Title, Text } = Typography;

const MessageTable = () => {
  const { dispatchAction } = useActionContext();
  const [dataSource, setDataSource] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [messagesTosend, setMessagesToSend] = useState([]);
  const { submitData } = useSubmitData();

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [currentMessage, setCurrentMessage] = useState(null);
  const [currenteContacts, setCurrentContacts] = useState(null);
  const [messageId, setMessageId] = useState(null);

  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [showSend, setShowSend] = useState(false);
  const [showMessageStatusResult, setShowMessageStatusResult] = useState(false);
  const [showAddCampaignModal, setShowAddcamapginModal] = useState(false);
  const [msResult, setMsResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const loadMessages = useCallback(() => {
    submitData(API_URL, null, "GET").then((resp) => {
      setDataSource(
        () =>
          resp?.result?.map((m) => ({
            key: m.id,
            id: m.id,
            content: m.message,
            categories: m.Categories || [],
            contactsCount: m.Contacts?.length || 0,
            contacts: m.Contacts,
            raw: m,
          })) || [],
      );
      dispatchAction("", "");
    });
  }, [API_URL, dispatchAction, submitData]);

  const loadContacts = useCallback(() => {
    submitData(API_URL_CONTACTS, null, "GET").then((resp) => {
      setContacts(resp);
    });
  }, [API_URL]);

  const columns = useMemo(
    () => [
      {
        title: "Message",
        dataIndex: "content",
        key: "content",
        ellipsis: true,
        render: (text) => (
          <Tooltip title={text}>
            <Text>{text}</Text>
          </Tooltip>
        ),
      },
      {
        title: "Categories",
        dataIndex: "categories",
        key: "categories",
        render: (categories) => (
          <Space wrap>
            {categories.map((c) => (
              <Tag key={c.id} color="green">
                {c.categorie_name}
              </Tag>
            ))}
          </Space>
        ),
      },
      {
        title: "Contacts",
        dataIndex: "contactsCount",
        key: "contacts",
        align: "center",
        render: (count) => <Tag>{count}</Tag>,
      },
      {
        title: "Actions",
        key: "actions",
        align: "center",
        render: (_, record) => (
          <Space>
            <Tooltip title="Edit">
              <Button
                type="text"
                icon={<EditOutlined />}
                onClick={() => {
                  setCurrentMessage(record.raw);
                  setShowEdit(true);
                }}
              />
            </Tooltip>

            <Tooltip title="Delete">
              <Button
                type="text"
                danger
                icon={<DeleteOutlined />}
                onClick={() => {
                  setCurrentMessage(record.raw);
                  setShowDelete(true);
                }}
              />
            </Tooltip>

            <Tooltip title="Send">
              <Button
                type="text"
                icon={<SendOutlined />}
                onClick={() => {
                  setMessagesToSend([record.content]);
                  setCurrentContacts(record.contacts?.map((c) => c.id));
                  setMessageId(record?.id);
                  setShowSend(true);
                }}
              />
            </Tooltip>
          </Space>
        ),
      },
    ],
    [],
  );

  useActionEffect({ type: "refresh", target: "messagesTable" }, loadMessages);

  useEffect(() => {
    loadMessages();
    loadContacts();
  }, [API_URL]);

  const onRetry = () => {
    setShowMessageStatusResult(false);
  };
  const onGoToCampaigns = () => {
    setShowAddcamapginModal(true);
    setShowMessageStatusResult(false);
  };

  const handleSubmit = (API_URL, selectedContactIds) => {
    setIsLoading(true);
    submitData(API_URL, {
      messageId: messageId,
      contactsId: selectedContactIds,
    })
      .then((resp) => {
        setMsResult(resp);
        setShowMessageStatusResult(true);
        if (resp?.summary && resp?.summary?.failed === 0) {
          setShowSend(false);
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    console.log(showMessageStatusResult);
  }, [showMessageStatusResult]);

  return (
    <Layout>
      <Header
        style={{
          background: "transparent",
          padding: "16px 24px",
          height: "auto",
          lineHeight: "normal",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 16,
            flexWrap: "wrap",
          }}
        >
          <Space direction="vertical" size={0}>
            <Title level={2}>Messages</Title>
            <Text type="secondary">
              Create and manage reusable message templates to speed up your
              communication. Send messages instantly to selected contacts or use
              them later in campaigns.
            </Text>
          </Space>

          <Space>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => setShowAdd(true)}
            >
              New Message
            </Button>

            {selectedRowKeys.length > 0 && (
              <Button
                danger
                icon={<DeleteOutlined />}
                onClick={() => setShowDelete(true)}
              >
                Delete ({selectedRowKeys.length})
              </Button>
            )}

            {selectedRowKeys.length > 1 && (
              <Button icon={<SendOutlined />} onClick={() => setShowSend(true)}>
                Send ({selectedRowKeys.length})
              </Button>
            )}
          </Space>
        </div>
      </Header>

      <Content style={{ padding: 16 }}>
        <Card>
          <Table
            rowSelection={{
              selectedRowKeys,
              onChange: setSelectedRowKeys,
            }}
            columns={columns}
            dataSource={dataSource}
            pagination={{ pageSize: 10 }}
            locale={{
              emptyText: <Empty description="No messages yet" />,
            }}
          />
        </Card>
      </Content>

      {showAdd && <AddMessageModal setShowAddMessageModal={setShowAdd} />}

      {showEdit && (
        <EditMessageModal
          data={currentMessage}
          setShowEditMessageModal={setShowEdit}
        />
      )}

      {showDelete && (
        <DeleteMessageModal
          id={currentMessage?.id || selectedRowKeys}
          setShowDeleteModal={setShowDelete}
          titleModal="Delete selected message(s)?"
        />
      )}

      {showSend && (
        <SendToModal
          contacts={contacts}
          selectedContacts={currenteContacts}
          setShowSendToModal={setShowSend}
          messages={messagesTosend}
          messageId={messageId}
          handleSubmit={handleSubmit}
          isLoading={isLoading}
        />
        // <SeveralMessagesToSendModal
        //   messages={dataSource?.filter((m) => selectedRowKeys.includes(m.id))}
        //   setShowModal={setShowSend}
      )}

      {showMessageStatusResult && (
        <Modal
          open={showMessageStatusResult}
          onCancel={onRetry}
          footer={null}
          destroyOnClose
          centered
          width={600}
        >
          <MessageStatusResult
            response={msResult}
            onRetry={onRetry}
            onGoToCampaigns={onGoToCampaigns}
          />
        </Modal>
      )}

      {showAddCampaignModal && (
        <AddCamapignModal
          setShowAddcamapginModal={setShowAddcamapginModal}
          showAddCampaignModal={showAddCampaignModal}
        />
      )}
    </Layout>
  );
};

export default MessageTable;

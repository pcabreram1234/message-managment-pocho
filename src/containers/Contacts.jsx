import React, { useEffect, useState } from "react";
import {
  Alert,
  Layout,
  Typography,
  Table,
  Button,
  Col,
  Row,
  Tag,
  Tooltip,
  Space,
} from "antd";
import EditContactModal from "../components/modals/EditContactModal";
import DeleteContactModal from "../components/modals/DeleteContactModal";
import DeleteContacstModal from "../components/modals/DelectContactsModal";
import AddContactModal from "../components/modals/AddContactModal";
import ViewMessagesButton from "../components/buttons/ViewMessagesButton";
import ContactMessagesModal from "../components/modals/ContactMessagesModal";
import {
  PlusCircleFilled,
  DeleteFilled,
  EditOutlined,
  DeleteOutlined,
  WarningOutlined,
} from "@ant-design/icons";
import { fetchData } from "../utility/fetchData";

const { Header, Content } = Layout;
const { Title } = Typography;

const API_URL =
  import.meta.env.VITE_API_URL +
  import.meta.env.VITE_API_URL_ROUTER +
  "contacts";

const Contacts = () => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showAddContactModal, setShowAddContactmodal] = useState(false);
  const [showDeleteContactsModal, setShowDeleteContactsModal] = useState(false);
  const [id, setId] = useState([]);
  const [name, setName] = useState();
  const [phone, setPhone] = useState();
  const [email, setEmail] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [showDeleteButton, setShowDeleteButton] = useState(false);
  const [showMessagesAssociatedModal, setShowAssociatedModal] = useState(false);
  const [showMessagesModal, setShowMessagesModal] = useState(false);
  const [selectedContactId, setSelectedContactId] = useState(null);

  // Table States
  const [pagination, setPagination] = useState({
    pageSize: 10,
    defaultPageSize: 10,
    showSizeChanger: true,
  });

  const EMAIL_STATUS_MAP = {
    valid: { color: "green", label: "Valid" },
    pending: { color: "gold", label: "Pending" },
    invalid: { color: "red", label: "Invalid domain" },
    bounced: { color: "volcano", label: "Bounced" },
    blocked: { color: "default", label: "Blocked" },
  };

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

  // let tableDataSource = [];
  const tableColumns = [
    /* ===============================
     Name
  =============================== */
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      ellipsis: true,
      sorter: (a, b) => a.name.localeCompare(b.name),
    },

    /* ===============================
     Email
  =============================== */
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      ellipsis: true,
      render: (email) => (
        <Tooltip title={email}>
          <span>{email}</span>
        </Tooltip>
      ),
    },

    /* ===============================
     Email Status
  =============================== */
    {
      title: "Email Status",
      dataIndex: "email_status",
      key: "email_status",
      filters: Object.entries(EMAIL_STATUS_MAP).map(([value, { label }]) => ({
        text: label,
        value,
      })),
      onFilter: (value, record) => record.email_status === value,
      render: (status) => {
        const config = EMAIL_STATUS_MAP[status] || {
          color: "default",
          label: "Unknown",
        };

        return (
          <Tooltip title={`Email status: ${config.label}`}>
            <Tag color={config.color}>{config.label}</Tag>
          </Tooltip>
        );
      },
    },

    /* ===============================
     Phone
  =============================== */
    {
      title: "Phone",
      dataIndex: "phone_number",
      key: "phone_number",
      width: 150,
    },

    /* ===============================
     Messages
  =============================== */
    {
      title: "Messages",
      dataIndex: "messages",
      key: "messages",
      width: 110,
      align: "center",
    },

    /* ===============================
     Actions
  =============================== */
    {
      title: "Actions",
      key: "actions",
      width: 180,
      render: (_, contact) => (
        <Space>
          <Tooltip title="Edit contact">
            <Button
              size="small"
              icon={<EditOutlined />}
              onClick={() => {
                setContactInfo(contact);
                setShowEditModal(true);
              }}
            />
          </Tooltip>

          <Tooltip title="Delete contact">
            <Button
              size="small"
              danger
              icon={<DeleteOutlined />}
              onClick={() => {
                setId(contact.id);
                setShowDeleteModal(true);
              }}
            />
          </Tooltip>

          {["invalid", "bounced"].includes(contact.email_status) && (
            <Tooltip title="Fix email issues">
              <Button size="small" type="dashed" icon={<WarningOutlined />} />
            </Tooltip>
          )}
        </Space>
      ),
    },
  ];

  const tableDataSource = ContactsCards.map((contact) => ({
    key: contact.id,
    ...contact,
    messages: (
      <ViewMessagesButton
        contactId={contact.id}
        totalMessages={contact.total_messages}
        onOpen={(id) => {
          setSelectedContactId(id);
          setShowMessagesModal(true);
        }}
      />
      // <ShowMessagesButton
      //   cb={setShowAssociatedModal}
      //   setId={setId}
      //   id={contact.id}
      //   name={contact.email}
      //   setName={setName}
      // />
    ),
  }));

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

  function setContactInfo({ id, name, phone_number, email }) {
    setId(id);
    setName(name);
    setPhone(phone_number);
    setEmail(email);
  }

  const handleShowAddContactModal = () => {
    setShowAddContactmodal(true);
  };

  const handleDeleteContact = () => {
    setShowDeleteContactsModal(true);
  };

  // renderContacts();

  return (
    <Layout>
      <Header
        style={{
          background: "transparent",
          height: "auto", // 🔥 CLAVE
          lineHeight: "normal", // 🔥 CLAVE
          padding: "16px",
        }}
      >
        <Row align="middle" justify="space-between" gutter={[16, 16]} wrap>
          {/* ===============================
        Title + Subtitle
    =============================== */}
          <Col>
            <Title level={3} style={{ marginBottom: 0 }}>
              Contacts
            </Title>
            <Typography.Text type="secondary">
              Manage your contacts and email validation status
            </Typography.Text>
          </Col>

          {/* ===============================
        Actions
    =============================== */}
          <Col>
            <Space wrap>
              <Button
                type="primary"
                icon={<PlusCircleFilled />}
                onClick={handleShowAddContactModal}
              >
                Add Contact
              </Button>

              {showDeleteButton && (
                <Button
                  danger
                  icon={<DeleteFilled />}
                  onClick={handleDeleteContact}
                >
                  Delete selected
                </Button>
              )}
            </Space>
          </Col>
        </Row>

        {/* ===============================
      Warning / Alert
  =============================== */}
        <Row style={{ marginTop: 12 }}>
          <Col span={24}>
            <Alert
              type="warning"
              showIcon
              message="Some contacts may not receive emails"
              description="Review contacts with invalid or bounced email status before launching campaigns."
              closable
            />
          </Col>
        </Row>
      </Header>

      <Content style={{ margin: "5px 0 5px 5px" }}>
        <Table
          loading={tableDataSource?.length > 0 ? false : true}
          rowClassName={(record) =>
            ["invalid_domain", "bounced"].includes(record.email_status)
              ? "row-warning"
              : ""
          }
          dataSource={tableDataSource}
          columns={tableColumns}
          rowSelection={rowSelection}
          pagination={pagination}
          scroll={{ x: "max-content", y: 100 * 5 }}
          onChange={(e) => {
            setPagination(e);
          }}
        />
      </Content>

      {showEditModal && (
        <EditContactModal
          data={{ id, name, phone, email }}
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
      {/* {showMessagesAssociatedModal && (
        <MessagesAssociatedModal
          cb={setShowAssociatedModal}
          id={id}
          contact={name}
        />
      )} */}

      {showMessagesModal && (
        <ContactMessagesModal
          visible={showMessagesModal}
          contactId={selectedContactId}
          onClose={() => setShowMessagesModal(false)}
        />
      )}
    </Layout>
  );
};

export default Contacts;

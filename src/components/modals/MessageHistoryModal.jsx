import React, { useEffect, useState } from "react";
import {
  Table,
  Tag,
  Input,
  Space,
  Button,
  DatePicker,
  Select,
  Tooltip,
  Modal,
  Typography,
  Popconfirm,
} from "antd";
import {
  ReloadOutlined,
  FileExcelOutlined,
  EyeOutlined,
  RedoOutlined,
  DownloadOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";
import { submitData } from "../../utility/submitData";
import PreviewMessageModal from "./PreviewMessageModal";
import PopUpModal from "../modals/PopUpModal";
import { generateDeliveryReport } from "../../utility/pdf/deliveryReport";

const { RangePicker } = DatePicker;
const { Option } = Select;
const { Paragraph } = Typography;

const MessageHistoryModal = ({ showModal, cbShowModal }) => {
  const [data, setData] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState(null);
  const [channelFilter, setChannelFilter] = useState(null);
  const [dateRange, setDateRange] = useState([]);
  const [showPrevieMessageModal, setShowPrevieMessageModal] = useState(false);
  const [previewMessageContent, setPreviewMessageContent] = useState([]);
  const [showPopUpModal, setShowPopUpModal] = useState(false);
  const [alertModalType, setAlertModalType] = useState("info");
  const [modalInfoText, setModalInfoText] = useState("Sending Message");

  const columns = [
    { title: "Id", dataIndex: "id" },
    { title: "Message Id", dataIndex: "MessageConfig_Id" },
    {
      title: "Message",
      dataIndex: "message_content",
      render: (_, record) => (
        <Paragraph
          ellipsis={{
            expandable: "collapsible",
            rows: 2,
            tooltip: record?.message_content,
          }}
        >
          {record?.message_content}
        </Paragraph>
      ),
    },
    { title: "Recipient", dataIndex: "recipient" },
    {
      title: "Status",
      dataIndex: "status",
      render: (status) => {
        const colorMap = {
          Sended: "green",
          Error: "red",
          Pending: "gray",
        };
        return (
          <Tag color={colorMap[status]} style={{ fontWeight: "bold" }}>
            {status}
          </Tag>
        );
      },
    },
    { title: "Attempts", dataIndex: "attempts" },
    {
      title: "Error",
      dataIndex: "error_message",
      render: (_, record) => (
        <Paragraph
          ellipsis={{
            expandable: "collapsible",
            rows: 2,
            tooltip: record?.error_message,
          }}
        >
          {record?.error_message}
        </Paragraph>
      ),
    },
    {
      title: "Scheduled_At",
      dataIndex: "scheduled_date",
      render: (_, d) => dayjs(d?.scheduled_date).format("YYYY-MM-DD HH:mm"),
    },
    {
      title: "Actions",
      render: (_, record) => (
        <Space direction="vertical">
          <Tooltip title="Preview">
            <Button
              icon={<EyeOutlined />}
              size="small"
              onClick={() => handleMessagePreview(record?.id)}
            />
          </Tooltip>

          <Tooltip title="Send Now">
            <Button
              icon={<RedoOutlined />}
              size="small"
              disabled={record.status === "Sended"}
              onClick={() => {
                handleSendMessage(record?.MessageConfig_Id, record?.id);
              }}
            />
          </Tooltip>

          <Tooltip title="Download">
            <Button
              icon={<DownloadOutlined />}
              size="small"
              onClick={() => {
                handleDownloadPDF(record?.id);
              }}
            />
          </Tooltip>

          <Tooltip title="Stop Sent">
            <Popconfirm
              title="Stop Message Sent"
              description="Are you sure to stop this message sent"
              onConfirm={() =>
                handleStopMessageSent(record?.id, record?.MessageConfig_Id)
              }
              okText={"Yes"}
              cancelText={"No"}
            >
              <Button
                icon={<CloseCircleOutlined />}
                size="small"
                danger
                disabled={record.status === "Sended"}
              />
            </Popconfirm>
          </Tooltip>
        </Space>
      ),
    },
  ];

  const API_GET_SHIPPMENT_HISTORY =
    import.meta.env.VITE_API_URL +
    import.meta.env.VITE_API_URL_ROUTER +
    "failedMessages/getShippmentHistory";

  const loadMessages = async () => {
    const req = await submitData(API_GET_SHIPPMENT_HISTORY, "", "GET");
    setData(req);
    setFiltered(req);
  };

  const handleSearch = (val) => {
    setSearch(val);

    const lower = val.toLowerCase();
    const filteredData = data.filter(
      (item) =>
        item.message_content.toLowerCase().includes(lower) ||
        item.recipient.toLowerCase().includes(lower)
    );
    setFiltered(filteredData);
  };

  const handleFilters = () => {
    let result = data;
    if (statusFilter) result = result.filter((i) => i.status === statusFilter);
    if (channelFilter)
      result = result.filter((i) => i.channel === channelFilter);
    if (dateRange?.length === 2) {
      result = result.filter((i) => {
        const date = dayjs(i.sentAt || i.scheduled_date);
        return date.isAfter(dateRange[0]) && date.isBefore(dateRange[1]);
      });
    }
    if (search) {
      result = result.filter(
        (item) =>
          item.message_content.toLowerCase().includes(search.toLowerCase()) ||
          item.recipient.toLowerCase().includes(search.toLowerCase())
      );
    }
    setFiltered(result);
  };

  useEffect(() => {
    handleFilters();
  }, [search, statusFilter, channelFilter, dateRange]);

  const handleOk = () => {
    cbShowModal(false);
  };

  const handleClose = () => {
    cbShowModal(false);
  };

  const handleMessagePreview = async (id) => {
    const API_MESSAGE_PREVIEW =
      import.meta.env.VITE_API_URL +
      import.meta.env.VITE_API_URL_ROUTER +
      `failedMessages/getFailedMessagePreview/${id}`;
    submitData(API_MESSAGE_PREVIEW, "", "GET").then((resp) => {
      setShowPrevieMessageModal(true);
      setPreviewMessageContent(resp);
    });
  };

  const handleSendMessage = async (messageConfigId, failedMessageId) => {
    setShowPopUpModal(true);
    const API_SEND_MESSAGE =
      import.meta.env.VITE_API_URL +
      import.meta.env.VITE_API_URL_ROUTER +
      `configuration/sendMessage/${messageConfigId}/${failedMessageId}`;
    submitData(API_SEND_MESSAGE, "", "GET")
      .then((resp) => {
        if (resp?.result === "Message Sended") {
          setModalInfoText("Message Sended");
          setAlertModalType("success");
          setFiltered((prev) =>
            prev.map((el) =>
              el.id === failedMessageId
                ? { ...el, status: "Sended", attempts: el.attempts + 1 }
                : el
            )
          );
          setTimeout(() => {
            setShowPopUpModal(false);
          }, 500);
        }
      })
      .catch((err) => {
        console.log(err);
        setModalInfoText(
          `An error occurred: ${err?.message} when trying to send the message, 
           please try again or wait for the system to attempt to send it automatically.`
        );
        setAlertModalType("success");
      })
      .finally(() => {
        setAlertModalType("info");
        setModalInfoText("Sending Message");
      });
  };

  const handleDownloadPDF = (failedMessageId) => {
    const API_DOWNLOAD_MESSAGE =
      import.meta.env.VITE_API_URL +
      import.meta.env.VITE_API_URL_ROUTER +
      `failedMessages/getFailedMessagesToDownload/${failedMessageId}`;
    submitData(API_DOWNLOAD_MESSAGE, "", "GET").then((resp) => {
      generateDeliveryReport(resp);
    });
  };

  const handleStopMessageSent = (failedMessageId, messageConfigId) => {
    const API_STOP_MESSAGE_SENT =
      import.meta.env.VITE_API_URL +
      import.meta.env.VITE_API_URL_ROUTER +
      `failedMessages/stopMessageSent/${failedMessageId}/${messageConfigId}`;

    submitData(API_STOP_MESSAGE_SENT, "", "GET").then((resp) => {
      if (resp?.result === "Message Stoped") {
        setFiltered((prev) =>
          prev.filter((value) => value.id !== failedMessageId)
        );
      }
    });
  };

  return (
    <Modal
      title="Shipment History"
      open={showModal}
      onCancel={() => handleClose()}
      onClose={() => handleClose()}
      afterOpenChange={loadMessages}
      onOk={handleOk}
      okText="Ok"
      cancelText="Cancel"
      centered
      width={{
        xs: "480px",
        sm: "576px",
        md: "768px",
        lg: "992px",
        xl: "1200px",
        xxl: "1600px",
      }}
    >
      <Space style={{ marginBottom: 16 }} wrap>
        <Input.Search
          placeholder="Search for message or recipient"
          value={search}
          onChange={(e) => handleSearch(e.target.value)}
          style={{ width: 300 }}
        />
        <Select
          placeholder={"Status"}
          onChange={setStatusFilter}
          value={statusFilter}
          allowClear
          style={{ width: 120 }}
        >
          <Option value="Sended">Sended</Option>
          <Option value="Pending">Pending</Option>
          <Option value="Error">Error</Option>
        </Select>
        <Select
          placeholder={"Channel"}
          onChange={setChannelFilter}
          value={channelFilter}
          allowClear
          style={{ width: 120 }}
        >
          <Option value="Email">Email</Option>
          <Option value="SMS">SMS</Option>
          <Option value="WhatsApp">WhatsApp</Option>
        </Select>
        <RangePicker onChange={setDateRange} value={dateRange} />
        <Button
          icon={<ReloadOutlined />}
          onClick={() => {
            setSearch("");
            setStatusFilter(null);
            setChannelFilter(null);
            setDateRange([]);
            setFiltered(messages);
          }}
        >
          Clear filters
        </Button>
        <Button icon={<FileExcelOutlined />} type="primary" disabled>
          Export
        </Button>
      </Space>
      <Table
        loading={data.length === 0 ? true : false}
        rowKey="id"
        columns={columns}
        dataSource={filtered}
        pagination={{ pageSize: 5 }}
        bordered
      />

      {showPrevieMessageModal && (
        <PreviewMessageModal
          data={previewMessageContent}
          visible={showPrevieMessageModal}
          onClose={() => setShowPrevieMessageModal(false)}
        />
      )}

      {showPopUpModal && (
        <PopUpModal
          alertModalType={alertModalType}
          isModalVisible={showPopUpModal}
          modalMessage={"Please Wait"}
          modalInfoText={modalInfoText}
          cb={setShowPopUpModal}
        />
      )}
    </Modal>
  );
};

export default MessageHistoryModal;

import React, { useEffect, useState, useRef } from "react";
import { message, Modal, Table, Tag, Typography } from "antd";
import useSubmitData from "../../hooks/useSubmitData";
import dayjs from "dayjs";

const { Text } = Typography;

const ContactMessagesModal = ({ visible, contactId, onClose }) => {
  const [messages, setMessage] = useState([]);
  const [loading, setLoading] = useState(true);
  const hasRun = useRef(false);
  const API_URL =
    import.meta.env.VITE_API_URL +
    import.meta.env.VITE_API_URL_ROUTER +
    `messages/by-contact/${contactId}`;

  //   const messages = fetchData(visible ? API_URL : null);

  const { submitData } = useSubmitData();
  const loadMessages = () => {
    if (!hasRun || hasRun.current) return;
    hasRun.current = true;
    submitData(API_URL, "", "GET")
      .then((resp) => {
        if (resp?.success === true) {
          setMessage(resp?.messages?.result);
        }
      })
      .catch((error) => {
        message.error("Error: " + error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const columns = [
    {
      title: "Date",
      dataIndex: "created_at",
      render: (v) => dayjs(v).format("DD/MM/YYYY HH:mm"),
    },
    {
      title: "Channel",
      dataIndex: "channel",
      render: (c) => <Tag>{c}</Tag>,
    },
    {
      title: "Campaign",
      dataIndex: "campaign_name",
      render: (v) =>
        v ? <Text>{v}</Text> : <Tag color="blue">Direct message</Tag>,
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (status) => {
        const map = {
          sent: { color: "green", label: "Sent" },
          failed: { color: "red", label: "Failed" },
          queued: { color: "gold", label: "Queued" },
        };
        const cfg = map[status] || { color: "default", label: status };
        return <Tag color={cfg.color}>{cfg.label}</Tag>;
      },
    },
    {
      title: "Error",
      dataIndex: "error_message",
      render: (v) =>
        v ? <Text type="danger">{v}</Text> : <Text type="secondary">—</Text>,
    },
  ];

  useEffect(() => {
    loadMessages();
  }, [contactId]);

  return (
    <Modal
      open={visible}
      onCancel={onClose}
      afterOpenChange={loadMessages}
      footer={null}
      width={900}
      title="Message History & Delivery Logs"
      destroyOnClose
    >
      <Table
        rowKey="id"
        dataSource={messages || []}
        columns={columns}
        pagination={{ pageSize: 10 }}
      />
    </Modal>
  );
};

export default ContactMessagesModal;

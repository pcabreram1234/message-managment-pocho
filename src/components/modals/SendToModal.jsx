import React, { useState, useEffect } from "react";
import { Modal, Button, Input, Divider, List, Select } from "antd";
import { MailFilled } from "@ant-design/icons";

const { TextArea } = Input;

const SendToModal = ({
  setShowSendToModal,
  messages = [],
  contacts,
  selectedContacts,
  messageId,
  handleSubmit,
  isLoading,
}) => {
  const [showModal, setShowModal] = useState(true);
  const [selectedContactIds, setSelectedContactIds] = useState([]);

  const onCancel = () => {
    setShowModal(false);
    setShowSendToModal(false);
  };

  const API_URL =
    import.meta.env.VITE_API_URL +
    import.meta.env.VITE_API_URL_ROUTER +
    "sendMessages/" +
    messageId;

  useEffect(() => {
    if (contacts?.length) {
      setSelectedContactIds(selectedContacts);
    }
  }, [contacts]);

  return (
    <Modal
      open={showModal}
      title={`Send Message Immediately`}
      onCancel={onCancel}
      footer={null}
      centered
    >
      <List
        size="small"
        bordered
        dataSource={messages}
        style={{ maxHeight: 400, overflowY: "auto" }}
      >
        <List.Item>
          <div style={{ width: "100%" }}>
            <TextArea
              value={messages}
              readOnly
              autoSize={{ minRows: 10, maxRows: 16 }}
              size="large"
              style={{
                marginTop: 8,
                resize: "none",
                fontSize: 14,
                lineHeight: "1.6",
              }}
            />
          </div>
        </List.Item>
      </List>

      <Divider />

      {/* Asociación de contactos */}
      <Select
        mode="multiple"
        style={{ width: "100%" }}
        allowClear
        value={selectedContactIds} // Usar value en lugar de defaultValue
        onChange={setSelectedContactIds}
        filterOption={(input, option) =>
          option.label.toLowerCase().includes(input.toLowerCase())
        }
        options={contacts?.map((c) => ({ value: c.id, label: c.email }))}
      />

      <Divider />

      {/* Acción */}
      <Button
        type="primary"
        block
        loading={isLoading}
        icon={<MailFilled />}
        disabled={selectedContactIds.length === 0 || messages.length === 0}
        onClick={() => {
          handleSubmit(API_URL, selectedContactIds);
        }}
      >
        Send
      </Button>
    </Modal>
  );
};

export default SendToModal;

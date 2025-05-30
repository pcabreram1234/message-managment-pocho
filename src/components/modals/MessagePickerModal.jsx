import React, { useEffect, useState, useRef } from "react";
import {
  Modal,
  Table,
  Typography,
  message as antdMessage,
  Input,
  Divider,
  Checkbox,
} from "antd";
import { fetchData } from "../../utility/fetchData";
import SearchInput from "../SearchInput";
import ScheduleMessageModal from "./ScheduledMessageModal";
import UniqueOrSaveMessageModal from "./UniqueOrSaveMessageModal";

const { Paragraph } = Typography;
const { TextArea } = Input;

const MessagePickerModal = ({
  showScheduledMessageModal,
  setShowScheduledMessageModal,
}) => {
  const API_URL =
    import.meta.env.VITE_API_URL +
    import.meta.env.VITE_API_URL_ROUTER +
    "messages";

  const messages = fetchData(API_URL);
  const searchInputRef = useRef();
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [customMessage, setCustomMessage] = useState("");
  const [inputSearchValue, setInputSearchValue] = useState("");
  const [loading, setLoading] = useState(true);
  const [searchedMessage, setSearchedMessage] = useState(null);
  const [showConfigMessageModal, setShowConfigMessageModal] = useState(false);
  const [showUniqueOrSaveMessageModal, setShowUniqueOrSaveMessageModal] =
    useState(false);
  const [saveAsTemplate, setSaveAsTemplate] = useState(false);
  const [pagination, setPagination] = useState({
    pageSize: 5,
    defaultCurrent: 1,
    current: 1,
  });

  const columns = [
    {
      title: "ID",
      key: "id",
      dataIndex: "id",
      width: 80,
    },
    {
      title: "Content",
      key: "message",
      dataIndex: "message",
      render: (text) => <TextArea value={text} rows={2} variant="filled" />,
    },
  ];

  const handleConfirm = () => {
    if (customMessage.trim()) {
      setShowUniqueOrSaveMessageModal(true);
    } else if (selectedRowKeys.length > 0) {
      setShowConfigMessageModal(true);
    } else {
      antdMessage.warning(
        "Select at least one message or write a personalized one"
      );
    }
  };

  const handleClose = () => {
    setSelectedRowKeys([]);
    setCustomMessage("");
    setSaveAsTemplate(false);
    setShowScheduledMessageModal(false);
    setInputSearchValue("");
    setSearchedMessage(messages?.result);
  };

  const handleSearch = (value) => {
    setInputSearchValue(value);
    if (value === "") {
      setSearchedMessage(messages?.result);
    } else {
      const lowercased = value.toLowerCase();
      const filtered = searchedMessage.filter((item) =>
        item.message.toLowerCase().includes(lowercased)
      );
      setSearchedMessage(filtered);
    }
  };

  useEffect(() => {
    if (messages?.result) {
      setLoading(false);
      setSearchedMessage(messages?.result);
    }
  }, [messages]);

  return (
    <Modal
      title="Select Predefined Messages"
      open={showScheduledMessageModal}
      onCancel={handleClose}
      onClose={handleClose}
      onOk={handleConfirm}
      afterOpenChange={() => {
        if (showScheduledMessageModal && searchInputRef.current) {
          searchInputRef.current.focus();
          setPagination((prev) => ({ ...prev, current: 1 }));
        }
      }}
      okText="Schedule later"
      cancelText="Cancel"
      width={700}
    >
      <SearchInput
        onSearchChange={handleSearch}
        valueInput={inputSearchValue}
        ref={searchInputRef}
      />
      <Table
        rowKey="id"
        dataSource={searchedMessage}
        columns={columns}
        rowSelection={{
          selectedRowKeys,
          onChange: (newKeys) => setSelectedRowKeys(newKeys),
          getCheckboxProps: () => ({
            disabled: !!customMessage.trim(),
          }),
        }}
        onChange={({ current, pageSize }) => {
          setPagination({ current: current, pageSize });
        }}
        loading={loading}
        pagination={pagination}
        locale={{ emptyText: "You don't have any predefined messages yet." }}
      />

      <Divider />

      <Paragraph strong>
        Don't see the message you need? Write a personalized one:
      </Paragraph>
      <TextArea
        rows={4}
        placeholder="Write your personalized message here..."
        value={customMessage}
        onChange={(e) => {
          setCustomMessage(e.target.value);
          if (e.target.value) setSelectedRowKeys([]); // deselecciona si empieza a escribir
        }}
      />
      <Checkbox
        checked={saveAsTemplate}
        onChange={(e) => setSaveAsTemplate(e.target.checked)}
        disabled={!customMessage.trim()}
      >
        Save this message as a template
      </Checkbox>

      {showConfigMessageModal && (
        <ScheduleMessageModal
          cbShowModal={setShowConfigMessageModal}
          showModal={showConfigMessageModal}
          id={selectedRowKeys}
          cbShowParentModal={handleClose}
        />
      )}

      {showUniqueOrSaveMessageModal && (
        <UniqueOrSaveMessageModal
          cbShowModal={setShowUniqueOrSaveMessageModal}
          showModal={showUniqueOrSaveMessageModal}
          message={customMessage}
          saveMessage={saveAsTemplate}
          cbShowParentModal={handleClose}
        />
      )}
    </Modal>
  );
};

export default MessagePickerModal;

import React, { useEffect, useState } from "react";
import {
  List,
  Button,
  Select,
  Space,
  Typography,
  Popconfirm,
  Divider,
} from "antd";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import { openNotification } from "../components/Notification";
import useSubmitData from "../hooks/useSubmitData";

const { Text } = Typography;
const { Option } = Select;

const CampaignMessagesTab = ({ campaignId }) => {
  const { submitData } = useSubmitData();

  const [campaignMessages, setCampaignMessages] = useState([]);
  const [availableMessages, setAvailableMessages] = useState([]);
  const [selectedMessage, setSelectedMessage] = useState(null);

  const API_CAMPAIGN_MESSAGES =
    import.meta.env.VITE_API_URL +
    import.meta.env.VITE_API_URL_ROUTER +
    `campaigns/getCampaignMessages/${campaignId}`;

  const API_ALL_MESSAGES =
    import.meta.env.VITE_API_URL +
    import.meta.env.VITE_API_URL_ROUTER +
    `messages`;

  const API_ADD_MESSAGE =
    import.meta.env.VITE_API_URL +
    import.meta.env.VITE_API_URL_ROUTER +
    `campaigns/addMessagesToCampaign/${campaignId}`;

  const API_DELETE_MESSAGE =
    import.meta.env.VITE_API_URL +
    import.meta.env.VITE_API_URL_ROUTER +
    `campaigns/messages`;

  const loadData = async () => {
    const [cm, all] = await Promise.all([
      submitData(API_CAMPAIGN_MESSAGES, "", "GET"),
      submitData(API_ALL_MESSAGES, "", "GET"),
    ]);

    setCampaignMessages(cm?.result || []);
    setAvailableMessages(all?.result || []);
  };

  useEffect(() => {
    if (campaignId) loadData();
  }, [campaignId]);

  const handleAddMessage = async () => {
    if (!selectedMessage) return;
    submitData(API_ADD_MESSAGE, {
      messageIds: selectedMessage,
    }).then((resp) => {
      if (resp?.result) {
        openNotification("Success", "Message added to campaign", "success");
        setSelectedMessage(null);
        loadData();
      } else {
        openNotification(
          "Error",
          "Error trying to add messages to campaign",
          "error",
        );
      }
    });
  };

  const handleDeleteMessage = async (id) => {
    await submitData(API_DELETE_MESSAGE, { id }, "DELETE");
    openNotification("Removed", "Message removed from campaign", "success");
    loadData();
  };

  return (
    <>
      <Text strong>Campaign Messages</Text>

      <List
        bordered
        dataSource={campaignMessages}
        style={{ marginTop: 12, color: "black" }}
        renderItem={(item) => (
          <List.Item
            actions={[
              <Popconfirm
                title="Remove this message?"
                onConfirm={() => handleDeleteMessage(item.id)}
              >
                <Button type="link" danger icon={<DeleteOutlined />} />
              </Popconfirm>,
            ]}
          >
            <Text>{item.content}</Text>
          </List.Item>
        )}
      />

      <Divider />

      <Space.Compact style={{ width: "100%" }}>
        <Select
          style={{ flex: 1, width: "100%" }}
          placeholder="Add existing message"
          value={selectedMessage}
          onChange={setSelectedMessage}
          optionLabelProp="label"
        >
          {availableMessages.map((m) => (
            <Option key={m.id} value={m.id}>
              <div
                style={{
                  maxWidth: 400,
                  whiteSpace: "normal",
                  wordBreak: "break-word",
                }}
              >
                {m.message}
              </div>
            </Option>
          ))}
        </Select>

        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={handleAddMessage}
        >
          Add
        </Button>
      </Space.Compact>

      <Divider />

      <Button type="dashed" block icon={<PlusOutlined />}>
        Create new message
      </Button>
    </>
  );
};

export default CampaignMessagesTab;

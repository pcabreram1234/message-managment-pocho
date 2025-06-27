import React, { useState } from "react";
import {
  Modal,
  Typography,
  Divider,
  Checkbox,
  Descriptions,
  Alert,
  message,
} from "antd";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);
import EmailProgressModal from "./EmailProgressModal";
import { useActionEffect } from "../../hooks/useActionEffect";
import { useActionContext } from "../../context/ActionContext";

const { Title, Text, Paragraph } = Typography;

const LaunchCampaignModal = ({
  visible,
  onCancel,
  campaign,
  messagesToSend,
}) => {
  const [confirmed, setConfirmed] = useState(false);
  const [showEmailProgressModal, setShowEmailProgressModal] = useState(false);
  const { dispatchAction } = useActionContext();

  const handleConfirmChange = (e) => {
    setConfirmed(e.target.checked);
  };

  const handleLaunch = () => {
    if (confirmed) {
      setShowEmailProgressModal(true);
    }
  };

  const handleCampaingLaunchedSuccess = () => {
    message.success("Campaign Launched!!");
    setTimeout(() => {
      onCancel();
      dispatchAction("", "", "");
    }, 500);
  };

  useActionEffect(
    { type: "campaing_launched", target: "LaunchCampaignModal" },
    handleCampaingLaunchedSuccess
  );

  return (
    <Modal
      title="Confirm campaign sending"
      open={visible}
      onCancel={onCancel}
      onOk={handleLaunch}
      okText="Launch Campaign"
      okButtonProps={{ disabled: !confirmed }}
      cancelText="Cancel"
    >
      <Title style={{ fontSize: "15px" }}>{campaign.name}</Title>
      <Descriptions size="small" column={1}>
        <Descriptions.Item label="Description">
          {campaign.description}
        </Descriptions.Item>

        <Descriptions.Item label="Recipients">
          {campaign.contacts} contacts
        </Descriptions.Item>
      </Descriptions>
      <Divider />
      <Text strong>Message(s) preview:</Text>
      {messagesToSend?.length > 0 &&
        messagesToSend?.length <= 3 &&
        messagesToSend?.map((message) => (
          <Paragraph
            ellipsis={{
              expandable: "collapsible",
              rows: 2,
              tooltip: message?.message_content,
            }}
            style={{
              background: "#f5f5f5",
              padding: "10px",
              borderRadius: "4px",
            }}
          >
            {message?.message_content}
          </Paragraph>
        ))}

      {messagesToSend?.length > 3 && (
        <Paragraph
          style={{
            background: "#00d0ff29",
            padding: "10px",
            borderRadius: "4px",
            fontWeight: "bold",
          }}
        >
          This campaign has more than 3 associated messages
        </Paragraph>
      )}

      <Alert
        type="warning"
        message="This action will send the message to all selected contacts. It cannot be undone.."
        showIcon
        style={{ margin: "16px 0" }}
      />
      <Checkbox onChange={handleConfirmChange}>
        I confirm that I wish to launch this messaging campaign
      </Checkbox>

      {showEmailProgressModal && (
        <EmailProgressModal
          visible={showEmailProgressModal}
          messages={messagesToSend}
          onClose={() => setShowEmailProgressModal(false)}
        />
      )}
    </Modal>
  );
};

export default LaunchCampaignModal;

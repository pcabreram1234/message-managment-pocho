import React, { useState } from "react";
import { Modal, Typography, Checkbox, Descriptions, Alert } from "antd";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);

const { Title } = Typography;

const LaunchCampaignModal = ({
  visible,
  onCancel,
  campaign,
  launchModalCb,
}) => {
  const [confirmed, setConfirmed] = useState(false);

  const handleConfirmChange = (e) => {
    setConfirmed(e.target.checked);
  };

  const handleLaunch = () => {
    if (!confirmed) return;
    launchModalCb(true);
    onCancel();
  };

  return (
    <Modal
      title="Confirm campaign sending"
      open={visible}
      onCancel={onCancel}
      onOk={handleLaunch}
      destroyOnClose
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

      <Alert
        type="warning"
        message="This action will send the message to all selected contacts. It cannot be undone.."
        showIcon
        style={{ margin: "16px 0" }}
      />
      <Checkbox onChange={handleConfirmChange}>
        I confirm that I wish to launch this messaging campaign
      </Checkbox>
    </Modal>
  );
};

export default LaunchCampaignModal;

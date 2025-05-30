import React, { useCallback, useEffect, useState } from "react";
import {
  Modal,
  Select,
  Typography,
  Divider,
  Checkbox,
  Descriptions,
  Alert,
  DatePicker,
} from "antd";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);
import useSubmitData from "../../hooks/useSubmitData";

const { Title, Text, Paragraph } = Typography;
const { RangePicker } = DatePicker;

const LaunchCampaignModal = ({ visible, onCancel, campaign }) => {
  const { submitData } = useSubmitData();
  const [confirmed, setConfirmed] = useState(false);
  const [campaignMessages, setCampaignMessages] = useState([]);
  const { Option } = Select;
  const handleConfirmChange = (e) => {
    setConfirmed(e.target.checked);
  };

  const API_URL =
    import.meta.env.VITE_API_URL +
    import.meta.env.VITE_API_URL_ROUTER +
    "campaigns/getCampaignMessages";

  const API_URL_LAUNCH_CAMPAIGN =
    import.meta.env.VITE_API_URL +
    import.meta.env.VITE_API_URL_ROUTER +
    "campaigns/launchCampaing";

  useEffect(() => {
    getCampaignMessages(campaign?.id);
  }, [API_URL]);

  const getCampaignMessages = (campaign_id) => {
    submitData(`${API_URL}/${campaign_id}`, "", "GET")
      .then((resp) => {
        setCampaignMessages(resp);
      })
      .then(() => console.log(campaignMessages));
  };

  const handleLaunch = () => {
    if (confirmed) {
      submitData(
        `${API_URL_LAUNCH_CAMPAIGN}/${campaign?.id}`,
        "",
        "PATCH"
      ).then((res) => {
        console.log(res);
      });
    }
  };

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
        <Descriptions.Item label="Shipping date">
          <RangePicker
            format="YYYY-MM-DD"
            defaultValue={[
              dayjs(campaign?.start_date),
              dayjs(campaign?.end_date),
            ]}
          />
        </Descriptions.Item>
        <Descriptions.Item label="Channel">
          <Select
            placeholder={"Channel"}
            allowClear
            style={{ width: "100%" }}
            defaultValue={"Email"}
          >
            <Option value="Email">Email</Option>
            <Option value="SMS">SMS</Option>
            <Option value="WhatsApp">WhatsApp</Option>
          </Select>
        </Descriptions.Item>

        <Descriptions.Item label="Recipients">
          {campaign.contacts} contacts
        </Descriptions.Item>
      </Descriptions>
      <Divider />
      <Text strong>Message preview:</Text>
      {campaignMessages?.length > 0 &&
        campaignMessages?.map((message) => (
          <Paragraph
            ellipsis={{
              expandable: "collapsible",
              rows: 2,
              tooltip: message?.content,
            }}
            style={{
              background: "#f5f5f5",
              padding: "10px",
              borderRadius: "4px",
            }}
          >
            {message?.content}
          </Paragraph>
        ))}

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

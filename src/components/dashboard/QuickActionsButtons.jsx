import React from 'react';
import { Card, Button, Space, Typography } from 'antd';
import {
  PlusOutlined,
  ClockCircleOutlined,
  HistoryOutlined,
  UploadOutlined,
} from '@ant-design/icons';

const { Title } = Typography;

const QuickActionsButtons = ({ onCreateCampaign, onScheduleMessage, onViewHistory, onUploadContacts }) => {
  return (
    <Card>
      <Space direction="horizontal" size="middle" style={{ width: '100%' }}>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          block
          onClick={onCreateCampaign}
        >
          Create a new campaign
        </Button>
        <Button
          type="default"
          icon={<ClockCircleOutlined />}
          block
          onClick={onScheduleMessage}
        >
          Schedule message
        </Button>
        <Button
          type="default"
          icon={<HistoryOutlined />}
          block
          onClick={onViewHistory}
        >
          View shipping history
        </Button>
        <Button
          type="default"
          icon={<UploadOutlined />}
          block
          onClick={onUploadContacts}
        >
          Upload contacts
        </Button>
      </Space>
    </Card>
  );
};

export default QuickActionsButtons;

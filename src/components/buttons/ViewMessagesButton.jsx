// components/buttons/ViewMessagesButton.jsx
import React from "react";
import { Button, Tooltip, Badge } from "antd";
import { MailOutlined } from "@ant-design/icons";

const ViewMessagesButton = ({ contactId, onOpen, totalMessages = 0 }) => {
  return (
    <Tooltip title="View message history & delivery logs">
      <Badge count={totalMessages} size="small">
        <Button
          size="small"
          icon={<MailOutlined />}
          onClick={() => onOpen(contactId)}
        />
      </Badge>
    </Tooltip>
  );
};

export default ViewMessagesButton;

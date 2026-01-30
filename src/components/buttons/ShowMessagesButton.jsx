import React from "react";
import { Button, Tooltip } from "antd";
import { MailOutlined } from "@ant-design/icons";

const ShowMessagesButton = ({ cb, setId, id, setName, name }) => {
  return (
    <Tooltip title="View message history">
      <Button
        size="small"
        icon={<MailOutlined />}
        onClick={() => {
          cb(true);
          setId(id);
          setName(name);
        }}
      />
    </Tooltip>
  );
};

export default ShowMessagesButton;

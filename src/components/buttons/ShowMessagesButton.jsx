import React from "react";
import { Button } from "antd";
import { MessageFilled } from "@ant-design/icons";

const ShowMessagesButton = ({ cb, setId, id, setName, name }) => {
  return (
    <Button
      onClick={() => {
        cb(true);
        setId(id);
        setName(name);
      }}
    >
      <MessageFilled />
    </Button>
  );
};

export default ShowMessagesButton;

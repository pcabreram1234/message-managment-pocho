import React from "react";
import { Button, Typography } from "antd";

const AsociateTo = ({ setShowAsociateModal }) => {
  const { Text } = Typography;
  return (
    <Button
      style={{
        backgroundColor: "lightsalmon",
        borderRadius: "10px",
        width: "100%",
      }}
      onClick={() => {
        setShowAsociateModal(true);
      }}
    >
      <Text strong>Asociate To</Text>
    </Button>
  );
};

export default AsociateTo;

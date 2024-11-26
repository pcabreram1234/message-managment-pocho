import React, { useEffect, memo } from "react";
import { Button, Typography, Row, Col } from "antd";
import { LogoutOutlined } from "@ant-design/icons";
import useLogOffData from "../../hooks/useLogOffData";

const UserInfo = memo(({ user }) => {
  const { logOffData } = useLogOffData();

  const sessionLogOut = () => {
    const API_url =
      import.meta.env.VITE_API_URL +
      import.meta.env.VITE_API_URL_ROUTER +
      "users/logoff";
    logOffData(API_url, null);
  };

  useEffect(() => {
    console.log(user);
  }, []);

  const { Text } = Typography;
  return (
    <Row
      gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
      align="middle"
      justify="space-between"
    >
      <Col>
        <Text strong style={{ color: "white" }}>
          User: {user?.email?.split("@")[0]}
        </Text>
      </Col>

      <Col>
        <Text strong style={{ color: "white" }}>
          Type: {user?.type_user}
        </Text>
      </Col>

      <Col>
        <Button danger type="primary" onClick={sessionLogOut}>
          <Text style={{ color: "white" }}>Sing Out</Text> <LogoutOutlined />
        </Button>
      </Col>
    </Row>
  );
});

export default UserInfo;

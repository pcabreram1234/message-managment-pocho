import React from "react";
import { Button, Typography, Row, Col } from "antd";
import { LogoutOutlined } from "@ant-design/icons";
import { useHistory } from "react-router";
import { userInfo } from "../../context/userHookState";
import { useHookstate } from "@hookstate/core";

const UserInfo = () => {
  const location = useHistory();
  const state = useHookstate(userInfo);

  const sessionLogOut = () => {
    window.localStorage.removeItem("token");
    userInfo.set(false);
    location.push("/login");
  };

  const { Text } = Typography;
  return (
    <Row
      gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
      align="middle"
      justify="space-between"
    >
      <Col>
        <Text strong style={{ color: "white" }}>
          User: {state.get().user_name}
        </Text>
      </Col>

      <Col>
        <Text strong style={{ color: "white" }}>
          Type: {state.get().type_user}
        </Text>
      </Col>

      <Col>
        <Button danger type="primary" onClick={sessionLogOut}>
          <Text style={{ color: "white" }}>Sing Out</Text> <LogoutOutlined />
        </Button>
      </Col>
    </Row>
  );
};

export default UserInfo;

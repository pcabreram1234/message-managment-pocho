import React, { useContext } from "react";
import { Button, Typography, Row, Col } from "antd";
import { LogoutOutlined } from "@ant-design/icons";
import { useHistory } from "react-router";
import { AuthContext } from "../../context/UserContext";

const UserInfo = ({ user }) => {
  const location = useHistory();
  const state = useContext(AuthContext);
  const { setUser } = state;

  const sessionLogOut = () => {
    setUser(null);
    window.localStorage.removeItem("token");
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
          User: {user?.email}
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
};

export default UserInfo;

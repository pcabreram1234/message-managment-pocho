import React, { useState, useEffect, memo } from "react";
import { Button, Typography, Row, Col, Modal, Spin } from "antd";
import { LogoutOutlined } from "@ant-design/icons";
import useLogOffData from "../../hooks/useLogOffData";

const UserInfo = memo(({ user }) => {
  const { logOffData } = useLogOffData();
  const [loading, setLoading] = useState(false); // Estado para controlar el modal
  const { Text } = Typography;

  const sessionLogOut = async () => {
    try {
      setLoading(true); // Mostrar el modal al iniciar el cierre de sesión
      const API_url =
        import.meta.env.VITE_API_URL +
        import.meta.env.VITE_API_URL_ROUTER +
        "users/logoff";
      await logOffData(API_url, null);
    } finally {
      setTimeout(() => {
        setLoading(false); // Ocultar el modal después del cierre de sesión
      }, 500);
    }
  };

  useEffect(() => {
    console.log(user);
  }, [user]);

  return (
    <>
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
            <Text style={{ color: "white" }}>Sign Out</Text> <LogoutOutlined />
          </Button>
        </Col>
      </Row>

      {/* Modal con Spinner para Logoff */}
      <Modal
        visible={loading}
        footer={null}
        closable={false}
        centered
        maskClosable={false}
      >
        <div style={{ textAlign: "center" }}>
          <Spin size="large" />
          <p>Cerrando sesión, por favor espere...</p>
        </div>
      </Modal>
    </>
  );
});

export default UserInfo;

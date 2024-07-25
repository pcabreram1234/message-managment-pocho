import React from "react";
import { UserOutlined } from "@ant-design/icons";
import { Layout, Typography, Form, Input, Button } from "antd";
const SignIn = () => {
  const { Header, Content, Footer } = Layout;
  const { Title } = Typography;
  return (
    <Layout>
      <Header>
        <Title style={{ textAlign: "center", color: "white" }}>
          Pocho's Message Managment System
        </Title>
      </Header>
      <Content>
        <Form
          labelAlign="right"
          layout="vertical"
          size="large"
          style={{ textAlign: "center" }}
        >
          <Form.Item
            label="Username"
            rules={{ required: true }}
            style={{ alignItems: "center" }}
          >
            <Input type={"text"} />
          </Form.Item>

          <Form.Item
            label="Password"
            rules={{ required: true }}
            style={{ alignItems: "center" }}
          >
            <Input type={"password"} />
          </Form.Item>
        </Form>

        <Form.Item style={{ textAlign: "center" }}>
          <Button>
            <UserOutlined />
          </Button>
        </Form.Item>
      </Content>
      <Footer></Footer>
    </Layout>
  );
};

export default SignIn;

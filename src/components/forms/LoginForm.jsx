import React, { useState } from "react";
import { Form, Input, Button, Layout, Image, Modal, Spin } from "antd";
import { LoginOutlined } from "@ant-design/icons";
import useLoginData from "../../hooks/useLogInData";
import LogoIcon from "../../assets/logo.svg";

const LogInForm = () => {
  const { submitData } = useLoginData();
  const [form] = Form.useForm();
  const { Content } = Layout;

  // Estado para controlar el spinner y el modal
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    form.validateFields().then(() => {
      handleSubmit();
    });
  };

  const handleSubmit = async () => {
    try {
      setLoading(true); // Mostrar el modal con el spinner
      await submitData(form.getFieldsValue());
    } finally {
      setTimeout(() => {
        setLoading(false); // Ocultar el modal después del envío
      }, 500);
    }
  };

  return (
    <Layout style={{ height: "100vh" }}>
      <Content
        style={{
          display: "grid",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          alignContent: "center",
        }}
      >
        <Image
          src={LogoIcon}
          preview={false}
          style={{ width: "100%", maxWidth: "200px" }}
        />

        <Form
          layout="horizontal"
          size="large"
          autoComplete="off"
          form={form}
          style={{ margin: "50px 0" }}
          onSubmitCapture={validateForm}
        >
          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                message: "Please enter a valid email address",
              },
              { type: "email" },
            ]}
          >
            <Input
              placeholder="example@email.com"
              autoFocus
              autoComplete="true"
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password",
                min: 4,
              },
            ]}
          >
            <Input.Password placeholder="Your password" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" icon={<LoginOutlined />} htmlType="submit">
              Log in
            </Button>
          </Form.Item>
        </Form>

        {/* Modal con Spinner */}
        <Modal
          visible={loading}
          footer={null}
          closable={false}
          centered
          maskClosable={false}
        >
          <div style={{ textAlign: "center" }}>
            <Spin size="large" />
            <p>Logging in, please wait...</p>
          </div>
        </Modal>
      </Content>
    </Layout>
  );
};

export default LogInForm;

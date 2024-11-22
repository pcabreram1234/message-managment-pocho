import React from "react";
import { Form, Input, Button, Layout, Image } from "antd";
import { LoginOutlined } from "@ant-design/icons";
import useLoginData from "../../hooks/useLogInData";
import LogoIcon from "../../assets/logo.svg";
import FooterPage from "../layout/Footer";

const LogInForm = () => {
  const { submitData } = useLoginData();
  const [form] = Form.useForm();
  const { Content } = Layout;

  const validateForm = () => {
    form.validateFields().then(() => {
      handleSubmit();
    });
  };

  const handleSubmit = () => {
    submitData(form.getFieldsValue());
  };

  return (
    <Layout style={{ height: "100vh" }}>
      <Content
        style={{
          // padding: "10px 0",
          display: "grid",
          alignItems: "center",
          justifyContent: "center",
          alignContent: "center",
          textAlign: "center",
        }}
      >
        <Image
          src={LogoIcon}
          preview={false}
          style={{ width: "100%", maxWidth: "200px", textAlign: "center" }}
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
            name={"email"}
            rules={[
              {
                required: "true",
                message: "Please enter a valid email address",
              },
              { type: "email" },
            ]}
            style={{ alignItems: "center" }}
          >
            <Input
              placeholder="example@email.com"
              autoFocus
              autoComplete="true"
            />
          </Form.Item>

          <Form.Item
            name={"password"}
            rules={[
              {
                required: true,
                message: "Please input your password",
                min: 4,
              },
            ]}
            style={{ alignItems: "center" }}
          >
            <Input.Password placeholder="Your password" />
          </Form.Item>

          <Form.Item style={{ alignItems: "center", textAlign: "center" }}>
            <Button
              type="primary"
              icon={<LoginOutlined />}
              // onClick={validateForm}
              htmlType="submit"
            >
              Log in
            </Button>
          </Form.Item>
        </Form>
      </Content>
      <FooterPage />
    </Layout>
  );
};
export default LogInForm;

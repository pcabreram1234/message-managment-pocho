import React, { useContext, useEffect } from "react";
import { Form, Input, Button, Layout, Image, Row, Col } from "antd";
import { LoginOutlined } from "@ant-design/icons";
import { useHistory } from "react-router";
import { AuthContext } from "../../context/UserContext";
import useSubmitData from "../../hooks/useSubmitData";
import LogoIcon from "../../assets/logo.svg";
import FooterPage from "../layout/Footer";

const LogInForm = () => {
  const API_url =
    import.meta.env.VITE_API_URL +
    import.meta.env.VITE_API_URL_ROUTER +
    "users/login";
  const state = useContext(AuthContext);
  const { user } = state;
  const { submitData } = useSubmitData();

  const [form] = Form.useForm();
  const { Content } = Layout;

  const location = useHistory();

  const validateForm = () => {
    form.validateFields().then((field) => {
      if (!field.errorFields) {
        handleSubmit();
      } else {
        let err = [];
        for (let i = 0; i < field.errorFields.length; i++) {
          err.push(field.errorFields[i].errors[i]);
        }
        alert(err);
      }
    });
  };

  const handleSubmit = () => {
    submitData(API_url, form.getFieldsValue());
  };

  useEffect(() => {
    if (user) {
      location.goBack(-1);
    }
  }, []);

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
              onClick={validateForm}
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

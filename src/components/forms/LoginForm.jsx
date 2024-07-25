import React, { useContext } from "react";
import { Form, Input, Button, Layout } from "antd";
import { submitData } from "../../utility/submitData";
import { LoginOutlined } from "@ant-design/icons";
import { useHistory } from "react-router";
import { AuthContext } from "../../context/UserContext";
import { handleUserInfo } from "../../utility/userInfo";

const LogInForm = () => {
  const API_url = "http://localhost:3120/api/v1/users/login";
  const state = useContext(AuthContext);
  const { setUser } = state;

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
    submitData(API_url, form.getFieldsValue())
      .then((resp) => {
        if (resp.token) {
          const userLogged = handleUserInfo();
          console.log(userLogged);
          setUser(userLogged);
          location.push("/");
        }
      })
      .catch((err) => {
        alert(err);
      });
  };

  return (
    <Layout style={{ height: "100vh" }}>
      <Content style={{ padding: "10px 0", display: "grid" }}>
        <Form
          layout="horizontal"
          size="large"
          autoComplete="off"
          form={form}
          style={{ width: "40%", margin: "auto" }}
        >
          <Form.Item
            name={"user_name"}
            rules={[
              { required: "true", message: "Please input your username" },
              { type: "string" },
            ]}
            style={{ alignItems: "center" }}
          >
            <Input placeholder="Your username" autoFocus />
          </Form.Item>

          <Form.Item
            name={"password"}
            rules={[
              { required: true, message: "Please input your password", min: 4 },
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
    </Layout>
  );
};
export default LogInForm;

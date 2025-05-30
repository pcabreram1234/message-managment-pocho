import React from "react";
import { Form, Input, Button, Divider } from "antd";
import { AccountActions } from "./AccountActions";
export const SecurityPanel = () => {
  return (
    <Form layout="vertical">
      <Form.Item label="Contraseña actual">
        <Input.Password />
      </Form.Item>
      <Form.Item label="Nueva contraseña">
        <Input.Password />
      </Form.Item>
      <Form.Item label="Confirmar nueva contraseña">
        <Input.Password />
      </Form.Item>
      <Button type="primary">Actualizar contraseña</Button>
      <Divider />
      <AccountActions />
    </Form>
  );
};

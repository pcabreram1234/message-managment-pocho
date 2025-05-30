import React from "react";
import { Form, Button, Switch } from "antd";

export const NotificationSettings = () => {
  return (
    <Form layout="vertical">
      <Form.Item label="Recibir notificaciones por email">
        <Switch defaultChecked />
      </Form.Item>
      <Form.Item label="Recibir notificaciones en la app">
        <Switch />
      </Form.Item>
      <Button type="primary">Guardar configuración</Button>
    </Form>
  );
};

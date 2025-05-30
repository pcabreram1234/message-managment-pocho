import React from "react";
import { Form, Button } from "antd";
import { Switch, Select } from "antd";

export const GeneralPreferences = () => {
  return (
    <Form layout="vertical">
      <Form.Item label="Idioma preferido" name="language">
        <Select defaultValue="es">
          <Select.Option value="es">Español</Select.Option>
          <Select.Option value="en">English</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item label="Tema oscuro" name="darkMode">
        <Switch defaultChecked />
      </Form.Item>
      <Button type="primary">Guardar preferencias</Button>
    </Form>
  );
};

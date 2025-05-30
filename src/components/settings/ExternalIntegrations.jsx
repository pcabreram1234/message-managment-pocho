import React from "react";
import { Form, Input, Card, Switch } from "antd";

const ExternalIntegrations = () => (
  <Card title="Integraciones externas">
    <Form layout="vertical">
      <Form.Item label="Webhook URL" name="webhook">
        <Input placeholder="https://api.tuwebhook.com" />
      </Form.Item>
      <Form.Item label="API Key" name="apikey">
        <Input.Password placeholder="Clave secreta" />
      </Form.Item>
      <Form.Item label="Activar integración">
        <Switch defaultChecked />
      </Form.Item>
    </Form>
  </Card>
);

export default ExternalIntegrations;

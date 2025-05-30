import React from "react";
import { Switch, Form, Card } from "antd";

const CampaignsNotificationsSettings = () => (
  <Card title="Notificaciones y alertas">
    <Form layout="vertical">
      <Form.Item label="Notificar al completar campaña">
        <Switch defaultChecked />
      </Form.Item>
      <Form.Item label="Notificar si falla el envío">
        <Switch defaultChecked />
      </Form.Item>
    </Form>
  </Card>
);

export default CampaignsNotificationsSettings;

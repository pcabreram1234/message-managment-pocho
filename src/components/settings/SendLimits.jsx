import React from "react";
import { InputNumber, Form, Card } from "antd";

const SendLimits = () => (
  <Card title="Límites de envío">
    <Form layout="vertical">
      <Form.Item label="Máximo destinatarios por campaña">
        <InputNumber min={1} max={10000} />
      </Form.Item>
      <Form.Item label="Máximo campañas por día">
        <InputNumber min={1} max={100} />
      </Form.Item>
    </Form>
  </Card>
);

export default SendLimits;

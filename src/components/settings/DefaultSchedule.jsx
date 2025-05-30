import React from "react";
import { TimePicker, Form, Card } from "antd";

const DefaultSchedule = () => (
  <Card title="Horario de envío por defecto">
    <Form layout="vertical">
      <Form.Item label="Desde">
        <TimePicker format="HH:mm" />
      </Form.Item>
      <Form.Item label="Hasta">
        <TimePicker format="HH:mm" />
      </Form.Item>
    </Form>
  </Card>
);

export default DefaultSchedule;

import { List, Input, Button, Form, Card } from "antd";
import React, { useState } from "react";

const MessageTemplates = () => {
  const [templates, setTemplates] = useState(["Bienvenida", "Promoción", "Recordatorio"]);
  const [form] = Form.useForm();

  const addTemplate = (values) => {
    setTemplates([...templates, values.template]);
    form.resetFields();
  };

  return (
    <Card title="Plantillas de mensajes">
      <Form form={form} layout="inline" onFinish={addTemplate}>
        <Form.Item name="template" rules={[{ required: true }]}>
          <Input placeholder="Nombre de plantilla" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">Agregar</Button>
        </Form.Item>
      </Form>
      <List
        dataSource={templates}
        renderItem={(item) => <List.Item>{item}</List.Item>}
        style={{ marginTop: 16 }}
      />
    </Card>
  );
};

export default MessageTemplates;

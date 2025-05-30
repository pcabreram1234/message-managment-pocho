import React from "react";
import { Form, Input, Card } from "antd";

const SenderSettings = () => (
  <Card title="Configuración del remitente">
    <Form layout="vertical">
      <Form.Item label="Nombre del remitente" name="senderName">
        <Input placeholder="Ej. Soporte Edenorte" />
      </Form.Item>
      <Form.Item label="Correo electrónico del remitente" name="senderEmail">
        <Input placeholder="Ej. soporte@tudominio.com" />
      </Form.Item>
    </Form>
  </Card>
);

export default SenderSettings;

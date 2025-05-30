import React from "react";
import { Form, Select, Card } from "antd";

const { Option } = Select;

const DefaultCampaignBehavior = () => (
  <Card title="Comportamiento por defecto de campañas">
    <Form layout="vertical">
      <Form.Item label="Estado inicial">
        <Select defaultValue="draft">
          <Option value="draft">Borrador</Option>
          <Option value="active">Activa</Option>
        </Select>
      </Form.Item>
      <Form.Item label="¿Enviar notificación automática?">
        <Select defaultValue="yes">
          <Option value="yes">Sí</Option>
          <Option value="no">No</Option>
        </Select>
      </Form.Item>
    </Form>
  </Card>
);

export default DefaultCampaignBehavior;

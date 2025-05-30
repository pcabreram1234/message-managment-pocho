import React from "react";

import { Form, Input, Button, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
export const UserProfileForm = () => {
    return (
      <Form layout="vertical" >
        <Form.Item label="Avatar">
          <Upload showUploadList={false}>
            <Button icon={<UploadOutlined />}>Subir Avatar</Button>
          </Upload>
        </Form.Item>
        <Form.Item label="Nombre completo" name="fullName" rules={[{ required: true }]}> 
          <Input placeholder="Juan Pérez" />
        </Form.Item>
        <Form.Item label="Correo electrónico" name="email" rules={[{ required: true, type: "email" }]}> 
          <Input placeholder="juan@example.com" />
        </Form.Item>
        <Button type="primary">Guardar cambios</Button>
      </Form>
    );
  };
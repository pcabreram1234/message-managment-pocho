// src/components/CampaignSimulation.jsx
import React, { useState } from "react";
import {
  Card,
  Button,
  Modal,
  List,
  Typography,
  Divider,
  Tag,
  message,
} from "antd";
import { ExperimentOutlined, UserOutlined, ClockCircleOutlined } from "@ant-design/icons";
import dayjs from "dayjs";

const { Paragraph, Text } = Typography;

const CampaignSimulation = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Simulación de datos de una campaña
  const fakeCampaign = {
    name: "Campaña de Bienvenida",
    message: "Hola {{nombre}}, gracias por registrarte. ¡Bienvenido!",
    recipients: ["Juan Pérez", "Ana Gómez", "Carlos Rodríguez", "Laura Torres"],
    scheduledTime: dayjs().add(2, "hours"),
  };

  const openModal = () => {
    message.info("Simulando envío de campaña...");
    setIsModalOpen(true);
  };

  return (
    <Card
      title="Modo de Prueba / Simulación"
      extra={
        <Button
          icon={<ExperimentOutlined />}
          type="primary"
          onClick={openModal}
        >
          Simular campaña
        </Button>
      }
    >
      <Paragraph>
        Usa este modo para visualizar cómo se verá el mensaje, a quiénes será enviado y cuándo se ejecutará.
      </Paragraph>

      <Modal
        title="Simulación de Envío de Campaña"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={[
          <Button key="close" onClick={() => setIsModalOpen(false)}>
            Cerrar
          </Button>,
        ]}
      >
        <Divider orientation="left">📨 Preview del mensaje</Divider>
        <Paragraph>
          <Text strong>Mensaje:</Text> <br />
          <Text type="secondary">{fakeCampaign.message}</Text>
        </Paragraph>

        <Divider orientation="left">👥 Destinatarios simulados</Divider>
        <List
          size="small"
          bordered
          dataSource={fakeCampaign.recipients}
          renderItem={(item) => (
            <List.Item>
              <UserOutlined style={{ marginRight: 8 }} />
              {item}
            </List.Item>
          )}
        />

        <Divider orientation="left">🕒 Tiempo de envío</Divider>
        <Paragraph>
          <ClockCircleOutlined style={{ marginRight: 8 }} />
          <Text strong>
            {fakeCampaign.scheduledTime.format("YYYY-MM-DD HH:mm")}
          </Text>
          <Tag color="blue" style={{ marginLeft: 8 }}>
            En 2 horas
          </Tag>
        </Paragraph>
      </Modal>
    </Card>
  );
};

export default CampaignSimulation;

import React from "react";
import { List, Card } from "antd";

const ActivityLog = () => {
  const mockLogs = [
    "Usuario Juan creó la campaña 'Bienvenida'",
    "Se eliminó la plantilla 'Promoción Navideña'",
    "Se actualizó el horario de envío",
  ];

  return (
    <Card title="Log de actividad / auditoría">
      <List
        size="small"
        bordered
        dataSource={mockLogs}
        renderItem={(item) => <List.Item>{item}</List.Item>}
      />
    </Card>
  );
};

export default ActivityLog;

import React from "react";
import { Result, Button, Typography, List, Tag } from "antd";
import {
  ClockCircleOutlined,
  StopOutlined,
  SafetyCertificateOutlined,
} from "@ant-design/icons";

const { Paragraph, Text } = Typography;

const MessageStatusResult = ({ response, onRetry, onGoToCampaigns }) => {
  if (!response) return null;

  // 1. Caso: Límite de destinatarios (identificado por el 'code' que envía tu middleware)
  //
  if (
    response?.code === "RECIPIENT_LIMIT" ||
    response?.code === "REPETITIVE_CONTENT"
  ) {
    return (
      <Result
        status="error"
        title="Action Required"
        subTitle={error}
        extra={[
          <Button type="primary" key="campaign" onClick={onGoToCampaigns}>
            Create Campaign
          </Button>,
          <Button key="close" onClick={onRetry}>
            Close
          </Button>,
        ]}
      />
    );
  }

  // 2. Caso: Cooldown / Espera (identificado por el mensaje de error específico)
  //
  if (response?.code === "COOLDOWN_ACTIVE") {
    return (
      <Result
        status="warning"
        icon={<ClockCircleOutlined style={{ color: "#faad14" }} />}
        title="Take a short break"
        subTitle={error}
        extra={
          <Button type="primary" onClick={onRetry}>
            Understood
          </Button>
        }
      />
    );
  }

  // 4. Caso: Limite diario de envíos individuales superado
  if (response?.code === "DAILY_LIMIT_REACHED") {
    return (
      <Result
        status="error"
        icon={<StopOutlined />}
        title="Daily Limit Reached"
        subTitle={error}
        extra={
          <Button type="primary" onClick={onGoToCampaigns}>
            Use Campaigns instead
          </Button>
        }
      />
    );
  }

  if (response?.code === "HIGH_RISK_WORDS") {
    return (
      <Result
        status="warning"
        icon={<SafetyCertificateOutlined style={{ color: "#faad14" }} />}
        title="Deliverability Warning"
        subTitle={error}
        extra={[
          <Button type="primary" key="edit" onClick={onRetry}>
            Edit Message
          </Button>,
        ]}
      >
        <Text type="secondary">
          Detected words: <Text strong>{details}</Text>
        </Text>
      </Result>
    );
  }

  // 4. Caso: Éxito o Envío Parcial (identificado por la presencia de 'summary')
  //
  if (response.summary) {
    const { summary } = response;
    const isPartial = summary.failed > 0;

    return (
      <Result
        status={isPartial ? "warning" : "success"}
        title={isPartial ? "Shipping with interruptions" : "Messages sent!"}
        subTitle={`Processed: ${summary.total} recipients.`}
        extra={[
          <Button type="primary" key="new" onClick={onRetry}>
            Go Back
          </Button>,
        ]}
      >
        <div style={{ textAlign: "left" }}>
          <Text strong>Details of the process:</Text>
          <List size="small" bordered style={{ marginTop: 10 }}>
            <List.Item>
              <Tag color="green">Successful: {summary.sent}</Tag>
            </List.Item>
            {isPartial && (
              <List.Item>
                <Tag color="red">Not sent: {summary.failed}</Tag>
              </List.Item>
            )}
          </List>
        </div>
      </Result>
    );
  }

  // 5. Caso: Error genérico o error de servidor sin estructura conocida
  return (
    <Result
      status="error"
      title="The operation could not be completed"
      subTitle={
        response?.error ||
        "An unexpected error occurred while connecting to the server.."
      }
      extra={<Button onClick={onRetry}>Go Back</Button>}
    />
  );
};

export default MessageStatusResult;

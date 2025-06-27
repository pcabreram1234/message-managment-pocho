import React, { useEffect, useState } from "react";
import { Modal, Typography, Spin } from "antd";
import useSubmitData from "../../hooks/useSubmitData";
import { useActionContext } from "../../context/ActionContext";

const { Paragraph } = Typography;

const EmailProgressModal = ({ visible, onClose, messages }) => {
  const [loading, setLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState(
    "Saving messages to the queue..."
  );
  const { submitData } = useSubmitData();
  const { dispatchAction } = useActionContext();

  const API_URL =
    import.meta.env.VITE_API_URL +
    import.meta.env.VITE_API_URL_ROUTER +
    "campaigns/queueCampaignMessages";

  useEffect(() => {
    const enqueueMessages = async () => {
      try {
        const response = await submitData(API_URL, messages, "POST");
        if (response?.result) {
          if (response?.result > 0) {
            setTimeout(() => {
              onClose();
              setLoadingMessage("Messages schduled successfully");
              dispatchAction("campaing_launched", "LaunchCampaignModal");
            }, 1000);
          }
        }
      } catch (err) {
        console.error("Error al registrar mensajes:", err.message);
        setLoadingMessage(`Error: ${err?.message}`);
      } finally {
        setLoading(true);
      }
    };
    enqueueMessages();
  }, [visible]);

  return (
    <Modal
      title="Scheduling messages for sending..."
      open={visible}
      onCancel={onClose}
      footer={null}
      closable={!loading}
      destroyOnClose={loading}
    >
      <div style={{ textAlign: "center", padding: "30px 0" }}>
        <Spin size="large" />
        <Paragraph style={{ marginTop: 16 }}>{loadingMessage}</Paragraph>
      </div>
    </Modal>
  );
};

export default EmailProgressModal;

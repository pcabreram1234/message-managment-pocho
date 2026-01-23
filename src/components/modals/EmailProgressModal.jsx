import React, { useEffect, useState, useRef } from "react";
import { Modal, Typography, Spin } from "antd";
import useSubmitData from "../../hooks/useSubmitData";
import { useActionContext } from "../../context/ActionContext";

const { Paragraph } = Typography;

const EmailProgressModal = ({ visible, onClose, campaignId }) => {
  const hasRun = useRef(false);
  const [showSpinner, setShowSpinner] = useState(true);
  const [loading, setLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState(
    "Setting campaign messages to the queue...",
  );
  const { submitData } = useSubmitData();
  const { dispatchAction } = useActionContext();

  const API_URL =
    import.meta.env.VITE_API_URL +
    import.meta.env.VITE_API_URL_ROUTER +
    "campaigns/launchCampaign";

  useEffect(() => {
    if (!hasRun || hasRun.current) return;
    hasRun.current = true;
    const launchCampaign = async () => {
      try {
        const response = await submitData(
          API_URL,
          { campaignId: campaignId },
          "POST",
        );
        if (response?.result) {
          if (response?.result > 0) {
            setTimeout(() => {
              onClose();
              setLoadingMessage("Campaign launched successfully");
              dispatchAction("campaing_launched", "LaunchCampaignModal");
              setLoading(true);
            }, 1000);
          }
        }

        if (response?.message) {
          setTimeout(() => {
            setLoadingMessage(`Error: ${response.message}`);
            setShowSpinner(false);
            // onClose();
            dispatchAction("error_launching_campaign", "LaunchCampaignModal");
          }, 1000);
        }
      } catch (err) {
        console.error("Error al registrar mensajes:", err.message);
        setLoadingMessage(`Error: ${err?.message}`);
      }
    };
    launchCampaign();
  }, [visible]);

  return (
    <Modal
      title="Scheduling Campagign messages for sending..."
      open={visible}
      onCancel={onClose}
      footer={null}
      closable={!loading}
      destroyOnClose={loading}
    >
      <div style={{ textAlign: "center", padding: "30px 0" }}>
        {showSpinner && <Spin size="large" />}
        {showSpinner && (
          <Paragraph style={{ marginTop: 16 }}>{loadingMessage}</Paragraph>
        )}

        {!showSpinner && (
          <Paragraph
            style={{ marginTop: 16, color: "brown", fontWeight: "bold" }}
          >
            {loadingMessage}
          </Paragraph>
        )}
      </div>
    </Modal>
  );
};

export default EmailProgressModal;

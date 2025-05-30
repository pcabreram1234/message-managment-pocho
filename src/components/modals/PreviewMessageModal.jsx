import React from "react";
import { Modal, Typography } from "antd";

const { Title } = Typography;

const PreviewMessageModal = ({ visible, onClose, data }) => {
  return (
    <Modal
      open={visible}
      onCancel={onClose}
      onOk={onClose}
      title="Message preview"
      width={700}
    >
      <div
        style={{
          backgroundColor: "#fff",
          padding: "1rem",
          border: "1px solid #ddd",
        }}
      >
        <div dangerouslySetInnerHTML={{ __html: data }} />
      </div>
    </Modal>
  );
};

export default PreviewMessageModal;

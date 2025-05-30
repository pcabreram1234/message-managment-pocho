import React, { useState } from "react";
import { Layout, Typography, Row, Col } from "antd";
import QuickActionsButtons from "../../components/dashboard/QuickActionsButtons";
import AddCamapignModal from "../../components/modals/AddCamapignModal";
import MessagePickerModal from "../../components/modals/MessagePickerModal";
import MessageHistoryModal from "../../components/modals/MessageHistoryModal";
import BulkContactUploader from "../../components/dashboard/BulkContactUploader";

const { Content, Header } = Layout;
const QuickActions = () => {
  const [showAddCampaignModal, setShowAddcamapginModal] = useState(false);
  const [showScheduledMessageModal, setShowScheduledMessageModal] =
    useState(false);
  const [showMessageHistoryModal, setShowMessageHistoryModal] = useState(false);
  const [showUploadContactModal, setShowUploadContactModal] = useState(false);

  const handleCreateCampaign = () => {
    setShowAddcamapginModal(true);
  };

  const handleScheduleMessage = () => {
    setShowScheduledMessageModal(true);
  };

  const handleMessageHistory = () => {
    setShowMessageHistoryModal(true);
  };

  const handleUploadContacts = () => {
    setShowUploadContactModal(true);
  };

  return (
    <Layout>
      <Header style={{ backgroundColor: "transparent" }}>
        <Typography.Title level={3}>📂 Quick Actions</Typography.Title>
      </Header>
      <Content>
        <Row
          gutter={[16, { xs: 8, sm: 16, md: 24, lg: 32 }]}
          justify={"space-evenly"}
        >
          <QuickActionsButtons
            onCreateCampaign={handleCreateCampaign}
            onScheduleMessage={handleScheduleMessage}
            onViewHistory={handleMessageHistory}
            onUploadContacts={handleUploadContacts}
          />
        </Row>
        <AddCamapignModal
          showAddCampaignModal={showAddCampaignModal}
          setShowAddcamapginModal={setShowAddcamapginModal}
        />

        <MessagePickerModal
          showScheduledMessageModal={showScheduledMessageModal}
          setShowScheduledMessageModal={setShowScheduledMessageModal}
        />

        <MessageHistoryModal
          showModal={showMessageHistoryModal}
          cbShowModal={setShowMessageHistoryModal}
        />

        <BulkContactUploader
          cbShowModal={setShowUploadContactModal}
          showModal={showUploadContactModal}
        />
      </Content>
    </Layout>
  );
};

export default QuickActions;

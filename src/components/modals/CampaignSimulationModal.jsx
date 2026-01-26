import React, { useEffect, useState } from "react";
import {
  Modal,
  Tabs,
  Descriptions,
  Card,
  Row,
  Col,
  Statistic,
  List,
  Alert,
  Timeline,
  Button,
  Tag,
  Spin,
} from "antd";
import {
  MailOutlined,
  UserOutlined,
  ClockCircleOutlined,
  WarningOutlined,
  PlayCircleOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";
import useSubmitData from "../../hooks/useSubmitData";
import EmailProgressModal from "./EmailProgressModal";

const { TabPane } = Tabs;

const CampaignSimulationModal = ({
  open,
  onClose,
  campaignId,
  launchModalCb,
}) => {
  const { submitData } = useSubmitData();
  const [loading, setLoading] = useState(true);
  const [simulation, setSimulation] = useState(null);
  const [showEmailProgressModal, setShowEmailProgressModal] = useState(false);

  const API_SIMULATE =
    import.meta.env.VITE_API_URL +
    import.meta.env.VITE_API_URL_ROUTER +
    `campaigns/simulate/${campaignId}`;

  useEffect(() => {
    if (!open || !campaignId) return;

    setLoading(true);
    submitData(API_SIMULATE, "", "GET")
      .then((resp) => setSimulation(resp?.result))
      .finally(() => setLoading(false));
  }, [open, campaignId]);

  if (!open) return null;

  const {
    campaign,
    stats,
    messages = [],
    recipientsPreview = [],
    timeline = [],
    warnings = [],
    errors = [],
  } = simulation || {};

  console.log(campaign);

  const canLaunch = errors.length === 0;

  return (
    <Modal
      title="Campaign Simulation"
      open={open}
      width={900}
      onCancel={onClose}
      destroyOnClose
      footer={[
        <Button key="cancel" onClick={onClose}>
          Cancel
        </Button>,
        <Button
          key="launch"
          type="primary"
          icon={<PlayCircleOutlined />}
          disabled={!canLaunch}
          onClick={() => {
            onClose();
            launchModalCb();
          }}
        >
          Launch Campaign
        </Button>,
      ]}
    >
      {loading ? (
        <Spin />
      ) : (
        <>
          {/* ===============================
              1️⃣ Resumen
          =============================== */}
          <Descriptions bordered size="small" column={2}>
            <Descriptions.Item label="Campaign">
              {campaign.name}
            </Descriptions.Item>
            <Descriptions.Item label="Status">
              <Tag color="blue">{campaign.status}</Tag>
            </Descriptions.Item>
            <Descriptions.Item label="Category">
              {campaign.category}
            </Descriptions.Item>
            <Descriptions.Item label="Estrategy">
              {campaign.send_strategy}
            </Descriptions.Item>
            <Descriptions.Item label="Re-attempts">
              {campaign.max_retries}
            </Descriptions.Item>
            <Descriptions.Item label="Interval">
              {campaign.send_interval_value
                ? `${campaign.send_interval_value} ${campaign.send_interval_unit}`
                : "N/A"}
            </Descriptions.Item>
          </Descriptions>

          {/* ===============================
              2️⃣ Estadísticas
          =============================== */}
          <Row gutter={16} style={{ marginTop: 16 }}>
            <Col span={6}>
              <Card>
                <Statistic
                  title="Recipients"
                  value={stats.recipients}
                  prefix={<UserOutlined />}
                />
              </Card>
            </Col>
            <Col span={6}>
              <Card>
                <Statistic
                  title="Messages"
                  value={stats.messages}
                  prefix={<MailOutlined />}
                />
              </Card>
            </Col>
            <Col span={6}>
              <Card>
                <Statistic
                  title="Total shipments"
                  value={stats.totalDeliveries}
                />
              </Card>
            </Col>
            <Col span={6}>
              <Card>
                <Statistic
                  title="Estimated duration"
                  value={`${stats.estimatedDurationMinutes} min`}
                  prefix={<ClockCircleOutlined />}
                />
              </Card>
            </Col>
          </Row>

          {/* ===============================
              3️⃣ Tabs
          =============================== */}
          <Tabs defaultActiveKey="messages" style={{ marginTop: 24 }}>
            {/* Mensajes */}
            <TabPane tab="Messages" key="messages">
              <div
                style={{
                  maxHeight: 350,
                  overflowY: "auto",
                  paddingRight: 8,
                }}
              >
                <List
                  dataSource={messages}
                  renderItem={(m, index) => (
                    <List.Item>
                      <Card style={{ width: "100%" }}>
                        <b>#{index + 1}</b> — {m.channel}
                        <pre style={{ whiteSpace: "pre-wrap" }}>
                          {m.content}
                        </pre>
                      </Card>
                    </List.Item>
                  )}
                />
              </div>
            </TabPane>

            {/* Destinatarios */}
            <TabPane tab="Recipients" key="recipients">
              <Alert
                type="info"
                showIcon
                message={`Total recipients: ${stats.recipients}`}
                style={{ marginBottom: 16 }}
              />
              <List
                size="small"
                dataSource={recipientsPreview}
                renderItem={(r) => (
                  <List.Item>
                    {r.email || r.phone}{" "}
                    {!r.valid && <Tag color="red">Canal inválido</Tag>}
                  </List.Item>
                )}
              />
            </TabPane>

            {/* Timeline */}
            <TabPane tab="Timeline" key="timeline">
              <Timeline>
                {timeline.map((t, idx) => (
                  <Timeline.Item key={idx}>
                    {t.label} — {dayjs(t.at).format("DD/MM/YYYY HH:mm")}
                  </Timeline.Item>
                ))}
              </Timeline>
            </TabPane>

            {/* Validaciones */}
            <TabPane tab="Validations" key="validations">
              {errors.map((e, i) => (
                <Alert
                  key={i}
                  type="error"
                  showIcon
                  message={e}
                  style={{ marginBottom: 8 }}
                />
              ))}

              {warnings.map((w, i) => (
                <Alert
                  key={i}
                  type="warning"
                  showIcon
                  message={w}
                  style={{ marginBottom: 8 }}
                  icon={<WarningOutlined />}
                />
              ))}

              {errors.length === 0 && warnings.length === 0 && (
                <Alert
                  type="success"
                  message="The campaign is ready to launch"
                />
              )}
            </TabPane>
          </Tabs>
        </>
      )}

      {showEmailProgressModal && (
        <EmailProgressModal
          campaignId={campaignId}
          visible={showEmailProgressModal}
          target={"CampaignSimulationModal"}
          onClose={() => {
            setShowEmailProgressModal(false);
          }}
        />
      )}
    </Modal>
  );
};

export default CampaignSimulationModal;

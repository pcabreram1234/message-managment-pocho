// src/containers/CampaignManager.jsx
import React, { useState, useEffect } from "react";
import {
  Table,
  Button,
  Space,
  Tag,
  Popconfirm,
  message,
  Typography,
  Tooltip,
} from "antd";
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  CopyOutlined,
  RocketOutlined,
} from "@ant-design/icons";
import AddCamapignModal from "./modals/AddCamapignModal";
import EditCampaignModal from "./modals/EditCampaignModal";
import LaunchCampaignModal from "./modals/LaunchCampaignModal";
import useSubmitData from "../hooks/useSubmitData";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);

const CampaignsManagment = () => {
  const { submitData } = useSubmitData();
  const [modalVisible, setModalVisible] = useState(false);
  const [showEditCamapignModal, setShowEditCampaignModal] = useState(false);
  const [showLaunchCampaignModal, setShowLaunchCampaignModal] = useState(false);
  const [campaignToUpdate, setCamapignToUpdate] = useState([]);
  const [campaignToLaunch, setCampaignToLaunch] = useState([]);
  const [campaings, setCampaigns] = useState([]);
  const { Paragraph } = Typography;

  const openCreateModal = () => {
    setModalVisible(true);
  };

  const handleDelete = (id) => {
    setCampaigns(campaings.filter((c) => c.id !== id));
    message.success("Campaña eliminada");
  };

  const API_URL =
    import.meta.env.VITE_API_URL +
    import.meta.env.VITE_API_URL_ROUTER +
    "campaigns/getCampaingsAndRecipients";

  const loadCampaigns = () => {
    submitData(API_URL, "", "GET").then((resp) => {
      console.log(resp);
      setCampaigns(resp);
    });
  };

  const updateCampaignsTable = (data) => {
    const {
      id,
      name,
      description,
      start_date,
      end_date,
      status,
      contacts,
      category,
    } = data;
    const othersCampaigns = campaings?.filter((c) => c.id !== id);
    const campaignUpdated = [
      {
        category: category,
        name: name,
        contacts: contacts,
        description: description,
        end_date: end_date,
        id: id,
        start_date: start_date,
        status: status,
      },
    ];
    const newCampaigns = [othersCampaigns, campaignUpdated]
      .flat()
      .sort((a, b) => a.id - b.id);
    setCampaigns(newCampaigns);
  };

  const handleCampaignToLaunch = (campaign) => {
    setCampaignToLaunch(campaign);
    setShowLaunchCampaignModal(true);
  };

  const handleNewTableItem = (data) => {
    // console.log(data)
    const newCampaigns = [data, campaings].flat();
    // console.log(newCampaigns);
    setCampaigns(newCampaigns);
  };

  useEffect(() => {
    loadCampaigns();
  }, [API_URL]);

  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Name  ",
      dataIndex: "name",
      key: "name",
      render: (text) => <strong>{text}</strong>,
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      render: (_, record) => (
        <Paragraph
          ellipsis={{
            expandable: "collapsible",
            rows: 2,
            tooltip: record?.description,
          }}
        >
          {record?.description}
        </Paragraph>
      ),
    },
    {
      title: "Date range",
      key: "dates",
      render: (_, record) =>
        `${dayjs(record?.start_date).format("DD/MM/YYYY HH:mm:ss")} → ${dayjs(
          record.end_date
        ).format("DD/MM/YYYY HH:mm:ss")}`,
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (status) => (
        <Tag color={status === "completed" ? "green" : "red"}>{status}</Tag>
      ),
    },
    {
      title: "Recipients",
      dataIndex: "contacts",
      render: (count) => `${count} Contacts`,
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Tooltip title="Edit Campaign">
            <Button
              icon={<EditOutlined />}
              onClick={() => {
                setShowEditCampaignModal(true);
                setCamapignToUpdate({
                  id: record?.id,
                  name: record?.name,
                  description: record?.description,
                  status: record?.status,
                  start_date: record?.start_date,
                  end_date: record?.end_date,
                  category: record?.category,
                });
              }}
            />
          </Tooltip>

          <Tooltip title="Launch Campaign">
            <Button
              icon={<RocketOutlined />}
              onClick={() => handleCampaignToLaunch(record)}
            />
          </Tooltip>
          <Tooltip title="Delete Campaign">
            <Popconfirm
              title="Are you sure you want to delete this campaign?"
              onConfirm={() => handleDelete(record.id)}
              okText="Yes"
              cancelText="No"
            >
              <Button danger icon={<DeleteOutlined />} />
            </Popconfirm>
          </Tooltip>
          <Tooltip title="Duplicate Campaign">
            <Button icon={<CopyOutlined />}>Duplicate</Button>
          </Tooltip>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: 24 }}>
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <Typography.Title>Campaigns Management</Typography.Title>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={openCreateModal}
        >
          New campaign
        </Button>
      </div>

      {/* Tabla de campañas */}
      <Table
        dataSource={campaings}
        columns={columns}
        rowKey="id"
        bordered
        pagination={{ pageSize: 5 }}
      />

      {/* Modal de creación/edición */}
      {modalVisible && (
        <AddCamapignModal
          setShowAddcamapginModal={setModalVisible}
          showAddCampaignModal={modalVisible}
          handleNewTableItem={handleNewTableItem}
        />
      )}

      {showEditCamapignModal && (
        <EditCampaignModal
          campaignData={campaignToUpdate}
          setShowEditCampaignModal={setShowEditCampaignModal}
          showEditCampaignModal={showEditCamapignModal}
          updateCampaignsTable={updateCampaignsTable}
        />
      )}

      {showLaunchCampaignModal && (
        <LaunchCampaignModal
          campaign={campaignToLaunch}
          visible={showLaunchCampaignModal}
          onCancel={() => {
            setShowLaunchCampaignModal(false);
          }}
        />
      )}
    </div>
  );
};

export default CampaignsManagment;

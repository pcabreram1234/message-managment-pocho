// src/containers/CampaignManager.jsx
import React, { useState } from "react";
import {
  Table,
  Button,
  Space,
  Tag,
  Popconfirm,
  message,
  Typography,
  Tooltip,
  Layout,
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
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import useSubmitData from "../hooks/useSubmitData";
dayjs.extend(customParseFormat);

const CampaignsManagment = ({ campaings, setCampaigns }) => {
  const { submitData } = useSubmitData();
  const [modalVisible, setModalVisible] = useState(false);
  const [showEditCamapignModal, setShowEditCampaignModal] = useState(false);
  const [showLaunchCampaignModal, setShowLaunchCampaignModal] = useState(false);
  const [campaignToUpdate, setCamapignToUpdate] = useState([]);
  const [campaignToLaunch, setCampaignToLaunch] = useState([]);
  const { Paragraph } = Typography;

  const duplicateCampaign = async (campaignId) => {
    const API_URL =
      import.meta.env.VITE_API_URL +
      import.meta.env.VITE_API_URL_ROUTER +
      `campaigns/duplicate/${campaignId}`;

    submitData(API_URL, null, "POST").then((resp) => {
      if (resp?.success) {
        if (resp?.success === true) {
          console.log(resp);
          message.success("Campaign duplicated");
          updateCampaignsTable(resp?.result);
        } else {
          message.error("Error: " + resp?.message);
        }
      }
    });
  };

  // Table States
  const [pagination, setPagination] = useState({
    pageSize: 10,
    defaultPageSize: 10,
    showSizeChanger: true,
  });

  const openCreateModal = () => {
    setModalVisible(true);
  };

  const handleDelete = (id) => {
    setCampaigns(campaings.filter((c) => c.id !== id));
    message.success("Campaign deleted");
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
      send_strategy,
      send_interval_value,
      send_interval_unit,
      max_retries,
      retry_delay_minutes,
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
        send_strategy: send_strategy,
        send_interval_value: send_interval_value,
        send_interval_unit: send_interval_unit,
        max_retries: max_retries,
        retry_delay_minutes: retry_delay_minutes,
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
    // getCampaignMessagesToLaunch(campaign?.id);
  };

  const handleNewTableItem = (data) => {
    const newCampaigns = [data, campaings].flat();
    setCampaigns(newCampaigns);
  };

  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
      sorter: (a, b) => a.id > b.id,
      // width: 50,
    },
    {
      title: "Name  ",
      dataIndex: "name",
      key: "name",
      render: (text) => <strong>{text}</strong>,
      sorter: (a, b) => a.name.length - b.name.length,
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
          record.end_date,
        ).format("DD/MM/YYYY HH:mm:ss")}`,
      sorter: (a, b) =>
        dayjs(a?.start_date).valueOf() - dayjs(b.end_date).valueOf(),
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (status) => (
        <Tag
          color={
            status === "completed"
              ? "green"
              : status === "active"
                ? "blue"
                : status === "pending" || status === "paused"
                  ? "gray"
                  : "red"
          }
        >
          {status}
        </Tag>
      ),
      sorter: (a, b) => a.status.length - b.status.length,
      // width: 80,
    },
    {
      title: "Recipients",
      dataIndex: "contacts",
      render: (count) => `${count} Contacts`,
      width: 120,
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space align="center">
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
                  send_strategy: campaings.find((c) => c.id === record.id)
                    ?.send_strategy,
                  send_interval_value: campaings.find((c) => c.id === record.id)
                    ?.send_interval_valu,
                  send_interval_unit: campaings.find((c) => c.id === record.id)
                    ?.send_interval_unit,
                  max_retries: campaings.find((c) => c.id === record.id)
                    ?.max_retries,
                  retry_delay_minutes: campaings.find((c) => c.id === record.id)
                    ?.retry_delay_minutes,
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
            <Popconfirm
              title="Are you sure you want to duplicate this campaign?"
              onConfirm={() => duplicateCampaign(record.id)}
              okText="Yes"
              cancelText="No"
            >
              <Button icon={<CopyOutlined />}></Button>
            </Popconfirm>
          </Tooltip>
        </Space>
      ),
      // width: 90,
    },
  ];

  // const getCampaignMessagesToLaunch = (id) => {
  //   submitData(`${API_URL}/${id}`, "", "GET").then((resp) => {
  //     if (resp?.message) {
  //       console.log("Ha aparecido el error ");
  //       message.error(`Error: ${resp?.message}`);
  //     } else {
  //       setMessagesToSend(resp);
  //       setShowLaunchCampaignModal(true);
  //     }
  //   });
  // };

  return (
    <Layout>
      <Layout.Content>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={openCreateModal}
          style={{ margin: "10px 0" }}
        >
          New campaign
        </Button>
        {/* Tabla de campañas */}
        <Table
          dataSource={campaings}
          columns={columns}
          rowKey="id"
          bordered
          pagination={pagination}
          scroll={{ x: "max-content", y: 500 }}
          onChange={(e) => {
            setPagination(e);
          }}
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
      </Layout.Content>
    </Layout>
  );
};

export default CampaignsManagment;

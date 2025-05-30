// src/components/CampaignFilters.jsx
import React from "react";
import {
  Row,
  Col,
  Input,
  Select,
  DatePicker,
  Button,
  Space,
  Typography,
} from "antd";
import { SearchOutlined, ReloadOutlined } from "@ant-design/icons";

const { RangePicker } = DatePicker;
const { Option } = Select;

const CampaignFilters = ({ filters, setFilters, onSearch, onReset }) => {
  const handleChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div style={{ marginBottom: 24 }}>
      <Typography.Title level={3}>Filters</Typography.Title>
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} md={6}>
          <Input
            placeholder="Search by name"
            value={filters.name}
            onChange={(e) => handleChange("name", e.target.value)}
            allowClear
          />
        </Col>

        <Col xs={24} sm={12} md={6}>
          <Select
            placeholder="Select status"
            value={filters.status}
            onChange={(value) => handleChange("status", value)}
            allowClear
            style={{ width: "100%" }}
          >
            <Option value="Activa">Activa</Option>
            <Option value="Inactiva">Inactiva</Option>
          </Select>
        </Col>

        <Col xs={24} sm={12} md={6}>
          <Select
            placeholder="Select category"
            value={filters.category}
            onChange={(value) => handleChange("category", value)}
            allowClear
            style={{ width: "100%" }}
          >
            <Option value="promo">Promocional</Option>
            <Option value="informativa">Informativa</Option>
            <Option value="urgente">Urgente</Option>
          </Select>
        </Col>

        <Col xs={24} sm={12} md={6}>
          <RangePicker
            style={{ width: "100%" }}
            value={filters.dateRange}
            onChange={(value) => handleChange("dateRange", value)}
            allowEmpty={[true, true]}
          />
        </Col>

        <Col span={24}>
          <Space>
            <Button type="primary" icon={<SearchOutlined />} onClick={onSearch}>
              Search
            </Button>
            <Button icon={<ReloadOutlined />} onClick={onReset}>
              Reset
            </Button>
          </Space>
        </Col>
      </Row>
    </div>
  );
};

export default CampaignFilters;

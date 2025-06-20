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
import { fetchData } from "../utility/fetchData";

const { RangePicker } = DatePicker;
const { Option } = Select;

const CampaignFilters = ({ filters, setFilters, onSearch, onReset }) => {
  const handleChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const API_URL =
    import.meta.env.VITE_API_URL +
    import.meta.env.VITE_API_URL_ROUTER +
    "categories";

  const categories = fetchData(API_URL);

  return (
    <div style={{ marginBottom: 24 }}>
      <Typography.Title level={4}>Filters</Typography.Title>
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
            <Option value="active">Active</Option>
            <Option value="pending">Pending</Option>
            <Option value="paused">Paused</Option>
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
            {categories?.categories?.map((c) => (
              <Option key={c?.id} value={c?.categorie_name}>
                {c?.categorie_name}
              </Option>
            ))}
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

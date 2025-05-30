// src/components/CampaignsChartRecharts.jsx
import React from "react";
import { Card, Row, Col } from "antd";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts";

const campaigns = [
  { id: 1, name: "Campaña A", category: "promo", status: "Activa" },
  { id: 2, name: "Campaña B", category: "informativa", status: "Activa" },
  { id: 3, name: "Campaña C", category: "urgente", status: "Finalizada" },
  { id: 4, name: "Campaña D", category: "promo", status: "Borrador" },
  { id: 5, name: "Campaña E", category: "promo", status: "Activa" },
];

// Agrupar por categoría
const countByCategory = campaigns.reduce((acc, campaign) => {
  acc[campaign.category] = (acc[campaign.category] || 0) + 1;
  return acc;
}, {});

const dataByCategory = Object.entries(countByCategory).map(([category, count]) => ({
  name: category,
  value: count,
}));

// Agrupar por estado
const countByStatus = campaigns.reduce((acc, campaign) => {
  acc[campaign.status] = (acc[campaign.status] || 0) + 1;
  return acc;
}, {});

const dataByStatus = Object.entries(countByStatus).map(([status, count]) => ({
  name: status,
  value: count,
}));

const COLORS = ["#1890ff", "#52c41a", "#faad14", "#f5222d"];

const CampaignsChartRecharts = () => {
  return (
    <Row gutter={[16, 16]}>
      <Col xs={24} md={12}>
        <Card title="Campañas por Categoría">
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={dataByCategory}
                cx="50%"
                cy="50%"
                label
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {dataByCategory.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </Card>
      </Col>

      <Col xs={24} md={12}>
        <Card title="Campañas por Estado">
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={dataByStatus}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#1890ff" />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </Col>
    </Row>
  );
};

export default CampaignsChartRecharts;

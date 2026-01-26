// src/components/CampaignsChartRecharts.jsx
import React, { useEffect, useMemo, useState } from "react";
import { Card, Row, Col, Spin } from "antd";
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
import useSubmitData from "../hooks/useSubmitData";

const COLORS = ["#1890ff", "#52c41a", "#faad14", "#f5222d"];
const STATUS_COLORS = {
  active: "#1890ff",
  pending: "#faad14",
  paused: "#bfbfbf",
  completed: "#52c41a",
  cancelled: "#f5222d",
};

const CampaignsChartRecharts = () => {
  const { submitData } = useSubmitData();
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_URL =
    import.meta.env.VITE_API_URL +
    import.meta.env.VITE_API_URL_ROUTER +
    "campaigns/getCamapignsDetails";

  useEffect(() => {
    submitData(API_URL, "", "GET")
      .then((resp) => {
        setCampaigns(resp?.result || []);
        console.log(resp);
      })
      .catch((err) => {
        console.error("Error loading campaigns chart data:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  /* ===============================
     Agrupar campañas por categoría
  =============================== */
  const dataByCategory = useMemo(() => {
    const count = campaigns.reduce((acc, c) => {
      if (!c.category) return acc;
      acc[c.category] = (acc[c.category] || 0) + 1;
      return acc;
    }, {});

    return Object.entries(count).map(([name, value]) => ({
      name,
      value,
    }));
  }, [campaigns]);

  /* ===============================
     Agrupar campañas por estado
  =============================== */
  const dataByStatus = useMemo(() => {
    const count = campaigns.reduce((acc, c) => {
      if (!c.status) return acc;
      acc[c.status] = (acc[c.status] || 0) + 1;
      return acc;
    }, {});

    return Object.entries(count).map(([name, value]) => ({
      name,
      value,
    }));
  }, [campaigns]);

  if (loading) {
    return (
      <Row justify="center" style={{ padding: 40 }}>
        <Spin size="large" />
      </Row>
    );
  }

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
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </Card>
      </Col>

      <Col xs={24} md={12}>
        <Card title="Campaigns by Status">
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={dataByStatus}>
              <XAxis dataKey="name" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Legend />

              <Bar dataKey="value" name={"Campaigns Status"}>
                {dataByStatus.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={STATUS_COLORS[entry.name] || "#1890ff"}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </Col>
    </Row>
  );
};

export default CampaignsChartRecharts;

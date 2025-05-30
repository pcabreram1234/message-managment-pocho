import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Card, Col, Row } from "antd";

const SuccessErrorRateChart = ({ rateData }) => {
  if (!rateData) {
    return <div>Loading...</div>;
  }

  return (
    <Row gutter={[16, 16]}>
      <Col>
        <Card title="Success Rate vs Error Rate" style={{ width: "300px" }}>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={rateData?.map((c) => ({
                name: c?.name, // Puedes usar los nombres de las campañas
                success: c?.totalSent,
                errors: c?.totalErrors,
                total: c.totalSent,
              }))}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="success" fill="#82ca9d" name="Éxitos" />
              <Bar dataKey="errors" fill="#8884d8" name="Errores" />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </Col>
    </Row>
  );
};

export default SuccessErrorRateChart;

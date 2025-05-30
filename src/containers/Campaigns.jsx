import React, { useState } from "react";
import { Layout, Divider, Typography } from "antd";
import CampaignsManagment from "../components/CampaignsManagment";
import CampaignStats from "../components/CampaignStats";
import CampaignFilters from "../components/CampaignFilters";
import CampaignsChart from "../components/CampaignsChart";
import CampaignSimulation from "../components/SimulationCampaign";

const Campaigns = () => {
  const [filters, setFilters] = useState({
    name: "",
    status: null,
    category: null,
    dateRange: null,
  });

  const onSearch = () => {
    const filtered = campaigns.filter((c) => {
      const matchName = filters.name
        ? c.name.toLowerCase().includes(filters.name.toLowerCase())
        : true;
      const matchStatus = filters.status ? c.status === filters.status : true;
      const matchCategory = filters.category
        ? c.category === filters.category
        : true;
      const matchDate = filters.dateRange
        ? c.startDate >= filters.dateRange[0].format("YYYY-MM-DD") &&
          c.endDate <= filters.dateRange[1].format("YYYY-MM-DD")
        : true;

      return matchName && matchStatus && matchCategory && matchDate;
    });

    setCampaigns(filtered);
  };

  const onReset = () => {
    setFilters({ name: "", status: null, category: null, dateRange: null });
    // Aquí deberías volver a cargar la data original si se conecta con backend
  };

  return (
    <Layout>
      <Layout.Content> 
        <CampaignsManagment />
        <CampaignFilters filters={filters} />
        <Divider />
        <Typography.Title level={2}>Statistics</Typography.Title>
        <CampaignStats
          stats={{
            total: 1,
            active: "2",
            scheduledToday: 1,
            totalRecipients: 2,
          }}
        />
        <Divider />
        <CampaignsChart />
        <Divider />
        <CampaignSimulation />
      </Layout.Content>
    </Layout>
  );
};

export default Campaigns;

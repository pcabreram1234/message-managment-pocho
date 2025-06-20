import React, { useState, useEffect } from "react";
import { Layout, Divider, Typography } from "antd";
import useSubmitData from "../hooks/useSubmitData";
import CampaignsManagment from "../components/CampaignsManagment";
import CampaignStats from "../components/CampaignStats";
import CampaignFilters from "../components/CampaignFilters";
import CampaignsChart from "../components/CampaignsChart";
import CampaignSimulation from "../components/SimulationCampaign";

const Campaigns = () => {
  const [campaings, setCampaigns] = useState([]);
  const [prevFilteredCampaigns, setPrevFilteredCampaigns] = useState([]);
  const [filters, setFilters] = useState({
    name: "",
    status: null,
    category: null,
    dateRange: null,
  });
  const { submitData } = useSubmitData();

  const onSearch = () => {
    const filtered = campaings.filter((c) => {
      const matchName = filters.name
        ? c.name.toLowerCase().includes(filters.name.toLowerCase())
        : true;
      const matchStatus = filters.status ? c.status === filters.status : true;
      const matchCategory = filters.category
        ? c.category === filters.category
        : true;
      const matchDate = filters.dateRange
        ? c.start_date >= filters.dateRange[0].format("YYYY-MM-DD") &&
          c.end_date <= filters.dateRange[1].format("YYYY-MM-DD")
        : true;

      console.log(matchDate);
      return matchName && matchStatus && matchCategory && matchDate;
    });

    setCampaigns(filtered);
  };

  const onReset = () => {
    setFilters({ name: "", status: null, category: null, dateRange: null });
    setCampaigns(prevFilteredCampaigns);
  };

  const API_URL =
    import.meta.env.VITE_API_URL +
    import.meta.env.VITE_API_URL_ROUTER +
    "campaigns/getCampaingsAndRecipients";

  const loadCampaigns = () => {
    submitData(API_URL, "", "GET").then((resp) => {
      setCampaigns(resp);
      setPrevFilteredCampaigns(resp);
    });
  };

  useEffect(() => {
    console.log(filters);
  }, [filters]);

  useEffect(() => {
    loadCampaigns();
  }, [API_URL]);

  return (
    <Layout>
      <Layout.Header style={{ background: "transparent" }}>
        <Typography.Title level={3}>Campaigns</Typography.Title>
      </Layout.Header>
      <Layout.Content>
        <CampaignFilters
          filters={filters}
          onReset={onReset}
          onSearch={onSearch}
          setFilters={setFilters}
        />
        <CampaignsManagment campaings={campaings} setCampaigns={setCampaigns} />
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

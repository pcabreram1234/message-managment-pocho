import React, { useState, useEffect } from "react";
import { Layout, Divider, Typography, message } from "antd";
import useSubmitData from "../hooks/useSubmitData";
import CampaignsManagment from "../components/CampaignsManagment";
import CampaignStats from "../components/CampaignStats";
import CampaignFilters from "../components/CampaignFilters";
import CampaignsChart from "../components/CampaignsChart";
import { useActionContext } from "../context/ActionContext";
import { useActionEffect } from "../hooks/useActionEffect";

const Campaigns = () => {
  const [campaings, setCampaigns] = useState([]);
  const [campaignStats, setCampaingStat] = useState([]);
  const [prevFilteredCampaigns, setPrevFilteredCampaigns] = useState([]);
  const [filters, setFilters] = useState({
    name: "",
    status: null,
    category: null,
    dateRange: null,
  });
  const { submitData } = useSubmitData();
  const { dispatchAction } = useActionContext();

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

  const API_URL_CAMPAIGNS_STATS =
    import.meta.env.VITE_API_URL +
    import.meta.env.VITE_API_URL_ROUTER +
    "campaigns/getCampaignStats";

  const loadCampaigns = () => {
    submitData(API_URL, "", "GET").then((resp) => {
      setCampaigns(resp);
      setPrevFilteredCampaigns(resp);
    });
  };

  const locadCampaignStats = () => {
    submitData(API_URL_CAMPAIGNS_STATS, "", "GET").then((resp) => {
      setCampaingStat(resp?.result);
    });
  };

  useEffect(() => {
    loadCampaigns();
  }, [API_URL]);

  useEffect(() => {
    locadCampaignStats();
  }, [API_URL_CAMPAIGNS_STATS]);

  // listener de estados

  useActionEffect({ type: "refresh", target: "campaignsTable" }, loadCampaigns);

  const handleCampaingLaunchedSuccess = () => {
    message.success("Campaign Launched!!");
    setTimeout(() => {
      onCancel();
      dispatchAction("refresh", "campaignsTable");
    }, 500);
    dispatchAction("", "", "");
  };

  const handleErrorCampaingLaunched = () => {
    message.error("Error Launching Campaign!!");
    setTimeout(() => {
      dispatchAction("", "", "");
    }, 500);
  };

  useActionEffect(
    { type: "campaing_launched", target: "campaignsTable" },
    handleCampaingLaunchedSuccess,
  );

  useActionEffect(
    { type: "error_launching_campaign", target: "campaignsTable" },
    handleErrorCampaingLaunched,
  );

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
        <CampaignsManagment campaings={campaings} />
        <Divider />
        <Typography.Title level={2}>Statistics</Typography.Title>
        <CampaignStats stats={campaignStats} />
        <Divider />
        <CampaignsChart />
      </Layout.Content>
    </Layout>
  );
};

export default Campaigns;

import React from "react";
import { Layout, Typography, Tabs, Divider } from "antd";
import { UserProfileForm } from "../components/settings/UserProfileForm";
import { GeneralPreferences } from "../components/settings/GeneralPreferences";
import { NotificationSettings } from "../components/settings/NotificationSettings";
import { SecurityPanel } from "../components/settings/SecurityPanel";
import DefaultSchedule from "../components/settings/DefaultSchedule";
import SendLimits from "../components/settings/SendLimits";
import MessageTemplates from "../components/settings/MessageTemplates";
import SenderSettings from "../components/settings/SenderSettings";
import ExternalIntegrations from "../components/settings/ExternalIntegrations";
import DefaultCampaignBehavior from "../components/settings/DefaultCampaignBehavior";
import CampaignsNotificationsSettings from "../components/settings/CampaignsNotificationsSettings";
import ActivityLog from "../components/settings/ActivityLog";
import {
  UserOutlined,
  SettingFilled,
  NotificationOutlined,
  KeyOutlined,
  ClockCircleOutlined,
  TeamOutlined,
  FileTextOutlined,
  MailOutlined,
  ApiOutlined,
  SettingOutlined,
  HistoryOutlined,
} from "@ant-design/icons";
const { TabPane } = Tabs;
const Settings = () => {
  return (
    <Layout style={{}}>
      <Layout style={{ backgroundColor: "white", padding: "30px" }}>
        <Layout.Header style={{ background: "transparent" }}>
          <Typography.Title level={3}>User settings</Typography.Title>
        </Layout.Header>
        <Layout.Content>
          <Tabs defaultActiveKey="1" tabPosition="top">
            <TabPane
              tab={
                <span>
                  <UserOutlined /> User
                </span>
              }
              key={1}
            >
              <UserProfileForm />
            </TabPane>

            <TabPane
              tab={
                <span>
                  <SettingFilled /> General Preferences
                </span>
              }
              key={2}
            >
              <GeneralPreferences />
            </TabPane>

            <TabPane
              tab={
                <span>
                  <NotificationOutlined /> Notifications
                </span>
              }
              key={3}
            >
              <NotificationSettings />
            </TabPane>

            <TabPane
              tab={
                <span>
                  <KeyOutlined /> Security
                </span>
              }
              key={4}
            >
              <SecurityPanel />
            </TabPane>
          </Tabs>
        </Layout.Content>
      </Layout>

      <Divider />

      <Layout style={{ backgroundColor: "white", padding: "30px" }}>
        <Layout.Header style={{ background: "transparent" }}>
          <Typography.Title level={3}>Campaigns and Messages</Typography.Title>
        </Layout.Header>
        <Layout.Content>
          <Tabs defaultActiveKey="1" tabPosition="top">
            <TabPane
              tab={
                <span>
                  <ClockCircleOutlined /> Schedule
                </span>
              }
              key="1"
            >
              <DefaultSchedule />
            </TabPane>
            <TabPane
              tab={
                <span>
                  <TeamOutlined /> Boundaries
                </span>
              }
              key="2"
            >
              <SendLimits />
            </TabPane>
            <TabPane
              tab={
                <span>
                  <FileTextOutlined /> Templates
                </span>
              }
              key="3"
            >
              <MessageTemplates />
            </TabPane>
            <TabPane
              tab={
                <span>
                  <MailOutlined /> Sender
                </span>
              }
              key="4"
            >
              <SenderSettings />
            </TabPane>
            <TabPane
              tab={
                <span>
                  <ApiOutlined /> Integrations
                </span>
              }
              key="5"
            >
              <ExternalIntegrations />
            </TabPane>
            <TabPane
              tab={
                <span>
                  <SettingOutlined /> Campaigns
                </span>
              }
              key="6"
            >
              <DefaultCampaignBehavior />
            </TabPane>
            <TabPane
              tab={
                <span>
                  <NotificationOutlined /> Notifications
                </span>
              }
              key="7"
            >
              <CampaignsNotificationsSettings />
            </TabPane>
            <TabPane
              tab={
                <span>
                  <HistoryOutlined /> Audit
                </span>
              }
              key="8"
            >
              <ActivityLog />
            </TabPane>
          </Tabs>
        </Layout.Content>
      </Layout>
    </Layout>
  );
};

export default Settings;

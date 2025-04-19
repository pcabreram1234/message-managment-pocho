import React, { useContext, useState } from "react";
import { Layout, Menu, Typography, Image } from "antd";
import {
  MessageFilled,
  SettingFilled,
  ContactsFilled,
  OrderedListOutlined,
  HistoryOutlined,
  UserOutlined,
  BarsOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  SmileOutlined,
  DashboardOutlined,
  NotificationFilled,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import UserInfo from "../layout/UserInfo";
import { AuthContext } from "../../context/UserContext";
import AppIconf from "../../assets/logo.svg";
import * as jose from "jose";

const { Sider, Content, Header } = Layout;
const { Text } = Typography;

const AppLayout = ({ children }) => {
  const state = useContext(AuthContext);
  const { user } = state;

  const rawToken = window.localStorage.getItem("token");
  const [userState] = useState(
    rawToken ? jose.decodeJwt(rawToken) : user.toString()
  );

  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      {/* Menu lateral */}

      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={setCollapsed}
        style={{
          color: "white",
        }}
      >
        {/* Branding */}
        <div
          style={{
            height: 64,
            display: "flex",
            alignItems: "center",
            justifyContent: collapsed ? "center" : "space-between",
            padding: collapsed ? 0 : "0 16px",
          }}
        >
          <Image
            src={AppIconf}
            width={collapsed ? 40 : 60}
            preview={false}
            alt="App Logo"
            style={{ transition: "all 0.3s ease" }}
          />

          {!collapsed && (
            <div
              onClick={() => setCollapsed(true)}
              style={{ cursor: "pointer", marginLeft: "auto", paddingLeft: 8 }}
            >
              <MenuFoldOutlined />
            </div>
          )}
          {collapsed && (
            <div
              onClick={() => setCollapsed(false)}
              style={{ cursor: "pointer", paddingLeft: 8 }}
            >
              <MenuUnfoldOutlined />
            </div>
          )}
        </div>

        <Menu mode="inline" defaultSelectedKeys={["Dashboard"]} theme="dark">
          <Menu.Item key="Dashboard" icon={<DashboardOutlined />}>
            <Link to="/dashboard">
              <Text style={{ color: "white" }}>Dashboard</Text>
            </Link>
          </Menu.Item>
          <Menu.Item key="Messages" icon={<MessageFilled />}>
            <Link to="/messages">
              <Text style={{ color: "white" }}>Messages</Text>
            </Link>
          </Menu.Item>

          <Menu.Item key="Categories" icon={<OrderedListOutlined />}>
            <Link to="/categories">
              <Text style={{ color: "white" }}>Categories</Text>
            </Link>
          </Menu.Item>

          <Menu.Item key="Contacts" icon={<ContactsFilled />}>
            <Link to="/contacts">
              <Text style={{ color: "white" }}>Contacts</Text>
            </Link>
          </Menu.Item>

          <Menu.Item key="campaigns" icon={<NotificationFilled />}>
            <Link to="/campaigns">
              <Text style={{ color: "white" }}>Campaigns</Text>
            </Link>
          </Menu.Item>

          <Menu.Item key="Configuration Panel" icon={<SettingFilled />}>
            <Link to="/configurationPanel">
              <Text style={{ color: "white" }}>Configuration</Text>
            </Link>
          </Menu.Item>

          <Menu.Item key="History Panel" icon={<HistoryOutlined />}>
            <Link to="/historyPanel">
              <Text style={{ color: "white" }}>History</Text>
            </Link>
          </Menu.Item>

          <Menu.Item key={"About"} icon={<SmileOutlined />}>
            <Link to="/About">
              <Text style={{ color: "white" }}>About</Text>
            </Link>
          </Menu.Item>

          {userState?.type_user === "adm" && (
            <Menu.Item key="users" icon={<BarsOutlined />}>
              <Link to="/users">
                <Text style={{ color: "white" }}>Users</Text>
              </Link>
            </Menu.Item>
          )}

          {userState && (
            <Menu.SubMenu
              key="userInfo"
              icon={<UserOutlined />}
              title="User Info"
            >
              <Menu.Item key="UserInfo">
                <UserInfo user={userState} />
              </Menu.Item>
            </Menu.SubMenu>
          )}
        </Menu>
      </Sider>

      {/* Área de contenido */}
      <Layout style={{ padding: "10px" }}>
        <Content>{children}</Content>
      </Layout>
    </Layout>
  );
};

export default AppLayout;

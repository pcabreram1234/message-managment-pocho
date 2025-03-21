import React, { useContext, useState } from "react";
import { Menu } from "antd";
import {
  MessageFilled,
  SettingFilled,
  ContactsFilled,
  OrderedListOutlined,
  HistoryOutlined,
  UserOutlined,
  BarsOutlined,
} from "@ant-design/icons";
import { Typography } from "antd";
import { Link } from "react-router-dom";
import UserInfo from "../layout/UserInfo";
import { AuthContext } from "../../context/UserContext";
import * as jose from "jose";
const MenuBar = () => {
  const { Text } = Typography;
  const state = useContext(AuthContext);
  const { user, handleUser } = state;
  const rawToken = window.localStorage.getItem("token");
  const [userState, setUserState] = useState(
    rawToken ? jose.decodeJwt(rawToken) : user.toString()
  );

  return (
    <Menu
      mode="horizontal"
      theme="dark"
      defaultSelectedKeys={"home"}
      style={{ display: "flex", justifyContent: "left" }}
    >
      <Menu.Item key={"Messages"}>
        <Link to={"/messages"}>
          <Text style={{ color: "white" }}>
            Messages <MessageFilled />
          </Text>
        </Link>
      </Menu.Item>

      <Menu.Item key={"Categories"}>
        <Link to={"/categories"}>
          <Text style={{ color: "white" }}>
            Categories <OrderedListOutlined />
          </Text>
        </Link>
      </Menu.Item>

      <Menu.Item key={"Contacts"}>
        <Link to={"/contacts"}>
          <Text style={{ color: "white" }}>
            Contacts <ContactsFilled />
          </Text>
        </Link>
      </Menu.Item>

      <Menu.Item key={"Configuration Panel"}>
        <Link to={"/configurationPanel"}>
          <Text style={{ color: "white" }}>
            Configuration Panel <SettingFilled />
          </Text>
        </Link>
      </Menu.Item>

      <Menu.Item key={"History Panel"}>
        <Link to={"/historyPanel"}>
          <Text style={{ color: "white" }}>
            History Panel <HistoryOutlined />
          </Text>
        </Link>
      </Menu.Item>

      {userState?.type_user === "adm" && (
        <Menu.Item key={"users"}>
          <Link to={"/users"}>
            <Text style={{ color: "white" }}>
              Users managment <BarsOutlined />
            </Text>
          </Link>
        </Menu.Item>
      )}

      {userState !== null && userState !== undefined && (
        <Menu.SubMenu
          title="User Info"
          icon={<UserOutlined />}
          style={{ marginLeft: "auto" }}
          key={"SubMenUserInfo"}
        >
          <Menu.Item key={"UserInfo"}>
            <UserInfo user={userState} />
          </Menu.Item>
        </Menu.SubMenu>
      )}
    </Menu>
  );
};

export default MenuBar;

import React, { useContext, useEffect } from "react";
import { Menu } from "antd";
import {
  MessageFilled,
  SettingFilled,
  ContactsFilled,
  OrderedListOutlined,
  HistoryOutlined,
  HomeFilled,
  UserOutlined,
  BarsOutlined,
} from "@ant-design/icons";
import { Typography } from "antd";
import { Link } from "react-router-dom";
import UserInfo from "../layout/UserInfo";
import { AuthContext } from "../../context/UserContext";
import { submitData } from "../../utility/submitData";

const MenuBar = () => {
  const { Text } = Typography;
  const state = useContext(AuthContext);
  const { user } = state;
  const API =
    import.meta.env.VITE_API_URL +
    import.meta.env.VITE_API_URL_ROUTER +
    "users/check-auth";

  const onClick = (e) => {
    console.log(e);
    // Solo ejecuta la acción si el ítem clickeado no es "UserInfo"
    if (e.key !== "UserInfo") {
      submitData(API, null, "GET");
    }
  };

  return (
    <Menu
      mode="horizontal"
      theme="dark"
      defaultSelectedKeys={"home"}
      style={{ display: "flex", justifyContent: "left" }}
      onClick={onClick}
    >
      {/* <Menu.Item key={"home"}>
        <Link to={"/"}>
          <HomeFilled />
        </Link>
      </Menu.Item> */}

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

      {user?.type_user === "adm" && (
        <Menu.Item key={"users"}>
          <Link to={"/users"}>
            <Text style={{ color: "white" }}>
              Users managment <BarsOutlined />
            </Text>
          </Link>
        </Menu.Item>
      )}

      {user !== null && user !== undefined && (
        <Menu.SubMenu
          title="User Info"
          icon={<UserOutlined />}
          style={{ marginLeft: "auto" }}
          key={"SubMenUserInfo"}
        >
          <Menu.Item key={"UserInfo"}>
            <UserInfo user={user} />
          </Menu.Item>
        </Menu.SubMenu>
      )}
    </Menu>
  );
};

export default MenuBar;

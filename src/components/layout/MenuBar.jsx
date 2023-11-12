import React, { useContext } from "react";
import { Menu } from "antd";
import {
  MessageFilled,
  SettingFilled,
  ContactsFilled,
  OrderedListOutlined,
  HistoryOutlined,
  HomeFilled,
  UserOutlined,
  PlusCircleOutlined,
  BarsOutlined,
} from "@ant-design/icons";
import { Typography } from "antd";
import { Link } from "react-router-dom";
import UserInfo from "../layout/UserInfo";
import { userInfo } from "../../context/userHookState";
import { useHookstate } from "@hookstate/core";

const MenuBar = () => {
  const { Text } = Typography;
  const state = useContext(useHookstate(userInfo));

  return (
    <Menu
      mode="horizontal"
      theme="dark"
      defaultSelectedKeys={"home"}
      style={{ display: "flex", justifyContent: "left" }}
    >
      <Menu.Item key={"home"}>
        <Link to={"/"}>
          <HomeFilled />
        </Link>
      </Menu.Item>

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
        <Link to={"historyPanel"}>
          <Text style={{ color: "white" }}>
            History Panel <HistoryOutlined />
          </Text>
        </Link>
      </Menu.Item>

      {state !== false &&
        state !== undefined &&
        userInfo.get().type_user === "adm" && (
          // <Menu.SubMenu
          //   title="Users Administration"
          //   key={"UserAdm"}
          //   icon={<UserOutlined />}
          // >
          // <Menu.Item key={"add_user"}>
          //   <Link to={"AddUser"}>
          //     <Text style={{ color: "white" }}>
          //       Add User <PlusCircleOutlined />
          //     </Text>
          //   </Link>
          // </Menu.Item>

          <Menu.Item key={"users"}>
            <Link to={"users"}>
              <Text style={{ color: "white" }}>
                Users managment <BarsOutlined />
              </Text>
            </Link>
          </Menu.Item>
          // </Menu.SubMenu>
        )}

      {state !== false && state !== undefined && (
        <Menu.SubMenu
          title="User Info"
          icon={<UserOutlined />}
          style={{ marginLeft: "auto" }}
          key={"SubMenUserInfo"}
        >
          <Menu.Item key={"UserInfo"}>
            <UserInfo />
          </Menu.Item>
        </Menu.SubMenu>
      )}
    </Menu>
  );
};

export default MenuBar;

import React, { useState } from "react";
import UsersTable from "../components/layout/UsersTable";
import EditUserModal from "../components/modals/EditUserModal";
import { Layout, Typography } from "antd";
import AddUserModal from "../components/modals/AddUserModal";
import AddUserButton from "../components/buttons/AddUserButton";

const { Header, Content } = Layout;
const { Title } = Typography;
const Users = () => {
  const [showEditUserModal, setShowEditUserModal] = useState(false);
  const [showAddUserModal, setShowUserModal] = useState(false);

  return (
    <Layout>
      <Header>
        <Title style={{ color: "white", textAlign: "center" }}>
          Manage Users
        </Title>
      </Header>
      <Content>
        <AddUserButton cb={setShowUserModal} />
        <UsersTable setShowEditUserModal={setShowEditUserModal} />
        {showAddUserModal && (
          <AddUserModal isVisible={showAddUserModal} cb={setShowUserModal} />
        )}
        {showEditUserModal && (
          <EditUserModal
            cb={setShowEditUserModal}
            isVisible={showEditUserModal}
          />
        )}
      </Content>
    </Layout>
  );
};

export default Users;

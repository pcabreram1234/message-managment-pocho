import React, { useState } from "react";
import UsersTable from "../components/layout/UsersTable";
import EditUserModal from "../components/modals/EditUserModal";
import { Layout, Typography } from "antd";

const { Header, Footer, Content } = Layout;
const { Title } = Typography;
const Users = () => {
  const [showEditUserModal, setShowEditUserModal] = useState(false);

  return (
    <Layout>
      <Header>
        <Title style={{ color: "white", textAlign: "center" }}>
          Manage Users
        </Title>
      </Header>
      <Content>
        <UsersTable setShowEditUserModal={setShowEditUserModal} />
        {showEditUserModal && (
          <EditUserModal
            cb={setShowEditUserModal}
            isVisible={showEditUserModal}
          />
        )}
      </Content>
      <Footer></Footer>
    </Layout>
  );
};

export default Users;

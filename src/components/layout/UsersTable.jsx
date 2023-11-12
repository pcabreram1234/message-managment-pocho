import React, { useState } from "react";
import { Table, Button } from "antd";
import { fetchData } from "../../utility/fetchData";
import { EditTwoTone, DeleteTwoTone } from "@ant-design/icons";
import { userToEdit } from "../../context/userHookState";
import { useHookstate } from "@hookstate/core";
import DeleteMessageModal from "../modals/DeleteMessageModal";

const UsersTable = ({ setShowEditUserModal }) => {
  const [userId, setUserId] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [modalMessage, setModalMessage] = useState([]);
  const [alertModalType, setAlertModalType] = useState([]);
  const [modalInfoText, setModalInfoText] = useState([]);

  const API_URL = "http://localhost:3120/api/v1/users";
  const initialData = fetchData(API_URL);
  const dataSource = [];

  const userToEditstate = useHookstate(userToEdit);

  const columns = [
    {
      key: "user_name",
      title: "User name",
      width: "150px",
      dataIndex: "user_name",
    },
    { key: "type_user", title: "Type", width: "50px", dataIndex: "type_user" },
    { key: "email", title: "Email", width: "150px", dataIndex: "email" },
    { key: "active", title: "Active", width: "50px", dataIndex: "active" },
    { key: "edit", title: "Edit", width: "50px", dataIndex: "edit" },
    { key: "delete", title: "Delete", width: "50px", dataIndex: "delete" },
  ];

  const handleEdit = (data) => {
    const { id, user_name, type_user, email } = data;
    userToEditstate.set({
      id: id,
      user_name: user_name,
      type_user: type_user,
      email: email,
    });
    setShowEditUserModal(true);
  };

  const setPopUpModalInfo = (modalMessage, alertModalType, modalInfoText) => {
    setModalMessage(modalMessage);
    setAlertModalType(alertModalType);
    setModalInfoText(modalInfoText);
  };

  const handleDelete = (id) => {
    setShowDeleteModal(true);
    setUserId(id);
  };

  const renderUsers = () => {
    if (initialData.length > 0) {
      initialData.map((user) => {
        dataSource.push({
          key: user.id,
          user_name: user.user_name,
          type_user: user.type_user,
          email: user.email,
          active: user.active.toString(),
          edit: (
            <Button
              onClick={() => {
                handleEdit(user);
              }}
              style={{ borderRadius: "5px" }}
            >
              <EditTwoTone twoToneColor={"blue"} />
            </Button>
          ),
          delete: (
            <Button
              style={{ borderRadius: "5px" }}
              onClick={() => {
                handleDelete(user.id);
              }}
            >
              <DeleteTwoTone twoToneColor={"Red"} />
            </Button>
          ),
        });
      });
    }
  };

  renderUsers();

  return (
    <Table columns={columns} dataSource={dataSource}>
      {showDeleteModal && (
        <DeleteMessageModal
          id={userId}
          setShowDeleteModal={setShowDeleteModal}
          setPopUpModalInfo={setPopUpModalInfo}
          titleModal="Do you want do delete this User?"
        />
      )}
    </Table>
  );
};

export default UsersTable;

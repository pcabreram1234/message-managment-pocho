import React, { useState, useEffect } from "react";
import { Layout, Typography, Table, Tag, Button } from "antd";
import AddCategoryModal from "../components/modals/AddCategoryModal";
import { fetchData } from "../utility/fetchData";
import { PlusCircleFilled, DeleteFilled } from "@ant-design/icons";
import DeleteButton from "../components/buttons/DeleteButton";
import EditCategoryButton from "../components/buttons/EditCategoryButton";
import EditCategoryModal from "../components/modals/EditCategoryModal";
import DeleteCategoryModal from "../components/modals/DeleteCategoryModal";
import DeleteCategoriesModal from "../components/modals/DeleteCategoriesModal";
const { Header, Content } = Layout;
const { Title } = Typography;
const API_URL =
  import.meta.env.VITE_API_URL +
  import.meta.env.VITE_API_URL_ROUTER +
  "categories";
const Categories = () => {
  const [showAddCategoryModal, setAddCategorymodal] = useState(false);
  const [showEditCategoryModal, setShowEditCategoryModal] = useState(false);
  const [showDeleteCategoryModal, setShowDeleteCategoryModal] = useState(false);
  const [showDeleteButton, setShowDeleteButton] = useState(false);
  const [showDeleteCategoriesModal, setShowDeleteCategoriesModal] =
    useState(false);
  const [id, setId] = useState([]);
  const [name, setName] = useState([]);
  const [associateTo, setAssociateTo] = useState([]);
  let categories = fetchData(API_URL);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  let filterValues = [];
  let tableDataSource = [];
  let tableColumns = [
    {
      title: "Category",
      dataIndex: "name",
      key: "name",
      filtered: true,
      sorter: (a, b) =>
        a.name.toString().toLowerCase().charCodeAt(0) >
        b.name.toString().toLowerCase().charCodeAt(0),

      sortDirections: ["ascend", "descend", "ascend"],
      filterSearch: true,
      filters: filterValues,
      onFilter: (value, record) => record.name.indexOf(value) === 0,
    },
    {
      title: "Edit",
      dataIndex: "editButton",
      key: "editButton",
    },
    {
      title: "Delete",
      dataIndex: "deleteButton",
      key: "delete",
    },
  ];

  const setCategoryData = ({ id, name, associateTo }) => {
    setId(id);
    setName(name);
    setAssociateTo(associateTo);
  };

  const renderCategoriesTable = () => {
    if (categories.categories) {
      categories.categories.map((category) => {
        tableDataSource.push({
          key: category.id,
          name: category.categorie_name,
          associate_to: category.associate_to,
          editButton: (
            <EditCategoryButton
              setCategoryData={setCategoryData}
              id={category.id}
              name={category.categorie_name}
              associateTo={category.associate_to}
              setShowEditCategoryModal={setShowEditCategoryModal}
            />
          ),
          deleteButton: (
            <DeleteButton
              id={category.id}
              setId={setId}
              cb={setShowDeleteCategoryModal}
            />
          ),
        });
        filterValues.push({
          text: category.categorie_name,
          value: category.categorie_name,
        });
      });
    }
  };

  const handleShowCategoryModal = () => {
    setAddCategorymodal(true);
  };

  const handleDeleteCategories = () => {
    setShowDeleteCategoriesModal(true);
  };

  const onSelectChange = (key) => {
    setSelectedRowKeys(key);
  };
  const onSelect = (key) => {
    setSelectedRowKeys(key);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
    onSelect: onSelect,
    preserveSelectedRowKeys: true,
    selections: [
      Table.SELECTION_ALL,
      Table.SELECTION_INVERT,
      Table.SELECTION_NONE,
    ],
  };

  /* Renderizada que muestra o no el boton para borrar contacto en caso
  de que se seleccione alguna fila */
  useEffect(() => {
    setId(selectedRowKeys);
    if (selectedRowKeys.length > 1) {
      setShowDeleteButton(true);
    } else {
      setShowDeleteButton(false);
    }
  }, [selectedRowKeys]);

  renderCategoriesTable();
  useEffect(() => {}, []);

  return (
    <Layout>
      <Header>
        <Title style={{ color: "white", textAlign: "center" }}>
          Categories Managment
        </Title>
      </Header>

      <Content
        style={{
          margin: "5px 0 5px 5px",
        }}
      >
        <Button
          type="primary"
          onClick={handleShowCategoryModal}
          style={{
            color: "white",
            backgroundColor: "green",
            borderColor: "transparent",
          }}
        >
          <PlusCircleFilled /> Add Category
        </Button>

        {showDeleteButton && (
          <Button
            type="default"
            onClick={handleDeleteCategories}
            style={{
              color: "white",
              backgroundColor: "rgb(237 43 43)",
              borderColor: "transparent",
            }}
          >
            <DeleteFilled /> Delete Categories
          </Button>
        )}
      </Content>

      <Content>
        <Table
          dataSource={tableDataSource}
          columns={tableColumns}
          rowSelection={rowSelection}
        />
      </Content>

      {showAddCategoryModal && (
        <AddCategoryModal setAddCategorymodal={setAddCategorymodal} />
      )}
      {showEditCategoryModal && (
        <EditCategoryModal
          id={id}
          name={name}
          associate_to={associateTo}
          setShowEditCategoryModal={setShowEditCategoryModal}
        />
      )}

      {showDeleteCategoryModal && (
        <DeleteCategoryModal cb={setShowDeleteCategoryModal} id={id} />
      )}

      {showDeleteCategoriesModal && <DeleteCategoriesModal id={id} />}
    </Layout>
  );
};

export default Categories;

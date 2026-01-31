import React, { useMemo, useState } from "react";
import {
  Layout,
  Typography,
  Table,
  Row,
  Col,
  Button,
  Card,
  Space,
  Tag,
  Empty,
} from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";

import AddCategoryModal from "../components/modals/AddCategoryModal";
import EditCategoryModal from "../components/modals/EditCategoryModal";
import DeleteCategoryModal from "../components/modals/DeleteCategoryModal";
import DeleteCategoriesModal from "../components/modals/DeleteCategoriesModal";
import { fetchData } from "../utility/fetchData";

const { Header, Content } = Layout;
const { Title, Text } = Typography;

const API_URL =
  import.meta.env.VITE_API_URL +
  import.meta.env.VITE_API_URL_ROUTER +
  "categories";

const Categories = () => {
  /* =====================
     Data fetching
  ====================== */
  const categories = fetchData(API_URL);

  /* =====================
     State
  ====================== */
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [activeCategory, setActiveCategory] = useState(null);

  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showDeleteOne, setShowDeleteOne] = useState(false);
  const [showDeleteMany, setShowDeleteMany] = useState(false);

  /* =====================
     DataSource (useMemo)
  ====================== */
  const dataSource = useMemo(
    () =>
      categories?.categories?.map((cat) => ({
        key: cat.id,
        id: cat.id,
        name: cat.categorie_name,
        associate_to: cat.associate_to,
      })) || [],
    [categories],
  );

  /* =====================
     Columns (useMemo)
  ====================== */
  const columns = useMemo(
    () => [
      {
        title: "Category",
        dataIndex: "name",
        key: "name",
        sorter: (a, b) => a.name.localeCompare(b.name),
      },
      {
        title: "Associated To",
        dataIndex: "associate_to",
        key: "associate_to",
        render: (value) => {
          if (value === "both") {
            return (
              <Space>
                <Tag color="blue">Campaigns</Tag>
                <Tag color="green">Messages</Tag>
              </Space>
            );
          } else if (value === "none") {
            return (
              <Space>
                <Tag color="gray">None</Tag>
              </Space>
            );
          }
          return value === "campaign" ? (
            <Tag color="blue">Campaigns</Tag>
          ) : (
            <Tag color="green">Messages</Tag>
          );
        },
      },
      {
        title: "Actions",
        key: "actions",
        render: (_, record) => (
          <Space>
            <Button
              type="text"
              icon={<EditOutlined />}
              onClick={() => {
                setActiveCategory(record);
                setShowEdit(true);
              }}
            />
            <Button
              type="text"
              danger
              icon={<DeleteOutlined />}
              onClick={() => {
                setActiveCategory(record);
                setShowDeleteOne(true);
              }}
            />
          </Space>
        ),
      },
    ],
    [],
  );

  /* =====================
     Row selection
  ====================== */
  const rowSelection = {
    selectedRowKeys,
    onChange: setSelectedRowKeys,
  };

  return (
    <Layout>
      {/* =====================
          Header
      ====================== */}
      <Header style={{ background: "transparent", padding: 0 }}>
        <Row justify="space-between" align="middle">
          <Col>
            <Title level={3} style={{ marginBottom: 0 }}>
              Categories
            </Title>
            <Text type="secondary">
              Manage how you organize messages and campaigns
            </Text>
          </Col>

          <Col>
            <Space>
              {selectedRowKeys.length > 0 && (
                <Button danger onClick={() => setShowDeleteMany(true)}>
                  Delete ({selectedRowKeys.length})
                </Button>
              )}

              <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={() => setShowAdd(true)}
              >
                New Category
              </Button>
            </Space>
          </Col>
        </Row>
      </Header>

      {/* =====================
          Content
      ====================== */}
      <Content style={{ marginTop: 16 }}>
        <Card>
          <Table
            rowSelection={rowSelection}
            columns={columns}
            dataSource={dataSource}
            loading={!categories?.categories}
            pagination={{ pageSize: 10, showSizeChanger: true }}
            locale={{
              emptyText: (
                <Empty
                  description={
                    "No categories yet. Categories help you organize messages and campaigns."
                  }
                >
                  <Button type="primary" onClick={() => setShowAdd(true)}>
                    Create your first category
                  </Button>
                </Empty>
              ),
            }}
          />
        </Card>
      </Content>

      {/* =====================
          Modals
      ====================== */}
      {showAdd && <AddCategoryModal setAddCategorymodal={setShowAdd} />}

      {showEdit && activeCategory && (
        <EditCategoryModal
          id={activeCategory.id}
          name={activeCategory.name}
          associate_to={activeCategory.associate_to}
          setShowEditCategoryModal={setShowEdit}
        />
      )}

      {showDeleteOne && activeCategory && (
        <DeleteCategoryModal id={activeCategory.id} cb={setShowDeleteOne} />
      )}

      {showDeleteMany && (
        <DeleteCategoriesModal
          id={selectedRowKeys}
          setShowDeleteCategoriesModal={setShowDeleteMany}
        />
      )}
    </Layout>
  );
};

export default Categories;

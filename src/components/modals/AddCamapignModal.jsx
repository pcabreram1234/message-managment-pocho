import React, { useEffect, useState } from "react";
import {
  Modal,
  Form,
  Input,
  DatePicker,
  Select,
  Descriptions,
  Button,
  List,
  Divider,
  Typography,
  Space,
  Tooltip,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { openNotification } from "../Notification";
import { fetchData } from "../../utility/fetchData";
import useSubmitData from "../../hooks/useSubmitData";
import AddMessageModalToPool from "./AddMessagesToCampaign";

const { RangePicker } = DatePicker;
const { Option } = Select;
const { Text } = Typography;

const AddCamapignModal = ({
  showAddCampaignModal,
  setShowAddcamapginModal,
  handleNewTableItem,
}) => {
  const [form] = Form.useForm();
  const [messages, setMessages] = useState([]); // Lista de plantillas asociadas
  const [showCreateMessageModal, setShowCreateMessageModal] = useState(false);

  const { submitData } = useSubmitData();

  const API_CATEGORY_URL =
    import.meta.env.VITE_API_URL +
    import.meta.env.VITE_API_URL_ROUTER +
    "categories";

  const API_ASSOCIATE_TO_URL =
    import.meta.env.VITE_API_URL +
    import.meta.env.VITE_API_URL_ROUTER +
    "contacts";

  const API_MESSAGES_URL =
    import.meta.env.VITE_API_URL +
    import.meta.env.VITE_API_URL_ROUTER +
    "messages";

  const API_CAMPAIGNS =
    import.meta.env.VITE_API_URL +
    import.meta.env.VITE_API_URL_ROUTER +
    "campaigns/createCamapign";

  const contacts = fetchData(API_ASSOCIATE_TO_URL);
  const categories = fetchData(API_CATEGORY_URL);
  const availableMessages = fetchData(API_MESSAGES_URL);

  const handleSubmit = () => {
    form.validateFields().then((values) => {
      const [startDate, endDate] = values.dates;
      const newCampaign = {
        name: values.name,
        description: values.description,
        category: values.category,
        start_date: startDate.format("YYYY-MM-DD"),
        end_date: endDate.format("YYYY-MM-DD"),
        status: values.status,
        recipients: values.recipients,
        messages: messages.map((m) => m.value),
      };

      submitData(API_CAMPAIGNS, newCampaign, "POST")
        .then((resp) => {
          handleNewTableItem(resp?.result);
        })
        .then(() => {
          setShowAddcamapginModal(false);
          openNotification("Great", "Campaign saved successfully", "success");
        })
        .catch((err) => {
          console.log(err);
          openNotification("Oops", "Error: " + err?.message, "error");
        });
    });
  };

  useEffect(() => {
    form.resetFields();
    setMessages([]);
  }, [showAddCampaignModal]);

  const handleAddMessage = (value) => {
    if (!messages.find((msg) => msg.value === value.value)) {
      setMessages((prev) => [...prev, value]);
    }
  };

  const handleRemoveMessage = (id) => {
    setMessages((prev) => prev.filter((msg) => msg.value !== id));
  };

  return (
    <Modal
      title={"New campaign"}
      open={showAddCampaignModal}
      onCancel={() => setShowAddcamapginModal(false)}
      onOk={handleSubmit}
      okText={"Create"}
      width={700}
    >
      <Form layout="vertical" form={form}>
        <Form.Item
          name="name"
          label="Campaign Name"
          rules={[{ required: true }]}
        >
          <Input placeholder="E.g. Welcome Campaign" />
        </Form.Item>
        <Form.Item name="description" label="Description">
          <Input.TextArea rows={2} />
        </Form.Item>
        <Form.Item
          name="dates"
          label="Dates Range"
          rules={[{ required: true }]}
        >
          <RangePicker format="YYYY-MM-DD" />
        </Form.Item>

        <Form.Item
          name="recipients"
          label="Contacts"
          rules={[{ required: true }]}
        >
          <Select
            mode="multiple"
            style={{ width: "100%" }}
            allowClear
            labelInValue
            filterOption={(input, option) =>
              option.children.toLowerCase().includes(input.toLowerCase())
            }
            options={contacts?.map((contact) => ({
              label: contact?.email,
              value: contact?.id,
              key: contact?.id,
            }))}
          />
        </Form.Item>
        <Form.Item
          name="category"
          label="Category"
          rules={[{ required: true }]}
        >
          <Select placeholder="Select a Category">
            {categories?.categories?.map((category) => {
              return (
                <Option value={category?.categorie_name}>
                  {category?.categorie_name}
                </Option>
              );
            })}
          </Select>
        </Form.Item>

        <Form.Item name="status" label="Status">
          <Select placeholder="Select a status">
            <Option value="pending">Pending</Option>
            <Option value="active">Active</Option>
            <Option value="paused">Paused</Option>
          </Select>
        </Form.Item>

        <Divider />
        <Text strong>Associate Message Templates</Text>
        <Space direction="vertical" style={{ width: "100%" }}>
          <Select
            showSearch
            placeholder="Search or select a message"
            style={{ width: "100%" }}
            filterOption={(input, option) =>
              option.children.toLowerCase().includes(input.toLowerCase())
            }
            onSelect={(value, option) =>
              handleAddMessage({ value, label: option.children })
            }
          >
            {availableMessages?.result?.map((msg) => (
              <Option key={msg.id} value={msg.id}>
                {msg.message}
              </Option>
            ))}
          </Select>

          <List
            size="small"
            bordered
            dataSource={messages}
            renderItem={(item) => (
              <List.Item
                actions={[
                  <Button
                    type="link"
                    danger
                    onClick={() => handleRemoveMessage(item.value)}
                  >
                    Remove
                  </Button>,
                ]}
              >
                {item.label}
              </List.Item>
            )}
          />

          <Tooltip title='When creating new messages for this campaign, they can be viewed in the "messages section.'>
            <Button
              type="dashed"
              icon={<PlusOutlined />}
              onClick={() => setShowCreateMessageModal(true)}
            >
              Create new message
            </Button>
          </Tooltip>
        </Space>
      </Form>

      <Descriptions
        title="More Info"
        column={1}
        contentStyle={{ flex: "1", textAlign: "justify" }}
        style={{ marginTop: 24 }}
      >
        <Descriptions.Item label="Campaigns">
          Campaigns are automatically created with the status "pending" if this
          field is left empty. You can choose the status you want from the
          dropdown menu above.
        </Descriptions.Item>
        <Descriptions.Item label="Contacts">
          You can create the campaign without contacts and then add them as you
          see fit.
        </Descriptions.Item>
        <Descriptions.Item label="Messages">
          You can associate one or more predefined templates to this campaign.
          Each message will be sent depending on the selected channel.
        </Descriptions.Item>
      </Descriptions>

      {showCreateMessageModal && (
        <AddMessageModalToPool
          visible={showCreateMessageModal}
          handleCancel={() => setShowCreateMessageModal(false)}
        />
      )}
    </Modal>
  );
};

export default AddCamapignModal;

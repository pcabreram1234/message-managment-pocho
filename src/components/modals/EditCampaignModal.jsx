import React, { useImperativeHandle, useEffect, useState } from "react";
import {
  Modal,
  Form,
  Input,
  DatePicker,
  Select,
  Descriptions,
  Button,
} from "antd";
import { openNotification } from "../Notification";
import { fetchData } from "../../utility/fetchData";
import useSubmitData from "../../hooks/useSubmitData";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);

const { RangePicker } = DatePicker;
const { Option } = Select;

const EditCampaignModal = ({
  showEditCampaignModal,
  setShowEditCampaignModal,
  updateCampaignsTable,
  campaignData,
}) => {
  const [form] = Form.useForm();
  const { submitData } = useSubmitData();
  const [loading, setLoading] = useState(true);
  const [contacts, setContacts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedContacts, setSelectedContacs] = useState([]);

  const API_CATEGORY_URL =
    import.meta.env.VITE_API_URL +
    import.meta.env.VITE_API_URL_ROUTER +
    "categories";

  const API_ASSOCIATE_TO_URL =
    import.meta.env.VITE_API_URL +
    import.meta.env.VITE_API_URL_ROUTER +
    "contacts";

  const API_CAMPAIGNS_UPDATE =
    import.meta.env.VITE_API_URL +
    import.meta.env.VITE_API_URL_ROUTER +
    `campaigns/updateCampaign`;

  const API_RECIPIENTS_BY_CAMPAIGNS =
    import.meta.env.VITE_API_URL +
    import.meta.env.VITE_API_URL_ROUTER +
    `campaigns/getSelectedRecipientsByCampaign`;

  const loadContacsAndCategorires = () => {
    submitData(API_ASSOCIATE_TO_URL, "", "GET")
      .then((contacts) => {
        setContacts(contacts);
      })
      .then(() => {
        submitData(API_CATEGORY_URL, "", "GET").then((categories) => {
          setCategories(categories);
        });
      })
      .then(() => {
        submitData(
          `${API_RECIPIENTS_BY_CAMPAIGNS}/${campaignData?.id}`,
          "",
          "GET"
        ).then((rbc) => {
          setSelectedContacs(rbc);
          form.setFieldValue("recipients", rbc);
          form.setFieldValue("category", campaignData?.category);
        });
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleSubmit = () => {
    form.validateFields().then((values) => {
      const [startDate, endDate] = values.dates;
      const updatedCampaign = {
        name: values.name,
        description: values.description,
        category: values.category,
        start_date: startDate.format("YYYY-MM-DD"),
        end_date: endDate.format("YYYY-MM-DD"),
        status: values.status,
        recipients: values.recipients,
        id: campaignData?.id,
      };

      submitData(API_CAMPAIGNS_UPDATE, updatedCampaign, "POST")
        .then((resp) => {
          if (resp === 1) {
            setShowEditCampaignModal(false);
            openNotification(
              "Success",
              "Campaign updated successfully",
              "success"
            );
            const campaignUpdate = {
              ...updatedCampaign,
              contacts: form.getFieldValue("recipients")?.length,
            };
            updateCampaignsTable(campaignUpdate);
          }
        })
        .catch((err) => {
          openNotification("Error", "Error: " + err?.message, "error");
        });
    });
  };

  useEffect(() => {
    if (campaignData && showEditCampaignModal) {
      form.setFieldsValue({
        name: campaignData.name,
        description: campaignData.description,
        category: campaignData.category,
        dates: [
          campaignData.start_date ? dayjs(campaignData.start_date) : null,
          campaignData.end_date ? dayjs(campaignData.end_date) : null,
        ],
        status: campaignData.status,
        recipients: campaignData.recipients?.map((r) => ({
          label: r.email,
          value: r.id,
        })),
      });
    }
  }, [campaignData, showEditCampaignModal]);

  return (
    <Modal
      title="Edit Campaign"
      open={showEditCampaignModal}
      onCancel={() => setShowEditCampaignModal(false)}
      // onOk={handleSubmit}
      // okText="Update"
      okButtonProps={{ style: { display: "none" } }}
      cancelButtonProps={{ style: { display: "none" } }}
      loading={loading}
      afterOpenChange={() => loadContacsAndCategorires()}
    >
      <Form layout="vertical" form={form}>
        <Form.Item
          name="name"
          label="Campaign Name"
          rules={[{ required: true }]}
        >
          <Input placeholder="Campaign name" />
        </Form.Item>
        <Form.Item name="description" label="Description">
          <Input.TextArea rows={4} />
        </Form.Item>
        <Form.Item name="dates" label="Date Range" rules={[{ required: true }]}>
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
            value={selectedContacts}
            options={contacts?.map((contact) => ({
              label: contact?.email,
              value: contact?.id,
            }))}
          />
        </Form.Item>
        <Form.Item
          name="category"
          label="Category"
          rules={[{ required: true }]}
        >
          <Select
            placeholder="Select a Category"
            // value={campaignData?.category}
            defaultValue={campaignData?.category}
          >
            {categories?.categories?.map((category) => (
              <Option
                key={category?.categorie_name}
                value={category?.categorie_name}
              >
                {category?.categorie_name}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item name="status" label="Status">
          <Select placeholder="Select a status">
            <Option value="pending">Pending</Option>
            <Option value="active">Active</Option>
            <Option value="paused">Paused</Option>
          </Select>
        </Form.Item>

        <Form.Item label={null}>
          <Button
            onClick={() => setShowEditCampaignModal(false)}
            style={{ margin: "0 10px" }}
          >
            Cancel
          </Button>
          <Button
            style={{ margin: "0 10px" }}
            type="primary"
            htmlType="submit"
            onClick={() => handleSubmit()}
          >
            Update
          </Button>
        </Form.Item>
      </Form>

      <Descriptions title="More Info" column={1}>
        <Descriptions.Item label="Campaigns">
          The status defaults to "pending" if not specified. You can modify it
          using the dropdown.
        </Descriptions.Item>
        <Descriptions.Item label="Contacts">
          Contacts can be added or removed even after the campaign is created.
        </Descriptions.Item>
      </Descriptions>
    </Modal>
  );
};

export default EditCampaignModal;

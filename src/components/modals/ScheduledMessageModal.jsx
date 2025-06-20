import React, { useEffect, useState } from "react";
import {
  Modal,
  Select,
  DatePicker,
  message as antdMessage,
  Form,
  Typography,
  Descriptions,
} from "antd";
import useSubimitData from "../../hooks/useSubmitData";
import dayjs from "dayjs";
import { openNotification } from "../Notification";
import { useActionContext } from "../../context/ActionContext";

const { RangePicker } = DatePicker;
const { Title } = Typography;

const ScheduleMessageModal = ({
  id,
  cbShowModal,
  showModal,
  cbShowParentModal,
}) => {
  const [contacts, setContacts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedContacts, setSelectedContacts] = useState([]);
  const [dateRange, setDateRange] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form] = Form.useForm();
  const { submitData } = useSubimitData();
  const { dispatchAction } = useActionContext;

  const API_URL =
    import.meta.env.VITE_API_URL +
    import.meta.env.VITE_API_URL_ROUTER +
    "contacts";

  const API_CATEGORY_URL =
    import.meta.env.VITE_API_URL +
    import.meta.env.VITE_API_URL_ROUTER +
    "categories";

  const API_SCHEDULED_MESSAGES =
    import.meta.env.VITE_API_URL +
    import.meta.env.VITE_API_URL_ROUTER +
    "configuration/scheduleMessages";

  useEffect(() => {
    submitData(API_URL, "", "GET")
      .then((resp) => {
        setContacts(resp);
        submitData(API_CATEGORY_URL, "", "GET").then((resp) => {
          setCategories(resp);
        });
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleOk = () => {
    if (!selectedContacts.length || !dateRange.length) {
      return antdMessage.warning("Please select contacts and a date range.");
    }

    const payload = {
      message: id,
      contacts: selectedContacts,
      startDate: dateRange[0].toISOString(),
      endDate: dateRange[1].toISOString(),
      categories: form.getFieldValue("categories"),
    };
    console.log(payload);
    submitData(API_SCHEDULED_MESSAGES, payload, "POST")
      .then((resp) => {
        if (resp?.rowsInserted > 0) {
          openNotification(
            "Messages Saved",
            "Your messages has been configured to send later",
            "success"
          );
          cbShowModal(false);
          dispatchAction("update", "dashboard-overview");
          dispatchAction("update", "dashboard-individual-messages-about-to-sent");
          setTimeout(() => {
            cbShowParentModal();
          }, 500);
        }
      })
      .catch((err) => {
        openNotification("Error trying to configured", err?.message, "error");
      });
  };

  const handleClose = () => {
    cbShowModal(false);
    form.resetFields("");
  };

  return (
    <Modal
      title="Schedule Message"
      open={showModal}
      onCancel={() => handleClose()}
      onClose={() => handleClose()}
      onOk={handleOk}
      okText="Confirm Schedule"
      cancelText="Cancel"
    >
      <Form layout="vertical" form={form}>
        <Form.Item name="categories" label="Category">
          <Select
            placeholder="Select a Category"
            allowClear={true}
            mode="multiple"
          >
            {categories?.categories?.map((category) => {
              return (
                <Option value={category?.categorie_name}>
                  {category?.categorie_name}
                </Option>
              );
            })}
          </Select>
        </Form.Item>
        <Form.Item label="Select recipients" name="recipients">
          <Select
            mode="multiple"
            allowClear
            placeholder="Select one or more contacts"
            value={selectedContacts}
            onChange={setSelectedContacts}
            loading={loading}
            options={contacts.map((contact) => ({
              label: contact.email || contact.phone,
              value: contact.id,
            }))}
          />
        </Form.Item>

        <Form.Item label="Select date range" name="dateRange">
          <RangePicker
            format="YYYY-MM-DD"
            onChange={(dates) => setDateRange(dates)}
            disabledDate={(current) =>
              current && current < dayjs().startOf("day")
            }
          />
        </Form.Item>
      </Form>

      <Descriptions title="More Info" column={1}>
        <Descriptions.Item
          label="Schedule Messages"
          styles={{ label: { fontWeight: "bold" } }}
        >
          By selecting one or more contacts, the predefined message(s) will be
          saved to be sent automatically every day at the current time, from the
          start date to the selected end date.
        </Descriptions.Item>
      </Descriptions>
    </Modal>
  );
};

export default ScheduleMessageModal;

import React from "react";
import { Modal, Form, Input, message } from "antd";
import { submitData } from "../../utility/submitData";

const API_URL =
  import.meta.env.VITE_API_URL +
  import.meta.env.VITE_API_URL_ROUTER +
  "messages/addMessage";
const { TextArea } = Input;

const AddMessageModalToPool = ({ visible, handleCancel }) => {
  const [form] = Form.useForm();

  const handleSubmit = () => {
    form.validateFields().then(async (values) => {
      const req = await submitData(API_URL, values);
      if (req?.message) {
        message.error(`Error: ${req?.message}`);
      } else {
        message.success("Message Saved, now you can select it from the message list");
        handleCancel();
      }
    });
  };

  return (
    <Modal
      title="Create new message"
      open={visible}
      onCancel={() => handleCancel()}
      onOk={handleSubmit}
      okText="Save"
      cancelText="Cancel"
    >
      <Form layout="vertical" form={form}>
        <Form.Item
          name="message"
          label="Content"
          rules={[
            { required: true, message: "The Message is too short", min: 10 },
          ]}
        >
          <TextArea rows={4} placeholder="Write your message here..." />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddMessageModalToPool;

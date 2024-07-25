import React, { useState, useContext } from "react";
import SelectContacts from "../buttons/SelectContacts";
import { SaveFilled } from "@ant-design/icons";
import { Form, Input, Modal } from "antd";
import { submitData } from "../../utility/submitData";
import { onlyLetters } from "../../utility/patternsInput";
import { AuthContext } from "../../context/UserContext";

const API_URL = "http://localhost:3120/api/v1/categories/addCategory";

const AddCategoryModal = ({ setAddCategorymodal }) => {
  const [showModal, setShowModal] = useState(true);
  const [associateTo, setAssociateTo] = useState([]);
  const userInfo = useContext(UserContext);

  const [form] = Form.useForm();

  const onCancel = () => {
    setShowModal(false);
    setAddCategorymodal(false);
  };

  const validateForm = () => {
    form.validateFields().then((field) => {
      if (!field.errorFields) {
        handleSubmit();
      } else {
        let err = [];
        for (let i = 0; i < field.errorFields.length; i++) {
          err.push(field.errorFields[i].errors[i]);
        }
        alert(err);
      }
    });
  };

  const handleSubmit = () => {
    const data = {
      categorie_name: form.getFieldValue("category"),
      associateTo: associateTo,
      userId: userInfo.id,
    };
    setTimeout(() => {
      submitData(API_URL, data)
        .then((resp) => {
          if (resp.message) {
            /* En esta parte agregar el componen PopModal para que muestre 
            en el Spin el error */
            alert(resp.message);
          } else {
            onCancel();
            setTimeout(() => {
              location.href = "";
            }, 500);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }, 500);
  };

  return (
    <Modal
      visible={showModal}
      title="Adding a new category"
      closable
      onCancel={onCancel}
      okButtonProps={{
        icon: <SaveFilled />,
        type: "primary",
        htmlType: "submit",
      }}
      okText="Save"
      onOk={validateForm}
    >
      <Form form={form}>
        <Form.Item
          label="Category name"
          name={"category"}
          required
          rules={[
            { required: true },
            { min: 3, message: "Min 3 characters" },
            { type: "string" },
            {
              pattern: /([a-zA-Z-\s-\D])/,
              message: "Only characters are allowed",
            },
          ]}
        >
          <Input
            autoFocus
            placeholder="Introduce your category name"
            onChange={(c) => {
              form.setFieldsValue({
                category: onlyLetters(c),
              });
            }}
          />
        </Form.Item>

        <Form.Item label="Associate to" name={"Associate_to"}>
          <SelectContacts setAssociateTo={setAssociateTo} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddCategoryModal;

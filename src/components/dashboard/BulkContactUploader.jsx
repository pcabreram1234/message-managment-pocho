import React, { useState } from "react";
import { Upload, Button, Table, message, Typography, Modal } from "antd";
import { UploadOutlined, InboxOutlined } from "@ant-design/icons";
import useSubmitData from "../../hooks/useSubmitData";
import Papa from "papaparse";

const { Title, Text } = Typography;
const { Dragger } = Upload;

const BulkContactUploader = ({ showModal, cbShowModal }) => {
  const [contacts, setContacts] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const { submitData } = useSubmitData();

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Phone",
      dataIndex: "phone",
    },
  ];

  const handleFile = (file) => {
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: function (results) {
        const validContacts = results.data.filter(
          (row) => row.name && (row.email || row.phone)
        );

        if (validContacts.length === 0) {
          message.error("No valid contacts were found in the file.");
          return;
        }

        setContacts(validContacts);
        setModalVisible(true);
      },
    });
    return false; // prevent default upload behavior
  };

  const handleImport = (data) => {
    const API_UPLOAD_CONTACTS =
      import.meta.env.VITE_API_URL +
      import.meta.env.VITE_API_URL_ROUTER +
      "contacts/uploadContacts";
    // Aquí llamarías a tu backend para guardar los contactos

    submitData(API_UPLOAD_CONTACTS, contacts, "POST");
    // message.success(`${contacts.length} contacts imported successfully.`);
    // setModalVisible(false);
    // setContacts([]);
  };

  return (
    <div>
      <Modal
        open={showModal}
        onCancel={() => cbShowModal(false)}
        okButtonProps={{ style: { display: "none" } }}
        cancelButtonProps={{ style: { display: "none" } }}
      >
        <Title level={4}>Upload contacts in bulk</Title>
        <Text type="secondary">
          Accepted format: CSV with columns name, email, phone
        </Text>

        <Dragger
          multiple={false}
          showUploadList={false}
          beforeUpload={handleFile}
          accept=".csv"
          style={{ marginTop: 16 }}
        >
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">Click or drag a CSV file here</p>
        </Dragger>

        <Modal
          title="Previsualizar contactos a importar"
          open={modalVisible}
          onCancel={() => setModalVisible(false)}
          onOk={handleImport}
          okText="Importar"
          cancelText="Cancelar"
          width={700}
        >
          <Table
            dataSource={contacts}
            columns={columns}
            rowKey={(record, index) => index}
            pagination={{ pageSize: 5 }}
            bordered
          />
        </Modal>
      </Modal>
    </div>
  );
};

export default BulkContactUploader;

import React, { useState } from "react";
import { Row, Col, Input, Button, Typography } from "antd";
import SendToButton from "../buttons/SendToButton";
import AsociateTo from "../buttons/AsociateTo";
import CurrentCategories from "../buttons/CurrentCategories";
import AsociateToModal from "../modals/AsociateToModal";
import { EditFilled, DeleteOutlined } from "@ant-design/icons";
import { submitData } from "../../utility/submitData";
import "../../styles/MessageRow.css";

const { Text } = Typography;

const MessageRow = (props) => {
  const [id, setId] = useState([props.id]);
  const [message, setMessage] = useState(props.message);
  const [categories, setCategories] = useState([props.categories] || []);
  const [associate_to, setassociate_to] = useState(props.associate_to);
  const [showAsociateModal, setShowAsociateModal] = useState(false);
  const { TextArea } = Input;
  const { handleModal, startLoading, setShowSendToModal, setMessageToSend } =
    props;

  const API_EDIT_URL = "http://localhost:3120/api/v1/messages/editMessage/";
  const APIT_DELETE_URL =
    "http://localhost:3120/api/v1/messages/deleteMessage/";

  const handleEditMessage = () => {
    const body = {
      id: id,
      message: message,
      categories: categories,
      associate_to: associate_to,
    };

    const req = submitData(API_EDIT_URL, body, "PATCH").then((resp) => {
      let DataToSendToModal = {
        message: "Guardando cambios",
        alertType: "success",
        infoText: "Cambios guardados",
      };
      const { message, alertType, infoText } = DataToSendToModal;
      /* El servidor envia una respuesta tipo number por lo que solo se debe usar un
      operador igual */
      if ((resp = 1)) {
        handleModal(message, alertType, infoText);
      } else {
        handleModal(message, "error", "Ha ocurrido un error");
      }
    });
  };

  const handleDeleteMessage = () => {
    const body = {
      id: id,
    };
    const req = submitData(APIT_DELETE_URL, body, "DELETE").then((resp) => {
      let DataToSendToModal = {
        message: "Eliminando Mensaje",
        alertType: "success",
        infoText: "Mensaje Eliminado",
      };
      const { message, alertType, infoText } = DataToSendToModal;
      if ((resp = 1)) {
        handleModal(message, alertType, infoText);
      } else {
        handleModal(message, "error", "Ha ocurrido un error");
      }
    });
  };

  const getCurrentCategories = (selectedCategories) => {
    setCategories(selectedCategories);
  };

  return (
    <Row
      style={{
        justifyContent: "space-evenly",
        padding: "10px 5px",
        width: "auto",
        display: "flex",
        flexDirection: "column",
        alignItems: "stretch",
        borderRadius: "10px",
        border: "1px solid gray",
      }}
      className="MessageRow"
    >
      <Col span={12}>
        <Input.Group>
          <Input type={"hidden"} value={props.id} />
          <TextArea
            showCount
            maxLength={100}
            style={{ height: 120 }}
            type={"text"}
            value={message}
            onChange={(e) => {
              setMessage(e.currentTarget.value);
            }}
          />
        </Input.Group>
      </Col>
      <Col style={{ display: "flex" }} span={12}>
        <SendToButton
          setShowSendToModal={setShowSendToModal}
          setMessageToSend={setMessageToSend}
          message={message}
        />
        <AsociateTo setShowAsociateModal={setShowAsociateModal} />
      </Col>

      <Col
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
        span={12}
      >
        <Text strong>Current Categories</Text>
        <CurrentCategories
          categories={props.categories}
          getCurrentCategories={getCurrentCategories}
        />
      </Col>

      <Col
        style={{ display: "flex", justifyContent: "space-evenly" }}
        span={12}
      >
        <Button type="default">
          <EditFilled
            style={{ fontSize: "25px", color: "#37a548" }}
            onClick={() => {
              startLoading(handleEditMessage(id));
            }}
          />
        </Button>
        <Button
          type="default"
          onClick={() => {
            startLoading(handleDeleteMessage());
          }}
        >
          <DeleteOutlined style={{ fontSize: "25px", color: "#aa5368" }} />
        </Button>
      </Col>

      {showAsociateModal && (
        <AsociateToModal
          setShowAsociateModal={setShowAsociateModal}
          messageId={id}
        />
      )}
    </Row>
  );
};

export default MessageRow;

import React, { useState } from "react";
import { Input, Button } from "antd";
import { submitData } from "../utility/submitData";

const AddMessage = (props) => {
  const [message, setMessage] = useState([]);
  const { startLoading, handleModal } = props;

  const handleInput = (e) => {
    setMessage(e.target.value);
  };
  const API_URL = "http://localhost:3120/api/v1/messages/addMessage";

  const handleSubmit = () => {
    let DataToSendToModal = {
      modalMessage: "Guardando Mensaje",
      alertType: "success",
      infoText: "Cambios guardados",
    };
    const { modalMessage, alertType, infoText } = DataToSendToModal;
    const req = submitData(API_URL, message).then((resp) => {
      console.log(message);
      if ((resp = 1)) {
        handleModal(modalMessage, alertType, infoText);
      } else {
        handleModal(modalMessage, "error", "Ha ocurrido un error");
      }
    });
    setMessage("");
  };

  return (
    <div className="AddMessage_input_container">
      <Input.Group compact>
        <Input
          style={{ width: "calc(100% - 200px)", textAlign: "center" }}
          type={"text"}
          placeholder="Write your message"
          value={message}
          onChange={handleInput}
        ></Input>
        <Button
          type="primary"
          onClick={() => {
            startLoading(handleSubmit());
          }}
        >
          Add Message
        </Button>
      </Input.Group>
    </div>
  );
};

export default AddMessage;

import React from "react";
import { fetchData } from "../../utility/fetchData";
import MessageRow from "./MessageRow";

const MessageMant = ({
  handleModal,
  startLoading,
  setShowSendToModal,
  setMessageToSend,
}) => {
  const API_URL =
    import.meta.env.VITE_API_URL +
    import.meta.env.VITE_API_URL_ROUTER +
    "messages";
  let data = [];

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, auto)",
        gridTemplateRows: "auto",
        gridGap: "40px",
        padding: "0 5px",
        margin: "10px 0",
      }}
    >
      {(data = fetchData(API_URL)) &&
        data.map((message) => {
          return (
            <MessageRow
              id={message.id}
              message={message.message}
              categories={message.categories}
              key={Math.random() * 0.2}
              handleModal={handleModal}
              startLoading={startLoading}
              setShowSendToModal={setShowSendToModal}
              setMessageToSend={setMessageToSend}
            />
          );
        })}
    </div>
  );
};

export default MessageMant;

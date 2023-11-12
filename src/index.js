import React from "react";
import ReactDOM from "react-dom";
import App from "./routes/App.js";
import { BrowserRouter } from "react-router-dom";
import "../node_modules/antd/dist/antd.css";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

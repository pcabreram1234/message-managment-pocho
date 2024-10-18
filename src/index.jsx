import React from "react";
import ReactDOM from "react-dom";
import App from "./routes/App.jsx";
import { AuthProvider } from "./context/UserContext.jsx";
import { BrowserRouter } from "react-router-dom";
import "../node_modules/antd/dist/antd.css";

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

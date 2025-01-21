import React from "react";

import App from "./routes/App.jsx";
import { AuthProvider } from "./context/UserContext.jsx";
import { BrowserRouter } from "react-router-dom";
import "../node_modules/antd/dist/reset.css";
import * as serviceWorker from "./serviceWorker";
import { createRoot } from "react-dom/client";

// serviceWorker.unregister();
const container = document.getElementById("root");

const root = createRoot(container);
root.render(
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>
);

// serviceWorker.register();

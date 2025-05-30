import React, { useContext, useEffect, useState } from "react";
import Contacts from "../containers/Contacts";
import Categories from "../containers/Categories";
import MessageTable from "../containers/MessageTable";
import ConfigurationPanel from "../containers/ConfigurationPanel";
import HistoRyPanel from "../containers/HistoryPanel";
import AppLayout from "../components/layout/MenuBar";
import NotFound from "../containers/NotFound";
import LogInForm from "../components/forms/LoginForm";
import Users from "../containers/Users";
import AccountVerification from "../containers/AccountVerification";
import PopUpModal from "../components/modals/PopUpModal";
import FooterPage from "../components/layout/Footer";
import Dashboard from "../containers/Dashboard";
import Campaigns from "../containers/Campaigns";
import Settings from "../containers/Settings";
import {
  Route,
  Routes,
  Navigate,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { AuthContext } from "../context/UserContext";
import { openNotification } from "../components/Notification";
import { submitData } from "../utility/submitData";
import "../styles/App.css";

const App = () => {
  const state = useContext(AuthContext);
  const { user, handleUser } = state; // Obtiene el usuario y la función para manejar el estado del usuario
  const [loading, setLoading] = useState(true); // Estado de carga
  const location = useLocation();
  const history = useNavigate(); // Hook para redirecciones programáticas

  // useEffect para verificar la autenticación solo al recargar la página
  useEffect(() => {
    const navigationType = performance.getEntriesByType("navigation")[0]?.type;

    if (navigationType === "reload") {
      console.log("Recargando página...");
      const checkAuthStatus = async () => {
        try {
          const response = await submitData(
            import.meta.env.VITE_API_URL +
              import.meta.env.VITE_API_URL_ROUTER +
              "users/check-auth",
            null,
            "GET"
          );
          handleUser(response?.result);
        } catch (error) {
          openNotification("Error", "Error verifying authentication", "error");
          console.error("Error verifying authentication:", error);
        } finally {
          setLoading(false);
        }
      };

      checkAuthStatus();
    } else {
      // Si no es recarga, detener el loading
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (user && location.pathname === "/login") {
      history("/dashboard");
    }
  }, [user, location.pathname, history]);

  // Mientras se verifica la autenticación, muestra un indicador de carga
  if (loading)
    return (
      <PopUpModal
        isModalVisible={true}
        alertModalType={"info"}
        modalInfoText={"Please Wait"}
        modalMessage={"Loading"}
      />
    );

  return (
    <div className="App_container">
      {user && (
        <div style={{ position: "relative", width: "100%" }}>
          <AppLayout
            children={[
              <Routes>
                <Route path="/" element={<Navigate to="/dashboard" replace />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route exact path="/messages" element={<MessageTable />} />
                <Route exact path="/contacts" element={<Contacts />} />
                <Route exact path="/categories" element={<Categories />} />
                <Route exact path="/users" element={<Users />} />
                <Route exact path="/campaigns" element={<Campaigns />} />
                <Route
                  exact
                  path="/automations"
                  element={<ConfigurationPanel />}
                />
                <Route exact path="/settings" element={<Settings />} />
                <Route exact path="/historyPanel" element={<HistoRyPanel />} />
                <Route exact path="/About" element={<FooterPage />} />
                <Route path="*" element={<NotFound />} />
              </Routes>,
            ]}
          />
        </div>
      )}

      {!user && (
        <Routes>
          <Route path="*" element={<Navigate to="/login" replace />} />
          <Route exact path="/login" element={<LogInForm />} />
          <Route exact path="/verifyUser" element={<AccountVerification />} />
        </Routes>
      )}
    </div>
  );
};

export default App;

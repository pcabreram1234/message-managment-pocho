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
import {
  Route,
  Switch,
  Redirect,
  useLocation,
  useHistory,
} from "react-router-dom";
import AccountVerification from "../containers/AccountVerification";
import PopUpModal from "../components/modals/PopUpModal";
import FooterPage from "../components/layout/Footer";
import Dashboard from "../containers/Dashboard";
import { AuthContext } from "../context/UserContext";
import { openNotification } from "../components/Notification";
import { submitData } from "../utility/submitData";
import "../styles/App.css";

const App = () => {
  const state = useContext(AuthContext);
  const { user, handleUser } = state; // Obtiene el usuario y la función para manejar el estado del usuario
  const [loading, setLoading] = useState(true); // Estado de carga
  const location = useLocation();
  const history = useHistory(); // Hook para redirecciones programáticas

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
      history.replace("/messages");
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
      {/* Renderizar el MenuBar solo si el usuario está autenticado */}
      {user && (
        <div style={{ position: "relative", width: "100%" }}>
          <AppLayout
            children={
              <Switch>
                {/* Rutas públicas */}
                <Route exact path="/login" children={<LogInForm />} />
                <Route
                  exact
                  path="/verifyUser"
                  children={<AccountVerification />}
                />

                {/* Rutas protegidas */}
                {user ? (
                  <>
                    <Route exact path="/dashboard" children={<Dashboard />} />
                    <Route exact path="/messages" children={<MessageTable />} />
                    <Route exact path="/contacts" children={<Contacts />} />
                    <Route exact path="/categories" children={<Categories />} />
                    <Route exact path="/users" children={<Users />} />
                    <Route
                      exact
                      path="/configurationPanel"
                      children={<ConfigurationPanel />}
                    />
                    <Route
                      exact
                      path="/historyPanel"
                      children={<HistoRyPanel />}
                    />
                    <Route exact path="/About" children={<FooterPage />} />
                  </>
                ) : (
                  // Redirigir al login si el usuario no está autenticado
                  <Redirect to="/login" />
                )}

                {/* Ruta para la página no encontrada */}
                <Route path="*" children={<NotFound />} />
              </Switch>
            }
          />
        </div>
      )}
    </div>
  );
};

export default App;

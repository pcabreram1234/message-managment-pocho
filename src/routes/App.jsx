import React, { useContext, useEffect, useState } from "react";
import { Spin } from "antd";
import Contacts from "../containers/Contacts";
import Categories from "../containers/Categories";
import MessageTable from "../containers/MessageTable";
import ConfigurationPanel from "../containers/ConfigurationPanel";
import HistoRyPanel from "../containers/HistoryPanel";
import MenuBar from "../components/layout/MenuBar";
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
import { AuthContext } from "../context/UserContext";
import AccountVerification from "../containers/AccountVerification";
import { submitData } from "../utility/submitData";
import PopUpModal from "../components/modals/PopUpModal";
import "../styles/App.css";

const App = () => {
  const state = useContext(AuthContext);
  const { user, handleUser } = state; // Obtiene el usuario y la función para manejar el estado del usuario
  const [loading, setLoading] = useState(true); // Estado de carga
  const location = useLocation();
  const history = useHistory(); // Hook para redirecciones programáticas

  // useEffect en App.js para verificar la autenticación en cada recarga
  useEffect(() => {
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
        console.error("Error verifying authentication:", error);
      } finally {
        setLoading(false);
      }
    };
    checkAuthStatus();
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
          <MenuBar />
        </div>
      )}

      <Switch>
        {/* Rutas públicas */}
        <Route exact path="/login" children={<LogInForm />} />
        <Route exact path="/verifyUser" children={<AccountVerification />} />

        {/* Rutas protegidas */}
        {user ? (
          <>
            <Route exact path="/messages" children={<MessageTable />} />
            <Route exact path="/contacts" children={<Contacts />} />
            <Route exact path="/categories" children={<Categories />} />
            <Route exact path="/users" children={<Users />} />
            <Route
              exact
              path="/configurationPanel"
              children={<ConfigurationPanel />}
            />
            <Route exact path="/historyPanel" children={<HistoRyPanel />} />
          </>
        ) : (
          // Redirigir al login si el usuario no está autenticado
          <Redirect to="/login" />
        )}

        {/* Ruta para la página no encontrada */}
        <Route path="*" children={<NotFound />} />
      </Switch>
    </div>
  );
};

export default App;

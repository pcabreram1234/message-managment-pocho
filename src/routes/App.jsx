import React, { useContext, useEffect } from "react";
import Contacts from "../containers/Contacts";
import Categories from "../containers/Categories";
import MessageTable from "../containers/MessageTable";
import ConfigurationPanel from "../containers/ConfigurationPanel";
import HistoRyPanel from "../containers/HistoryPanel";
import Home from "../containers/Home";
import MenuBar from "../components/layout/MenuBar";
import NotFound from "../containers/NotFound";
import LogInForm from "../components/forms/LoginForm";
import Users from "../containers/Users";
import { Route, Switch, Redirect } from "react-router-dom";
import { useHistory } from "react-router";
import { AuthContext } from "../context/UserContext";
import "../styles/App.css";

const App = () => {
  const state = useContext(AuthContext);
  const { user } = state; // Obtiene el usuario desde el contexto
  const history = useHistory(); // Hook para navegación

  // Redirigir al login si el usuario no está logeado
  useEffect(() => {
    if (!user) {
      history.push("/login");
    }
  }, [user, history]);

  return (
    <div className="App_container">
      {/* Renderizar el MenuBar solo si el usuario está logeado */}
      {user ? (
        <div style={{ position: "relative", width: "100%" }}>
          <MenuBar />
        </div>
      ) : null}

      <Switch>
        {/* Rutas públicas */}
        <Route exact path={"/login"} children={<LogInForm />} />

        {/* Rutas protegidas, solo accesibles si el usuario está logeado */}
        {user ? (
          <>
            <Route exact path={"/"} children={<Home />} />
            <Route exact path={"/messages"} children={<MessageTable />} />
            <Route exact path={"/contacts"} children={<Contacts />} />
            <Route exact path={"/categories"} children={<Categories />} />
            <Route exact path={"/users"} children={<Users />} />
            <Route
              exact
              path={"/configurationPanel"}
              children={<ConfigurationPanel />}
            />
            <Route exact path={"/historyPanel"} children={<HistoRyPanel />} />
          </>
        ) : (
          // Si el usuario no está logeado y trata de acceder a rutas protegidas, redirigir al login
          <Redirect to="/login" />
        )}

        {/* Ruta para la página no encontrada */}
        <Route path={"/*"} children={<NotFound />} />
      </Switch>
    </div>
  );
};

export default App;

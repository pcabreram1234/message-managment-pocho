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
import AccountVerification from "../containers/AccountVerification";
import "../styles/App.css";

const App = () => {
  const state = useContext(AuthContext);
  const { user } = state; // Obtiene el usuario desde el contexto
  const history = useHistory(); // Hook para navegación

  // console.log(user);
  // Redirigir al login si el usuario no está logeado
  console.log(history);
  useEffect(() => {
    if (!user && history?.location?.pathname !== "/verifyUser") {
      history.push("/login");
    }
  }, [user, location]);

  return (
    <div className="App_container">
      {/* Renderizar el MenuBar solo si el usuario está logeado */}
      {user ? (
        <div style={{ position: "relative", width: "100%" }}>
          <MenuBar />
        </div>
      ) : (
        <Redirect to="/login" />
      )}

      {user && (
        <Switch>
          <Route exact path={"/login"} children={<LogInForm />} />
          <Route
            exact
            path={"/verifyUser"}
            children={<AccountVerification />}
          />
          {/* Rutas protegidas, solo accesibles si el usuario está logeado */}

          {/* <Route exact path={"/"} children={<Home />} /> */}
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
          <Route path="*" exact children={<NotFound />} />
        </Switch>
      )}
    </div>
  );
};

export default App;

import React, { useContext } from "react";
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
import { Route, Switch } from "react-router-dom";
import { AuthContext } from "../context/UserContext";
import "../styles/App.css";

const App = () => {
  const state = useContext(AuthContext);
  const { user } = state;
  console.log(user);
  return (
    <div className="App_container">
      {user !== null && user !== undefined && (
        <div style={{ position: "relative", width: "100%" }}></div>
      )}
      <MenuBar />
      <Switch>
        <Route exact path={"/"} children={<Home />} />
        <Route exact path={"/messages"} children={<MessageTable />} />
        <Route exact path={"/contacts"} children={<Contacts />} />
        <Route exact path={"/categories"} children={<Categories />} />
        <Route exact path={"/login"} children={<LogInForm />} />
        <Route exact path={"/users"} children={<Users />} />
        <Route
          exact
          path={"/configurationPanel"}
          children={<ConfigurationPanel />}
        />
        <Route exact path={"/historyPanel"} children={<HistoRyPanel />} />
        <Route path={"/*"} children={<NotFound />} />
      </Switch>
    </div>
  );
};

export default App;

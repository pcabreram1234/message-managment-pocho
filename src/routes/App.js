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
import UserContext from "../context/UserContext";
import Users from "../containers/Users";
import { Route, Switch } from "react-router-dom";
import { userInfo } from "../context/userHookState";
import "../styles/App.css";

const App = () => {
  return (
    <UserContext.Provider value={userInfo.get()}>
      <div className="App_container">
        <div style={{ position: "relative", width: "100%" }}>
          <MenuBar />
        </div>
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
    </UserContext.Provider>
  );
};

export default App;

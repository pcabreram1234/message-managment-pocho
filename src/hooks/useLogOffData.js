import { useContext } from "react";
import { openNotification } from "../components/Notification";
import { AuthContext } from "../context/UserContext";
import { useHistory } from "react-router";
import * as jose from "jose";

const useLogOffData = () => {
  const userState = useContext(AuthContext);
  const { handleUser } = userState;
  const token = window.localStorage.getItem("token");
  const history = useHistory();

  const logOffData = async (API, data, METHOD = "POST") => {
    const headers = {
      "Content-type": "application/json; charset=UTF-8",
      token: token,
    };

    try {
      const response = await fetch(API, {
        method: METHOD,
        body: METHOD !== "GET" ? JSON.stringify({ data }) : undefined,
        headers,
        // credentials: "include",
      });

      if (response.ok) {
        const resp = await response.json();
        if (resp?.message) {
          window.localStorage.clear();
          handleUser(null);
          history.push("/login");
          openNotification("Info", resp?.message || "Login failed", "success");
        }
      }
    } catch (error) {
      console.error("Error during submission:", error);
      throw Error(error);
    }
  };

  return { logOffData };
};

export default useLogOffData;

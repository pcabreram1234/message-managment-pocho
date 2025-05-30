import { useContext } from "react";
import { openNotification } from "../components/Notification";
import { AuthContext } from "../context/UserContext";
import { useNavigate } from "react-router";
import * as jose from "jose";

const useSubmitData = () => {
  const userState = useContext(AuthContext);
  const { handleUser } = userState;
  const history = useNavigate();

  const submitData = async (API, data, METHOD = "POST") => {
    const headers = {
      "Content-type": "application/json; charset=UTF-8",
      token: window.localStorage.getItem("token"),
    };

    try {
      const response = await fetch(API, {
        method: METHOD,
        body: METHOD !== "GET" ? JSON.stringify({ data }) : undefined,
        headers,
        // credentials: "include",
      });

      const resp = await response.json();
      if (response.ok) {
        const token = response.headers.get("token");
        if (token) {
          handleUser(jose.decodeJwt(token));
          return resp;
        } else {
          handleUser(null);
          history("/login");
        }
      }
      return resp;
    } catch (error) {
      console.error("Error during submission:", error);
      openNotification(
        "Error",
        (error.error ?? error.message) || "Login failed",
        "error"
      );
      history("/login");
    }
  };

  return { submitData };
};

export default useSubmitData;

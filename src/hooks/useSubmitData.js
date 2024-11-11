import { useContext } from "react";
import { openNotification } from "../components/Notification";
import { AuthContext } from "../context/UserContext";
import { useHistory } from "react-router";
import * as jose from "jose";

const useSubmitData = () => {
  const userState = useContext(AuthContext);
  const { handleUser } = userState;
  const history = useHistory();

  const submitData = async (API, data, METHOD = "POST") => {
    const headers = {
      "Content-type": "application/json; charset=UTF-8",
    };

    try {
      const response = await fetch(API, {
        method: METHOD,
        body: METHOD !== "GET" ? JSON.stringify({ data }) : undefined,
        headers,
        credentials: "include",
      });

      if (response.ok) {
        const resp = await response.json();
        const token = response.headers.get("token");
        if (token) {
          handleUser(jose.decodeJwt(token));
          history.push("/messages");
        } else {
          openNotification("Error", resp?.error || "Login failed", "error");
          handleUser(null);
          history.push("/login");
          // throw new Error("User data is incomplete.");
        }
      } else {
        handleUser(null);
        history.push("/login");
      }
    } catch (error) {
      console.error("Error during submission:", error);
      openNotification(
        "Error",
        (error.error ?? error.message) || "Login failed",
        "error"
      );
      history.push("/login");
    }
  };

  return { submitData };
};

export default useSubmitData;

import { useContext } from "react";
import { openNotification } from "../components/Notification";
import { AuthContext } from "../context/UserContext";
import { useHistory } from "react-router";
import * as jose from "jose";

const useLoginData = () => {
  const userState = useContext(AuthContext);
  const { handleUser } = userState;
  const history = useHistory();

  const API =
    import.meta.env.VITE_API_URL +
    import.meta.env.VITE_API_URL_ROUTER +
    "users/login";
  const submitData = async (data, METHOD = "POST") => {
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

      const resp = await response.json();
      if (response.ok) {
        if (resp?.email) {
          const token = response.headers.get("token");
          if (token) {
            openNotification("Success", "Wellcome", "success");
            handleUser(jose.decodeJwt(token));
            history.push("/messages");
          }
        }
        if (resp?.error) {
          openNotification("Error", resp?.error || "Login failed", "error");
          handleUser(null);
        }
      } else {
        handleUser(null);
        openNotification("Error", resp?.error || "Login failed", "error");
      }
    } catch (error) {
      console.error("Error during submission:", error);
      openNotification(
        "Error",
        (error.error ?? error.message) || "Login failed",
        "error"
      );
    }
  };

  return { submitData };
};

export default useLoginData;

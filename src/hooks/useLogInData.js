import React, { useContext, useEffect } from "react";
import { openNotification } from "../components/Notification";
import { AuthContext } from "../context/UserContext";
import { useNavigate } from "react-router";
import * as jose from "jose";

const useLoginData = () => {
  const userState = useContext(AuthContext);
  const { handleUser, user } = userState;
  const history = useNavigate();

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
        // credentials: "include",
      });

      const resp = await response.json();
      if (response.ok) {
        for (const header of response.headers.entries()) {
          const [headerName, headerValue] = header;
          console.log("Header:", headerName, headerValue);
        }
        if (resp?.email) {
          const rawToken = response.headers.get("token");
          console.log("Token:", rawToken);
          if (rawToken !== null && rawToken !== undefined) {
            openNotification("Success", "Wellcome", "success");
            window.localStorage.setItem("token", rawToken);
            handleUser(jose.decodeJwt(rawToken));
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

  useEffect(() => {
    if (user) {
      history("/dashboard");
    }
  }, [user]);

  return { submitData };
};

export default useLoginData;

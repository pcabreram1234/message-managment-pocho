import { useContext } from "react";
import { openNotification } from "../components/Notification";
import { AuthContext } from "../context/UserContext";
import * as jose from "jose";
const useSubmitData = () => {
  const userState = useContext(AuthContext);
  const { handleUser } = userState;

  const submitData = async (API, data, METHOD = "POST") => {
    const token = window.localStorage.getItem("token");
    const headers = {
      "Content-type": "application/json; charset=UTF-8",
      "x-access-token": token ?? null,
    };

    try {
      const req = await fetch(API, {
        method: METHOD,
        body: METHOD !== "GET" ? JSON.stringify({ data }) : undefined,
        headers,
      });
      const resp = await req.json();
      if (resp.token) {
        window.localStorage.setItem("token", resp.token);
        handleUser(jose.decodeJwt(resp.token));
      }
      if (resp.error) {
        alert(resp.error);
        if (window.location.pathname !== "/login") {
          window.location.href = "/login";
        }
      }
      return resp;
    } catch (error) {
      console.log(error);
      openNotification("Error", error, "error");
    }
  };

  return { submitData };
};

export default useSubmitData;

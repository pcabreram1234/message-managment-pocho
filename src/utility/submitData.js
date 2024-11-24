import { openNotification } from "../components/Notification";
import * as jose from "jose";
export const submitData = async (API, data, METHOD = "POST") => {
  const token = window.localStorage.getItem("token");

  const headers = {
    "Content-type": "application/json; charset=UTF-8",
    "x-access-token": token ?? null,
  };

  if (METHOD !== "GET") {
    try {
      let req = await fetch(API, {
        method: METHOD,
        body: JSON.stringify({ data }),
        /* Colocamos como header el tipo JSON para que express pueda usar el midleware app.use(json()) */
        headers: headers,
        credentials: "include",
      });
      if (req.ok) {
        const token = req.headers.get("token");
        if (token) {
          window.localStorage.setItem("token",token)
          return jose.decodeJwt(token);
        } else {
          openNotification("Error", "Please log in again", "error");
        }
      } else {
        // Manejar el caso de error con la respuesta de error JSON
        const errorResp = await req.json();
        return errorResp;
      }
    } catch (error) {
      throw new Error(error);
      // openNotification("Error", error?.message, "error");
    }
  } else {
    try {
      let req = await fetch(API, {
        headers: headers,
        body: data,
        credentials: "include",
      });
      if (req.ok) {
        const token = req.headers.get("token");
        if (token) {
          let resp = await req.json();
          return resp;
        } else {
          openNotification("Error", "Please log in again", "error");
        }
      } else {
        // Manejar el caso de error con la respuesta de error JSON
        const errorResp = await req.json();
        return errorResp;
      }
    } catch (error) {
      // openNotification("Error", error?.message, "error");
      throw new Error(error);
    }
  }
};

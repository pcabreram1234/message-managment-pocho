import { openNotification } from "../components/Notification";
import * as jose from "jose";
export const submitData = async (API, data, METHOD = "POST") => {
  const token = window.localStorage.getItem("token");
  const headers = {
    "Content-type": "application/json; charset=UTF-8",
    "x-access-token": token,
  };

  if (METHOD !== "GET") {
    try {
      let req = await fetch(API, {
        method: METHOD,
        body: JSON.stringify({ data }),
        /* Colocamos como header el tipo JSON para que express pueda usar el midleware app.use(json()) */
        headers: headers,
        // credentials: "include",
      });

      if (req.ok) {
        const rawToken = req.headers.get("token");
        if (rawToken) {
          window.localStorage.setItem("token", rawToken);
          const res = await req.json();
          return res;
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
  } else {
    try {
      let req = await fetch(API, {
        headers: headers,
        // body: data,
        // credentials: "include",
      });
      if (req.ok) {
        const rawToken = req.headers.get("token");
        if (rawToken) {
          console.log("rawToken", rawToken);
          console.log(req)
          window.localStorage.setItem("token", rawToken.toString())
          let resp = await req.json();
          return resp;
        } else {
          // window.localStorage.clear();
          openNotification("Error", "Please log in again", "error");
        }
      } else {
        // Manejar el caso de error con la respuesta de error JSON
        // const errorResp = await req.json();
        // window.localStorage.clear();
        // openNotification("Error", errorResp?.message, "error");
        // return errorResp;
      }
    } catch (error) {
      // window.localStorage.clear();
      // openNotification("Error", error?.message, "error");
      throw new Error(error);
    }
  }
};

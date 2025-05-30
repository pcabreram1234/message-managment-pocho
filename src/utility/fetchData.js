import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/UserContext";
import { useNavigate } from "react-router";
import * as jose from "jose";
import * as serviceWorker from "../serviceWorker";
const fetchData = (API, method = "GET") => {
  const userState = useContext(AuthContext);
  const { handleUser } = userState;

  const [data, setData] = useState([]);
  const location = useNavigate();
  const token = window.localStorage.getItem("token");
  const headers = {
    "Content-type": "application/json; charset=UTF-8",
    token: token,
  };

  useEffect(() => {
    fetch(API, {
      method: method,
      // credentials: "include",
      headers: headers,
    })
      .then((resp) => {
        if (resp.ok) {
          const token = resp.headers.get("token");
          const contentType = resp.headers.get("content-type");
          window.localStorage.setItem("token", token);

          handleUser(token);
          if (contentType && contentType.includes("application/json")) {
            return resp.json();
          } else {
            return resp.text();
          }
        } else {
          serviceWorker.unregister();
          location("/login");
          // window.localStorage.clear();
          handleUser(null);
          setData(null);
        }
      })
      .then((resp) => {
        setData(resp);
      })
      .catch((err) => {
        serviceWorker.unregister();
        console.log(err);
        // window.localStorage.clear();
        handleUser(null);
      });
  }, []);
  return data;
};

export { fetchData };

import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/UserContext";
import { useHistory } from "react-router";
import * as jose from "jose";
import * as serviceWorker from "../serviceWorker";
const fetchData = (API, method = "GET") => {
  const userState = useContext(AuthContext);
  const { handleUser } = userState;

  const [data, setData] = useState([]);
  const location = useHistory();
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
          console.log(token)
          window.localStorage.setItem("token", token);
          handleUser(token);
          return resp.json();
        } else {
          serviceWorker.unregister();
          location.push("/login");
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

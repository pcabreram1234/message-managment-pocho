import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/UserContext";
import { useHistory } from "react-router";
import * as jose from "jose";
const fetchData = (API, method = "GET") => {
  const userState = useContext(AuthContext);
  const { handleUser } = userState;

  const [data, setData] = useState([]);
  const location = useHistory();
  const token = window.localStorage.getItem("token");
  useEffect(() => {
    fetch(API, {
      method: method,
      headers: {
        "x-access-token": token,
      },
    })
      .then((resp) => {
        const token = resp.headers.get("token");
        if (token) {
          window.localStorage.setItem("token", token);
          handleUser(jose.decodeJwt(token));
        } else {
          location.push("/login");
          handleUser([]);
        }
        return resp.json();
      })
      .then((resp) => {
        if (resp.error) {
          location.push("/login");
          window.localStorage.removeItem("token");
        } else {
          setData(resp);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return data;
};

export { fetchData };

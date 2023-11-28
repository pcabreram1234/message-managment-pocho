import { useState, useEffect } from "react";
import { useHistory } from "react-router";
const fetchData = (API, method = "GET") => {
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

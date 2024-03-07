import * as jose from "jose";

const handleUserInfo = () => {
  const token = window.localStorage.getItem("token");
  if (token !== null && token !== "null" && token !== "") {
    const claims = jose.decodeJwt(token);
    console.log(claims);
    return claims;
  }
};

export { handleUserInfo };

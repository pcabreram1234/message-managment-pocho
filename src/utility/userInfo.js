import * as jose from "jose";

const handleUserInfo = () => {
  const token = window.localStorage.getItem("token");
  if (token !== null && token !== "null" && token !== "") {
    const claims = jose.base64url.encode(token);
    return claims;
  }
};

export { handleUserInfo };

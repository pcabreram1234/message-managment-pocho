import * as jose from "jose";

const handleUserInfo = () => {
  const token = window.localStorage.getItem("token");
  if (token) {
    const claims = jose.decodeJwt(token);
    claims.user_name && claims.type_user ? true : false;
    return claims;
  }
};

export { handleUserInfo };

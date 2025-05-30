import React, { useEffect, useState } from "react";
import { Spin, Result, Button } from "antd";
import { useLocation, useNavigate } from "react-router";

const AccountVerification = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const token = searchParams.get("token");
  const [loading, setLoading] = useState(true);
  const [verificationStatus, setVerificationStatus] = useState("error"); // null, "success", "error", "expired"
  const navigate = useNavigate();
  const API_URL =
    import.meta.env.VITE_API_URL +
    import.meta.env.VITE_API_URL_ROUTER +
    "users/verify";
  useEffect(() => {
    const verifyToken = async () => {
      try {
        // Realizar la solicitud para verificar el token
        const response = await fetch(`${API_URL}?${searchParams}`);

        const data = await response.json();

        setVerificationStatus(data?.status);
      } catch (error) {
        setVerificationStatus("error");
      } finally {
        setLoading(false);
      }
    };

    verifyToken();
  }, [token]);

  const handleRedirect = () => {
    navigate("/login"); // Redirige al login u otra página
  };

  if (loading) {
    return (
      <div style={{ textAlign: "center", marginTop: "20%" }}>
        <Spin size="large" />
      </div>
    );
  }

  return (
    <>
      {verificationStatus === "success" && (
        <Result
          status="success"
          title="Your account has been successfully verified!"
          subTitle="You can now log in with your account."
          extra={[
            <Button type="primary" key="login" onClick={handleRedirect}>
              Login
            </Button>,
          ]}
        />
      )}

      {verificationStatus === "expired" && (
        <Result
          status="warning"
          title="Verification token has expired"
          subTitle="Please request a new verification link."
          extra={[
            <Button type="primary" key="resend" onClick={handleRedirect}>
              Request new link
            </Button>,
          ]}
        />
      )}

      {verificationStatus === "verified" && (
        <Result
          status="info"
          title="Token already verified"
          subTitle="The email account associated with this link has already been verified."
          extra={[
            <Button type="primary" key="login" onClick={handleRedirect}>
              Back to main page
            </Button>,
          ]}
        />
      )}

      {verificationStatus === "error" && (
        <Result
          status="error"
          title="Error verifying your account"
          subTitle="The verification link is invalid or an error has occurred."
          extra={[
            <Button type="primary" key="login" onClick={handleRedirect}>
              Back to main page
            </Button>,
          ]}
        />
      )}
    </>
  );
};

export default AccountVerification;

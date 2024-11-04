import React, { useEffect, useState } from "react";
import { Layout, Typography } from "antd";
import { Redirect } from "react-router";
import FooterPage from "../components/layout/Footer";

const NotFound = () => {
  const { Header, Content } = Layout;
  const { Title, Text } = Typography;
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    setInterval(() => {
      setCounter((c) => c + 1);
    }, 1000);
  }, []);

  return (
    <Layout>
      <Header>
        <Title style={{ textAlign: "center", color: "white  " }}>
          PMMS - Error
        </Title>
        <Title style={{ textAlign: "center", fontSize: "15px" }}>
          This page does not exist in 3 seconds the page will be redirect to the
          main pange: <Text strong>{counter}</Text>
        </Title>
        {counter === 3 && <Redirect to={"/messages"} />}
      </Header>

      <Content style={{ display: "flex", justifyContent: "center" }}>
        <img
          src="https://miro.medium.com/max/1400/1*DeBkx8vjbumpCO-ZkPE9Cw.png"
          alt="Not Found Image"
        />
      </Content>
      <FooterPage />
    </Layout>
  );
};

export default NotFound;

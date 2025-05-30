import React, { useEffect, useState } from "react";
import { Layout, Typography } from "antd";
import { useNavigate } from "react-router";

const NotFound = () => {
  const { Header, Content } = Layout;
  const { Title, Text } = Typography;
  const [counter, setCounter] = useState(0);
  const navigation = useNavigate();

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCounter((c) => {
        if (c >= 2) { // Cambiado a 2 porque se incrementará a 3 en el siguiente paso
          clearInterval(intervalId);
          // navigation(-1);
          return 3;
        }
        return c + 1;
      });
    }, 1000);

    return () => clearInterval(intervalId); // Limpieza al desmontar
  }, [navigation]); // Añadido navigate como dependencia

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
        {counter === 3 && navigation(-1)}
      </Header>

      <Content style={{ display: "flex", justifyContent: "center" }}>
        <img
          src="https://miro.medium.com/max/1400/1*DeBkx8vjbumpCO-ZkPE9Cw.png"
          alt="Not Found Image"
        />
      </Content>
    </Layout>
  );
};

export default NotFound;

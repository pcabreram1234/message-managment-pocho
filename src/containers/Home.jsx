import React from "react";
import { Layout, Typography, Row, Col, Image } from "antd";
import HomeImage from "../assets/home.svg";

const Home = () => {
  const { Title } = Typography;

  return (
    <Layout
      style={{
        height: "100vh",
        padding: "0 0 10px 0",
        justifyContent: "center",
      }}
      className="home"
      id="home"
    >
      <Row justify="center">
        <Col>
          <Title
            style={{
              textAlign: "center",
              fontSize: "35px",
            }}
          >
            PMMS - Pocho`s Messages Managment System
          </Title>
        </Col>
      </Row>

      <Row align="middle" justify="center" wrap={true}>
        <Col>
          <Image
            src={HomeImage}
            preview={false}
            style={{ marginTop: "30px" }}
          />
        </Col>
      </Row>
    </Layout>
  );
};
export default Home;

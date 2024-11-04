import React from "react";
import Logo from "../../assets/logo.svg";
import { Layout, Image, Row, Col, Typography } from "antd";

const FooterPage = () => {
  const { Footer } = Layout;
  const { Text } = Typography;

  return (
    <Footer
      style={{
        backgroundColor: "#F1EDFF",
        position: "fixed",
        bottom: 0,
        left: "50%",
        transform: "translateX(-50%)",
        width: "100%",
        zIndex: "1",
        padding: 0,
      }}
    >
      <Row
        gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
        align="middle"
        justify="center"
      >
        <Col>
          <Image src={Logo} preview={false} width={100} />
        </Col>
        <Col>
          <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
            <Text type="secondary">
              © 2024 Message Management Pocho. All rights reserved.
            </Text>
          </Row>
          <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
            <Text>Try the tool and experience message automation</Text>
          </Row>
          <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
            <Text>
              Design, Development and Testing:{" "}
              <Text strong>
                <a href="https://portfolio.phillipcabrera.com/" target="_blank">
                  Phillip Cabrera
                </a>
              </Text>
            </Text>
          </Row>
        </Col>
      </Row>
    </Footer>
  );
};

export default FooterPage;

import React from "react";
import Logo from "../../assets/logo.svg";
import { Layout, Image, Row, Col, Typography, Divider } from "antd";

const FooterPage = () => {
  const { Content, Footer } = Layout;
  const { Title, Paragraph, Text, Link } = Typography;

  return (
    <Content
      style={{
        padding: "60px 30px",
        // minHeight: "100vh",
      }}
    >
      <Row justify="center" style={{ marginBottom: 40 }}>
        <Col>
          <Image src={Logo} preview={false} width={120} />
        </Col>
      </Row>

      <Row justify="center">
        <Col xs={24} md={16}>
          <Title level={2} style={{ textAlign: "center" }}>
            Welcome to PMMS 🚀
          </Title>
          <Paragraph style={{ fontSize: "16px", lineHeight: "1.8" }}>
            We're thrilled to introduce <strong>PMMS</strong>, the ultimate
            platform for configuring and automating email communications — built
            to help you stay connected with your audience in the most efficient
            way possible!
          </Paragraph>

          <Divider />

          <Title level={3}>✨ What is PMMS?</Title>
          <Paragraph>
            PMMS is a powerful tool designed to simplify the process of managing
            and automating email communication. Whether you need to send instant
            messages or schedule automated workflows, PMMS makes it seamless and
            effective.
          </Paragraph>

          <Title level={3}>🔑 Key Features</Title>
          <ul style={{ paddingLeft: "20px" }}>
            <li>
              <Paragraph>
                📨 <strong>Instant Messaging:</strong> Send real-time emails
                with ease.
              </Paragraph>
            </li>
            <li>
              <Paragraph>
                🎨 <strong>Customizable Templates:</strong> Match your brand's
                tone.
              </Paragraph>
            </li>
            <li>
              <Paragraph>
                📁 <strong>Categories & Contacts:</strong> Organize your
                audience efficiently.
              </Paragraph>
            </li>
            <li>
              <Paragraph>
                🔗 <strong>Message Association:</strong> Tailor communication
                per contact.
              </Paragraph>
            </li>
            <li>
              <Paragraph>
                📅 <strong>Scheduled Messaging:</strong> Set exact times for
                messages to go out.
              </Paragraph>
            </li>
            <li>
              <Paragraph>
                📊 <strong>Message History:</strong> Track delivery status in
                detail.
              </Paragraph>
            </li>
            <li>
              <Paragraph>
                🧩 <strong>User-Friendly Interface:</strong> No technical skills
                needed.
              </Paragraph>
            </li>
          </ul>

          <Title level={3}>💼 Why Choose PMMS?</Title>
          <Paragraph>
            PMMS is perfect for businesses and teams of all sizes. From startups
            sending updates to enterprises managing complex workflows, PMMS
            adapts to your needs and scales with you.
          </Paragraph>

          <Paragraph>
            💡 Explore more about PMMS and its features on our website. We’d
            love to hear your feedback!
          </Paragraph>

          <Divider />
        </Col>
      </Row>

      <Footer>
        <Row gutter={[16, 8]} justify="center" style={{ textAlign: "center" }}>
          <Col span={24}>
            <Text type="secondary">
              © 2024 Message Management Pocho. All rights reserved.
            </Text>
          </Col>
          <Col span={24}>
            <Text>Try the tool and experience message automation</Text>
          </Col>
          <Col span={24}>
            <Text>
              Design, Development and Testing by{" "}
              <Text strong>
                <Link
                  href="https://portfolio.phillipcabrera.com/"
                  target="_blank"
                >
                  Phillip Cabrera
                </Link>
              </Text>
            </Text>
          </Col>
        </Row>
      </Footer>
    </Content>
  );
};

export default FooterPage;

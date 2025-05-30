import Container from "@/components/container/PageContainer";
import React from "react";
import FeedbackBox from "./_components/FeedbackBox";
import Header from "./_components/Header";
import Content from "./_components/Content";

export default function page() {
  return (
    <Container maxWidth="max-w-4xl">
      <Header />
      <Content />
      <FeedbackBox />
    </Container>
  );
}

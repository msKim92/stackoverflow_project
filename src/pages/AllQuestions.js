import React from "react";
import styled from "styled-components";
import Header from "../components/Header";
import LeftNvi from "../components/LeftNavi";
import RightNavi from "../components/RightNavi";
import Footer from "../components/Footer";

function AllQuestions() {
  return (
    <DisplayWraper>
      <Header />
      <Wraper>
        <LeftNvi />
        <QuestionList>
          <Been></Been>
          <Been></Been>
          <Been></Been>
          <Been></Been>
          <Been></Been>
          <Been></Been>
          <Been></Been>
          <Been></Been>
          <Been></Been>
          <Been></Been>
          <Been></Been>
          <Been></Been>
          <Been></Been>
          <Been></Been>
          <Been></Been>
        </QuestionList>
        <RightNavi />
      </Wraper>
      <Footer />
    </DisplayWraper>
  );
}

const DisplayWraper = styled.div``;
const Wraper = styled.div`
  width: 1400px;
  padding-top: 60px;
  height: 100%;
  border: 2px solid black;
  display: flex;
  margin-left: auto;
  margin-right: auto;
`;
const QuestionList = styled.div`
  width: 800px;
  height: 100%;
  border: 5px solid yellow;
  overflow-y: auto;
`;
const Been = styled.div`
  width: 100%;
  height: 300px;
  background-color: violet;
  border: 3px solid black;
`;

export default AllQuestions;

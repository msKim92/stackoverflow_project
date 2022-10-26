import React from "react";
import styled from "styled-components";
import Header from "../components/Header";
import LeftNvi from "../components/LeftNavi";
import RightNavi from "../components/RightNavi";
import Footer from "../components/Footer";
import AddComment from "../components/AddComment";
import Question from "../components/Question";

function AllQuestions() {
  return (
    <>
      <Header />
      <Wraper>
        <LeftNvi />
        <QuestionList>
          <div>
            <div>Top Questions</div>
            <div></div>
          </div>
          <div>
            <div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
          <Question />
          <AddComment />
        </QuestionList>
        <RightNavi />
      </Wraper>
      <Footer />
    </>
  );
}

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
  overflow-y: auto;
  border: 1px solid yellowgreen;
  margin: 20px;
`;

export default AllQuestions;

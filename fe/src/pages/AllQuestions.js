import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Header from "../components/Header";
import LeftNvi from "../components/LeftNavi";
import RightNavi from "../components/RightNavi";
import Footer from "../components/Footer";
import AddComment from "../components/AddComment";
import Question from "../components/Question";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchQuestion } from "../reduxStore/slices/questionSlice";

function AllQuestions() {
  const navigate = useNavigate();

  const clickAddQuetion = () => {
    navigate("/askquestions");
  };

  return (
    <>
      <Header />
      <Wraper>
        <LeftNvi />
        <QuestionList>
          <AllQuestionsMenu>
            <AllQuestionsTop>
              <AllQuestionsTitle>Top Questions</AllQuestionsTitle>
              <AllQuestionsAddBtn onClick={clickAddQuetion}>
                Ask Question
              </AllQuestionsAddBtn>
            </AllQuestionsTop>
            <AllQuestionsBottom>
              <AllQuestionsMenuBtn>Interestion</AllQuestionsMenuBtn>
              <AllQuestionsInMenuSpace>
                <AllQuestionsMenuInBtn>274</AllQuestionsMenuInBtn>
                <AllQuestionsMenuBtn>Bountied</AllQuestionsMenuBtn>
              </AllQuestionsInMenuSpace>
              <AllQuestionsMenuBtn>Hot</AllQuestionsMenuBtn>
              <AllQuestionsMenuBtn>Week</AllQuestionsMenuBtn>
              <AllQuestionsMenuBtn>Month</AllQuestionsMenuBtn>
            </AllQuestionsBottom>
          </AllQuestionsMenu>
          <Question />
          <AllQuestionsInformation>
            <div>
              Looking for more? Browse the
              <InformationSpan> complete list of questions</InformationSpan>, or
              <InformationSpan>popular tags</InformationSpan>. Help us answer
            </div>
            <InformationDiv>unanswered questions.</InformationDiv>
          </AllQuestionsInformation>
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
  margin: 10px 10px 10px 0px;
`;
const AllQuestionsMenu = styled.div`
  width: 99%;
  height: 120px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-bottom: 20px;
  border-bottom: 1px solid #9ea6ac;
`;

const AllQuestionsTop = styled.div`
  width: 100%;
  height: 75px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const AllQuestionsBottom = styled.div`
  width: 100%;
  height: 40px;
  display: flex;
  justify-content: end;
`;
const AllQuestionsTitle = styled.div`
  font-size: 30px;
`;
const AllQuestionsAddBtn = styled.button`
  width: 120px;
  height: 45px;
  font-size: 15px;
  background-color: rgb(20, 148, 245);
  color: white;
  border: none;
  border-top: double white;
  border-radius: 5px;
`;

const AllQuestionsInMenuSpace = styled.div`
  display: flex;
  align-items: center;
`;
const AllQuestionsMenuInBtn = styled.div`
  background-color: #0074cc;
  color: white;
  width: 35px;
  height: 20px;
  &:focus {
    background-color: gray;
  }
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: -43px;
  z-index: 2;
  padding-top: 3px;
  cursor: pointer;
`;
const AllQuestionsMenuBtn = styled.button`
  width: 60px;
  background-color: white;
  border: 1px solid #9ea6ac;
  cursor: pointer;
  &:nth-child(1) {
    width: 100px;
    border-radius: 5px 0px 0px 5px;
  }
  &:nth-child(2) {
    width: 110px;
    height: 100%;
    padding-left: 40px;
    z-index: 1;
  }
  &:nth-child(3) {
    width: 45px;
  }
  &:nth-child(5) {
    border-radius: 0px 5px 5px 0px;
  }
  &:focus {
    background-color: #e3e6e8;
  }
`;
const AllQuestionsInformation = styled.div`
  width: 100%;
  height: 150px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-left: 20px;
  font-size: 18px;
`;

const InformationSpan = styled.span`
  color: #0074cc;
  cursor: pointer;
  &:hover {
    color: #0995ff;
  }
  &:nth-child(2) {
    margin-left: 5px;
  }
`;
const InformationDiv = styled.div`
  color: #0074cc;
  cursor: pointer;
  margin-top: 10px;
  &:hover {
    color: #0995ff;
  }
`;

export default AllQuestions;

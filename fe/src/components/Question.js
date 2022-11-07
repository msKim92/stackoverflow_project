import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "../reduxStore/slices/userSlice";
import { fetchQuestion } from "../reduxStore/slices/questionSlice";
import { useNavigate } from "react-router-dom";
import { searchQuestion } from "../reduxStore/slices/questionSlice";

function Question({ clickHere, setClickHere, clickSearchCheck, changeSearch }) {
  console.log(clickHere, clickSearchCheck, changeSearch);
  const navigate = useNavigate();
  const questions = useSelector((state) => state.questions.questions?.data);
  const allQuestions = useSelector(
    (state) => state.questions.questions?.pageInfo
  );
  const filterSearchQuestion = useSelector(
    (state) => state.questions.searchQuestions?.data
  );
  const dispatch = useDispatch();
  let list = [];

  for (let i = 1; i <= allQuestions?.totalPages; i++) {
    list.push(<span>{i}</span>);
  }
  const renderTime = (createTime, modifiedTime) => {
    let result = "";
    let creatTime = new Date(String(createTime));
    let modifieTime = new Date(String(modifiedTime));

    let crYear = creatTime.getFullYear();
    let crMonth = creatTime.getMonth() + 1;
    let crDay = creatTime.getDate();
    let createDate = crYear + "/" + crMonth + "/" + crDay;
    let moYear = creatTime.getFullYear();
    let moMonth = creatTime.getMonth() + 1;
    let moDay = creatTime.getDate();
    let modifiedDate = moYear + "/" + moMonth + "/" + moDay;
    let elapsedTime = modifieTime - creatTime;
    let dayTime = Math.floor(elapsedTime / 1000 / 60 / 60 / 24); // 하루계산
    let hourTime = Math.floor(elapsedTime / 1000 / 60 / 60); // 시간 계산
    let minuteTime = Math.floor(elapsedTime / 1000 / 60); // 분 계산
    let secondTime = Math.floor(elapsedTime); // 초 계산

    if (dayTime > 0) {
      result = modifiedDate;
    } else if (
      dayTime === 0 &&
      hourTime !== 0 &&
      minuteTime !== 0 &&
      secondTime !== 0
    ) {
      if (hourTime === 24) {
        result = dayTime + "날짜";
      } else {
        result = hourTime + " hours ago";
      }
    } else if (
      dayTime === 0 &&
      hourTime === 0 &&
      minuteTime !== 0 &&
      secondTime !== 0
    ) {
      if (minuteTime === 24) {
        result = hourTime + " hours ago";
      } else {
        result = minuteTime + " min ago";
      }
    } else if (
      dayTime === 0 &&
      hourTime === 0 &&
      minuteTime === 0 &&
      secondTime > 0
    ) {
      result = secondTime + " secs ago";
    } else {
      result = createDate;
    }

    return <QuestionerDetailInformation>{result}</QuestionerDetailInformation>;
  };

  const clickNewQuestion = (number) => {
    setClickHere(number);
  };
  const modifiedCheck = (modifiedAt) => {
    let result = "";
    if (modifiedAt) {
      result = "modified";
    } else if (!modifiedAt) {
      result = "answered";
    }
    return <QuestionerDetailInformation>{result}</QuestionerDetailInformation>;
  };

  const clickDetail = (id) => {
    navigate(`/${id}`);
  };

  useEffect(() => {
    if (!questions || clickHere < 10) {
      console.log(clickHere);
      dispatch(fetchQuestion(clickHere));
      window.scrollTo(0, 0);
    } else if (clickSearchCheck === true || clickHere === 99) {
      dispatch(searchQuestion(changeSearch));
    }
  }, [clickHere]);

  return (
    <>
      {clickSearchCheck ? (
        <div>
          {filterSearchQuestion?.map((data) => (
            <QuestionSpace key={data.questionId}>
              <QuestionerSuggestionInFormation>
                <QuestionerSuggestionCount>
                  <QuestionerCountChange>
                    {data.questionVote}
                  </QuestionerCountChange>
                  <div> votes</div>
                </QuestionerSuggestionCount>
                <QuestionerSuggestionCount>
                  <QuestionerCountChange></QuestionerCountChange>
                  <div>answer</div>
                </QuestionerSuggestionCount>
                <QuestionerSuggestionCount>
                  <QuestionerCountChange>
                    {data.questionViewCount}
                  </QuestionerCountChange>
                  <div>views</div>
                </QuestionerSuggestionCount>
              </QuestionerSuggestionInFormation>
              <QuestionerContents>
                <QuestionerContentsTitle
                  onClick={() => clickDetail(data.questionId)}
                >
                  {data.questionTitle}
                </QuestionerContentsTitle>
                <QuestionerContentsTag>{data.tags}</QuestionerContentsTag>
              </QuestionerContents>
              <QuestionerInformation>
                <QuestionerDetailInformation>
                  {data.author}
                </QuestionerDetailInformation>
                {modifiedCheck(data.modifiedAt)}
                {renderTime(data.created_at, data.modified_at)}
              </QuestionerInformation>
            </QuestionSpace>
          ))}
        </div>
      ) : (
        <div>
          {questions?.map((data) => (
            <QuestionSpace key={data.questionId}>
              <QuestionerSuggestionInFormation>
                <QuestionerSuggestionCount>
                  <QuestionerCountChange>
                    {data.questionVote}
                  </QuestionerCountChange>
                  <div> votes</div>
                </QuestionerSuggestionCount>
                <QuestionerSuggestionCount>
                  <QuestionerCountChange></QuestionerCountChange>
                  <div>answer</div>
                </QuestionerSuggestionCount>
                <QuestionerSuggestionCount>
                  <QuestionerCountChange>
                    {data.questionViewCount}
                  </QuestionerCountChange>
                  <div>views</div>
                </QuestionerSuggestionCount>
              </QuestionerSuggestionInFormation>
              <QuestionerContents>
                <QuestionerContentsTitle
                  onClick={() => clickDetail(data.questionId)}
                >
                  {data.questionTitle}
                </QuestionerContentsTitle>
                <QuestionerContentsTag>{data.tags}</QuestionerContentsTag>
              </QuestionerContents>
              <QuestionerInformation>
                <QuestionerDetailInformation>
                  {data.author}
                </QuestionerDetailInformation>
                {modifiedCheck(data.modifiedAt)}
                {renderTime(data.created_at, data.modified_at)}
              </QuestionerInformation>
            </QuestionSpace>
          ))}
          <AllQuestionsInformation>
            <div>
              Looking for more? Browse the
              <InformationSpan> complete list of questions</InformationSpan>, or
              <InformationSpan>popular tags</InformationSpan>. Help us answer
            </div>
            <InformationDiv>unanswered questions.</InformationDiv>
          </AllQuestionsInformation>
          <PageNationSpace>
            {list?.map((data) => (
              <PageNationBtn1
                isClick={clickHere}
                onClick={() => clickNewQuestion(data.props.children)}
                key={data.props.children}
              >
                {data.props.children}
              </PageNationBtn1>
            ))}
          </PageNationSpace>
        </div>
      )}
    </>
  );
}

const QuestionSpace = styled.div`
  width: 88%;
  height: 80px;
  padding: 20px 40px 16px 40px;
  display: flex;
  align-items: center;
  border-top: 1px solid #9ea6ac;
  border-bottom: 1px solid #9ea6ac;
`;

const QuestionerSuggestionInFormation = styled.div`
  width: 80px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin-left: 5px;
`;
const QuestionerSuggestionCount = styled.div`
  display: flex;
  &:nth-child(2) {
    margin: 10px 0px;
  }
`;
const QuestionerCountChange = styled.div`
  margin-right: 5px;
`;

const QuestionerContents = styled.div`
  width: 70%;
  height: 100%;
  margin-left: 25px;
  z-index: 1;
`;

const QuestionerContentsTitle = styled.div`
  color: #0074cc;
  height: 40%;
  font-size: 20px;
  margin-bottom: 15px;
  cursor: pointer;
  &:hover {
    color: #0995ff;
  }
`;
const QuestionerContentsTag = styled.span`
  width: 100%;
  height: 30px;
  background-color: #d0e2f0;
  padding: 3px;
`;

const QuestionerInformation = styled.div`
  z-index: 2;
  margin-left: -175px;
  margin-top: 30px;
  display: flex;
  justify-content: end;
  width: 230px;
`;
const QuestionerDetailInformation = styled.div`
  margin: 0px 2px;
`;
const AllQuestionsInformation = styled.div`
  width: 96%;
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
const PageNationSpace = styled.span`
  width: 98%;
  height: 35px;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const PageNationBtn1 = styled.button`
  width: 30px;
  height: 30px;
  border: 1px solid gray;
  margin: 0px 5px;
  background-color: ${(props) => (props.isClick == 1 ? "orange" : "#d0e2f0")};
  background-color: ${(props) => (props.isClick == 2 ? "orange" : "#d0e2f0")};
  background-color: ${(props) => (props.isClick == 3 ? "orange" : "#d0e2f0")};
`;

export default Question;

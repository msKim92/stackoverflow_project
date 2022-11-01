import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "../reduxStore/slices/userSlice";
import {
  fetchQuestion1,
  fetchQuestion2,
  fetchQuestion3,
} from "../reduxStore/slices/questionSlice";
import { useNavigate } from "react-router-dom";

function Question({ clickHere }) {
  const navigate = useNavigate();
  const questions = useSelector((state) => state.questions.questions.data);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!questions || clickHere === 1) {
      dispatch(fetchQuestion1());
      window.scrollTo(0, 0);
    } else if (!questions || clickHere === 2) {
      dispatch(fetchQuestion2());
      window.scrollTo(0, 0);
    } else if (!questions || clickHere === 3) {
      dispatch(fetchQuestion3());
      window.scrollTo(0, 0);
    }
  }, [clickHere]);

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

  const modifiedCheck = (modifiedAt) => {
    let result = "";
    if (modifiedAt) {
      result = "modified";
    } else if (!modifiedAt) {
      result = "answered";
    }
    return <QuestionerDetailInformation>{result}</QuestionerDetailInformation>;
  };

  const clickDetail = () => {
    navigate();
  };
  return (
    <>
      {questions?.map((data) => (
        <QuestionSpace key={data.id}>
          <QuestionerSuggestionInFormation>
            <QuestionerSuggestionCount>
              <QuestionerCountChange>{data.questionVote}</QuestionerCountChange>
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
            <QuestionerContentsTitle onClick={clickDetail}>
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

export default Question;

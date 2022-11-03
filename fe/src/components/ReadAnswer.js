import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { AiFillCaretUp, AiFillCaretDown } from "react-icons/ai";
import { FaRegBookmark, FaHistory } from "react-icons/fa";
import userImg from "../img/user.png";
import { useNavigate, useParams } from "react-router-dom";
import { filterFetchQuestion } from "../reduxStore/slices/questionSlice";
import { deleteAnswer, fetchAnswer } from "../reduxStore/slices/answerSlice";

function ReadAnswer() {
  const answers = useSelector((state) => state.questions.selectQuestions?.data);
  const parmas = useParams();
  const [clickSelect, setClickSelect] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(filterFetchQuestion(Number(parmas.id)));
  }, [dispatch]);

  const renderTime = (createTime, modifiedTime) => {
    let result = "";
    let creatTime = new Date(createTime);
    let modifieTime = new Date(modifiedTime);

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
      result = createDate + "망";
    }

    return <UserElapsedTime>answered {result}</UserElapsedTime>;
  };
  const clickEditAnswer = (id) => {
    navigate(`/v1/${id}`);
  };

  const selectOption = [
    { id: 1, value: "Highest score ( default ) " },
    { id: 2, value: "Trending ( recent votes count more ) " },
    { id: 3, value: "Date modified ( newest first ) " },
    { id: 4, value: "Date created ( oldest first ) " },
  ];
  const changeClickSelect = (e) => {
    setClickSelect(e.target.value);
  };

  const deleteClick = (id) => {
    dispatch(deleteAnswer(Number(parmas.id)));
  };
  return (
    <>
      <AnswerWrapper>
        <AnswerTitleSpace>
          <TitleAnswerLeft>
            <AnswerTextSpace>{answers?.answers?.length}</AnswerTextSpace>
            <AnswerTextSpace>Answer</AnswerTextSpace>
          </TitleAnswerLeft>
          <TitleAnswerRight>
            <AsnwerTitleSelectExplanation>
              Sorted by :
            </AsnwerTitleSelectExplanation>
            <AnswerTitleSelect onChange={changeClickSelect} value={clickSelect}>
              {selectOption.map((option) => (
                <AswerTitleOption key={option.id} value={option.value}>
                  {option.value}
                </AswerTitleOption>
              ))}
            </AnswerTitleSelect>
          </TitleAnswerRight>
        </AnswerTitleSpace>
        {answers?.answers.map((data) => (
          <AnswerContentsSpace key={data.answerId}>
            <AnswerContentsSpaceLeft>
              <AnswerIconUpDownBtn>
                <AiFillCaretUp />
              </AnswerIconUpDownBtn>
              <AnswerTextSpace>{data.answerVote}</AnswerTextSpace>
              <AnswerIconUpDownBtn>
                <AiFillCaretDown />
              </AnswerIconUpDownBtn>
              <AnswerIcon>
                <FaRegBookmark />
              </AnswerIcon>
              <AnswerIcon>
                <FaHistory />
              </AnswerIcon>
            </AnswerContentsSpaceLeft>
            <AnswerContentsSpaceRight>
              <AnswerRightContentsTop>{data.answerBody}</AnswerRightContentsTop>
              <AnswerRightContentsBottom>
                <AnswerRightBottomSpace>
                  <AnswerRightBottomUpSpace>
                    <ContentDetailBtn>Share</ContentDetailBtn>
                    <ContentDetailBtn
                      onClick={() => clickEditAnswer(data.answerId)}
                    >
                      Edit
                    </ContentDetailBtn>
                    <ContentDetailBtn
                      onClick={() => deleteClick(data.answerId)}
                    >
                      Delete
                    </ContentDetailBtn>
                    <ContentDetailBtn>Follow</ContentDetailBtn>
                  </AnswerRightBottomUpSpace>
                  <ContentsAddBtn>Add a comment</ContentsAddBtn>
                </AnswerRightBottomSpace>
                <ContentsUserInformationSpace>
                  {renderTime(data.created_at, data.updated_at)}
                  <ContentsUserSpace>
                    <ContentsUserImg src={userImg} />
                    <UserSpace>
                      <UserName>{data.create_by_user}</UserName>
                    </UserSpace>
                  </ContentsUserSpace>
                </ContentsUserInformationSpace>
              </AnswerRightContentsBottom>
            </AnswerContentsSpaceRight>
          </AnswerContentsSpace>
        ))}
      </AnswerWrapper>
      ;
    </>
  );
}
const AnswerWrapper = styled.div`
  width: 94%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 20px;
  border: none;
`;
const AnswerTitleSpace = styled.div`
  width: 98%;
  height: 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const TitleAnswerLeft = styled.div`
  width: 150px;
  height: 80px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  font-size: 20px;
`;
const AnswerTextSpace = styled.div`
  font-weight: bolder;
  font-size: 30px;
`;

const TitleAnswerRight = styled.div`
  display: flex;
  border: none;
  width: 325px;
  height: 30px;
  align-items: center;
`;

const AsnwerTitleSelectExplanation = styled.div`
  width: 80px;
  height: 100%;
  display: flex;
  align-items: center;
  font-size: 14px;
`;

const AnswerTitleSelect = styled.select`
  width: 250px;
  height: 100%;
  &:focus {
    box-shadow: 0px 0px 3px 3px rgba(107, 186, 247, 0.5);
    border: none;
    outline: 0;
  }
`;
const AswerTitleOption = styled.option`
  width: 150px;
  height: 100%;
`;

const AnswerContentsSpace = styled.div`
  width: 100%;
  height: 400px;
  display: flex;
  margin-top: 20px;
  border: 1px solid #9ea6ac;
`;
const AnswerContentsSpaceLeft = styled.div`
  width: 50px;
  height: 240px;
  margin-right: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  /* border: 1px solid red; */
`;
const AnswerContentsSpaceRight = styled.div`
  width: 85%;
  height: 500px;
  display: flex;
  flex-direction: column;
`;
const AnswerIconUpDownBtn = styled.div`
  font-size: 50px;
  color: rgb(200, 200, 200);
`;
const AnswerIcon = styled.div`
  font-size: 20px;
  color: rgb(200, 200, 200);
  &:nth-child(4) {
    margin: -10px 0px 10px 0px;
  }
  display: flex;
  justify-content: center;
  align-items: center;
  -webkit-text-stroke: 2px white;
`;

const AnswerRightContentsTop = styled.div`
  height: 150px;
  padding: 10px;
  overflow: scroll;
  &:nth-child(2) {
    margin-top: 10px;
    background-color: #f6f6f6;
    padding: 10px;
    border-radius: 5px;
    margin-bottom: 30px;
  }
`;
const AnswerRightContentsBottom = styled.div`
  width: 100%;
  height: 90px;
  display: flex;
  justify-content: space-between;
`;
const AnswerRightBottomSpace = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
const AnswerRightBottomUpSpace = styled.div`
  display: flex;
`;

const ContentDetailBtn = styled.button`
  background-color: white;
  color: rgba(31, 30, 30, 0.6);
  border: none;
  cursor: pointer;
`;
const ContentsAddBtn = styled.button`
  color: #d4d4d4;
  background-color: white;
  border: none;
`;
const ContentsUserInformationSpace = styled.div`
  width: 200px;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const UserElapsedTime = styled.div`
  font-size: 15px;
  color: rgba(31, 30, 30, 0.6);
  margin-top: 10px;
`;
const ContentsUserSpace = styled.div`
  display: flex;
  margin-top: 5px;
`;
const ContentsUserImg = styled.img`
  width: 35px;
  height: 35px;
`;
const UserSpace = styled.div`
  width: 80px;
  height: 35px;
  margin-left: 15px;
`;
const UserName = styled.div`
  color: #0074cc;
  cursor: pointer;
  &:hover {
    color: #0995ff;
  }
  margin-bottom: 5px;
`;
export default ReadAnswer;

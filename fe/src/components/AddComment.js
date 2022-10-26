import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchQuestion } from "../reduxStore/slices/questionSlice";
import styled from "styled-components";
import { AiFillCaretUp, AiFillCaretDown } from "react-icons/ai";
import { FaRegBookmark, FaHistory } from "react-icons/fa";

function AddComment() {
  const { questions, loading, error } = useSelector((state) => state.questions);
  console.log(questions);
  const [clickSelect, setClickSelect] = useState("");
  const dispatch = useDispatch();
  useEffect(() => {
    if (questions.length === 0) {
      dispatch(fetchQuestion());
    }
  }, []);

  let filterAnswerLength = questions[0]?.answer.length;
  let filterAnswerVotes = questions[0]?.answer[2].votes;
  let filterAnswerContentBody = questions[0]?.answer[2].contentbody;
  let filterAnswerContentCode = questions[0]?.answer[2].contentcode;

  const selectOption = [
    { id: 1, value: "Highest score ( default ) " },
    { id: 2, value: "Trending ( recent votes count more ) " },
    { id: 3, value: "Date modified ( newest first ) " },
    { id: 4, value: "Date created ( oldest first ) " },
  ];
  const changeClickSelect = (e) => {
    setClickSelect(e.target.value);
  };

  return (
    <AnswerWrapper>
      <AnswerTitleSpace>
        <TitleAnswerLeft>
          <AnswerTextSpace>{filterAnswerLength}</AnswerTextSpace>
          <AnswerTextSpace>Answer</AnswerTextSpace>
        </TitleAnswerLeft>
        <AnswerTitleSelectSpace>
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
        </AnswerTitleSelectSpace>
      </AnswerTitleSpace>
      <AnswerContentsSpace>
        <AnswerContentsSpaceLeft>
          <AnswerIconUpDownBtn>
            <AiFillCaretUp />
          </AnswerIconUpDownBtn>
          <AnswerTextSpace>{filterAnswerVotes}</AnswerTextSpace>
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
          <AnswerRightContentsTop>
            {filterAnswerContentBody}
          </AnswerRightContentsTop>
          <AnswerRightContentsTop>
            {filterAnswerContentCode}
          </AnswerRightContentsTop>
          <AnswerRightContentsBottom>
            <AnswerRightBottomSpace>
              <AnswerRightBottomUpSpace>
                <ContentButton>쉐어</ContentButton>
                <ContentButton>수정</ContentButton>
                <ContentButton>팔로우</ContentButton>
              </AnswerRightBottomUpSpace>
              <div>Add a comment</div>
            </AnswerRightBottomSpace>
            <div>
              <div>작성시간</div>
              <div>
                <div>작성자이미지</div>
                <div>
                  <div>작성자 본인</div>
                  <div>평판수</div>
                </div>
              </div>
            </div>
          </AnswerRightContentsBottom>
        </AnswerContentsSpaceRight>
      </AnswerContentsSpace>
      <div></div>
      <div></div>
      <div>
        <div></div>
        <div></div>
      </div>
      <div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </AnswerWrapper>
  );
}
const AnswerWrapper = styled.div`
  border: 3px solid yellowgreen;
  width: 100%;
  height: 600px;
  display: flex;
  flex-direction: column;
`;
const AnswerTitleSpace = styled.div`
  width: 100%;
  border: 1px solid blue;
  height: 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const TitleAnswerLeft = styled.div`
  width: 80px;
  height: 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 20px;
  border: 1px solid yellowgreen;
`;
const AnswerTextSpace = styled.div`
  color: red;
  font-size: 20px;
`;

const AnswerTitleSelectSpace = styled.div`
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
`;
const AnswerContentsSpaceLeft = styled.div`
  width: 70px;
  height: 240px;
  margin-right: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
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
  height: 115px;
  border: 1px solid violet;
  display: flex;
`;
const AnswerRightBottomSpace = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
const AnswerRightBottomUpSpace = styled.div`
  display: flex;
`;

const ContentButton = styled.button`
  background-color: white;
`;

export default AddComment;

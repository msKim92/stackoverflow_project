import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { fetchQuestion } from "../reduxStore/slices/questionSlice";

function Question() {
  const { questions, loading, error } = useSelector((state) => state.questions);
  console.log(questions);
  const dispatch = useDispatch();
  useEffect(() => {
    if (questions.length === 0) {
      dispatch(fetchQuestion());
    }
  }, []);
  return (
    <>
      {questions?.map((data) => (
        <QuestionSpace key={data.id}>
          <div>
            <div>{data.questionVote} votes</div>
            <div>{data.answer.length} answer</div>
            <div>{data.questionViewCount.length} vuews</div>
          </div>
          <div>
            <div>{data.questionTitle}</div>
            <div>{data.tags}</div>
          </div>
          <div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </QuestionSpace>
      ))}
    </>
  );
}

const QuestionSpace = styled.div`
  width: 100%;
  height: 300px;
  margin-top: 20px;
  border: 5px solid blue;
`;

export default Question;

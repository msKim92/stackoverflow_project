import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { fetchQuestion } from "../reduxStore/slices/questionSlice";

function Question() {
  const { questions, loading, error } = useSelector((state) => state.questions);
  const dispatch = useDispatch();
  useEffect(() => {
    if (questions.length === 0) {
      dispatch(fetchQuestion());
    }
  }, []);
  return (
    <QuestionSpace>
      <div></div>
    </QuestionSpace>
  );
}

const QuestionSpace = styled.div`
  width: 100%;
  height: 100px;
  margin-top: 20px;
  border: 5px solid blue;
`;
export default Question;

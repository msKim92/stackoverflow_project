import React from "react";
import styled from "styled-components";

function AddComment() {
  return <AnswerWrapper>AddComment</AnswerWrapper>;
}

const AnswerWrapper = styled.div`
  width: 94%;
  height: 400px;
  display: flex;
  flex-direction: column;
  border: none;
  /* border-bottom: 1px solid #9ea6ac; */
  border: 1px solid blue;
`;

export default AddComment;

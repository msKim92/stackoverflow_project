import React from "react";
import styled from "styled-components";

function Question() {
  return (
    <QuestionSpace>
      <div></div>
    </QuestionSpace>
  );
}

const QuestionSpace = styled.div`
  width: 100%;
  height: 100px;
  border: 1px solid red;
`;
export default Question;

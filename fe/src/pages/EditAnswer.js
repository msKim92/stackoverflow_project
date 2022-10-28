import React from "react";
import styled from "styled-components";
import Header from "../components/Header";
import LeftNvi from "../components/LeftNavi";
import RightNavi from "../components/RightNavi";

function EditAnswer() {
  return (
    <>
      <Header />

      <Wraper>
        <LeftNvi />
        <QuestionList></QuestionList>
        <RightNavi />
      </Wraper>
    </>
  );
}
const Wraper = styled.div`
  width: 1400px;
  padding-top: 60px;
  height: 100%;
  display: flex;
  margin-left: auto;
  margin-right: auto;
  border: 1px solid blue;
`;

const QuestionList = styled.div`
  width: 750px;
  height: 800px;
  overflow-y: auto;
  margin: 10px 10px 10px 0px;
  border: 3px solid yellowgreen;
`;

export default EditAnswer;

import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Header from "../components/Header";
import LeftNvi from "../components/LeftNavi";
import RightNavi from "../components/RightNavi";
import Footer from "../components/Footer";
import Question from "../components/Question";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import useNotification from "../pages/useNotification";
function AllQuestions() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [clickSearchCheck, setClickSearchCheck] = useState(false);
  const [changeSearch, setChangeSearch] = useState("");
  const [clickHere, setClickHere] = useState(1);
  console.log(changeSearch);
  const clickAddQuetion = () => {
    navigate("/askquestions");
  };
  const clickSearch = () => {
    if (changeSearch) {
      setClickHere(99);
      setClickSearchCheck(true);
    } else {
      setClickSearchCheck(false);
    }
  };
  const userSearch = (e) => {
    setChangeSearch(e.target.value);
  };

  let jwtToken = localStorage.getItem("access_token");
  console.log("jwtToken>>>>", jwtToken);

  const triggerNotif = useNotification("로그인을 해주세요.", {
    body: "from. stackoverflow",
  });

  return (
    <>
      <Header
        changeSearch={changeSearch}
        setChangeSearch={setChangeSearch}
        userSearch={userSearch}
        clickSearch={clickSearch}
      />
      <Wraper>
        <LeftNvi />
        <QuestionList>
          <AllQuestionsMenu>
            <AllQuestionsTop>
              <AllQuestionsTitle>Top Questions</AllQuestionsTitle>
              {jwtToken === "" || jwtToken === "undefined" ? (
                <AllQuestionsAddBtn onClick={triggerNotif}>
                  Ask Question
                </AllQuestionsAddBtn>
              ) : (
                <AllQuestionsAddBtn onClick={clickAddQuetion}>
                  Ask Question
                </AllQuestionsAddBtn>
              )}
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
          <Question
            clickHere={clickHere}
            clickSearchCheck={clickSearchCheck}
            changeSearch={changeSearch}
            setClickHere={setClickHere}
          />
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
  display: flex;
  margin-left: auto;
  margin-right: auto;
`;
const QuestionList = styled.div`
  width: 750px;
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
const PageNationSpace = styled.div`
  width: 99%;
  height: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const PageNationBtn1 = styled.button`
  width: 30px;
  height: 30px;
  border: 1px solid gray;
  margin: 0px 5px;
  background-color: ${(props) => (props.isClick === 1 ? "orange" : "#d0e2f0")};
`;
const PageNationBtn2 = styled.button`
  width: 30px;
  height: 30px;
  border: 1px solid gray;
  margin: 0px 5px;
  background-color: ${(props) => (props.isClick === 2 ? "orange" : "#d0e2f0")};
`;
const PageNationBtn3 = styled.button`
  width: 30px;
  height: 30px;
  border: 1px solid gray;
  margin: 0px 5px;
  background-color: ${(props) => (props.isClick === 3 ? "orange" : "#d0e2f0")};
`;

export default AllQuestions;

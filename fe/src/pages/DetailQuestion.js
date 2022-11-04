import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Footer from "../components/Footer";
import Header from "../components/Header";
import LeftNvi from "../components/LeftNavi";
import RightNavi from "../components/RightNavi";
import {
  AiFillCaretUp,
  AiFillCaretDown,
  AiOutlineHistory,
} from "react-icons/ai";
import ReadAnswer from "../components/ReadAnswer";
import AddAnswer from "../components/AddAnswer";
import { FaRegBookmark, FaRegUserCircle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { filterFetchQuestion } from "../reduxStore/slices/questionSlice";
import { useParams, useNavigate } from "react-router-dom";

function DetailQuestion() {
  const questionData = useSelector(
    (state) => state.questions.selectQuestions?.data
  );
  console.log(">>>>>>>", questionData);

  const dispatch = useDispatch();
  const parmas = useParams();
  useEffect(() => {
    dispatch(filterFetchQuestion(Number(parmas.id)));
  }, []);

  const tags = questionData?.tags;
  const tagList =
    tags &&
    tags.map((el) => {
      if (el !== "") {
        return <button key={el.toString()}>{el}</button>;
      }
    });

  const createdAt = questionData?.created_at;
  //2022-11-02T13:39:43
  // const createdSplit = createdAt.split("T");
  // console.log(createdSplit); //'2022-11-02', '13:39:43'

  // const daySplit = createdSplit[0].split("-");
  // console.log(daySplit); //'2022', '11', '02'
  // const year = daysplit[0];
  // const month = daysplit[1];
  // const day = daysplit[2];

  // const timeSplit = createdSplit[1].split(":");
  // console.log(timeSplit);
  const navigate = useNavigate();
  const clickAddQuetion = () => {
    navigate("/askquestions");
  };

  const markup = () => {
    return { __html: `${questionData?.questionBody}` };
  };

  const editQuestion = (e, id) => {
    console.log("id>>>>>>>>>>>>>>>", id);
    e.preventDefault();
    navigate(`/editquestion/${id}`);
  };

  return (
    <Wrapper>
      <header>
        <Header />
      </header>
      <SecondWrapper>
        <ThirdWrapper>
          <LeftWrapper>
            <LeftNvi />
          </LeftWrapper>
          <Question>
            <div>
              <Titile>
                <div className="title">{questionData?.questionTitle}</div>
                <ButtonStyle onClick={clickAddQuetion}>
                  Ask Question
                </ButtonStyle>
              </Titile>
              <TimeLine>
                <div className="subject">Asked</div>
                <div className="content">{questionData?.updated_at}</div>

                <div className="subject">Modified</div>
                <div className="content">{questionData?.updated_at}</div>

                <div className="subject">Viewed</div>
                <div className="content">{questionData?.questionViewCount}</div>
              </TimeLine>
              <Border></Border>
            </div>
            <Text>
              <div className="w80">
                <div>
                  <Flex>
                    <ContentWrapper>
                      <IconWrapper>
                        <CaretUpIcon />
                        <Num>0</Num>
                        <CaretDownIcon />
                        <BookmarkIcon />
                        <HistoryIcon />
                      </IconWrapper>
                      <QuestionWrapper>
                        <div dangerouslySetInnerHTML={markup()}></div>
                        <ButtonWrapper>{tagList}</ButtonWrapper>
                        <InfoWrapper>
                          <ShareWrapper>
                            <div>Share</div>
                            <div
                              onClick={editQuestion(questionData?.questionId)}
                            >
                              Edit
                            </div>
                            <div>Follow</div>
                          </ShareWrapper>
                          <div
                            style={{
                              border: "1px solid #D9EAF7",
                              backgroundColor: "#D9EAF7",
                              padding: "0.7%",
                              borderRadius: "3%",
                              fontSize: "13px",
                              color: "#6a737c",
                              width: "23%",
                            }}
                          >
                            <div>
                              <div>asked 3hours ago</div>
                              <div style={{ display: "flex" }}>
                                <div style={{ margin: "3% 3% 0 0" }}>
                                  <FaRegUserCircle
                                    style={{ fontSize: "35px" }}
                                  />
                                </div>
                                <div
                                  style={{
                                    margin: "7% 7% 0 0",
                                    color: "#608fb1",
                                  }}
                                >
                                  {questionData?.create_by_user}
                                </div>
                              </div>
                            </div>
                          </div>
                        </InfoWrapper>
                      </QuestionWrapper>
                    </ContentWrapper>
                  </Flex>
                  <ReadAnswer />
                  <AddAnswer />
                </div>
              </div>
              <div
                style={{
                  width: "30%",
                  height: "100%",
                }}
              >
                <RightNavi />
              </div>
            </Text>
          </Question>
        </ThirdWrapper>
      </SecondWrapper>
      <Footer />
    </Wrapper>
  );
}

const ButtonStyle = styled.button`
  padding: 1%;
  font-size: 14px;
  background-color: #0a95ff;
  border-radius: 8%;
  color: white;
  border: 1px solid #0a95ff;
  box-shadow: 0 1px 0 #6cbfff inset;
`;

const Wrapper = styled.div`
  box-sizing: border-box;
  height: 100%;
  & > header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
  }
`;

const SecondWrapper = styled.div`
  width: 60%;
  margin: 0 auto;
  height: 100%;
`;

const ThirdWrapper = styled.div`
  display: flex;
  margin-top: 4%;
  height: 100%;
`;

const LeftWrapper = styled.div`
  width: 13%;
`;

const Question = styled.div`
  width: 100%;
  // border: 1px solid red;
  margin: 1%;
`;

const Text = styled.div`
  display: flex;
  & > .w80 {
    width: 80%;
  }
`;

const Titile = styled.div`
  display: flex;
  width: 100%;
  margin-top: 2%;
  & > .title {
    margin-right: auto;
    font-size: 26px;
  }
  & > button {
    background-color: #0a95ff;
    border: 1px solid #7aa7c7;
    padding: 1%;
    color: #ffff;
  }
`;

const TimeLine = styled.div`
  display: flex;
  align-items: center;
  margin: 0.5% 0;
  & .subject {
    color: #6a737c;
    font-size: 14px;
    margin-right: 1%;
  }
  & > .content {
    font-size: 14px;
    margin-right: 2%;
  }
`;

const Border = styled.div`
  border-top: 1px solid #e3e6e8;
  margin: 1.5% 0;
`;

const Flex = styled.div`
  display: flex;
`;

const ContentWrapper = styled.div`
  margin-right: auto;
  display: flex;
  width: 100%;
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const QuestionWrapper = styled.div`
  margin-left: 2%;
  margin-top: 1%;
  width: 88%;
  // border: 1px solid red;
`;

const ButtonWrapper = styled.div`
  // border: 1px solid green;
  margin-top: 5%;
  & > button {
    background-color: #e1ecf4;
    border: 1px solid #e1ecf4;
    padding: 0.5% 1%;
    color: #608fb1;
    margin-right: 1%;
    border-radius: 10%;
  }
`;

const Num = styled.div`
  color: #6a737c;
  font-size: 125%;
`;

const InfoWrapper = styled.div`
  // border: 1px solid blue;
  margin-top: 5%;
  display: flex;
`;

const ShareWrapper = styled.div`
  // border: 1px solid red;
  display: flex;
  margin-right: auto;
  color: #6a737c;
  font-size: 13px;
  & > div {
    margin-right: 8%;
  }
  & > button {
    margin-right: 8%;
  }
`;

const CaretUpIcon = styled(AiFillCaretUp)`
  color: #babfc4;
  font-size: 280%;
`;

const CaretDownIcon = styled(AiFillCaretDown)`
  color: #babfc4;
  font-size: 280%;
`;

const BookmarkIcon = styled(FaRegBookmark)`
  color: #babfc4;
  font-size: 100%;
  padding-bottom: 20%;
`;

const HistoryIcon = styled(AiOutlineHistory)`
  color: #babfc4;
  font-size: 100%;
  padding: 4% 0;
`;
export default DetailQuestion;

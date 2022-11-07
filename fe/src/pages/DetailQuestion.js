import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Footer from "../components/Footer";
import Header from "../components/Header";
import LeftNvi from "../components/LeftNavi";
import RightNavi from "../components/RightNavi";
import ReadAnswer from "../components/ReadAnswer";
import AddAnswer from "../components/AddAnswer";
import { FaRegBookmark, FaRegUserCircle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate, Link } from "react-router-dom";
import "@toast-ui/editor/dist/toastui-editor-viewer.css";
import { Viewer } from "@toast-ui/react-editor";
import Apis from "../api/api";
import {
  AiFillCaretUp,
  AiFillCaretDown,
  AiOutlineHistory,
} from "react-icons/ai";
import {
  filterFetchQuestion,
  voteUpQuestion,
  voteDownQuestion,
} from "../reduxStore/slices/questionSlice";

function DetailQuestion() {
  const dispatch = useDispatch();
  const parmas = useParams();
  const navigate = useNavigate();

  //question페이지에서 보낸 질문데이터
  const questionData = useSelector(
    (state) => state.questions.selectQuestions?.data
  );

  //url parameter가져오기
  useEffect(() => {
    dispatch(filterFetchQuestion(Number(parmas.id)));
  }, []);
  //tag 값 정렬
  const tags = questionData?.tags;
  const tagList =
    tags &&
    tags.map((el) => {
      if (el !== "") {
        return <button key={el.toString()}>{el}</button>;
      }
    });
  //날짜 계산
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

  const createdAt = new Date(questionData?.created_at).toLocaleDateString(
    "en-us",
    {
      weekday: "long",
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    }
  );
  const updatedAt = new Date(questionData?.updated_at).toLocaleDateString(
    "en-us",
    {
      weekday: "long",
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    }
  );
  //askquestion으로 이동
  const clickAddQuetion = () => {
    navigate("/askquestions");
  };

  const clickUpBtn = () => {
    dispatch(voteUpQuestion(questionData.questionId));
  };
  const clickDownBtn = () => {
    dispatch(voteDownQuestion(questionData.questionId));
  };

  //localStorage token값
  let jwtToken = localStorage.getItem("Authorization");
  //게시글 삭제api
  const deleteQuestion = () => {
    Apis.delete(`v1/questions/${questionData.questionId}`, {
      headers: {
        Authorization: `${jwtToken}`,
      },
    })
      .then((res) => {
        navigate("/");
      })
      .catch((err) => {});
  };
  const markup = () => {
    return { __html: `${questionData?.questionBody}` };
  };
  const body = questionData?.questionBody;
  return (
    <Wrapper>
      <header>
        <Header />
      </header>
      <SecondWrapper>
        <ThirdWrapper>
          <LeftNvi />
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
                <div className="content">{createdAt}</div>

                <div className="subject">Modified</div>
                <div className="content">{updatedAt}</div>

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
                        <ClickButtonStyle
                          onClick={() => {
                            clickUpBtn();
                          }}
                        >
                          <CaretUpIcon />
                        </ClickButtonStyle>
                        <Num>{questionData?.questionVote}</Num>
                        <ClickButtonStyle onClick={clickDownBtn}>
                          <CaretDownIcon />
                        </ClickButtonStyle>
                        <BookmarkIcon />
                        <HistoryIcon />
                      </IconWrapper>
                      <QuestionWrapper>
                        <Viewer initialValue={body} />
                        <div dangerouslySetInnerHTML={markup()}></div>

                        <ButtonWrapper>{tagList}</ButtonWrapper>
                        <InfoWrapper>
                          <ShareWrapper>
                            <div>Share</div>
                            <Edit
                              to={`/editquestion/${questionData?.questionId}`}
                              state={{ data: questionData }}
                            >
                              Edit
                            </Edit>
                            <div onClick={deleteQuestion}>Delete</div>
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
                              {renderTime(
                                questionData?.created_at,
                                questionData?.modified_at
                              )}
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
                  <ReadAnswer questionData={questionData} />
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
const QuestionerDetailInformation = styled.div`
  margin: 0px 2px;
`;

const ButtonStyle = styled.button`
  padding: 1%;
  font-size: 14px;
  background-color: #0a95ff;
  border-radius: 8%;
  color: white;
  border: 1px solid #0a95ff;
  box-shadow: 0 1px 0 #6cbfff inset;
`;
const ClickButtonStyle = styled.button`
  font-size: 14px;
  color: white;
  border: none;
  background-color: white;
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
  width: 80%;
  margin: 0 auto;
  height: 100%;
`;

const ThirdWrapper = styled.div`
  display: flex;
  margin-top: 4%;
  height: 100%;
`;

const Question = styled.div`
  width: 100%;
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

const Edit = styled(Link)`
  margin-right: 8%;
  color: #6a737c;
  font-size: 13px;
  text-decoration: none;
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

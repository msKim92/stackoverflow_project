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
import { FaRegBookmark } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { filterFetchQuestion } from "../reduxStore/slices/questionSlice";
import { useParams } from "react-router-dom";

function DetailQuestion() {
  // const [time, setTime] = useState("");

  const questionData = useSelector(
    (state) => state.questions.selectQuestions?.data
  );
  // console.log(">>>>>>>", questionData);

  const dispatch = useDispatch();
  const parmas = useParams();
  useEffect(() => {
    dispatch(filterFetchQuestion(Number(parmas.id)));
  }, []);

  const tags = questionData?.tags;
  const tagList =
    tags && tags.map((el) => <button key={el.toString()}>{el}</button>);

  // const createdAt = questionData?.created_at;
  //2022-11-02T13:39:43
  // const createdSplit = (questionData?.created_at).split("T");
  // console.log(createdSplit); //'2022-11-02', '13:39:43'

  // const daySplit = createdSplit[0].split("-");
  // console.log(daySplit); //'2022', '11', '02'
  // const year = daysplit[0];
  // const month = daysplit[1];
  // const day = daysplit[2];

  // const timeSplit = createdSplit[1].split(":");
  // console.log(timeSplit);

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
                <button>Ask Question</button>
              </Titile>
              <TimeLine>
                <div className="subject">Asked</div>
                <div className="content">{questionData?.updated_at}</div>

                <div className="subject">Modified</div>
                <div className="content">{questionData?.updated_at}</div>

                <div className="subject">Viewed</div>
                <div className="content">{questionData?.updated_at}</div>
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
                        <div style={{ border: "1px solid blue" }}>
                          {questionData?.questionBody}
                        </div>
                        <ButtonWrapper>{tagList}</ButtonWrapper>
                        <InfoWrapper>
                          <ShareWrapper>
                            <div>Share</div>
                            <div>Edit</div>
                            <div>Follow</div>
                          </ShareWrapper>
                          <div>
                            <div>
                              <div>asked 3hours ago</div>
                              <div>ID</div>
                              <div>
                                <div>{questionData?.create_by_user}</div>
                                <div>icon</div>
                                <div>1</div>
                                <div>icon</div>
                                <div>15</div>
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
                  border: "2px solid green",
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
  width: 88%;
  border: 1px solid red;
`;

const ButtonWrapper = styled.div`
  border: 1px solid green;
  margin-top: 3%;
  & > button {
    background-color: #e1ecf4;
    border: 1px solid #e1ecf4;
    padding: 1%;
    color: #608fb1;
    margin-right: 1%;
  }
`;

const Num = styled.div`
  color: #6a737c;
  font-size: 125%;
`;

const InfoWrapper = styled.div`
  border: 1px solid blue;
  margin-top: 5%;
  display: flex;
`;

const ShareWrapper = styled.div`
  border: 1px solid red;
  display: flex;
  margin-right: auto;
  color: #6a737c;
  font-size: 14px;
  & > div {
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

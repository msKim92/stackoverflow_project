import React from "react";
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

function DetailQuestion() {
  return (
    <div>
      <Header />
      <Wrapper>
        <Flex>
          <div>
            <LeftNvi />
          </div>
          <TimeLineWrapper>
            <Titile>
              <div className="title">
                why title_img is undefined ? and the other are working?
              </div>
              <button>Ask Question</button>
            </Titile>
            <TimeLine>
              <div className="subject">Asked</div>
              <div className="content">today</div>

              <div className="subject">Modified</div>
              <div className="content">today</div>

              <div className="subject">Viewed</div>
              <div className="content">18 times</div>
            </TimeLine>

            <Border></Border>

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
                      I have a upload btn named title_ img and upload btn for
                      multiple images.
                    </div>
                    <ButtonWrapper>
                      <button>javascript</button>
                      <button>php</button>
                    </ButtonWrapper>
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
                            <div>395</div>
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
                <div>
                  <RightNavi />
                </div>
              </Flex>
              <ReadAnswer />
              <AddAnswer />
            </div>
          </TimeLineWrapper>
        </Flex>

        <div>
          <Footer />
        </div>
      </Wrapper>
    </div>
  );
}

const Wrapper = styled.div`
  box-sizing: border-box;
  width: 1400px;
  height: 100vh;
  padding-top: 60px;
  // border: 2px solid red;
  margin-left: auto;
  margin-right: auto;
`;

const Flex = styled.div`
  display: flex;
`;

const Titile = styled.div`
  display: flex;
  width: 100%;
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

const TimeLineWrapper = styled.div`
  width: 100%;
  margin: 2% 0 2% 2%;
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

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const ContentWrapper = styled.div`
  margin-right: auto;
  display: flex;
  width: 100%;
`;

const Num = styled.div`
  color: #6a737c;
  font-size: 125%;
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

const InfoWrapper = styled.div`
  border: 1px solid blue;
  margin-top: 5%;
  display: flex;
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

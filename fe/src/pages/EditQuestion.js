import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import Footer from "../components/Footer";
import Header from "../components/Header";
import LeftNvi from "../components/LeftNavi";
import "@toast-ui/editor/dist/toastui-editor.css";
import { Editor } from "@toast-ui/react-editor";
import { filterFetchQuestion } from "../reduxStore/slices/questionSlice";

function EditQuestion() {
  const parmas = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(filterFetchQuestion(Number(parmas.id)));
  }, []);

  const questionData = useSelector(
    (state) => state.questions.selectQuestions?.data
  );
  const selectList = ["mplungjan - 18 hours ago", "user20305 - 18 hours ago"];
  const [Selected, setSelected] = useState("");

  const ChangeSelect = (e) => {
    setSelected(e.target.value);
  };

  const list = [
    "Correct minor typos or mistakes",
    "Clarify meaning without changing it",
    "Add related resources or links",
    "Always respect the author’s intent",
    "Don’t use edits to reply to the author",
  ];

  const listItems = list.map((el) => <li key={el.toString()}>{el}</li>);

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
            <Text>
              <div className="w80">
                <div className="margin">
                  <div className="bold">Rev</div>
                  <Select onChange={ChangeSelect} value={Selected}>
                    {selectList.map((item) => (
                      <option value={item} key={item}>
                        {item}
                      </option>
                    ))}
                  </Select>
                </div>
                <div>
                  <Bold>Titile</Bold>
                  <input></input>
                </div>
                <div>
                  <Body>Body</Body>
                  <Editor
                    initialEditType="" // 초기 입력모드 설정
                    previewStyle="vertical" // 미리보기 스타일 지정
                    height="300px" // 에디터 창 높이
                  ></Editor>
                </div>
                <MarginTop>
                  How can I filter this object, only for specific keys
                </MarginTop>
                <div>
                  <Tag>Tags</Tag>
                  <input></input>
                </div>
                <div>
                  <MarginBottom>Edit Summary</MarginBottom>
                  <input></input>
                </div>
                <div>
                  <Submit>Submit for review</Submit>
                  <div>
                    <input type="checkbox" name="*" value="*" />
                    <div>
                      This edit resolves the original close reason and the
                      question should be considered for reopening.
                    </div>
                  </div>
                  <Buttons>
                    <button className="saveEdit">Save edits</button>
                    <button className="cancel">Cancel</button>
                  </Buttons>
                </div>
              </div>

              <Nav>
                <Subject>How to Edit</Subject>
                <Content>{listItems}</Content>
              </Nav>
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
    z-index: 1000;
  }
`;

const SecondWrapper = styled.div`
  width: 60%;
  margin: 0 auto;
  height: 100%;
`;

const ThirdWrapper = styled.div`
  display: flex;
  margin-top: 3.5%;
  height: 100%;
`;

const LeftWrapper = styled.div`
  width: 13%;
`;

const Question = styled.div`
  width: 100%;
`;

const Text = styled.div`
  display: flex;
  margin: 1.7%;
  & > .w80 {
    width: 60%;
    margin: 0.7%;
  }
  & > .w80 .margin {
    margin: 1% 0;
  }
  & > .w80 .margin .bold {
    font-weight: bold;
  }
`;

const Subject = styled.div`
  padding: 4% 0 4% 4%;
  font-size: 13px;
  font-weight: bold;
  color: #525960;
  border: 1px solid #f1e5bc;
  background-color: #fbf3d5;
`;

const Content = styled.div`
  padding: 4%;
  font-size: 13px;
  background-color: #fdf7e2;
  & > li {
    padding-right: 3%;
    padding-bottom: 3%;
  }
`;

const Select = styled.select`
  margin-top: 0.8%;
  width: 100%;
`;

const Bold = styled.div`
  font-weight: bold;
  & + input {
    margin-top: 0.8%;
    width: 99%;
  }
`;

const Body = styled.div`
  margin-top: 2%;
  font-weight: bold;
  margin-bottom: 0.8%;
`;

const MarginTop = styled.div`
  margin-top: 1.3%;
`;

const Tag = styled.div`
  font-weight: bold;
  margin-bottom: 1%;
  & + input {
    width: 99%;
  }
`;

const MarginBottom = styled.div`
  font-weight: bold;
  margin-bottom: 1%;
  & + input {
    width: 99%;
  }
`;

const Submit = styled.div`
  margin-bottom: 1%;
  font-weight: bold;
  & + div {
    display: flex;
  }
`;

const Buttons = styled.div`
  padding-top: 5%;
  & > .saveEdit {
    background-color: #0a95ff;
    border: 1px solid #0a95ff;
    padding: 1.2%;
    color: #ffffff;
    margin-right: 2%;
  }
  & > .cancel {
    border: 1px solid #ffffff;
    background-color: #ffffff;
    padding: 1.2%;
    color: #0a95ff;
  }
`;

const Nav = styled.div`
  border: 1px solid #f1e5bc;
  width: 30%;
  margin: 1% 0;
  height: 50%;
`;
export default EditQuestion;

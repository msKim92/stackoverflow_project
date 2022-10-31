import React, { useState } from "react";
import styled from "styled-components";
import Footer from "../components/Footer";
import Header from "../components/Header";
import LeftNvi from "../components/LeftNavi";
import "@toast-ui/editor/dist/toastui-editor.css";
import { Editor } from "@toast-ui/react-editor";

function EditQuestion() {
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
      <SecondWrapper style={{ border: "5px solid red" }}>
        <ThirdWrapper>
          <LeftWrapper>
            <LeftNvi />
          </LeftWrapper>
          <Question style={{ border: "5px solid blue" }}>
            <Text style={{ border: "5px solid green" }}>
              <div className="w80" style={{ border: "5px solid orange" }}>
                <div style={{ margin: "1% 0" }}>
                  <div style={{ fontWeight: "bold" }}>Rev</div>
                  <select
                    style={{ marginTop: "0.8%", width: "100%" }}
                    onChange={ChangeSelect}
                    value={Selected}
                  >
                    {selectList.map((item) => (
                      <option value={item} key={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <div style={{ fontWeight: "bold" }}>Titile</div>
                  <input style={{ marginTop: "0.8%", width: "99%" }}></input>
                </div>
                <div>
                  <div
                    style={{
                      marginTop: "2%",
                      fontWeight: "bold",
                      marginBottom: "0.8%",
                    }}
                  >
                    Body
                  </div>
                  <Editor
                    initialEditType="" // 초기 입력모드 설정
                    previewStyle="vertical" // 미리보기 스타일 지정
                    height="300px" // 에디터 창 높이
                  ></Editor>
                </div>
                <div style={{ marginTop: "1.3%" }}>
                  How can I filter this object, only for specific keys
                </div>
                <div>
                  <div
                    style={{
                      fontWeight: "bold",
                      marginTop: "3%",
                      marginBottom: "1%",
                    }}
                  >
                    Tags
                  </div>
                  <input style={{ width: "99%" }}></input>
                </div>
                <div>
                  <div
                    style={{
                      fontWeight: "bold",
                      marginTop: "3%",
                      marginBottom: "1%",
                    }}
                  >
                    Edit Summary
                  </div>
                  <input style={{ width: "99%" }}></input>
                </div>
                <div>
                  <div
                    style={{
                      marginTop: "5%",
                      marginBottom: "1%",
                      fontWeight: "bold",
                    }}
                  >
                    Submit for review
                  </div>
                  <div style={{ display: "flex" }}>
                    <input type="checkbox" name="*" value="*" />
                    <div>
                      This edit resolves the original close reason and the
                      question should be considered for reopening.
                    </div>
                  </div>
                  <div>
                    <button
                      style={{
                        backgroundColor: "#0A95FF",
                        border: "1px solid #0A95FF",
                        marginTop: "4%",
                        padding: "1.2%",
                        color: "#FFFFFF",
                        marginRight: "2%",
                      }}
                    >
                      Save edits
                    </button>
                    <button
                      style={{
                        border: "1px solid #FFFFFF",
                        backgroundColor: "#FFFFFF",
                        marginTop: "4%",
                        padding: "1.2%",
                        color: "#0A95FF",
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>

              <div
                style={{
                  border: "1px solid #F1E5BC",
                  width: "30%",
                  margin: "1% 0",
                  height: "50%",
                }}
              >
                <Subject>How to Edit</Subject>
                <Content>{listItems}</Content>
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
  margin-top: 4%;
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
  & > .w80 {
    width: 60%;
    margin: 0.7%;
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

export default EditQuestion;

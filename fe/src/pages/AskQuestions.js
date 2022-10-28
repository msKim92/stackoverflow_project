import React from "react";
import styled from "styled-components";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Img from "../img/image.jpg";
import "@toast-ui/editor/dist/toastui-editor.css";
import { Editor } from "@toast-ui/react-editor";

const list = [
  "Summarize your problem in a one-line title.",
  "Describe your problem in more detail.",
  "Describe what you tried and what you expected to happen.",
  'Add "tags" which help surface your question to members of the community.',
  "Review your question and post it to the site.",
];

const listItems = list.map((el) => <li key={el.toString()}>{el}</li>);

function AskQuestions() {
  return (
    <div
      style={{
        width: "100%",
        border: "2px solid red",
        backgroundColor: "#F9F9F9",
      }}
    >
      <HeaderWrapper>
        <Header />
      </HeaderWrapper>
      <div style={{ margin: "0 auto", width: "60%" }}>
        <div
          style={{
            border: "2px solid blue",
            paddingTop: "5%",
            display: "flex",
          }}
        >
          <div
            style={{
              border: "1px solid green",
              fontSize: "25px",
              fontWeight: "bold",
              display: "flex",
              alignItems: "center",
            }}
          >
            Ask a public question
          </div>
          <img src={Img} style={{ marginLeft: "auto" }}></img>
        </div>
        <div style={{ width: "67%" }}>
          <div
            style={{
              border: "1px solid #A6CEED",
              backgroundColor: "#EBF4FB",
              marginTop: "1%",
              padding: "2%",
            }}
          >
            <div style={{ fontSize: "20px", marginBottom: "0.7%" }}>
              Writing a good question
            </div>
            <div style={{ marginTop: "0.7%" }}>
              You’re ready to ask a programming-related question and this form
              will help guide you through the process.
            </div>
            <div>
              Looking to ask a non-programming question? See the topics here to
              find a relevant site.
            </div>
            <div
              style={{
                fontSize: "14px",
                marginTop: "1.5%",
                fontWeight: "bold",
              }}
            >
              Steps
            </div>
            {listItems}
          </div>
          <div
            style={{
              border: "1px solid #E3E6E8",
              marginTop: "2%",
              padding: "2%",
              backgroundColor: "#FFFFFF",
            }}
          >
            <div
              style={{
                fontWeight: "bold",
                marginBottom: "0.7%",
              }}
            >
              Title
            </div>
            <div style={{ marginBottom: "0.7%" }}>
              Be specific and imagine you’re asking a question to another
              person.
            </div>
            <input
              style={{
                border: "1px solid #BABFC4",
                height: "25px",
                marginTop: "0.7%",
                width: "100%",
              }}
            ></input>
          </div>

          <div
            style={{
              border: "1px solid #E3E6E8",
              marginTop: "2%",
              padding: "2%",
              backgroundColor: "#FFFFFF",
            }}
          >
            <div
              style={{
                fontWeight: "bold",
                marginBottom: "0.7%",
              }}
            >
              What are the details of your problem?
            </div>
            <div style={{ marginBottom: "0.7%" }}>
              Introduce the problem and expand on what you put in the title.
              Minimum 20 characters.
            </div>
            <Editor
              initialEditType="" // 초기 입력모드 설정
              previewStyle="vertical" // 미리보기 스타일 지정
              height="300px" // 에디터 창 높이
            ></Editor>
          </div>

          <div
            style={{
              border: "1px solid #E3E6E8",
              marginTop: "2%",
              padding: "2%",
              backgroundColor: "#FFFFFF",
            }}
          >
            <div
              style={{
                fontWeight: "bold",
                marginBottom: "0.7%",
              }}
            >
              Tags
            </div>
            <div style={{ marginBottom: "0.7%" }}>
              Add up to 5 tags to describe what your question is about. Start
              typing to see suggestions.
            </div>
            <input
              style={{
                border: "1px solid #BABFC4",
                height: "25px",
                marginTop: "0.7%",
                width: "100%",
                placeHolder: "e.g.(excel string regex)",
              }}
            ></input>
            <button
              style={{
                backgroundColor: "#0A95FF",
                border: "1px solid #0A95FF",
                marginTop: "2%",
                padding: "1.2%",
                color: "#FFFFFF",
              }}
            >
              Next
            </button>
          </div>

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
            Review your question
          </button>
          <button
            style={{
              backgroundColor: "#F9F9F9",
              border: "1px solid #F9F9F9",
              marginTop: "4%",
              padding: "1.2%",
              color: "#C22E32",
            }}
          >
            Discard draft
          </button>
        </div>
      </div>
    </div>
  );
}

const HeaderWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
`;
export default AskQuestions;

import React, { useState, useEffect, useRef } from "react";
// import { useDispatch } from "react-redux";
// import { askQuestion } from ".../reduxStore/slices/";
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

// const dispatch = useDispatch();

const listItems = list.map((el) => <li key={el.toString()}>{el}</li>);

function AskQuestions() {
  const [title, setTitle] = useState("");
  const [question, setQuestion] = useState("");
  const [tag, setTag] = useState("");

  const editoerRef = useRef();

  const onChange = () => {
    const data = editoerRef.current.getInstance().getHTML();
    setQuestion(data);
  };

  const body = {
    questionTitle: title,
    questionBody: question,
  };

  const submitQuestion = () => {
    // dispatch(askQuestion(body));
  };

  return (
    <Wrapper>
      <HeaderWrapper>
        <Header />
      </HeaderWrapper>
      <ContentWrapper>
        <Subject>
          <div>Ask a public question</div>
          <img src={Img}></img>
        </Subject>
        <W67>
          <Description>
            <div className="writing">Writing a good question</div>
            <div className="m07">
              You’re ready to ask a programming-related question and this form
              will help guide you through the process.
            </div>
            <div>
              Looking to ask a non-programming question? See the topics here to
              find a relevant site.
            </div>
            <div className="steps">Steps</div>
            {listItems}
          </Description>
          <Title>
            <div className="title">Title</div>
            <div className="m07">
              Be specific and imagine you’re asking a question to another
              person.
            </div>
            <input
              type="text"
              onChange={(event) => setTitle(event.target.value)}
            ></input>
          </Title>

          <QuestionWrapper>
            <div className="title">What are the details of your problem?</div>
            <div className="m07">
              Introduce the problem and expand on what you put in the title.
              Minimum 20 characters.
            </div>
            <Editor
              hideModeSwitch="false"
              language="ko-KR"
              initialEditType="wysiwyg" // 초기 입력모드 설정
              previewStyle="vertical" // 미리보기 스타일 지정
              height="300px" // 에디터 창 높이
              ref={editoerRef}
              onChange={onChange}
            />
          </QuestionWrapper>

          <Tags>
            <div className="title">Tags</div>
            <div className="m07">
              Add up to 5 tags to describe what your question is about. Start
              typing to see suggestions.
            </div>
            <input
              type="text"
              onChange={(event) => setTag(event.target.value)}
            ></input>
            {/* <button>Next</button> */}
          </Tags>

          <ReviewButton onClick={() => submitQuestion()}>
            Review your question
          </ReviewButton>
          <DiscardButton>Discard draft</DiscardButton>
        </W67>
      </ContentWrapper>
      <footer style={{ marginTop: "2%" }}>
        <Footer />
      </footer>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  background-color: #f9f9f9;
`;

const ContentWrapper = styled.div`
  margin: 0 auto;
  width: 60%;
`;

const Subject = styled.div`
  padding-top: 5%;
  display: flex;
  & > div {
    font-size: 25px;
    font-weight: bold;
    display: flex;
    align-items: center;
  }
  & > img {
    margin-left: auto;
  }
`;

const HeaderWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
`;

const W67 = styled.div`
  width: 67%;
`;

const Description = styled.div`
  border: 1px solid #a6ceed;
  background-color: #ebf4fb;
  margin-top: 1%;
  padding: 2%;
  & > .writing {
    font-size: 20px;
    margin-bottom: 0.7%;
  }
  & > .m07 {
    margin-top: 0.7%;
  }
  & > .steps {
    font-size: 14px;
    margin-top: 1.5%;
    font-weight: bold;
  }
`;

const Title = styled.div`
  border: 1px solid #e3e6e8;
  margin-top: 2%;
  padding: 2%;
  background-color: #ffffff;
  & > .title {
    font-weight: bold;
    margin-bottom: 0.7%;
  }
  & > .m07 {
    margin-bottom: 0.7%;
  }
  & > input {
    border: 1px solid #babfc4;
    height: 25px;
    margin-top: 0.7%;
    width: 100%;
  }
`;

const QuestionWrapper = styled.div`
  border: 1px solid #e3e6e8;
  margin-top: 2%;
  padding: 2%;
  background-color: #ffffff;
  & > .title {
    font-weight: bold;
    margin-bottom: 0.7%;
  }
  & > .m07 {
    margin-bottom: 0.7%;
  }
`;

const Tags = styled.div`
  border: 1px solid #e3e6e8;
  margin-top: 2%;
  padding: 2%;
  background-color: #ffffff;
  & > .title {
    font-weight: bold;
    margin-bottom: 0.7%;
  }
  & > .m07 {
    margin-bottom: 0.7%;
  }
  & > input {
    border: 1px solid #babfc4;
    height: 25px;
    margin-top: 0.7%;
    width: 100%;
  }
  & > button {
    background-color: #0a95ff;
    border: 1px solid #0a95ff;
    margin-top: 2%;
    padding: 1.2%;
    color: #ffffff;
  }
`;

const ReviewButton = styled.button`
  background-color: #0a95ff;
  border: 1px solid #0a95ff;
  margin-top: 4%;
  padding: 1.2%;
  color: #ffffff;
  margin-right: 2%;
`;

const DiscardButton = styled.button`
  background-color: #f9f9f9;
  border: 1px solid #f9f9f9;
  margin-top: 4%;
  padding: 1.2%;
  color: #c22e32;
`;
export default AskQuestions;

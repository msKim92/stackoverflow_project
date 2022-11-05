import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { askQuestion } from "../reduxStore/slices/questionSlice";
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
  const [title, setTitle] = useState("");
  const [question, setQuestion] = useState("");
  const [tag, setTag] = useState("");
  const [allow, setAllow] = useState(false);
  const [tagAllow, setTagAllow] = useState(false);
  const [submit, setSubmit] = useState(false);

  const editoerRef = useRef();

  const onChange = () => {
    const data = editoerRef.current.getInstance().getHTML();
    setQuestion(data);
  };

  const questionAllow = () => {
    setAllow(true);
  };

  const tagAllowed = () => {
    setTagAllow(true);
  };

  const submitAllow = () => {
    setSubmit(true);
  };

  const body = {
    questionTitle: title,
    questionBody: question,
    tags: "@java",
  };

  const dispatch = useDispatch();
  const submitQuestion = () => {
    dispatch(askQuestion(body));
  };

  if (!allow) {
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
                You’re ready to <a href="*">ask</a> a{" "}
                <a href="*">programming-related question</a>
                and this form will help guide you through the process.
              </div>
              <div>
                Looking to ask a non-programming question? See{" "}
                <a href="*">the topics here</a> to find a relevant site.
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
              <ButtonStyle onClick={questionAllow}>Next</ButtonStyle>
            </Title>

            <NotAllow>
              <QuestionWrapper>
                <div className="title">
                  What are the details of your problem?
                </div>
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
            </NotAllow>

            <NotAllow>
              <Tags>
                <div className="title">Tags</div>
                <div className="m07">
                  Add up to 5 tags to describe what your question is about.
                  Start typing to see suggestions.
                </div>
                <input
                  type="text"
                  onChange={(event) => setTag(event.target.value)}
                ></input>
              </Tags>
            </NotAllow>

            <ReviewButton
              style={{ opacity: "0.5" }}
              onClick={() => submitQuestion()}
            >
              Review your question
            </ReviewButton>
          </W67>
        </ContentWrapper>
        <footer style={{ marginTop: "2%" }}>
          <Footer />
        </footer>
      </Wrapper>
    );
  } else if (allow && !tagAllow) {
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
                You’re ready to <a href="*">ask</a> a{" "}
                <a href="*">programming-related question</a>
                and this form will help guide you through the process.
              </div>
              <div>
                Looking to ask a non-programming question? See{" "}
                <a href="*">the topics here</a> to find a relevant site.
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
              <ButtonStyle onClick={questionAllow}>Next</ButtonStyle>
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
                height="330px" // 에디터 창 높이
                ref={editoerRef}
                onChange={onChange}
              />
              <ButtonStyle style={{ marginTop: "1.5%" }} onClick={tagAllowed}>
                Next
              </ButtonStyle>
            </QuestionWrapper>

            <NotAllow>
              <Tags>
                <div className="title">Tags</div>
                <div className="m07">
                  Add up to 5 tags to describe what your question is about.
                  Start typing to see suggestions.
                </div>
                <input
                  type="text"
                  onChange={(event) => setTag(event.target.value)}
                ></input>
              </Tags>
            </NotAllow>

            <ReviewButton
              style={{ opacity: "0.5" }}
              onClick={() => submitQuestion()}
            >
              Review your question
            </ReviewButton>
          </W67>
        </ContentWrapper>
        <footer style={{ marginTop: "2%" }}>
          <Footer />
        </footer>
      </Wrapper>
    );
  } else if (allow === true && tagAllow === true && submit === false) {
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
                You’re ready to <a href="*">ask</a> a{" "}
                <a href="*">programming-related question</a>
                and this form will help guide you through the process.
              </div>
              <div>
                Looking to ask a non-programming question? See{" "}
                <a href="*">the topics here</a> to find a relevant site.
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
              <ButtonStyle onClick={questionAllow}>Next</ButtonStyle>
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
                height="330px" // 에디터 창 높이
                ref={editoerRef}
                onChange={onChange}
              />
              <ButtonStyle style={{ marginTop: "1.5%" }} onClick={tagAllowed}>
                Next
              </ButtonStyle>
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
              <ButtonStyle onClick={submitAllow}>Next</ButtonStyle>
            </Tags>

            <ReviewButton
              style={{ opacity: "0.5" }}
              onClick={() => submitQuestion()}
            >
              Review your question
            </ReviewButton>
          </W67>
        </ContentWrapper>
        <footer style={{ marginTop: "2%" }}>
          <Footer />
        </footer>
      </Wrapper>
    );
  } else if (allow === true && tagAllow === true && submit === true) {
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
                You’re ready to <a href="*">ask</a> a{" "}
                <a href="*">programming-related question</a>
                and this form will help guide you through the process.
              </div>
              <div>
                Looking to ask a non-programming question? See{" "}
                <a href="*">the topics here</a> to find a relevant site.
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
              <ButtonStyle onClick={questionAllow}>Next</ButtonStyle>
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
                height="330px" // 에디터 창 높이
                ref={editoerRef}
                onChange={onChange}
              />
              <ButtonStyle style={{ marginTop: "1.5%" }} onClick={tagAllowed}>
                Next
              </ButtonStyle>
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
              <ButtonStyle onClick={submitAllow}>Next</ButtonStyle>
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
              You’re ready to <a href="*">ask</a> a{" "}
              <a href="*">programming-related question</a>
              and this form will help guide you through the process.
            </div>
            <div>
              Looking to ask a non-programming question? See{" "}
              <a href="*">the topics here</a> to find a relevant site.
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
            <ButtonStyle>Next</ButtonStyle>
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

const NotAllow = styled.div`
  opacity: 0.2;
  background-color: grey;
  pointer-events: none;
  cursor: not-allowed;
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
  border-radius: 1%;
  background-color: #ebf4fb;
  margin-top: 1.5%;
  padding: 3%;
  color: #3b4045;
  & > .writing {
    font-size: 20px;
    margin-bottom: 1.3%;
  }
  & > .m07 {
    margin-top: 0.7%;
  }
  & a {
    text-decoration: none;
    color: #0074cc;
  }
  & > .steps {
    font-size: 13px;
    margin-top: 2%;
    margin-bottom: 1%;
    font-weight: bold;
  }
  & > li {
    padding-left: 1.5%;
    font-size: 12.5px;
    margin-bottom: 0.5%;
  }
`;

const Title = styled.div`
  border: 1px solid #e3e6e8;
  border-radius: 1%;
  margin-top: 2%;
  padding: 2%;
  background-color: #ffffff;
  & > .title {
    font-size: 14px;
    font-weight: bold;
    margin-bottom: 0.7%;
  }
  & > .m07 {
    margin-bottom: 0.7%;
    font-size: 12.5px;
  }
  & > input {
    border: 1px solid #babfc4;
    height: 25px;
    margin-top: 0.7%;
    width: 100%;
    margin-bottom: 0.7%;
  }
`;

const QuestionWrapper = styled.div`
  border: 1px solid #e3e6e8;
  margin-top: 2%;
  padding: 2%;
  background-color: #ffffff;
  & > .title {
    font-size: 14px;
    font-weight: bold;
    margin-bottom: 0.7%;
  }
  & > .m07 {
    font-size: 12.5px;
    margin-bottom: 1%;
  }
`;

const Tags = styled.div`
  border: 1px solid #e3e6e8;
  margin-top: 2%;
  padding: 2%;
  background-color: #ffffff;
  & > .title {
    font-size: 14px;
    font-weight: bold;
    margin-bottom: 0.7%;
  }
  & > .m07 {
    margin-bottom: 1%;
    font-size: 12.5px;
  }
  & > input {
    border: 1px solid #babfc4;
    height: 25px;
    width: 100%;
    margin-bottom: 1.5%;
  }
`;

const ReviewButton = styled.button`
  margin-top: 4%;
  margin-right: 2%;
  padding: 1%;
  font-size: 14px;
  background-color: #0a95ff;
  border-radius: 5%;
  color: white;
  border: 1px solid #0a95ff;
  box-shadow: 0 1px 0 #6cbfff inset;
`;

const DiscardButton = styled.button`
  background-color: #f9f9f9;
  border: 1px solid #f9f9f9;
  margin-top: 4%;
  padding: 1.2%;
  color: #c22e32;
`;
export default AskQuestions;

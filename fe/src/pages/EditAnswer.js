import React, { useRef, useState, useEffect } from "react";
import styled from "styled-components";
import Header from "../components/Header";
import LeftNvi from "../components/LeftNavi";
import RightNavi from "../components/RightNavi";
import "@toast-ui/editor/dist/toastui-editor.css";
import { Editor } from "@toast-ui/react-editor";
import { Viewer } from "@toast-ui/react-editor";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchAnswer } from "../reduxStore/slices/answerSlice";

function EditAnswer() {
  const answer = useSelector((state) => state.answers.answers);
  const editorRef = useRef();

  console.log(answer);
  const [write, setWrite] = useState(answer?.contentbody);
  const dispatch = useDispatch();
  const param = useParams();
  const answerWrite = () => {
    const data = editorRef.current.getInstance().getMarkdown();
    setWrite(data);
  };
  const answerFilter = answer?.filter((data) => data.id === Number(param.id));
  const toolbarItems = [
    ["bold", "italic", "strike"],
    ["code", "codeblock"],
    ["hr", "quote"],
    ["ul", "ol", "task", "indent"],
    ["table", "link"],
    ["image"],
    ["code"],
    ["scrollSync"],
  ];

  const clickAnswerEdit = () => {
    console.log(Number(param.id));
  };
  useEffect(() => {
    dispatch(fetchAnswer());
  }, []);

  return (
    <>
      <Header />
      <Wraper>
        <LeftNvi />
        <AnswerWrapper>
          <AnswerContent>
            <AsnwerEditTop>
              <div>
                Your edit will be placed in a queue until ti is pear reviewed
              </div>
              <div>
                <div>
                  We welcome edits that make the post easier to understand and
                  more valuable for readers. Because community members review
                  edits. please try to
                </div>
                <div>
                  make the post substantially better than how you found it, for
                  example, by fixing grammar or adding additional resources and
                  hyperlinks.
                </div>
              </div>
            </AsnwerEditTop>

            <AsnwerEditMiddle>
              <AsnwerEditTitle>Body</AsnwerEditTitle>
              <Editor
                initialEditType="wysiwyg" // 초기 입력모드 설정
                previewStyle="vertical" // 미리보기 스타일 지정
                height="300px" // 에디터 창 높이
                toolbarItems={toolbarItems}
                onChange={answerWrite}
                ref={editorRef}
                initialValue={write}
              ></Editor>
            </AsnwerEditMiddle>
            <UserClickBtnSpace>
              <UserClickBtn onClick={clickAnswerEdit}>Save Edits</UserClickBtn>
              <UserClickBtn>Cancel</UserClickBtn>
            </UserClickBtnSpace>
          </AnswerContent>
        </AnswerWrapper>
        <RightNavi />
      </Wraper>
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

const AnswerWrapper = styled.div`
  width: 750px;
  height: 800px;
  margin: 10px 0px 0px 10px;
  display: flex;
  justify-content: center;
`;
const AnswerContent = styled.div`
  width: 96%;
  height: 100%;
`;
const AsnwerEditTop = styled.div`
  width: 98%;
  height: 90px;
  background-color: #fdf7e2;
  border: 3px solid #e6cf79;
  border-radius: 3px;
  font-size: 11px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  padding-left: 10px;
`;
const AsnwerEditMiddle = styled.div`
  width: 100%;
  height: 350px;
  margin-top: 30px;
`;
const AsnwerEditTitle = styled.div`
  margin-bottom: 7px;
`;
const UserClickBtnSpace = styled.div`
  width: 400px;
  height: 45px;
  min-width: 150px;
  display: flex;
`;
const UserClickBtn = styled.button`
  width: 110px;
  height: 45px;
  background-color: rgb(20, 148, 245);
  color: white;
  border: none;
  border-top: double white;
  border-radius: 5px;
  &:nth-child(2) {
    background-color: white;
    color: rgb(20, 148, 245);
  }
`;
export default EditAnswer;

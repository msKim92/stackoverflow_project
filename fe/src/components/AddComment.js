import React, { useState } from "react";
import styled from "styled-components";
import { RiLinksLine, RiFileCodeFill, RiKeyboardLine } from "react-icons/ri";
import { IoMdQuote } from "react-icons/io";
import {
  BsFillImageFill,
  BsTextCenter,
  BsFillQuestionCircleFill,
} from "react-icons/bs";
import {
  MdFormatListNumbered,
  MdFormatListBulleted,
  MdReorder,
  MdOutlineFormatItalic,
  MdOutlineFormatBold,
} from "react-icons/md";
import { CgUndo, CgRedo } from "react-icons/cg";
import { BiCodeCurly } from "react-icons/bi";
function AddComment() {
  const [openQe, setOpenQe] = useState(false);

  const clickOpenQuestion = () => {
    setOpenQe(!openQe);
  };

  return (
    <Wrapper>
      <AllQuestionsInformation>
        <div>
          Know someone who can answer? Share a link to this
          <InformationSpan> questions</InformationSpan> via
          <InformationSpan>email , Twitter</InformationSpan>
          <InformationSpan> Facebook</InformationSpan>.
        </div>
      </AllQuestionsInformation>
      <AnswerWapper>
        <UserAnswerTitle>Your Answer</UserAnswerTitle>
        <UserWriteSpace>
          <UserWriteBtnSpace>
            <UserWriteBtnLeft>
              <UserWriteBtns>
                <UserWriteBtn>
                  <MdOutlineFormatBold />
                </UserWriteBtn>
                <UserWriteBtn>
                  <MdOutlineFormatItalic />
                </UserWriteBtn>
              </UserWriteBtns>
              <UserWriteBtns>
                <UserWriteBtn>
                  <RiLinksLine />
                </UserWriteBtn>
                <UserWriteBtn>
                  <IoMdQuote />
                </UserWriteBtn>
                <UserWriteBtn>
                  <BiCodeCurly />
                </UserWriteBtn>
                <UserWriteBtn>
                  <BsFillImageFill />
                </UserWriteBtn>
                <UserWriteBtn>
                  <RiFileCodeFill />
                </UserWriteBtn>
              </UserWriteBtns>
              <UserWriteBtns>
                <UserWriteBtn>
                  <MdFormatListNumbered />
                </UserWriteBtn>
                <UserWriteBtn>
                  <MdFormatListBulleted />
                </UserWriteBtn>
                <UserWriteBtn>
                  <BsTextCenter />
                </UserWriteBtn>
                <UserWriteBtn>
                  <MdReorder />
                </UserWriteBtn>
              </UserWriteBtns>
              <UserWriteBtns>
                <UserWriteBtn>
                  <CgUndo />
                </UserWriteBtn>
                <UserWriteBtn>
                  <CgRedo />
                </UserWriteBtn>
              </UserWriteBtns>
            </UserWriteBtnLeft>
            <UserWriteQeBtn onClick={clickOpenQuestion}>
              <BsFillQuestionCircleFill />
            </UserWriteQeBtn>
          </UserWriteBtnSpace>
          {openQe ? (
            <UserWriteTagBtnSpace>
              <UserWriteTagBtnSpace>
                <UserWriteTagBtn>Links</UserWriteTagBtn>
                <UserWriteTagBtn>Imges</UserWriteTagBtn>
                <UserWriteTagBtn>Styling/Headres</UserWriteTagBtn>
                <UserWriteTagBtn>Lists</UserWriteTagBtn>
                <UserWriteTagBtn>Blockqquotes</UserWriteTagBtn>
                <UserWriteTagBtn>Code</UserWriteTagBtn>
                <UserWriteTagBtn>Html</UserWriteTagBtn>
                <UserWriteTagBtn>Tables</UserWriteTagBtn>
              </UserWriteTagBtnSpace>
              <UserWriteTagHelpBtn>Advanced help</UserWriteTagHelpBtn>
            </UserWriteTagBtnSpace>
          ) : null}

          <UserWriteTextareaBox />
          <UserWriteBoxBtn>
            <RiKeyboardLine />
          </UserWriteBoxBtn>
        </UserWriteSpace>
        <UserClickBtnSpace>
          <UserClickBtn>Post Your Answer</UserClickBtn>
        </UserClickBtnSpace>
      </AnswerWapper>
      <AllQuestionsInformation>
        <div>
          Browse other questions tagged
          <InformationLinkSpan> git</InformationLinkSpan>
          <InformationLinkSpan>devops</InformationLinkSpan>
          <InformationLinkSpan>databricks</InformationLinkSpan>
          <InformationLinkSpan>azure-reps</InformationLinkSpan>
          <InformationLinkSpan>databrics-repos</InformationLinkSpan> or
          <InformationSpan> ask your</InformationSpan>
        </div>
        <InformationDiv>own question.</InformationDiv>
      </AllQuestionsInformation>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 99%;
  height: 582px;
  display: flex;
  flex-direction: column;
  border: none;
  margin-bottom: 140px;
`;
const AllQuestionsInformation = styled.div`
  width: 96%;
  height: 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-left: 20px;
  font-size: 18px;
`;

const InformationSpan = styled.span`
  color: #0074cc;
  cursor: pointer;
  font-weight: 500;
  &:hover {
    color: #0995ff;
  }
  &:nth-child(2) {
    margin-left: 5px;
  }
`;
const InformationLinkSpan = styled.span`
  color: #0074cc;
  cursor: pointer;
  font-size: 13px;
  font-weight: 500;
  background-color: #d0e2f0;
  margin: 0px 2px;
  &:hover {
    color: #0995ff;
  }
  padding: 5px 10px;
`;
const InformationDiv = styled.div`
  color: #0074cc;
  cursor: pointer;
  margin-top: 10px;
  &:hover {
    color: #0995ff;
  }
  font-weight: 500;
`;

const AnswerWapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  margin: 0px 0px 20px 20px;
`;
const UserAnswerTitle = styled.div`
  font-size: 20px;
`;

const UserWriteSpace = styled.div`
  width: 100%;
  height: 330px;
  margin-top: 20px;
`;

const UserWriteBtnSpace = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 40px;
  border: 1px solid #9ea6ac;
  border-radius: 5px 5px 0px 0px;
`;
const UserWriteBtns = styled.div`
  display: flex;
  &:nth-child(1) {
    margin: 0px 7px 0px 0px;
  }
  &:nth-child(2) {
    margin: 0px 7px;
  }
  &:nth-child(3) {
    margin: 0px 7px;
  }
`;
const UserWriteBtnLeft = styled.div`
  display: flex;
`;
const UserWriteBtn = styled.button`
  border: none;
  background-color: white;
  width: 100%;
  font-size: 23px;
  opacity: 0.6;
  width: 30px;
  margin: 0px 3px;
  cursor: pointer;
`;
const UserWriteQeBtn = styled.button`
  border: none;
  background-color: white;
  width: 100%;
  font-size: 20px;
  opacity: 0.6;
  width: 30px;
  margin: 0px 3px;
  cursor: pointer;
  &:hover {
    background-color: #dbdbd9;
  }
`;

const UserWriteTagBtnSpace = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: #dbdbd9;
  height: 30px;
  border-top: 1px solid #9ea6ac;
  border-bottom: 1px solid #9ea6ac;
`;
const UserWriteTagBtn = styled.button`
  background-color: #dbdbd9;
  border: none;
  font-weight: 500;
  cursor: pointer;
`;
const UserWriteTagHelpBtn = styled.button`
  background-color: #dbdbd9;
  border: none;
  font-weight: 500;
  color: #0074cc;
  cursor: pointer;
  &:hover {
    color: #0995ff;
  }
`;

const UserWriteTextareaBox = styled.textarea`
  width: 99.5%;
  height: 70%;
  text-align: start;

  &:focus {
    box-shadow: 0px 0px 3px 3px rgba(107, 186, 247, 0.5);
    border: none;
    outline: 0;
  }
`;
const UserWriteBoxBtn = styled.div`
  width: 100%;
  height: 20px;
  margin-top: -5px;
  border: 1px solid blue;
  border-top: 1px solid #9ea6ac;
  display: flex;
  justify-content: center;
  background-color: #dbdbd9;
  &:hover {
    cursor: s-resize;
  }
  border-radius: 0px 0px 5px 5px;
`;

const UserClickBtnSpace = styled.div`
  width: 150px;
  height: 45px;
  min-width: 150px;
`;
const UserClickBtn = styled.button`
  width: 150px;
  height: 45px;
  background-color: rgb(20, 148, 245);
  color: white;
  border: none;
  border-top: double white;
  border-radius: 5px;
`;
export default AddComment;

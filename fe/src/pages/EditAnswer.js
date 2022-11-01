import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Header from "../components/Header";
import LeftNvi from "../components/LeftNavi";
import RightNavi from "../components/RightNavi";
import { useDispatch, useSelector } from "react-redux";
import { fetchAnswer, updateAnswer } from "../reduxStore/slices/answerSlice";
import { BsCheckSquare, BsTable, BsCodeSlash } from "react-icons/bs";
import { RiKeyboardLine } from "react-icons/ri";
import {
  MdFormatListNumbered,
  MdFormatListBulleted,
  MdOutlineFormatItalic,
  MdOutlineFormatBold,
} from "react-icons/md";
import { AiOutlineStrikethrough } from "react-icons/ai";
import { CgBorderStyleSolid } from "react-icons/cg";
import { TfiQuoteLeft } from "react-icons/tfi";
import { FaIndent } from "react-icons/fa";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { useParams } from "react-router-dom";

function EditAnswer() {
  const answer = useSelector(
    (state) => state.questions.questions.data?.answers
  );
  const [write, setWrite] = useState(" ");
  const dispatch = useDispatch();
  const params = useParams();
  const filterAnswer = answer?.filter((data) => data.id === Number(params.id));
  useEffect(() => {
    dispatch(fetchAnswer());
  }, []);

  const userWriteContents = (e) => {
    setWrite(e.target.value);
  };

  const clickUpdateAnswer = () => {
    let id = Number(params.id);
    const upData = {
      id: filterAnswer[0]?.id,
      votes: filterAnswer[0]?.votes,
      contentbody: write,
      contentcode: filterAnswer[0]?.contentcode,
    };
    dispatch(updateAnswer({ id, upData }));
  };
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
              <UserWriteSpace>
                <UserWriteBtnSpace>
                  <UserWriteBtnLeft>
                    <UserWriteBtns>
                      <UserWriteBtnText>Write</UserWriteBtnText>
                      <UserWriteBtnText>Preview</UserWriteBtnText>
                    </UserWriteBtns>
                    <UserWriteBtns>
                      <UserWriteBtn>
                        <MdOutlineFormatBold />
                      </UserWriteBtn>
                      <UserWriteBtn>
                        <MdOutlineFormatItalic />
                      </UserWriteBtn>
                      <UserWriteBtn>
                        <AiOutlineStrikethrough />
                      </UserWriteBtn>
                    </UserWriteBtns>
                    <UserWriteBtns>
                      <UserWriteBtn>
                        <BsCodeSlash />
                      </UserWriteBtn>
                      <UserWriteBtn>CB</UserWriteBtn>
                    </UserWriteBtns>
                    <UserWriteBtns>
                      <UserWriteBtn>
                        <CgBorderStyleSolid />
                      </UserWriteBtn>
                      <UserWriteBtn>
                        <TfiQuoteLeft />
                      </UserWriteBtn>
                    </UserWriteBtns>
                    <UserWriteBtns>
                      <UserWriteBtn>
                        <MdFormatListBulleted />
                      </UserWriteBtn>
                      <UserWriteBtn>
                        <MdFormatListNumbered />
                      </UserWriteBtn>
                      <UserWriteBtn>
                        <BsCheckSquare />
                      </UserWriteBtn>
                      <UserWriteBtn>
                        <FaIndent />
                      </UserWriteBtn>
                    </UserWriteBtns>
                  </UserWriteBtnLeft>
                  <UserWriteBtnRight>
                    <UserWriteBtns>
                      <UserWriteBtn>
                        <BsTable />
                      </UserWriteBtn>
                      <UserWriteQeBtn>
                        <HiOutlineDotsHorizontal />
                      </UserWriteQeBtn>
                    </UserWriteBtns>
                  </UserWriteBtnRight>
                </UserWriteBtnSpace>
                <UserWriteTextareaBox onChange={userWriteContents} />
                <UserWriteBoxBtn>
                  <RiKeyboardLine />
                </UserWriteBoxBtn>
              </UserWriteSpace>
            </AsnwerEditMiddle>
            <UserClickBtnSpace>
              <UserClickBtn onClick={clickUpdateAnswer}>
                Save Edits
              </UserClickBtn>
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

const UserWriteSpace = styled.div`
  width: 100%;
  height: 330px;
  margin-top: 20px;
  background-color: #f8f9fc;
`;

const UserWriteBtnSpace = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 20px;
  border: 1px solid #9ea6ac;
  border-radius: 5px 5px 0px 0px;
  padding: 10px 0px;
`;
const UserWriteBtns = styled.div`
  display: flex;
  width: 80px;
  &:nth-child(1) {
    border-bottom: none;
  }
  &:nth-child(2) {
    margin-left: 50px;
  }
  &:nth-child(3) {
    border-left: 1px solid black;
    margin-left: 40px;
    padding-left: 5px;
  }
  &:nth-child(5) {
    border-left: 1px solid black;
    margin-left: 10px;
    padding-left: 10px;
  }
`;
const UserWriteBtnLeft = styled.div`
  display: flex;
  width: 600px;
`;
const UserWriteBtnRight = styled.div`
  display: flex;
  width: 100px;
  border-left: 1px solid black;
  padding-left: 10px;
`;
const UserWriteBtn = styled.button`
  border: none;
  background-color: white;
  width: 100%;
  font-size: 20px;
  opacity: 0.6;
  width: 40px;
  height: 20px;
  margin: 0px 3px;
  cursor: pointer;
  display: flex;
  align-items: center;
`;

const UserWriteBtnText = styled.button`
  background-color: white;
  width: 100%;
  font-size: 15px;
  opacity: 0.6;
  height: 30px;
  width: 70px;
  border: 1px solid black;
  border-bottom: none;
  border-radius: 5px 5px 0px 0px;
  cursor: pointer;
  margin-left: 10px;
  font-weight: bold;
  &:nth-child(2) {
    background-color: #eaedf1;
    margin-left: 0px;
  }
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

const UserWriteTextareaBox = styled.textarea`
  width: 99.5%;
  height: 70%;
  overflow-y: scroll;
  text-align: start;
  border-top: none;

  &:focus {
    box-shadow: 0px 0px 3px 3px rgba(107, 186, 247, 0.5);
    border: none;
    outline: 0;
  }
  &:nth-child(4) {
    background-color: gray;
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
  width: 220px;
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

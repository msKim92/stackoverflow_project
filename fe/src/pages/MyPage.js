import React from "react";
import styled from "styled-components";
import Header from "../components/Header";
import LeftNvi from "../components/LeftNavi";
import Footer from "../components/Footer";
import Img from "../img/user.png"

function MyPage() {
  return (
    <>
    <Wraper> 
      <Header />
        <LeftNvi />
          <MainForm>
            <UserForm>
                <UserImg>
                  <Image src={Img} />
                </UserImg>
                <UserName> USER 이름 </UserName>
            </UserForm>
            <Answers>Answers</Answers>
            <AnswersBox>You have not answered any questions</AnswersBox>
            <Questions>Questions</Questions>
            <QuestionsBox>You have not asked any questions</QuestionsBox>
          </MainForm>
    </Wraper>
    <Footer />
    </>
    )
}


const Wraper = styled.div`
  border: 1px solid green;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
`;

const MainForm = styled.div`
  margin-top: 52px;
  border: 1px solid red;
  width: 900px;
  height: 1648.77px;
  padding: 24px;
`;

const UserForm = styled.div`
  width: 100%;
  height: 143px;
  display: flex;
  align-items: center;
  margin-bottom: 50px;
`;

const UserImg = styled.div`
  border: 1px solid hsl(0deg 0% 80%);
  border-radius: 5px;
  width: 127px;
  height: 127px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: hsl(0deg 0% 97%);
`;

const Image = styled.img`
  width: 90px;
  height: 100px;
`

const UserName = styled.div`
  border: 1px solid hsl(0deg 0% 80%);
  width: 220px;
  height: 40px;
  display: flex;
  align-items: center;
  margin-left: 30px;
  margin-top: 40px;
  font-size: 30px;
`;

const Answers = styled.div`
  font-size: 22px;
  margin-bottom: 18px;
`

const Questions = styled.div`
  font-size: 22px;
  margin-bottom: 18px;
`

const AnswersBox = styled.div`
  border: 1px solid black;
  width: 700px;
  height: 64px;
  font-size: 15px;
  border-radius: 5px;
  margin-bottom: 18px;
  display: flex;
  justify-content: center;
  align-items: center;
`

const QuestionsBox = styled.div`
  border: 1px solid black;
  width: 700px;
  height: 64px;
  font-size: 15px;
  border-radius: 5px;
  margin-bottom: 18px;
  display: flex;
  justify-content: center;
  align-items: center;
`

export default MyPage;
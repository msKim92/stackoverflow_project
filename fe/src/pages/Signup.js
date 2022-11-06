import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { AiFillGithub, AiFillFacebook } from "react-icons/ai";
import Header from "../components/Header";
import { RiQuestionnaireFill } from "react-icons/ri";
import { TiArrowUnsorted } from "react-icons/ti";
import { ImPriceTags, ImTrophy } from "react-icons/im";
import { useDispatch } from "react-redux";
import { signUser } from "../reduxStore/slices/userSlice";
import {
  nickNameCheck,
  emaileCheck,
  pwdCheck,
} from "../components/effectivenessCheck";
import capcha from "../img/recaptchaImg.png";

function Signup() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [userWriteName, setUserWriteName] = useState("");
  const [userWriteEmail, setUserWriteEmail] = useState("");
  const [userWritePassword, setUserWritePassword] = useState("");
  const [nickCheck, setnickCheck] = useState(false);
  const [writeEmailCheck, setWriteEmailCheck] = useState(false);
  const [writePwdCheck, setWritePwdCheck] = useState(false);

  const [robotCkeck, setrobotCheck] = useState(false);

  const clickLogin = () => {
    navigate("/Login");
  };

  const clickCheckBtn = () => {
    setrobotCheck(!robotCkeck);
  };

  const clickSignupBtn = () => {
    let addData = {
      userEmail: userWriteEmail,
      password: userWritePassword,
      userName: userWriteName,
    };

    if (
      userWriteName === "" ||
      userWriteEmail === "" ||
      userWritePassword === "" ||
      robotCkeck === false
    ) {
      setnickCheck(true);
      setWriteEmailCheck(true);
      setWritePwdCheck(true);
    } else {
      setnickCheck(false);
      setWriteEmailCheck(false);
      setWritePwdCheck(false);
    }
    if (!nickNameCheck(userWriteName)) {
      setnickCheck(true);
    } else {
      setnickCheck(false);
    }
    if (!emaileCheck(userWriteEmail)) {
      setWriteEmailCheck(true);
    } else {
      setWriteEmailCheck(false);
    }
    if (!pwdCheck(userWritePassword)) {
      setWritePwdCheck(true);
    } else {
      setWritePwdCheck(false);
    }

    if (
      nickCheck === false &&
      writeEmailCheck === false &&
      writePwdCheck === false &&
      userWriteName !== "" &&
      userWriteEmail !== "" &&
      userWritePassword !== ""
    ) {
      dispatch(signUser({ addData, navigate }));
    }
  };

  const userName = (e) => {
    setUserWriteName(e.target.value);
  };

  const userEmail = (e) => {
    setUserWriteEmail(e.target.value);
  };

  const userPassword = (e) => {
    setUserWritePassword(e.target.value);
  };

  return (
    <>
      <Header />
      <Display>
        <DisplayWrapper>
          <Main>
            <TextBox>
              <MainText>Join the Stack Overflow community</MainText>
              <FlexItem>
                <Icon>
                  <RiQuestionnaireFill />
                </Icon>
                <Text>Get unstuck — ask a question</Text>
              </FlexItem>
              <FlexItem>
                <Icon>
                  <TiArrowUnsorted />
                </Icon>
                <Text>Unlock new privileges like voting and commenting</Text>
              </FlexItem>
              <FlexItem>
                <Icon>
                  <ImPriceTags />
                </Icon>
                <Text>Save your favorite tags, filters, and jobs</Text>
              </FlexItem>
              <FlexItem>
                <Icon>
                  <ImTrophy />
                </Icon>
                <Text>Earn reputation and badges</Text>
              </FlexItem>
              <SmallText>
                <SmallText>
                  Collaborate and share knowledge with a private group for FREE.
                </SmallText>
                <SmallTextBlue>
                  Get Stack Overflow for Teams free for up to 50 users.
                </SmallTextBlue>
              </SmallText>
            </TextBox>
            <MainBox>
              <SocialLogWrapper>
                <SocialLogBtn>
                  <SocialIcon>
                    <FcGoogle />
                  </SocialIcon>
                  <BtnText>Sign up with Google</BtnText>
                </SocialLogBtn>
                <SocialLogBtn>
                  <SocialIcon>
                    <AiFillGithub />
                  </SocialIcon>
                  <BtnText>Sign up with GitHub</BtnText>
                </SocialLogBtn>
                <SocialLogBtn>
                  <SocialIcon>
                    <AiFillFacebook />
                  </SocialIcon>
                  <BtnText>Sign up with Facebook</BtnText>
                </SocialLogBtn>
              </SocialLogWrapper>
              <SignupBox>
                <div>
                  <TextContents>Display name</TextContents>
                  <InputBox onChange={userName} isCheck={nickCheck} />
                  <TextContents>Email</TextContents>
                  <InputBox onChange={userEmail} isCheck={writeEmailCheck} />
                  <TextContents type="password">Password</TextContents>
                  <InputBox onChange={userPassword} isCheck={writePwdCheck} />
                </div>
                <Message>
                  Passwords must contain at least eight characters, including at
                  least 1 letter and 1 number.
                </Message>
                <RobotBox>
                  <MainRobotBox>
                    {robotCkeck ? null : (
                      <Warning> CAPTCHA response required. </Warning>
                    )}
                    <CheckForm>
                      <RobotCheck
                        type="checkbox"
                        onClick={clickCheckBtn}
                      ></RobotCheck>
                      <RobotText>I'm not a robot</RobotText>
                    </CheckForm>
                    <ImgRecapcha src={capcha}></ImgRecapcha>
                  </MainRobotBox>
                </RobotBox>
                <CheckBox>
                  <Check type="checkbox" />
                  <Message>
                    Opt-in to receive occasional product updates, user research
                    invitations, company announcements, and digests.
                  </Message>
                </CheckBox>
                <SignupBtn onClick={clickSignupBtn}>Sign up</SignupBtn>
                <Form>
                  <MessageBlack>
                    By clicking “Sign up”, you agree to our
                  </MessageBlack>
                  <MessageBlue>
                    terms of service, privacy policy and cookie policy
                  </MessageBlue>
                </Form>
              </SignupBox>
              <Space>
                <SignUpBox>
                  <MsgForm>Don’t have an account?</MsgForm>
                  <MsgButton onClick={clickLogin}>Log in</MsgButton>
                </SignUpBox>
                <SignUpBox>
                  <MsgForm>Are you an employer?</MsgForm>
                  <MsgButton>Sign up on Talent</MsgButton>
                </SignUpBox>
              </Space>
            </MainBox>
          </Main>
        </DisplayWrapper>
      </Display>
    </>
  );
}

const Display = styled.div`
  width: 100%;
  height: 100%;
  padding-top: 52px;
  display: flex;
  justify-content: center;
  background-color: #f1f2f3;
`;

const DisplayWrapper = styled.div`
  width: 75vw;
  height: 900px;
  padding: 8px 24px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Main = styled.div`
  width: 790px;
  height: 900px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const TextBox = styled.div`
  margin: 0px 10px 100px 0px;
  height: 300px;
  padding-right: 22px;
`;

const MainText = styled.div`
  font-size: 1.6em;
  margin-bottom: 35px;
`;

const Icon = styled.div`
  font-size: 28px;
  color: hsl(206deg 85% 57%);
`;

const FlexItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const Text = styled.div`
  font-size: 15px;
  margin-left: 5px;
`;

const SmallText = styled.div`
  font-size: 13px;
`;

const SmallTextBlue = styled.div`
  font-size: 13px;
  color: hsl(206deg 100% 40%);
`;
const InputBox = styled.input`
  width: 264px;
  height: 28px;
  border: 1px solid hsl(210deg 8% 75%);
  border-radius: 5px;
  border-color: ${(props) => (props.isCheck ? "red" : "hsl(210deg 8% 75%)")};
`;

const MainBox = styled.div`
  width: 316px;
  height: 900px;
`;

const SignupBox = styled.div`
  width: 266px;
  height: 600px;
  border-radius: 7px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  background-color: white;
  display: flex;
  align-items: center;
`;

const SocialLogWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 16px;
`;

const SocialLogBtn = styled.button`
  width: 316px;
  height: 37px;
  margin: 4px;
  border-radius: 5px;
  border: 1px solid #d6d9dc;
  font-size: 13px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  &:first-child {
    background-color: #fff;
    color: #232629;
  }
  &:nth-child(2) {
    background-color: #232629;
    color: white;
  }
  &:nth-child(3) {
    background-color: #314a86;
    color: white;
  }
`;

const SocialIcon = styled.div`
  font-size: 19px;
`;

const BtnText = styled.div`
  font-weight: 100;
  margin-left: 5px;
`;

const TextContents = styled.div`
  font-weight: 550;
  margin: 6px 1px;
  color: hsl(210deg 8% 25%);
  margin-bottom: 15px;
`;

const Message = styled.div`
  font-size: 11.5px;
  margin-top: 5px;
  margin-left: 5px;
  margin-bottom: 10px;
`;

const RobotBox = styled.div`
  background-color: hsl(210deg 8% 95%);
  border: 1px solid hsl(210deg 8% 90%);
  border-radius: 3px;
  width: 260px;
  height: 150px;
  margin-top: 12px;
  margin-bottom: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => (props.isCheck ? "red" : null)};
`;

const MainRobotBox = styled.div`
  border: 1px solid #d3d3d3;
  background-color: #f9f9f9;
  border-radius: 3px;
  width: 150px;
  height: 130px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 0 4px 1px rgb(0 0 0 / 8%);
`;
const CheckForm = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
  margin-top: 23px;
`;

const RobotCheck = styled.input`
  width: 25px;
  height: 25px;
  cursor: pointer;
`;

const RobotText = styled.div`
  font-size: 13px;
  font-weight: 550;
  margin-left: 4px;
  color: #606060;
`;

const ImgRecapcha = styled.img`
  width: 84px;
  height: 38px;
  margin-bottom: 10px;
`;

const CheckBox = styled.div`
  display: flex;
  align-items: baseline;
`;

const Check = styled.input`
  width: 14px;
  height: 14px;
  cursor: pointer;
`;

const Warning = styled.div`
  margin-top: 5px;
  font-size: 11.3px;
  color: red;
`;

const SignupBtn = styled.button`
  width: 268px;
  height: 37px;
  margin-top: 8px;
  background-color: hsl(206deg 100% 52%);
  color: white;
  border: 1px solid white;
  border: none;
  border-radius: 3px;
  font-weight: 200;
  box-shadow: inset 0 2px 0 0 hsl(0deg 0% 100% / 40%);
  cursor: pointer;
`;

const Space = styled.div`
  margin-top: 32px;
`;

const SignUpBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 7px;
`;

const MsgForm = styled.span`
  font-size: 13px;
`;

const MsgButton = styled.button`
  border: none;
  margin-left: 1px;
  font-size: 14px;
  color: hsl(206deg 100% 40%);
  cursor: pointer;
`;

const MessageBlack = styled.span`
  color: black;
  font-size: 11.5px;
`;

const MessageBlue = styled.span`
  margin-left: 3px;
  color: hsl(206deg 100% 40%);
  font-size: 11.5px;
`;

const Form = styled.div`
  margin-top: 40px;
`;

export default Signup;

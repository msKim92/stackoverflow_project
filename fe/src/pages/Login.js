import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { AiFillGithub, AiFillFacebook } from "react-icons/ai";
import StackOverflowIcon from "../img/64px-Stack_Overflow_icon.svg.png";
import Header from "../components/Header";
import axios from 'axios';
import { loginUser } from "../reduxStore/slices/userSlice"
import { useDispatch } from 'react-redux';


function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const [userWriteEmail, setUserWriteEmail] = useState("");
  const [userWritePassword, setUserWritepassword] = useState("");

  const signupBtn = () => {
    navigate("/Signup")
  };
  const homeNav = () => {
    navigate("/")
  };

  const clickLoginBtn = () => {
    let addData = {
      userEmail: userWriteEmail,
      PasswardForm: userWritePassword
    };
    dispatch(loginUser(addData));
  };

  const userEmail = (e) => {
    setUserWriteEmail(e.target.value);
  }

  const userPassWord = (e) => {
    setUserWritepassword(e.target.value);
  }

  return (
    <>
      <Header />
      <Display>
        <Wrapper>
          <LoginWrapper>
            <Logo src={StackOverflowIcon} onClick={homeNav}></Logo>
            <SocialLogWrapper>
              <SocialLogBtn>
                <SocialIcon><FcGoogle/></SocialIcon>
                <BtnText>Log in with Google</BtnText>
              </SocialLogBtn>
              <SocialLogBtn>
              <SocialIcon><AiFillGithub/></SocialIcon>
              <BtnText>Log in with GitHub</BtnText>
              </SocialLogBtn>
              <SocialLogBtn>
              <SocialIcon><AiFillFacebook/></SocialIcon>
              <BtnText>Log in with Facebook</BtnText>
              </SocialLogBtn>
            </SocialLogWrapper>
            <LoginBox>
              <LoginForm>
                <EmailForm>
                  <Text>Email</Text>
                  <TextInput type="email" onChange={userEmail}/>
                </EmailForm>
                <PasswardForm>
                  <Text>Passward</Text>
                  <TextInput type="password" onChange={userPassWord}/>
                </PasswardForm>
                <LoginBtn onClick={clickLoginBtn}>Log in</LoginBtn>
              </LoginForm>
            </LoginBox>
            <Space>
              <SignUpBox>
                <MsgForm>Don’t have an account?</MsgForm>
                <MsgButton onClick={signupBtn}>Sign up</MsgButton>
              </SignUpBox>
              <SignUpBox>
                <MsgForm>Are you an employer?</MsgForm>
                <MsgButton>Sign up on Talent</MsgButton>
              </SignUpBox>
            </Space>
          </LoginWrapper>
        </Wrapper>
      </Display>
    </>
  );
}


const Display = styled.div`
  width: 100%;
  height: 100%;
  border-top: 1px solid #d6d9dc;
  border-bottom: 1px solid #d6d9dc;
  background-color: #f1f2f3;
`;

const Wrapper = styled.div`
  width: 65vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: auto;
  margin-right: auto;
`;

const Logo = styled.img`
  width: 50px;
  height: 52px;
  cursor: pointer;
`;

const LoginWrapper = styled.div`
  width: 278px;
  height: 570px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: auto;
  margin-bottom: auto;
`;

const SocialLogWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 16px;
`;

const SocialLogBtn = styled.button`
  width: 278px;
  height: 38px;
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

const LoginBox = styled.div`
  width: 278px;
  height: 234px;
  border: 1px solid black;
  border-radius: 5px;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  box-shadow: 0 10px 24px hsla(0, 0%, 0%, 0.05),
    0 20px 48px hsla(0, 0%, 0%, 0.05), 0 1px 4px hsla(0, 0%, 0%, 0.1);
`;

const LoginForm = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const EmailForm = styled.div`
  margin: 6px;
`;

const PasswardForm = styled.div`
  margin: 6px;
`;

const LoginBtn = styled.button`
  width: 230px;
  height: 37px;
  margin: 6px;
  background-color: hsl(206deg 100% 52%);
  color: white;
  border: 1px solid white;
  border: none;
  border-radius: 3px;
  font-weight: 200;
  box-shadow: inset 0 2px 0 0 hsl(0deg 0% 100% / 40%);
  cursor: pointer;
`;

const Text = styled.div`
  font-size: 15px;
  font-family: inherit;
  font-weight: 600;
`;

const TextInput = styled.input`
  width: 230px;
  height: 29px;
  margin-top: 6px;
  border: 1px solid #d6d9dc;
  border-radius: 5px;
  font-size: 13.2px;
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

const MsgForm = styled.div`
  font-size: 13px;
`;

const MsgButton = styled.button`
  border: none;
  margin-left: 1px;
  font-size: 14px;
  color: hsl(206deg 100% 40%);
  cursor: pointer;
`;

export default Login;

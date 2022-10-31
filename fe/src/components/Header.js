import React, { useState } from "react";
import styled from "styled-components";
import { FiMenu } from "react-icons/fi";
import { AiOutlineSearch, AiTwotoneTrophy } from "react-icons/ai";
import stackLogo from "../img/stackOverflowLogo.png";
import { GoInbox } from "react-icons/go";
import { FaQuestionCircle, FaStackExchange } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Modal from "./Modal";

function Header() {
  const [isLogin, setIsLogin] = useState(false);
  const navigate = useNavigate();
  const [isModal, setIsModal] = useState(false);

  const loginBtn = () => {
    setIsLogin(true);
    navigate("/Login");
  };
  
  const signupBtn = () => {
    navigate("/Signup")
  }

  const logoutBtn = () => {
    setIsLogin(false);
  };

  const clickAllQuestion = () => {
    navigate("/");
  };

  const openModal = () => {
    setIsModal(!isModal);
  }

  return (  
    <Wraper>
      {isLogin ? (
        <HeaderWraper>
          <LogoBtn onClick={clickAllQuestion}>
            <LogoImg src={stackLogo} />
          </LogoBtn>
          <LinkBtnSpace isLogin={isLogin}>
            <LinkBtn>Products</LinkBtn>
          </LinkBtnSpace>
          <SearchSpace isLogin={isLogin}>
            <SearchIcons>
              <AiOutlineSearch />
            </SearchIcons>
            <SearchInput placeholder="Search..." isLogin={isLogin} />
          </SearchSpace>
          <UserProfile>사용자</UserProfile>
          <BtnSpace isLogin={isLogin}>
            <HeaderIcon isLogin={isLogin}>
              <GoInbox />
            </HeaderIcon>
            <HeaderIcon isLogin={isLogin}>
              <AiTwotoneTrophy />
            </HeaderIcon>
            <HeaderIcon isLogin={isLogin}>
              <FaQuestionCircle />
            </HeaderIcon>
            <HeaderIcon isLogin={isLogin}>
              <FaStackExchange onClick={openModal}/>
            </HeaderIcon>
          </BtnSpace>
          { isModal ? <Modal /> : null}
        </HeaderWraper>
      ) : (
        <HeaderWraper>
          <HeaderIcon isLogin={isLogin}>
            <FiMenu />
          </HeaderIcon>
          <LogoBtn onClick={clickAllQuestion}>
            <LogoImg src={stackLogo} />
          </LogoBtn>
          <LinkBtnSpace>
            <LinkBtn>About</LinkBtn>
            <LinkBtn>Products</LinkBtn>
            <LinkBtn>For Teams</LinkBtn>
          </LinkBtnSpace>
          <SearchSpace isLogin={isLogin}>
            <SearchIcons>
              <AiOutlineSearch />
            </SearchIcons>
            <SearchInput placeholder="Search..." isLogin={isLogin} />
          </SearchSpace>
          <BtnSpace isLogin={isLogin}>
            <MemberBtn onClick={loginBtn}>Log in</MemberBtn>
            <MemberBtn onClick={signupBtn}>Sign up</MemberBtn>
          </BtnSpace>
        </HeaderWraper>
      )}
    </Wraper>
  );
}
const Wraper = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-top: 4px solid orange;
  box-shadow: 0px 0px 8px 0px gray;
  margin-left: auto;
  margin-right: auto;
  position: fixed;
  background-color: white;
`;
const HeaderWraper = styled.div`
  height: 50px;
  display: flex;
  align-items: center;
  width: 1400px;
  margin-left: auto;
  margin-right: auto;
`;

const HeaderIcon = styled.button`
  height: 100%;
  font-size: 23px;
  padding: 10px 15px 0px 15px;
  border: none;
  background-color: white;
  &:hover {
    height: 54px;
    border-top: 4px solid orange;
    background-color: rgb(226, 230, 232);
    margin-bottom: 3px;
  }
  min-width: 50px;
`;
const LogoBtn = styled.button`
  border: none;
  background-color: white;
  &:hover {
    height: 100%;
    background-color: rgb(226, 230, 232);
    margin-bottom: 1px;
  }
`;
const LogoImg = styled.img`
  width: 180px;
  height: 30px;
  padding: 5px 12px;
`;
const LinkBtnSpace = styled.div`
  width: ${(props) => (props.isLogin ? "100px" : "400px")};
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  margin-right: 20px;
`;

const LinkBtn = styled.button`
  width: 90px;
  height: 100%;
  background-color: white;
  border: none;
  &:hover {
    height: 35px;
    background-color: rgb(226, 230, 232);
  }
  padding: 10px 5px 10px 5px;
  border-radius: 25px;
  font-size: 15px;
  &:nth-child(3) {
    width: 110px;
    padding: 10px 12px 10px 12px;
  }
`;
const SearchSpace = styled.div`
  width: ${(props) => (props.isLogin ? "54%" : "90%")};
  height: 40px;
  min-width: 30%;
  display: flex;
  flex-direction: row;
`;

const SearchInput = styled.input`
  width: ${(props) => (props.isLogin ? "100%" : "93%")};
  height: 30px;
  margin: 5px 0px 0px 20px;
  padding-left: 40px;
  font-size: 12px;
  border: 1px solid rgb(226, 230, 232);
  float: right;

  &:focus {
    box-shadow: 0px 0px 3px 3px rgba(107, 186, 247, 0.5);
    border: none;
    outline: 0;
  }

  margin-left: -35px;
  z-index: 1;
`;
const SearchIcons = styled.div`
  font-size: 25px;
  margin-top: 9px;
  z-index: 2;
`;

const BtnSpace = styled.div`
  width: 140px;
  height: 40px;
  min-width: ${(props) => (props.isLogin ? "200px" : "140px")};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const MemberBtn = styled.button`
  width: 68px;
  height: 35px;
  background-color: rgb(179, 211, 234);
  color: rgb(44, 88, 119);
  border: 1px solid rgb(121, 167, 199);
  border-radius: 5px;

  &:nth-child(2) {
    background-color: rgb(20, 148, 245);
    color: white;
    border-top: double white;
  }
`;

const UserProfile = styled.button`
  width: 80px;
  height: 100%;
  background-color: white;
  border: none;
  min-width: 80px;
  &:hover {
    background-color: rgb(226, 230, 232);
    margin-bottom: 2px;
  }
`;

export default Header;

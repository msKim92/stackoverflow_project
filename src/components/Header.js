import React from "react";
import styled from "styled-components";
import { FiMenu } from "react-icons/fi";
import { AiOutlineSearch } from "react-icons/ai";
import stackLogo from "../img/stackOverflowLogo.png";

function Header() {
  return (
    <Wraper>
      <HeaderWraper>
        <HeaderIcon>
          <FiMenu />
        </HeaderIcon>
        <LogoBtn>
          <LogoImg src={stackLogo} />
        </LogoBtn>
        <LinkBtnSpace>
          <LinkBtn>About</LinkBtn>
          <LinkBtn>Products</LinkBtn>
          <LinkBtn>For Teams</LinkBtn>
        </LinkBtnSpace>
        <SearchSpace>
          <SearchIcons>
            <AiOutlineSearch />
          </SearchIcons>
          <SearchInput placeholder="Search..." />
        </SearchSpace>
        <BtnSpace>
          <MemberBtn>Log in</MemberBtn>
          <MemberBtn>Sign up</MemberBtn>
        </BtnSpace>
      </HeaderWraper>
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
  min-width: 900px;
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
  font-size: 25px;
  padding: 10px 15px 0px 15px;
  border: none;
  background-color: white;
  &:hover {
    background-color: rgb(226, 230, 232);
  }
  min-width: 100px;
`;
const LogoBtn = styled.button`
  border: none;
  background-color: white;
  &:hover {
    background-color: rgb(226, 230, 232);
  }
`;
const LogoImg = styled.img`
  width: 180px;
  height: 30px;
  padding: 5px 12px;
`;
const LinkBtnSpace = styled.div`
  width: 400px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
`;

const LinkBtn = styled.button`
  width: 90px;
  height: 100%;
  background-color: white;
  border: none;
  &:hover {
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
  width: 90%;
  height: 40px;
  min-width: 30%;
  display: flex;
  flex-direction: row;
`;

const SearchInput = styled.input`
  width: 94%;
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
  min-width: 140px;
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

export default Header;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { IoEarthSharp, IoStarOutline, IoBagSharp } from "react-icons/io5";
import sideImage from "../img/sideImg.png";

function LeftNvi() {
  const navigate = useNavigate();

  const clickQuestion = () => {
    navigate("/");
  };

  const userNavClick = () => {
    navigate("/MyPage");
  };

  return (
    <LeftNaviWrapper>
      <Wrapper>
        <Position>
        <HomeMenu onClick={clickQuestion}>
          Home
        </HomeMenu>
        <MainMenu>
          <PublicMenu>PUBLIC</PublicMenu>
          <QuestionsContents onClick={clickQuestion}>
            <EarthIcon>
              <IoEarthSharp />
            </EarthIcon>
            <QuestionsMenu>Questions</QuestionsMenu>
          </QuestionsContents>
          <Menu>Tags</Menu>
          <Menu onClick={userNavClick}>Users</Menu>
          <Menu>Companies</Menu>
          <Collectives>COLLECTIVES</Collectives>
          <CollectivesContents>
            <StarIcon>
              <IoStarOutline />
            </StarIcon>
            <CollectivesMenu>Explore Collectives</CollectivesMenu>
          </CollectivesContents>
        </MainMenu>
        <TeamsMenu>TEAMS</TeamsMenu>
        <TeamMainMenu>
          <TeamsContents><IoBagSharp/></TeamsContents>
          <TeamsContents>Create free Team</TeamsContents>
        </TeamMainMenu>
        </Position>
      </Wrapper>
    </LeftNaviWrapper>
  );
}

const LeftNaviWrapper = styled.div`
  margin-bottom: 300px;
  width: 168px;
`;

const Wrapper = styled.div`
  width: 163px;
  height: 100%;
  font-size: 14px;
  border-right: 1px solid #d6d9dc;
`;

const Position = styled.div`
  position: fixed;
`;

const HomeMenu = styled.button`
  border: none;
  background-color: white;
  font-size: 13px;
  margin-top: 20px;
  color: rgb(106, 115, 124);
  &:hover {
    color: black;
  }
  cursor: pointer;
`;

const MainMenu = styled.div`
  margin: 15px 0px;
  border: 1px solid black;
  border: none;
`;

const TeamMainMenu = styled.div`
  display: flex;
  justify-content: center;
  height: 284px;
  margin: 12px 1px;
`;

const PublicMenu = styled.div`
  margin-top: 32px;
  margin-left: 5px;
  display: flex;
  font-size: 11px;
  color: rgb(106, 115, 124);
`;

const QuestionsContents = styled.button`
  border: none;
  background-color: white;
  margin-top: 16px;
  display: flex;
  color: rgb(106, 115, 124);
  &:hover {
    color: black;
  }
  cursor: pointer;
`;

const EarthIcon = styled.div`
  margin-left: 5px;
  font-size: 18px;
`;

const QuestionsMenu = styled.div`
  font-size: 13px;
  margin-left: 7px;
`;

const Menu = styled.button`
  display: flex;
  border: none;
  background-color: white;
  font-size: 13px;
  margin-left: 30px;
  margin-top: 16px;
  color: rgb(106, 115, 124);
  &:hover {
    color: black;
  }
  cursor: pointer;
`;

const Collectives = styled.div`
  margin-top: 26px;
  margin-left: 5px;
  font-size: 11px;
  color: rgb(106, 115, 124);
`;

const CollectivesContents = styled.button`
  border: none;
  background-color: white;
  margin-top: 13px;
  display: flex;
  font-size: 13px;
  color: rgb(106, 115, 124);
  &:hover {
    color: black;
  }
  cursor: pointer;
`;

const StarIcon = styled.div`
  margin-left: 5px;
  font-size: 18px;
`;

const CollectivesMenu = styled.div`
  margin-left: 7px;
`;

const TeamsMenu = styled.div`
  display: flex;
  color: rgb(106, 115, 124);
  margin-left: 5px;
  margin-top: 28px;
  font-size: 11px;
`;

const TeamsContents = styled.div`
  color: rgb(106, 115, 124);
  margin-left: 8px;
  margin-top: 5px;
  font-size: 14px;
`;

export default LeftNvi;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { IoEarthSharp, IoStarOutline } from "react-icons/io5";
import sideImage from "../img/sideImg.png";

function LeftNvi() {
  const [clickElement, setClickElement] = useState(false);

  const clickHere = () => {
    setClickElement(!clickElement);
  };

  return (
    <LeftNaviWraper>
      <Wraper>
        <HomeMenu click={clickElement} onClick={() => clickHere()}>
          Home
        </HomeMenu>

        <MainMenu>
          <PublicMenu>PUBLIC</PublicMenu>
          <QuestionsContents click={clickElement} onClick={() => clickHere()}>
            <EarthIcon>
              <IoEarthSharp />
            </EarthIcon>
            <QuestionsMenu>Questions</QuestionsMenu>
          </QuestionsContents>
          <Menu click={clickElement} onClick={() => clickHere()}>
            Tags
          </Menu>
          <Menu click={clickElement} onClick={() => clickHere()}>
            Users
          </Menu>
          <Menu click={clickElement} onClick={() => clickHere()}>
            Companies
          </Menu>
          <Collectives>COLLECTIVES</Collectives>
          <CollectivesContents click={clickElement} onClick={() => clickHere()}>
            <StarIcon>
              <IoStarOutline />
            </StarIcon>
            <CollectivesMenu>Explore Collectives</CollectivesMenu>
          </CollectivesContents>
        </MainMenu>

        <TeamsMenu>TEAMS</TeamsMenu>
        <TeamMainMenu>
          <div>
            <DisplayText>
              Stack Overflow for Teams – Start collaborating and sharing
              organizational knowledge.
            </DisplayText>
            <SideImage src={sideImage}></SideImage>
            <CreateBtn click={clickElement} onClick={() => clickHere()}>
              Create a free Team
            </CreateBtn>
            <TeamsMsg>Why Teams?</TeamsMsg>
          </div>
        </TeamMainMenu>
      </Wraper>
    </LeftNaviWraper>
  );
}

const LeftNaviWraper = styled.div`
  width: 168px;
  height: 100vh;
  border: 1px solid black;
`;

const Wraper = styled.div`
  width: 163px;
  height: 100vh;
  position: fixed;
  font-size: 14px;
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
`;

const MainMenu = styled.div`
  margin: 15px 0px;
  border: 1px solid black;
  border: none;
`;

const TeamMainMenu = styled.div`
  height: 284px;
  margin: 12px 0px;
  border: 2px solid (60, 60, 60);
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
  color: rgb(106, 115, 124);
  &:hover {
    color: black;
  }
`;

const StarIcon = styled.div`
  margin-left: 5px;
  font-size: 18px;
`;

const CollectivesMenu = styled.div`
  margin-left: 7px;
`;

const TeamsMenu = styled.div`
  margin-left: 5px;
  margin-top: 28px;
  font-size: 11px;
`;

const DisplayText = styled.div`
  margin: 10px;
  font-size: 13px;
`;

const SideImage = styled.div`
  width: 139px;
  height: 114px;
  background-color: green;
`;

const CreateBtn = styled.button`
  border-radius: 3px;
  border: none;
  background-color: #f48225;
  color: white;
  font-size: 11px;
  width: 138px;
  height: 30px;
`;

const TeamsMsg = styled.div`
  font-size: 11px;
  display: flex;
  justify-content: center;
`;

export default LeftNvi;

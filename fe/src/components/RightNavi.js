import React from "react";
import styled from "styled-components";
import {
  FaPen,
  FaRegCommentAlt,
  FaStackOverflow,
  FaSearch,
  FaGofore,
  FaLinkedin,
  FaConnectdevelop,
  FaCentos,
  FaBuffer,
} from "react-icons/fa";

import { SiTwilio } from "react-icons/si";
import { RiBracesFill } from "react-icons/ri";

function RightNavi() {
  return (
    <RightNaviWraper>
      <Wrapper>
        <Subject>The Overflow Blog</Subject>
        <Content>
          <div style={{ paddingRight: "3%" }}>
            <FaPen />
          </div>
          <div>Introducing the Overflow Offline project</div>
        </Content>

        <Content>
          <div style={{ paddingRight: "3%" }}>
            <FaPen />
          </div>
          <div>
            He helped build .NET and VS Code — Now’s he working on Web3 (Ep.
            499)
          </div>
        </Content>

        <Subject>Featured on Meta</Subject>
        <Content>
          <div style={{ paddingRight: "3%", color: "#46A2D9" }}>
            <FaRegCommentAlt />
          </div>
          <div>The 2022 Community-a-thon has begun!</div>
        </Content>
        <Content>
          <div style={{ paddingRight: "3%", color: "#46A2D9" }}>
            <FaRegCommentAlt />
          </div>
          <div>Mobile app infrastructure being decommissioned</div>
        </Content>
        <Content>
          <div style={{ paddingRight: "3%" }}>
            <FaStackOverflow />
          </div>
          <div>
            Collectives Update: Recognized Members, Articles, and GitLab
          </div>
        </Content>
        <Content>
          <div style={{ paddingRight: "3%" }}>
            <FaStackOverflow />
          </div>
          <div>Staging Ground Workflow: Canned Comments</div>
        </Content>
        <Content>
          <div style={{ paddingRight: "3%" }}>
            <FaStackOverflow />
          </div>
          <div>The [script] tag is being burninated</div>
        </Content>

        <Subject>Hot Meta Posts</Subject>
        <Content>
          <div>23 Burninate [self-hosting]</div>
        </Content>
      </Wrapper>

      <Space></Space>

      <SecondWrapper>
        <SecondSubject>Custom Filters</SecondSubject>
        <div style={{ padding: "4%" }}>
          <SecondContent as="a" href="*">
            Create a custom filter
          </SecondContent>
        </div>
      </SecondWrapper>

      <Space></Space>

      <SecondWrapper>
        <SecondSubject>Watched Tags</SecondSubject>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <FaSearch
            style={{ color: "#379FEF", fontSize: "260%", padding: "4%" }}
          />
        </div>
        <ThirdContent>Watch tags to curate your list of</ThirdContent>
        <ThirdContent>questions.</ThirdContent>

        <TagWrapper>
          <button>Watch a tag</button>
        </TagWrapper>
      </SecondWrapper>

      <Space></Space>

      <SecondWrapper>
        <SecondSubject>Ignored Tags</SecondSubject>
        <TagWrapper>
          <button>Add an Ignored tag</button>
        </TagWrapper>
      </SecondWrapper>

      <Space></Space>

      <SecondWrapper>
        <ThirdSubject>
          <div className="collectives">Collectives</div>
          <a href="*" className="seeAll">
            see all
          </a>
        </ThirdSubject>
        <CollectWrapper>
          <div>
            <FaGofore
              style={{ color: "#379FEF", fontSize: "200%", padding: "4%" }}
            />
          </div>
          <ContentWrapper>
            <div className="google">Google Cloud</div>
            <div className="member">30k Members</div>
          </ContentWrapper>
          <button>Join</button>
        </CollectWrapper>
        <Text>
          Google Cloud provides organizations with leading infrastructure,
          platform capabilities...
        </Text>

        <Line></Line>

        <CollectWrapper>
          <div>
            <FaLinkedin
              style={{ color: "#0068B5", fontSize: "200%", padding: "4%" }}
            />
          </div>
          <ContentWrapper>
            <div className="google">Intel</div>
            <div className="member">80k Members</div>
          </ContentWrapper>
          <button>Join</button>
        </CollectWrapper>
        <Text>
          A space for developers to collaborate on Intel software tools,
          libraries, and resources. Share...
        </Text>

        <Line></Line>

        <CollectWrapper>
          <div>
            <SiTwilio
              style={{ color: "#F22F46", fontSize: "200%", padding: "4%" }}
            />
          </div>
          <ContentWrapper>
            <div className="google">Twilio</div>
            <div className="member">5k Members</div>
          </ContentWrapper>
          <button>Join</button>
        </CollectWrapper>
        <Text>
          Twilio has democratized channels like voice, text, chat, video, and
          email by virtualizing the...
        </Text>
      </SecondWrapper>

      <Space></Space>

      <div style={{ fontSize: "20px" }}>Hot Network Questions</div>

      <Space></Space>

      <QuestionsWrapper>
        <Questions>
          <div>
            <FaConnectdevelop
              style={{
                color: "#F22F46",
                fontSize: "130%",
                paddingRight: "10px",
              }}
            />
          </div>
          <a href="*" className="text">
            Can Level 6 Circle of the Moon Druids wild shape into a flying
            beast?
          </a>
        </Questions>

        <Questions>
          <div>
            <FaCentos
              style={{
                color: "#90F097",
                fontSize: "130%",
                paddingRight: "10px",
              }}
            />
          </div>
          <a href="*" className="text">
            In what airports do I undergo US exit immigration checks, if I have
            a connecting flight?
          </a>
        </Questions>

        <Questions>
          <div>
            <FaBuffer
              style={{
                color: "#0068B5",
                fontSize: "130%",
                paddingRight: "10px",
              }}
            />
          </div>
          <a href="*" className="text">
            Why do root and intermediate levels of NON-unique NON-clustered
            indexes additionally store row ID?
          </a>
        </Questions>

        <Questions>
          <div>
            <FaRegCommentAlt
              style={{
                color: "#0068B5",
                fontSize: "130%",
                paddingRight: "10px",
              }}
            />
          </div>
          <a href="*" className="text">
            Why do root and intermediate levels of NON-unique NON-clustered
            indexes additionally store row ID?
          </a>
        </Questions>

        <Questions>
          <div>
            <RiBracesFill
              style={{
                color: "#F22F46",
                fontSize: "130%",
                paddingRight: "10px",
              }}
            />
          </div>
          <a href="*" className="text">
            How can I get dashed line in the segment EH?
          </a>
        </Questions>

        <Questions>
          <div>
            <FaRegCommentAlt
              style={{
                color: "#0068B5",
                fontSize: "130%",
                paddingRight: "10px",
              }}
            />
          </div>
          <a href="*" className="text">
            Expectations in how to get faster with Vim/Nvim?
          </a>
        </Questions>
      </QuestionsWrapper>
    </RightNaviWraper>
  );
}

const RightNaviWraper = styled.div`
  box-sizing: border-box;
  width: 33%;
  // height: 100vh;
  border: 5px solid blue;
`;

const Space = styled.div`
  height: 3%;
`;

const Wrapper = styled.div`
  width: 300px;
  border: 1px solid #f1e5bc;
  margin-right: auto;
  min-width: 300px;
  background-color: #fbf3d5;
`;

const Subject = styled.div`
  padding: 4% 0 4% 4%;
  font-size: 13px;
  font-weight: bold;
  color: #525960;
  border: 1px solid #f1e5bc;
  background-color: #fbf3d5;
`;

const Content = styled.div`
  display: flex;
  padding: 4%;
  font-size: 13px;
  background-color: #fdf7e2;
`;

const SecondWrapper = styled.div`
  width: 300px;
  border: 1px solid #d6d9dc;
  margin-right: auto;
  min-width: 300px;
`;

const SecondSubject = styled.div`
  padding: 4% 0 4% 4%;
  font-size: 15.5px;
  color: #525960;
  border-bottom: 1px solid #d6d9dc;
  background-color: #f8f9f9;
`;

const SecondContent = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 13px;
  text-decoration: none;
  color: #0074cc;
`;

const ThirdContent = styled.div`
  display: flex;
  justify-content: center;
  color: #6a737c;
  font-size: 14px;
  padding: 0 0 2% 0;
`;

const TagWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 4%;
  & > button {
    background-color: #e1ecf4;
    border: 1px solid #7aa7c7;
    padding: 4%;
    color: #39739d;
  }
`;

const ThirdSubject = styled.div`
  padding: 4% 0 4% 4%;
  font-size: 15.5px;
  color: #525960;
  border-bottom: 1px solid #d6d9dc;
  background-color: #f8f9f9;
  display: flex;
  & > .collectives {
    margin-right: auto;
  }
  & > .seeAll {
    padding-right: 4%;
    text-decoration: none;
    font-size: 12px;
    color: #0074cc;
  }
`;

const CollectWrapper = styled.div`
  display: flex;
  padding: 10px;
  & > button {
    margin-left: auto;
    background-color: #ffff;
    border: 1px solid #7aa7c7;
    padding: 4%;
    color: #39739d;
  }
`;

const ContentWrapper = styled.div`
  padding-left: 4%;
  & > .google {
    color: #525960;
  }
  & > .member {
    font-size: 13px;
    padding-top: 4%;
  }
`;

const Text = styled.div`
  font-size: 13px;
  padding: 4%;
`;

const QuestionsWrapper = styled.div`
  width: 300px;
  margin-right: auto;
  min-width: 300px;
`;

const Line = styled.div`
  border-bottom: 1px solid #d6d9dc;
`;

const Questions = styled.div`
  display: flex;
  padding-bottom: 4%;
  & > .text {
    font-size: 13px;
    text-decoration: none;
    color: #0074cc;
  }
`;
export default RightNavi;

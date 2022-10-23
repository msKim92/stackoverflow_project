import React from "react";
import styled from "styled-components";
import footerLogo from "../img/64px-Stack_Overflow_icon.svg.png";

function Footer() {
  return (
    <FooterWraper>
      <Wraper>
        <FooterStackLeft>
          <FooterLogo src={footerLogo} />
          <FirstMenu>
            <BigMenu>STACK OVERFLOW</BigMenu>
            <SmallMenu>Questions</SmallMenu>
            <SmallMenu>Help</SmallMenu>
          </FirstMenu>
        </FooterStackLeft>
        <FooterStackMid>
          <SecondMenu>
            <BigMenu>PRODUCT</BigMenu>
            <SmallMenu>Teams</SmallMenu>
            <SmallMenu>Advertising</SmallMenu>
            <SmallMenu>Collectives</SmallMenu>
            <SmallMenu>Talent</SmallMenu>
          </SecondMenu>
          <ThirdMenu>
            <BigMenu>COMPANY</BigMenu>
            <SmallMenu>About</SmallMenu>
            <SmallMenu>Press</SmallMenu>
            <SmallMenu>Work Here</SmallMenu>
            <SmallMenu>Legal</SmallMenu>
            <SmallMenu>Privacy Policy</SmallMenu>
            <SmallMenu>Terms of Service</SmallMenu>
            <SmallMenu>Contact Us</SmallMenu>
            <SmallMenu>Cookie Settings</SmallMenu>
            <SmallMenu>Cookie Policy</SmallMenu>
          </ThirdMenu>
          <FourthMenu>
            <BigMenu>STACK EXCHANGE NETWORK</BigMenu>
            <SmallMenu>Technology</SmallMenu>
            <SmallMenu>Culture & recreation</SmallMenu>
            <SmallMenu>Life & arts</SmallMenu>
            <SmallMenu>Science</SmallMenu>
            <SmallMenu>Professioal</SmallMenu>
            <SmallMenu>Business</SmallMenu>
            <br />
            <SmallMenu>API</SmallMenu>
            <SmallMenu>Data</SmallMenu>
          </FourthMenu>
        </FooterStackMid>
        <FooterStackRight>
          <LinkMenu>
            <LinkSmallMenu>Blog</LinkSmallMenu>
            <LinkSmallMenu>Facebook</LinkSmallMenu>
            <LinkSmallMenu>Twitter</LinkSmallMenu>
            <LinkSmallMenu>Linkedln</LinkSmallMenu>
            <LinkSmallMenu>Instargram</LinkSmallMenu>
          </LinkMenu>
          <StackOverFlowInformation>
            <SmallContents>
              Site design / logo © 2022 Stack Exchange Inc; user <br />
              contributions licensed under
              <UnderLineContents>CC BY-SA</UnderLineContents>.
              <br /> rev 2022.10.21.36010
            </SmallContents>
          </StackOverFlowInformation>
        </FooterStackRight>
      </Wraper>
    </FooterWraper>
  );
}

const FooterWraper = styled.div`
  width: 100%;
  height: 360px;
  background-color: #232628;
  display: flex;
  justify-content: center;
  padding-top: 40px;
`;

const Wraper = styled.div`
  width: 1400px;
  height: 360px;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  justify-content: space-between;
`;

const FooterStackLeft = styled.div`
  display: flex;
`;
const FooterLogo = styled.img`
  width: 50px;
  height: 50px;
  margin: 0px 25px 0px 10px;
`;
const FooterStackMid = styled.div`
  display: flex;
`;

const FooterStackRight = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-right: 40px;
`;

const FirstMenu = styled.div``;
const SecondMenu = styled.div``;
const ThirdMenu = styled.div`
  margin: 0px 110px;
`;
const FourthMenu = styled.div``;
const LinkMenu = styled.div`
  display: flex;
`;
const StackOverFlowInformation = styled.div`
  margin-bottom: 40px;
`;

const BigMenu = styled.div`
  color: #dce0e6;
  font-weight: bold;
  margin-bottom: 18px;
  font-size: 15px;
`;

const SmallMenu = styled.div`
  color: #949aa1;
  margin-bottom: 15px;
`;

const LinkSmallMenu = styled.div`
  color: #949aa1;
  margin-right: 12px;
`;

const SmallContents = styled.p`
  color: #949aa1;
  font-size: 14px;
  &:hover {
    cursor: text;
  }
`;

const UnderLineContents = styled.span`
  color: #949aa1;
  text-decoration: underline;
  margin-left: 2px;
  font-size: 14px;
`;
export default Footer;

import React from "react";
import styled from "styled-components";
import { SiAskubuntu, SiServerfault, SiStackexchange, SiSuperuser, SiStackoverflow } from "react-icons/si";
import { MdSettings } from "react-icons/md";
import StackOverflowIcon from "../img/64px-Stack_Overflow_icon.svg.png"
import Header from "../components/Header";


function Logout() {
  return (
    <>
    <Header />
      <Display>
        <DisplayBox>
          <Wraper>
            <Text>
              Clicking “Log out” will log you 
              out of the following domains on this device:
            </Text>
            <MainBox>
              <BtnWraper>
                <Button>
                  <Icon><SiAskubuntu/></Icon>
                  <Link>askubuntu.com</Link>
                </Button>
                <Button>
                  <Icon> @ </Icon>
                  <Link>mathoverflow.net</Link>
                </Button>
                <Button>
                  <Icon><SiServerfault/></Icon>
                  <Link>serverfault.com</Link>
                </Button>
                <Button>
                  <Icon><MdSettings/></Icon>
                  <Link>stackapps.com</Link>
                </Button>
                <Button>
                  <Icon><SiStackexchange/></Icon>
                  <Link>stackexchange.com</Link>
                </Button>
                <Button>
                  <Icon><SiStackoverflow/></Icon>
                  <Link>stackoverflow.com</Link>
                </Button>
                <Button>
                  <Icon><SiSuperuser/></Icon>
                  <Link>superuser.com</Link>
                </Button>
              </BtnWraper>
              <CheckBox>
                <Check></Check>
                <CkeckMsg>Log out on all devices</CkeckMsg>
              </CheckBox>
              <LogoutBox>
                <LogoutBtn>Log out</LogoutBtn>
                <CancelBtn>Cancel</CancelBtn>
              </LogoutBox> 
              <Message>
              If you’re on a shared computer, remember to log out of 
              your Open ID provider (Facebook, Google, 
              Stack Exchange, etc.) as well.
              </Message>
            </MainBox>
          </Wraper>
        </DisplayBox>
      </Display>  
    </>
  )
}


const Display = styled.div`
  background-color: #f1f2f3;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const DisplayBox = styled.div`
  width: 65vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: auto;
  margin-right: auto;
`;

const Wraper = styled.div`
  width: 500px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Text = styled.div`
  font-size: 20px;
  display: flex;
  text-align: center;
  margin-bottom: 30px;
`;

const MainBox = styled.div`
  width: 278px;
  height: 378px;
  border-radius: 7px;
  background-color:white;
  padding: 24px;
  display: flex;
  flex-direction: column;
  box-shadow: 0 10px 24px hsla(0,0%,0%,0.05), 0 20px 48px hsla(0, 0%, 0%, 0.05), 0 1px 4px hsla(0, 0%, 0%, 0.1);
`;

const BtnWraper = styled.div`
  border-bottom: 1px solid #D6D9DC;
  height: 206px;
  display: flex;
  justify-content: left;
  flex-direction: column;
`;

const Button = styled.button`
  display: flex;
  justify-content: left;
  align-items: center;
  border: none;
  background-color: white;
  margin-bottom: 6.5px;
  cursor: pointer;
`;

const Icon = styled.div`
  font-size: 16px;
`;

const Link = styled.div`
  font-size: 14px;
  margin-left: 7px;
  color: hsl(206deg 100% 40%);
  &:hover {
    color: hsl(206deg 100% 52%);
  }
`;

const CheckBox = styled.div`
  display: flex;
  align-items: center;
  margin-top: 18px;
  cursor: pointer;
`;

const LogoutBox = styled.div`
  margin-top: 23px;
`;

const LogoutBtn = styled.button`
  width: 67px;
  height: 37px;
  background-color: hsl(206deg 100% 52%);
  color:white;
  border: 1px solid white;
  border: none;
  box-shadow: inset 0 2px 0 0 hsl(0deg 0% 100% / 40%);
  border-radius: 3px;
  cursor: pointer;
`;

const CancelBtn = styled.button`
  width: 67px;
  height: 37px;
  background-color: white;
  border: none;
  color: hsl(206deg 100% 40%);
  border-radius: 3px;
  margin-left: 7px;
  cursor: pointer;
`;

const Check = styled.input`
  width: 5px;
  height: 7px;
`;

const CkeckMsg = styled.div`
  margin-left: 4px;
  font-size: 12px;
`;

const Message = styled.div`
  margin-top: 37px;
  font-size: 12px;
  color:hsl(210deg 8% 45%);
`;

export default Logout;

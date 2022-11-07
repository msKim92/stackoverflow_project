import React from "react";
import styled from "styled-components";
import Logout from "../pages/Logout";
import { useNavigate } from "react-router-dom"
import StackOverflowIcon from "../img/64px-Stack_Overflow_icon.svg.png";
import { ImBooks } from "react-icons/im";
import { HiChatBubbleLeft } from "react-icons/hi2";


function Modal() {
  const navigate = useNavigate();
  
  const clickLogout = () => {
    navigate("/Logout")
  }

  return (
    <Display>
      <Wrap>CURRENT COMMUNITY</Wrap>
      <Form>
        <Logo>
          <IconImg src={StackOverflowIcon}></IconImg>
          <Text>Stack Overflow</Text>
        </Logo>
        <Manu>
          <div>help</div>
          <div>chat</div>
          <Button onClick={clickLogout}>log out</Button>
        </Manu>
      </Form>
      <Form>
        <Logo>
          <IconImg src={StackOverflowIcon}></IconImg>
          <Text>Meta Stack Overflow</Text>
        </Logo>
      </Form>
      <Wrap>
        <div>YOUR COMMUNITIES</div>
        <div>edit</div>
      </Wrap>
      <Form>
        <Logo>
          <IconImg src={StackOverflowIcon}></IconImg>
          <Text>Stack Overflow</Text>
        </Logo>
        <div>1</div>
      </Form>
      <Wrap>
        <div>MORE STACK EXCHANGE COMMUNITIES</div>
        <div>company blog</div>
      </Wrap>
      <InputForm>
        <Input placeholder="Find a Stack Exchange community"/>
      </InputForm>      
      <ListBox>
        <List>
          <Logo>
            <Icon><ImBooks/></Icon>
            <Text>3D Printing</Text>
          </Logo>
          <TextPosition>For 3D printing enthusiasts</TextPosition>
        </List>
        <List>
          <Logo>
            <Icon><HiChatBubbleLeft/></Icon>
            <Text>4D Printing</Text>
          </Logo>
          <TextPosition>For 4D printing enthusiasts</TextPosition>
        </List>
        <List>
          <Logo>
            <Icon><HiChatBubbleLeft/></Icon>
            <Text>5D Printing</Text>
          </Logo>  
          <TextPosition>For 5D printing enthusiasts</TextPosition>
        </List>
      </ListBox>
    </Display>
    )
}

const Display = styled.div`
  background-color: white;
  border: 1px solid hsl(210deg 8% 75%);
  width: 374px;
  height: 390px;
  font-size: 12px;
  position: absolute;
  top: 50px;
  right: 30px;
  color: hsl(209deg 100% 38%);
`

const Wrap = styled.div`
  background-color: hsl(210deg 8% 95%);
  width: 352.5px;
  height: 18px;
  display: flex;
  position: relative;
  justify-content: space-between;
  align-items: center;
  padding: 8px 10px;
  font-weight: 550;
`

const Form = styled.div`
  background-color: hsl(205deg 47% 97%);
  width: 360px;
  height: 34px;
  padding: 2px 7px 0px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`


const Manu = styled.div`
  width: 110px;
  display: flex;
  justify-content: space-between;
`

const Button = styled.div`
  cursor: pointer;
`


const InputForm = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 48px;
`

const Input = styled.input`
  border: 1px solid hsl(210deg 8% 75%);
  width: 330px;
  height: 20px;
  padding: 5px 12px;
  border-radius: 4px;
  ::placeholder{
    color:hsl(210deg 8% 75%);
  }
`

const Logo = styled.div`
  margin-left: 8px;
  display: flex;
  align-items: center;
`

const IconImg = styled.img`
  width: 20px;
  height: 20px;
`

const Icon = styled.div`
  font-size: 16px;
`

const Text = styled.div`
  margin-left: 5px;
`

const List = styled.div`
  border-bottom: 1px solid hsl(210deg 8% 75%);
  width: 340px;
  height: 41.2px;
  display: flex;
  padding: 2px 7px 0px;
  flex-direction: column;
`

const TextPosition = styled.div`
  margin-left: 30px;
  display: flex;
  color: hsl(210deg 8% 45%);
`

const ListBox = styled.div`
  flex-direction: column;
  display: flex;
  justify-content: center;
`

export default Modal;

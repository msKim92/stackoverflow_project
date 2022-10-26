import React from "react";
import styled from "styled-components";

function Logout() {
  return (
    <Display>
      <Wraper>
        <div>
          Clicking “Log out” will log you 
          out of the following domains on this device:
        </div>
        <div>
          <div>
            <div>아이콘</div>
            <div>askubuntu.com</div>
          </div>
          <div>
            <div>아이콘</div>
            <div>askubuntu.com</div>
          </div>
          <div>
            <div>아이콘</div>
            <div>askubuntu.com</div>
          </div>
          <div>
            <div>아이콘</div>
            <div>askubuntu.com</div>
          </div>
          <div>
            <div>아이콘</div>
            <div>askubuntu.com</div>
          </div>
          <div>
            <div>아이콘</div>
            <div>askubuntu.com</div>
          </div>
          <div>
            <div>아이콘</div>
            <div>askubuntu.com</div>
          </div>
          <div> ---------------- </div>
        </div>
      </Wraper>
    </Display>  
  )
}


const Display = styled.div`
  width: 100%;
  height: 100%;
  border: 2px solid red;
`

const Wraper = styled.div`
  width: 65vw;
  height: 100vh;
  border: 2px solid blue;
`


export default Logout;

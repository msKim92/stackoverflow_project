import React from "react";
import styled from "styled-components";

function RightNavi() {
  return (
    <RightNaviWraper>
      <Wraper>789</Wraper>
    </RightNaviWraper>
  );
}

const RightNaviWraper = styled.div`
  width: 33%;
  height: 100%;
  border: 5px solid blue;
  display: flex;
`;

const Wraper = styled.div`
  width: 300px;
  height: 100vh;
  border: 2px solid red;
  margin-right: auto;
  min-width: 300px;
  background-color: #fbf3d5;
`;

export default RightNavi;

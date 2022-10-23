import React from "react";
import styled from "styled-components";

function LeftNvi() {
  return (
    <LeftNaviWraper>
      <Wraper>123</Wraper>
    </LeftNaviWraper>
  );
}

const LeftNaviWraper = styled.div`
  width: 220px;
  height: 100vh;
  border: 2px solid black;
`;

const Wraper = styled.div`
  width: 100%;
  height: 100vh;
  position: fixed;
`;

export default LeftNvi;

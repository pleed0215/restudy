import React from "react";
import styled, { keyframes } from "styled-components";

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 40px;
`;
const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
`;

const RollClock = styled.span`
  animation: ${spin} 1s ease-in-out infinite;
`;

export default () => (
  <Container>
    <RollClock role="img" aria-label="Loading">
      ⏰
    </RollClock>
  </Container>
);

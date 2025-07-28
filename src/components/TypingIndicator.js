import React from 'react';
import styled, { keyframes } from 'styled-components';

const bounce = keyframes`
  0%, 80%, 100% { transform: scale(0); }
  40% { transform: scale(1.0); }
`;

const TypingIndicatorContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 10px 15px;
  div {
    width: 8px;
    height: 8px;
    background-color: #8D99AE;
    border-radius: 50%;
    margin: 0 2px;
    animation: ${bounce} 1.4s infinite ease-in-out both;
  }
  div:nth-child(1) { animation-delay: -0.32s; }
  div:nth-child(2) { animation-delay: -0.16s; }
`;

const TypingIndicator = () => (
  <TypingIndicatorContainer>
    <div></div>
    <div></div>
    <div></div>
  </TypingIndicatorContainer>
);

export default TypingIndicator;
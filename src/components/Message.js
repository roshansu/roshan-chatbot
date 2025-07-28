import React from 'react';
import styled from 'styled-components';
import ReactMarkdown from 'react-markdown';

const MessageContainer = styled.div`
  display: flex;
  justify-content: ${props => (props.isUser ? 'flex-end' : 'flex-start')};
  margin-bottom: 10px;
`;

const MessageBubble = styled.div`
  max-width: 70%;
  padding: 10px 15px;
  border-radius: 20px;
  color: ${props => (props.isUser ? '#EAEAEA' : '#1C2A3A')};
  background-color: ${props => (props.isUser ? '#3A4D66' : '#00E5FF')};
  align-self: ${props => (props.isUser ? 'flex-end' : 'flex-start')};
  word-wrap: break-word;
`;

const Message = ({ text, isUser }) => {
  return (
    <MessageContainer isUser={isUser}>
      <MessageBubble isUser={isUser}>
        <ReactMarkdown>{text}</ReactMarkdown>
      </MessageBubble>
    </MessageContainer>
  );
};

export default Message;
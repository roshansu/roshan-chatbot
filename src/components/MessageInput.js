import React, { useState } from 'react';
import styled from 'styled-components';
import { IoIosSend } from 'react-icons/io';

const InputContainer = styled.form`
  display: flex;
  padding: 10px;
  background-color: #25354A;
`;

const InputField = styled.input`
  flex: 1;
  padding: 10px 15px;
  border-radius: 20px;
  border: none;
  background-color: #3A4D66;
  color: #EAEAEA;
  font-family: 'Inter', sans-serif;
  font-size: 16px;
  &:focus {
    outline: none;
  }
`;

const SendButton = styled.button`
  background: none;
  border: none;
  color: #00E5FF;
  font-size: 28px;
  margin-left: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  transition: color 0.2s;

  &:hover {
    color: #8D99AE;
  }
`;

const MessageInput = ({ onSend }) => {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent form submission from reloading the page
    if (inputValue.trim()) {
      onSend(inputValue);
      setInputValue('');
    }
  };

  return (
    <InputContainer onSubmit={handleSubmit}>
      <InputField
        type="text"
        placeholder="Ask me anything..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <SendButton type="submit">
        <IoIosSend />
      </SendButton>
    </InputContainer>
  );
};

export default MessageInput;
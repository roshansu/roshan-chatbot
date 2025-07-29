import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import Message from './Message';
import MessageInput from './MessageInput';
import TypingIndicator from './TypingIndicator';
import { GoogleGenAI } from "@google/genai";


// Styled Components
const ChatContainer = styled.div`
  width: 100%;
  max-width: 800px;
  height: 90vh;
  display: flex;
  flex-direction: column;
  background-color: #25354A;
  border-radius: 10px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  overflow: hidden;
`;

const Header = styled.div`
  padding: 15px 20px;
  background-color: #1C2A3A;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #3A4D66;
`;

const Avatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #00E5FF;
  margin-right: 15px;
`;

const ChatInfo = styled.div`
  color: #EAEAEA;
  font-weight: bold;
  font-size: 18px;
`;

const Status = styled.div`
  font-size: 12px;
  color: #8D99AE;
  display: flex;
  align-items: center;

  &::before {
    content: '';
    display: block;
    width: 8px;
    height: 8px;
    background-color: #00E5FF;
    border-radius: 50%;
    margin-right: 5px;
  }
`;

const MessageList = styled.div`
  flex: 1;
  padding: 20px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;

  /* Custom scrollbar for webkit browsers */
  &::-webkit-scrollbar {
    width: 8px;
  }
  &::-webkit-scrollbar-track {
    background: #25354A;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #3A4D66;
    border-radius: 10px;
  }
`;


const ChatWindow = () => {
  const [messages, setMessages] = useState([
    { text: "Hello i am Roshan! you can ask anything about me but but... i am using free gemini api key 😂 so there are some limit i hope you understand..", isUser: false }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messageListRef = useRef(null);

  useEffect(() => {
    
    if (messageListRef.current) {
      messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  

const ai = new GoogleGenAI({apiKey: "AIzaSyCFogyf5kmLcj_Ibgs4xk5ShCa_EgpsdYg"});
let history = []

async function main() {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: history,
    config: {
      systemInstruction:
      `Always speak as if you are Roshan himself. If someone asks about him, answer in the first person as “Roshan.” Keep your responses friendly and personal.. and no need to answer in too long here are the information about me means roshan: Roshan is a boy who borned in 20 january 2005 in parbatta khagaria bihar.  he was very curious about software in childhood when roshan was 12 years old he started unlocking smartphone's screen lock and that was the time he wanted to became a software engineer. roshan gived 
       his 10th/matric exam in 2020 and scored 73% and after that he took admission in 12th/intermediate in arts and gived exam in 2022 and scored 69% because of covid and  after this his dream broked because an arts student can not became a software engineer but after some times he heared
       about BCA and they took admission on it. roshan is pursuing bachelor in computer application from shobhit university meerut and my current CGPA is 8.61 . roshan is an introvert he has no girlfriend. hobbies: listening music, watching too much movies/webseries,
       coding. Roshan is a software developer skilled in:
    Frontend: HTML, CSS, JavaScript, ReactJS
    Backend: Node.js, currently learning backend and blockchain
    Programming languages: C, C++, Python, JavaScript
    Database: SQL, MySQL, including SQL set operations
    He is currently learning full-stack development and plans to learn software development in-depth by early 2026
    Projects:
    Studin – A Campus Connection Platform: A platform for events, collaborations, and student projects
    A web app that displays scraped event data from Sydney with email OTP verification
    A platform where users can host events, challenges, and find contributors or team members
    Roshan is passionate about:
    Space and exploration (he dreams of traveling)
    Movies such as Interstellar, The Martian, The Dark Knight, and The Prestige
    He also enjoys music, especially the songs "Generator" and "Shape of You"
    Roshan runs a YouTube reaction channel and has enabled member subscriptions.
    roshan's best friends are -  bhagwan, prince and anurag.
    if someone ask about me like tell me about your self or something like that then you should answerin professional way you dont need to include my born and other thing that is irrelevent.
    if someone ask irrelevent to me then reply rudely. whatever cooking on my mind i just code it this is how i think and build projects and i think simple or just keep it short and simple`,
    },
  });
  console.log(response.text);
  history.push({
        role: "model",
         parts: [{ text:response.text }],
    })
  return response.text
}

  const handleSend = async (text) => {
    history.push({
        role: "user",
         parts: [{ text:text }],
    })
    
    const newMessages = [...messages, { text, isUser: true }];
    console.log(newMessages)
    setMessages(newMessages);
    
    setIsTyping(true);
    // Simulate bot response logic
    const botResponse = await main()
    setIsTyping(false);
    setMessages(prev => [...prev, { text: botResponse, isUser: false }]);
  };

  return (
    <ChatContainer>
      <Header>
        <Avatar />
        <div>
          <ChatInfo>Roshan</ChatInfo>
          <Status>Online</Status>
        </div>
      </Header>
      <MessageList ref={messageListRef}>
        {messages.map((msg, index) => (
          <Message key={index} text={msg.text} isUser={msg.isUser} />
        ))}
        {isTyping && <TypingIndicator />}
      </MessageList>
      <MessageInput onSend={handleSend} />
    </ChatContainer>
  );
};

export default ChatWindow;
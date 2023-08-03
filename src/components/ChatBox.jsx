import React, { useRef, useState, useEffect, useContext } from "react";
import styled from "styled-components";
import parse from "html-react-parser";
import NavigationIcon from "@mui/icons-material/Navigation";
import axios from "axios";
import RestartAltIcon from "@mui/icons-material/RestartAlt";

const Container = styled.div`
  width: 65%;
  margin: 50px auto 0 auto;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;
`;
const Wrapper = styled.div``;
const CardHeader = styled.div`
  background: #b61f56;
`;

const ProfileBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 15px 10px;
  gap: 15px;
`;

const AvatarImgBox = styled.div`
  height: 60px;
  border: 3px solid #fff;
  border-radius: 50%;
  padding: 8px;
`;

const Avatar = styled.img`
  height: 100%;
  width: 100%;
`;
const AvatarName = styled.span`
  color: #fff;
  font-size: 22px;
`;

const CardBody = styled.div`
  height: 250px;
  overflow-y: auto;
  scrollbar-width: thin;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;
const CardFooter = styled.div``;

const UserInput = styled.input`
  width: 100%;
  height: 50px;
  padding: 10px;
  border: none;
  outline: none;
`;

const SendButton = styled.button`
  border-radius: 50%;
  height: 60px;
  width: 60px;
  border: none;
  background: #000;
  color: #fff;
  cursor: pointer;
  &:disabled {
    cursor: not-allowed;
    background-color: #666;
  }
`;

const IconBox = styled.div`
  transform: rotate(90deg);
`;

const FooterWrapper = styled.div`
  padding: 0 10px;
  display: flex;
  align-items: center;
  margin-top: 15px;
  box-shadow: rgba(14, 30, 37, 0.12) 0px 2px 4px 0px,
    rgba(14, 30, 37, 0.32) 0px 2px 16px 0px;
`;

const AvatarDesc = styled.span`
  color: #fff;
  font-weight: 200;
`;
const AvatarDescBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const BotTextBox = styled.div`
  display: flex;
  justify-content: ${(props) =>
    props.sender === `user` ? `flex-end` : `flex-start`};
  margin: ${(props) =>
    props.sender === `user` ? `25px 25px 0 auto` : `25px auto 0 25px`};
  width: 50%;
`;

const BotText = styled.p`
  padding: 10px;
  font-size: 17px;
  border: ${(props) =>
    props.sender === `user` ? `2px solid #6E263A` : `2px solid #013853`};
  border-radius: 12px;
  background-color: ${(props) =>
    props.sender === `user` ? `#6e263a21` : `#01385317`};
  width: fit-content;
`;

const Form = styled.form``;

const ChatbodyRef = styled.div``;

const RestartConversationBox = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const RestartConversationButton = styled.button`
  padding: 10px 20px;
  background-color: #b61f56;
  color: #fff;
  border: none;
  border-radius: 5px;
  margin-right: 12px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ChatBox = ({ queryParams }) => {
  const { lang, apid_id } = queryParams;
  const initalText =
    lang === "en"
      ? "We're sorry we missed your call. Unfortunately, all of our agents are busy but I may be able to assist you."
      : "Lamentamos haber perdido su llamada. Desafortunadamente, todos nuestros agentes están ocupados, pero es posible que pueda ayudarlo.";

  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    { text: initalText, sender: "Eve" },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const inputRef = useRef(null);
  const chatboxRef = useRef(null);

  const fetchInitialResponse = async () => {
    setIsLoading(true);
    try {
      const intent = {
        input: lang === "en" ? "Missed Inbound call" : "Spanish",
        apid_id: apid_id,
        lang: lang,
      };
      // console.log(intent);
      const url =
        "https://hrmcrm.nablasol.net/custom/service/v4_1_custom/nblchatbot.php";
      const response = await axios.post(
        url,
        JSON.stringify({
          intent,
        })
      );

      const data = response.data;
      const botMessage = { text: data, sender: "Eve" };
      console.log(botMessage);
      setMessages([
        { text: initalText, sender: "Eve" }, // Add the initalText as the first message
        botMessage,
      ]);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    chatboxRef?.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (lang && apid_id) {
      fetchInitialResponse();
    }
  }, [lang, apid_id]);

  const handleInput = (event) => {
    setInput(event.target.value);
    setIsButtonDisabled(event.target.value === "");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    const userMessage = { text: input, sender: "user" };
    setMessages([...messages, userMessage]);
    inputRef.current.value = "";
    setInput("");
    try {
      const response = await axios.post(
        "https://hrmcrm.nablasol.net/custom/service/v4_1_custom/nblchatbot.php",
        JSON.stringify({
          intent: {
            input: input,
            apid_id,
            lang, // en or es
          },
        })
      );

      const data = response.data;
      const botMessage = { text: data, sender: "Eve", isLoading: false };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
      setIsLoading(false);
      setIsButtonDisabled(true);
    } catch (err) {
      console.log(err);
    }
  };

  const handleRestartConversation = async () => {
    setMessages([{ text: initalText, sender: "Eve" }]);
    setIsLoading(true);
    try {
      const intent = {
        input: lang === "en" ? "Missed Inbound call" : "Spanish",
        apid_id,
        lang: lang,
      };
      const url =
        "https://hrmcrm.nablasol.net/custom/service/v4_1_custom/nblchatbot.php";
      const response = await axios.post(
        url,
        JSON.stringify({
          intent,
        })
      );

      const data = response.data;
      const botMessage = { text: data, sender: "Eve" };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
      setIsLoading(false);
      setIsButtonDisabled(true);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Container>
      <Wrapper>
        <CardHeader>
          <ProfileBox>
            <AvatarImgBox>
              <Avatar src="https://i.ibb.co/4pyShV9/chatbot.png" />
            </AvatarImgBox>
            <AvatarDescBox>
              <AvatarDesc>Chat with</AvatarDesc>
              <AvatarName>Eve</AvatarName>
            </AvatarDescBox>
          </ProfileBox>
        </CardHeader>
        <CardBody>
          {messages?.map((message) => {
            return (
              <BotTextBox sender={message.sender}>
                {message?.text && (
                  <BotText sender={message.sender}>
                    {parse(message.text)}
                  </BotText>
                )}
              </BotTextBox>
            );
          })}
          <RestartConversationBox>
            {messages[messages.length - 1]?.text?.includes(
              "Thank you for calling today. We hope you have a great day!"
            ) ||
              (messages[messages.length - 1]?.text?.includes(
                "Gracias por llamar hoy. ¡Esperamos que tengas un gran día!"
              ) && (
                <RestartConversationButton onClick={handleRestartConversation}>
                  <RestartAltIcon />
                  Restart Conversation
                </RestartConversationButton>
              ))}
          </RestartConversationBox>
          <ChatbodyRef ref={chatboxRef}></ChatbodyRef>
        </CardBody>
        <CardFooter>
          <Form onSubmit={handleSubmit}>
            <FooterWrapper>
              <UserInput
                placeholder="Enter your message..."
                onChange={handleInput}
                ref={inputRef}
              />
              <SendButton
                type="submit"
                disabled={isButtonDisabled || isLoading}
              >
                <IconBox>
                  <NavigationIcon />
                </IconBox>
              </SendButton>
            </FooterWrapper>
          </Form>
        </CardFooter>
      </Wrapper>
    </Container>
  );
};

export default ChatBox;

import React, { useState } from "react";
import styled from "styled-components";
import UserContext from "./Context";

const Container = styled.div`
  background-color: #6e263a;
`;
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  padding: 14px 0;
`;
const ImgBox = styled.div`
  height: 75px;
`;
const Img = styled.img`
  height: 100%;
  width: 100%;
`;
const Subtitle = styled.h2`
  color: #fff;
`;
const Content = styled.p`
  color: #fff;
  font-style: italic;
  font-weight: 500;
`;

const LanguageBtn = styled.button`
  background-color: #6e263a;
  padding: 10px;
  font-size: 20px;
  position: absolute;
  top: 3%;
  right: 20px;
  color: #fff;
  border: 1px solid #fff;
  border-radius: 5px;
  cursor: pointer;
`;

const Header = ({ handleLanguage, language }) => {
  return (
    <Container>
      <Wrapper>
        <ImgBox>
          <Img src="https://firma.consumerlaw.com/clg_new_u-1.png" />
        </ImgBox>
        <Subtitle>Los Guardianes Del Pueblo Pueblo</Subtitle>
        <Content>
          Bringing immigration relief to our Community, all throughout the
          country.
        </Content>
      </Wrapper>
      {/* <LanguageBtn type="button" onClick={handleLanguage}>
        {language === "en" ? "Spanish" : "English"}
      </LanguageBtn> */}
    </Container>
  );
};

export default Header;

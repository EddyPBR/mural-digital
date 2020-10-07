import React from "react";
import styled from "styled-components";

import HomeButtom from "../../components/HomeButton";

import Img from "../../assets/images/Woman.svg"; // need remove this after integration with API

const Announce: React.FC = () => {
  return (
    <Announcement>
      <Header>
        <Image src={Img} alt="Sejam todos bem-vindos!" />
        <HeaderContent>
          <Title>Sejam todos bem-vindos!</Title>
          <Date>28/09/2020</Date>
        </HeaderContent>
      </Header>
      <Content>
        <Container>
          <SecundaryTitle>
            Bem-vindos ao sistema de anuncios da Rally Motos!
          </SecundaryTitle>
          <Text>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
            rutrum pellentesque nisl, eget tincidunt purus congue nec. Lorem
            ipsum dolor sit amet, consectetur adipiscing elit. Nunc rutrum dolor
            ac volutpat maximus. Aliquam bibendum, lacus a tristique efficitur,
            neque lorem dapibus turpis, et laoreet sem nulla eu dolor.
          </Text>
          <Text>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
            rutrum pellentesque nisl, eget tincidunt purus congue nec. Lorem
            ipsum dolor sit amet, consectetur adipiscing elit. Nunc rutrum dolor
            ac volutpat maximus. Aliquam bibendum, lacus a tristique efficitur,
            neque lorem dapibus turpis, et laoreet sem nulla eu dolor.
          </Text>
        </Container>
      </Content>
      <HomeButtom />
    </Announcement>
  );
};

const Announcement = styled.div`
  min-height: calc(100vh - 3rem);
  width: 100%;
  max-width: 1440px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Header = styled.header`
  width: 100%;
  height: 45rem;
  border-radius: 0 0 12rem 12rem;
  background-color: #fff;

  display: flex;
  flex-direction: row;
  justify-content: center;

  @media(max-width: 1080px){ 
    border-radius: 0 0 6rem 6rem;
  }

  @media(max-width: 780px){
    flex-direction: column;
    align-items: center;
    height: auto;
    border-radius: 0;
  }
`;

const Image = styled.img`
  margin-top: 3.5rem;
  width: 100%;
  max-width: 35rem;
  max-height: 35rem;
`;

const HeaderContent = styled.div`
  margin-top: 10rem;
  margin-left: 20rem;
  display: flex;
  flex-direction: column;
  max-width: 30rem;

  @media(max-width: 1280px) {
    margin-left: 6rem;
  }

  @media(max-width: 780px){
    margin: 3rem 0 6rem 0;
  }
`;

const Title = styled.h1`
  font: 700 4.8rem "Open Sans", sans-serif;
  color: var(--color-title);
`;

const Date = styled.span`
  font: 700 1.4rem "Open Sans", sans-serif;
  color: var(--color-text);
  margin-top: 1.4rem;
  display: flex;
  align-self: flex-end;

  @media(max-width: 780px){
    margin-top: 0;
  }
`;

const Content = styled.main`
  max-width: 100.3rem;
  width: 90vw;
  /* min-width: 50rem; */
  background-color: #FFF;
  margin-bottom: 6rem;
  border-radius: 0 0 6rem 6rem;

  @media(max-width: 1280px) {
    max-width: 78rem;
  }

  @media(max-width: 960px) {
    max-width: 80vw;
  }

  @media(max-width: 580px) {
    max-width: 90vw;
    filter: drop-shadow(2px 12px 4px rgba(0, 0, 0, 0.15));
    border-radius: 0 0 3rem 3rem;
  }
`;

const Container = styled.div`
  margin: 7rem 13rem;

  @media(max-width: 1280px) {
    margin: 6rem 10rem;
  }

  @media(max-width: 900px) {
    margin: 6rem 7rem;
  }

  @media(max-width: 780px){
    margin: 6rem 4rem;
  }

  @media(max-width: 580px) {
    margin: 6rem 2rem;
  }
`;

const SecundaryTitle = styled.h2`
  font: 700 3.6rem "Open Sans", sans-serif;
  color: var(--color-title);
  margin-bottom: 3rem;
`;

const Text = styled.p`
  font: 400 1.8rem/3.2rem "Roboto", sans-serif;
  color: var(--color-text);
  margin-bottom: 3rem;
`;

export default Announce;

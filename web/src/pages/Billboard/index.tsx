import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import HashLoader from "react-spinners/HashLoader";

import woman from "../../assets/images/Woman.svg";
import guy from "../../assets/images/Guy.svg";

import AnnounceCard from "../../components/AnnounceCard";

import api from "../../services/api";

interface Announce {
  id: string,
  title: string,
  text: string,
  updated_At: string
}

const Billboard: React.FC = () => {
  const [announces, setAnnounces] = useState<Announce[]>([]);

  useEffect(() => {
    api.get("/billboard/").then(response => {
      setAnnounces(response.data);
    });
  }, []);

  return (
    <Container>
      <WomanImage src={woman} alt="Mulher de costas selecionando janelas em um website" />
      <Main>
        <Title>Rally Motos - Quadro de avisos</Title>
        <Text>
          Acompanhe os avisos da Rally Motos por aqui, para ver as notícias
          basta clicar em um dos anúncios!
        </Text>
      </Main>
      <Carousel>
        {
          announces.length === 0 && 
          <LoaderArea>
            <HashLoader size={100} color={"#E52F34"} />
          </LoaderArea>
        }
        {announces.map( (announce) => (
          <AnnounceCard
            key={announce.id}
            id={announce.id}
            title={announce.title}
            text={announce.text}
            date={announce.updated_At}
          />
        ))}
      </Carousel>
      <GuyImage src={guy} alt="Homem com mão no bolso olhando o smartphone" />
    </Container>
  );
};

const Container = styled.div`
  min-height: calc(100vh - 3rem);
  width: 90vw;
  max-width: 1170px;

  display: flex;
  flex-direction: row;

  @media(max-width: 1280px) {
    justify-content: space-between;
  }

  @media(max-width: 1024px) {
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  @media (min-height: 740px) {
    align-items: center;
  }
`;

const Main = styled.main`
  width: 90vw;
  max-width: 43.0rem;
  margin-right: 15rem;

  @media(max-width: 1280px) {
    margin-right: 15rem;
  }

  @media(max-width: 1024px) {
    justify-items: center;
    text-align: center;
    margin-right: 0;
    max-width: unset;
  }

  @media (min-height: 740px) and (min-width: 1024px) {
    align-items: center;
    align-self: center;
    margin-bottom: 40rem;
  }
`;

const Title = styled.h1`
  font: 700 3.6rem "Open Sans", sans-serif;
  color: var(--color-title);
  margin-top: 0;

  @media(max-width: 1024px) {
    margin-top: 3rem;
  }
`;

const Text = styled.p`
  font: 400 1.6rem/2.4rem "Roboto", sans-serif;
  color: var(--color-text);
`;

const WomanImage = styled.img`
  position: absolute;
  right: 50%;
  margin-right: 13rem;
  top: 20rem;
  width: 90vw;
  max-width: 52.2rem;

  @media(max-width: 1360px){
    left: 1rem;
    right: unset;
  }

  @media(max-width: 1024px) {
    position: inherit;
    margin-right: 0;
  }

  @media (min-height: 740px) {
    top: 50%;
    margin-top: -10rem;
  }
`

const GuyImage = styled.img`
  position: absolute;
  right: 50%;
  left: 50%;
  margin-left: 440px;
  top: 24rem;
  width: 19.0rem;

  @media(max-width: 1280px) {
    display: none;
  }

  @media (min-height: 740px) {
    top: 50%;
    margin-top: -6rem;
  }
`;

const Carousel = styled.div`
  height: 100vh;
  max-height: 62rem;
  width: 41.0rem;
  overflow-y: scroll;

  && > div {
    margin: 3rem 0 3rem 0;
  }

  && > div:nth-child(1) {
    margin-top: 1.5rem;
  }

  @media(max-width: 1024px){
    width: 100%;
    max-width: 72.4rem;
    max-height: 30rem;
    height: 90vh;
    margin-top: 0;

    display: flex;
    flex-direction: row;
    align-items: center;
    overflow-x: scroll;

    && > div {
      margin: 0 1.5rem 0 1.5rem;
    }
  }

  @media(max-width: 1024px) and (min-height: 740px) {
    height: 100%;
    margin-top: 6rem;
  }
`;

const OpacityAnimation = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const LoaderArea = styled.div`
  width: 100%;
  height: 80%;
  display: flex;
  justify-content: center;
  align-items: center;

  animation: ${OpacityAnimation} 2s linear;

  @media(max-width: 1024px) {
    height: 22rem;
  }
`

export default Billboard;

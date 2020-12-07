import React, { useState, useEffect } from "react";
import { match } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import { Link } from "react-router-dom";
import BounceLoader from "react-spinners/BounceLoader";

import HomeButton from "../../components/HomeButton";

import api from "../../services/api";
import formatDate from "../../utils/formatDate";

const PREFIX = process.env.REACT_APP_PREFIX;

interface Announce {
  id: string;
  title: string;
  extendedTitle: string;
  text: string;
  imageUrl: string;
  updatedAt: string;
}

interface AnnounceParams {
  match: match<{ id: string }>;
}

const Announce: React.FC<AnnounceParams> = (props) => {
  const id = props.match?.params.id;

  const [announce, setAnnounce] = useState({} as Announce);
  const [isLoading, setIsLoading] = useState(true);
  const [status, setStatus] = useState("Carregando...");

  const formatedDate = formatDate;

  useEffect(() => {
    api
      .get(`/billboard/${id}`)
      .then((response) => setAnnounce(response.data))
      .catch((error) => {
        if (error.response.status === 404) {
          return setStatus("Erro: anúncio não encontrado");
        }
        if (error.response.status === 500) {
          return setStatus("Erro interno do servidor");
        }
        return setStatus(
          "Erro desconhecido no sistema, por favor recarregue a página"
        );
      });
  }, [id]);

  useEffect(() => {
    if (Object.keys(announce).length) {
      setIsLoading(false);
    }
  }, [announce]);

  if (isLoading) {
    return (
      <LoadingPage>
        <BounceLoader size={160} color={"#E52F34"} />
        <Text>{status}</Text>
        <Link to="/">ir para anúncios</Link>
      </LoadingPage>
    );
  }

  return (
    <Announcement>
      <Header>
        <Image
          src={`${PREFIX}://${announce.imageUrl}`}
          alt="Sejam todos bem-vindos!"
        />
        <HeaderContent>
          <Title>{announce.title}</Title>
          <Date>{formatedDate(announce.updatedAt)}</Date>
        </HeaderContent>
      </Header>
      <Content>
        <Container>
          <SecundaryTitle>{announce.extendedTitle}</SecundaryTitle>
          {announce.text.split("\n").map((text, index) => {
            return <Text key={index}>{text}</Text>;
          })}
        </Container>
      </Content>
      <HomeButton />
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
  @media (max-width: 1080px) {
    border-radius: 0 0 6rem 6rem;
  }
  @media (max-width: 780px) {
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
  @media (max-width: 1280px) {
    margin-left: 6rem;
  }
  @media (max-width: 780px) {
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
  @media (max-width: 780px) {
    margin-top: 0;
  }
`;

const Content = styled.main`
  max-width: 100.3rem;
  width: 90vw;
  background-color: #fff;
  margin-bottom: 6rem;
  border-radius: 0 0 6rem 6rem;
  @media (max-width: 1280px) {
    max-width: 78rem;
  }
  @media (max-width: 960px) {
    max-width: 80vw;
  }
  @media (max-width: 580px) {
    max-width: 90vw;
    filter: drop-shadow(2px 12px 4px rgba(0, 0, 0, 0.15));
    border-radius: 0 0 3rem 3rem;
  }
`;

const Container = styled.div`
  margin: 7rem 13rem;
  @media (max-width: 1280px) {
    margin: 6rem 10rem;
  }
  @media (max-width: 900px) {
    margin: 6rem 7rem;
  }
  @media (max-width: 780px) {
    margin: 6rem 4rem;
  }
  @media (max-width: 580px) {
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

const OpacityAnimation = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const LoadingPage = styled.div`
  width: 100%;
  height: calc(100vh - 3rem);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  animation: ${OpacityAnimation} 2s linear;
  && > p {
    margin-top: 3rem;
    margin-bottom: 1rem;
  }
  && > a {
    font: 400 1.8rem/3.2rem "Roboto", sans-serif;
    color: var(--color-secundary-light);
  }
`;

export default Announce;

import React from "react";
import { useHistory } from "react-router-dom";

import styled from "styled-components";

interface CardComponent {
  id: string;
  title: string;
  text: string;
  date?: string;
}

const AnnounceCard: React.FC<CardComponent> = (props) => {
  const history = useHistory();

  const { id, title, text, date } = props;

  const handleNavigateToAnnounce = () => {
    return history.push(`/announces/${id}`);
  };

  return (
    <Card onClick={() => handleNavigateToAnnounce()}>
      <Title>{title}</Title>
      <Text>{text}</Text>
      <Date>{date}</Date>
    </Card>
  );
};

const Card = styled.div`
  width: 100%;
  max-width: 38rem;
  min-width: 32rem;
  max-height: 24rem;
  background: #ffffff;
  padding: 2rem 1.8rem;
  border-radius: 0 1rem 1rem 0rem;
  border-left: solid 0.5rem var(--color-primary);
  filter: drop-shadow(0px 2px 4px rgba(0, 0, 0, 0.25));
  transition: border-left 0.2s, padding-left 0.2s, filter 0.2s, transform 0.2s;
  &&:hover {
    cursor: pointer;
    border-left: solid 1rem var(--color-primary);
    padding-left: 1.3rem;
    filter: drop-shadow(4px 4px 6px rgba(0, 0, 0, 0.25));
    transform: scale(1.004);
  }
`;

const Title = styled.h1`
  margin-top: 0;
  font: 700 2.4rem "Open Sans", sans-serif;
  color: var(--color-title);
`;

const Text = styled.p`
  font: 400 1.2rem/2.2rem "Roboto", sans-serif;
  color: var(--color-text);
  max-height: 6.8rem;
  overflow: hidden;
`;

const Date = styled.span`
  margin-top: 1rem;
  font: 700 1rem "Open Sans", sans-serif;
  color: var(--color-text);
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

export default AnnounceCard;

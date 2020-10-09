import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

interface DeleteBox {
  id: string;
  title: string;
}

const DeleteBox: React.FC<DeleteBox> = (props) => {
  const { id, title } = props;

  return (
    <BlackWindow>
      <Box>
        <Title>Desejar remover este anúncio?</Title>
        <Info>
          O anúncio <span>{`${title}`}</span> ao clicar em confirmar, o anúncio será removido do sistema e jamais poderá ser restaurado, deseja confirmar a remoção?
        </Info>
        <Row>
          <Button>
            <Link to={`/admin/announces/delete/${id}`}>REMOVER</Link>
          </Button>
          <Link to={`/admin/announces/`}>Não remover</Link>
        </Row>
      </Box>
    </BlackWindow>
  );
};

const BlackWindow = styled.div`
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 1000;
  background-color: rgba(0, 0, 0, 0.7);

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const Box = styled.div`
  width: 90vw;
  max-width: 43rem;
  min-height: 38rem;
  background: #ffffff;
  box-shadow: 2px 2px 4px 2px rgba(0, 0, 0, 0.25);
  border-radius: 10px;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  padding: 3rem 4rem;

  @media(max-width: 480px) {
    padding: 3rem 2rem;
  }
`;

const Title = styled.h1`
  font: 400 3.6rem/4.2rem "Roboto", sans-serif;
  color: var(--color-primary);
  margin: 0;
  margin-bottom: 2rem;
`;

const Info = styled.p`
  font: 400 1.6rem/2.6rem "Roboto", sans-serif;
  color: var(--color-text);
  margin-bottom: 4rem;

  && > span {
    font: 700 1.6rem "Open Sans", sans-serif;
    color: var(--color-title);
  }
`;

const Row = styled.div`
  width: 100%;
  margin-bottom: 2rem;

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;

  && > a {
    color: var(--color-primary);
    font: 400 1.6rem "Roboto", sans-serif;
    text-decoration: none;
    margin-left: 3rem;
  }

  && > a:hover {
    text-decoration: underline;
  }
`;

const Button = styled.div`
  width: 90vw;
  max-width: 17rem;
  height: 5rem;
  background: linear-gradient(
    94.19deg,
    var(--color-primary-light) 0%,
    var(--color-primary-dark) 100%
  );
  box-shadow: 4px 4px 5px rgba(0, 0, 0, 0.5);
  border-radius: 10px;
  transition: 0.2s filter, 0.2s box-shadow;
  cursor: pointer;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  &&:hover {
    filter: brightness(1.1);
    box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.8);
  }

  && > a {
    width: 100%;
    height: 100%;
    text-decoration: none;
    font: 700 1.6rem "Open Sans", sans-serif;
    color: var(--color-background);

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }

  && > a > svg {
    margin-right: 0.8rem;
  }

  @media (max-width: 520px) {
    width: 14rem;
    height: 4.6rem;
    font-size: 1.6rem;
  }
`;

export default DeleteBox;

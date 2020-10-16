import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import { Link, useHistory } from "react-router-dom";

import BounceLoader from "react-spinners/BounceLoader";

import { FaTrash, FaEdit } from "react-icons/fa";

import api from "../../services/api";

interface TableRow {
  id: string;
  title: string;
  date?: string;
}

const TableRow: React.FC<TableRow> = (props) => {
  const { id, title, date } = props;

  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState("");

  const [enableDelete, setEnableDelete] = useState(false);

  const history = useHistory();

  const handleShowDeleteBox = (event: any) => {
    event.preventDefault();
    setEnableDelete(true);
  };

  const handleHideDeleteBox = (event: any) => {
    event.preventDefault();
    setEnableDelete(false);
  }

  const handleDeleteAnnounce = (event: any) => {
    event.preventDefault();
    setIsLoading(true);
    setStatus("carregando...")
    setEnableDelete(false);

    api.delete(`/billboard/${id}`)
    .then( (response) => {
      if (response.status === 200) return setStatus("Removido com sucesso!");
    })
    .catch( (error) => {
      if(error.response.status === 500) {
        return setStatus("Erro interno do servidor, tente novamente :(");
      }
      if(error.response.status === 404) {
        return setStatus("Erro: anúncio não encontrado :(");
      }
      return setStatus("Ops! ocorreu um erro inesperado, tente novamente :(");
    })
    .finally( () => {
      setTimeout(() => {
        setIsLoading(false);
        history.push("/admin");
      }, 5000);
    });
  }

  return (
    <Row>
      <td><Link to={`/announces/${id}`}>{id}</Link></td>
      <td>{title}</td>
      <td>{date}</td>
      <td>
        <Link to={`/admin/announces/update/${id}`}>
          <FaEdit size={22} />
        </Link>
      </td>
      <td>
        <Link
          onClick={(event) => handleShowDeleteBox(event)}
          to={`/admin/announces/delete/${id}`}
        >
          <FaTrash size={18} />
        </Link>
      </td>

      {enableDelete && (
        <BlackWindow>
          <Box>
            <Title>Desejar remover este anúncio?</Title>
            <Info>
              O anúncio <span>{`${title}`}</span> ao clicar em confirmar, o
              anúncio será removido do sistema e jamais poderá ser restaurado,
              deseja confirmar a remoção?
            </Info>
            <RowBox>
              <Button>
                <Link onClick={(event) => handleDeleteAnnounce(event)} to={`/admin/announces/delete/${id}`}>REMOVER</Link>
              </Button>
              <Link onClick={(event) => handleHideDeleteBox(event)} to={`/admin/announces/`}>Não remover</Link>
            </RowBox>
          </Box>
        </BlackWindow>
      )}

      {
      isLoading && 
      <BlackWindow>
        <Box>
        <LoadingPage>
          <Text>{status}</Text>
          <BounceLoader size={160} color={"#E52F34"} />
          <Text>Aguarde o redirecionamento automático!</Text>
        </LoadingPage>
        </Box>
      </BlackWindow>
      }

    </Row>
  );
};

const Row = styled.tr`
  width: 100%;
  height: 7rem;
  background-color: #fff;
  display: grid;
  grid-template-columns: 2fr 2fr 1fr 1fr 1fr;
  gap: 3rem;
  border-radius: 1rem;
  margin-bottom: 3rem;

  table-layout: fixed;

  && > td {
    font: 400 1.6rem/2.4rem "Roboto", sans-serif;
    color: var(--color-text);
    border-radius: 1rem;
    border: 0.1rem solid #fff;
    border-bottom: 0.1rem solid #c8c9df;
    text-align: center;

    display: flex;
    align-items: center;
    justify-content: center;
  }

  && > td > a {
    font: 400 1.6rem/2.4rem "Roboto", sans-serif;
    color: var(--color-text);
    border-radius: 1rem;
    border-bottom: 0.1rem solid #c8c9df;
    text-align: center;
    text-decoration: none;
    color: var(--color-secundary-light);
    width: 100%;
    height: 100%;

    display: flex;
    align-items: center;
    justify-content: center;
  }

  && > td:hover {
    transition: 1s;
    border: 0.1rem solid #c8c9df;
  }

  && > td:nth-child(1):hover {
    background-color: #BFC7F7;
  }

  && > td:nth-child(4) {
    color: #f38230;
  }

  && > td:nth-child(5) {
    color: #d5151a;
  }

  && > td:nth-child(4) > a {
    width: 100%;
    height: 100%;
    color: #f38230;
    text-decoration: none;

    display: flex;
    align-items: center;
    justify-content: center;
  }

  && > td:nth-child(5) > a {
    width: 100%;
    height: 100%;
    text-decoration: none;
    color: #d5151a;

    display: flex;
    align-items: center;
    justify-content: center;
  }

  && > td:nth-child(4):hover {
    background: rgba(253, 216, 53, 0.4);
    border-color: rgba(253, 216, 53, 0.4);
    transition: 0.3s;
    cursor: pointer;
  }

  && > td:nth-child(5):hover {
    background: rgba(213, 21, 26, 0.2);
    border-color: rgba(213, 21, 26, 0.2);
    transition: 0.3s;
    cursor: pointer;
  }
`;

// Delete Box
const BlackWindow = styled.td`
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

const WhiteWindow = styled(BlackWindow) `
  background-color: #FFF;
`;

const Box = styled.div`
  width: 90vw;
  max-width: 43rem;
  min-height: 38rem;
  max-height: 40rem;
  background: #ffffff;
  box-shadow: 2px 2px 4px 2px rgba(0, 0, 0, 0.25);
  border-radius: 10px;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  padding: 3rem 4rem;

  @media (max-width: 480px) {
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

const RowBox = styled.div`
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


const Text = styled.p`
  font: 400 1.6rem/3.2rem "Roboto", sans-serif;
  color: var(--color-text);
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

export default TableRow;

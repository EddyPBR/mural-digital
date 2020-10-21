import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { Link } from "react-router-dom";
import { FaPlusCircle } from "react-icons/fa";
import BounceLoader from "react-spinners/BounceLoader";

import AdminNavbar from "../../components/AdminNavbar";
import TableRow from "../../components/TableRow";

import api from "../../services/api";
import formatDate from "../../utils/formatDate";

interface Announce {
  id: string,
  title: string,
  text: string,
  updated_at: string
}

const AnnounceList: React.FC = () => {
  const [announces, setAnnounces] = useState<Announce[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [status, setStatus] = useState("Carregando...");

  const formatedDate = formatDate;

  useEffect(() => {
    api.get(`/billboard`)
    .then(response => {
      setAnnounces(response.data)
      setIsLoading(false)
    })
    .catch(error => {
      if(error.response.status === 500) {
        return setStatus("Erro interno do servidor");
      }
      return setStatus("Erro desconhecido no sistema, por favor recarregue a página")
    })
  }, []);

  if(isLoading){
    return (
      <LoadingPage>
        <BounceLoader size={160} color={"#E52F34"} />
        <Text>{status}</Text>
        {
          status !== "Carregando..." && <Link to="/admin">Recarregar página</Link>
        }
      </LoadingPage>
    )
  }

  return (
    <>
      <AdminNavbar />
      <Announce>
        <Row>
          <Title>Lista do mural</Title>
          <Button>
            <Link to="/admin/announces/add">
              <FaPlusCircle size={18} />
              Adicionar
            </Link>
          </Button>
        </Row>
        <Table>
          <TableHeader>
            <tr>
              <th>Identificação</th>
              <th>Título</th>
              <th>Criado em</th>
              <th>Editar</th>
              <th>Excluir</th>
            </tr>
          </TableHeader>
          <TableBody>
            {announces.map( (announce) => (
              <TableRow 
                key={announce.id}
                id={announce.id}
                title={announce.title}
                date={formatedDate(announce.updated_at)}
              />
            ))}
          </TableBody>
        </Table>
      </Announce>
    </>
  );
};

const Announce = styled.div`
  min-height: calc(100vh - 7rem - 3rem - 3rem);
  display: flex;
  flex-direction: column;
  width: 90vw;
  max-width: 103rem;
  margin-top: 3rem;
  justify-self: center;
  align-self: center;
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 2rem;
`;

const Title = styled.h1`
  font: 700 3.6rem "Open Sans", sans-serif;
  color: var(--color-title);
  margin-bottom: 2rem;

  @media (max-width: 520px) {
    font-size: 2rem;
  }
`;

const Table = styled.table`
  max-width: 90vw;
  width: 100%;
  display: block;
  overflow-x: scroll;
`;

const TableHeader = styled.thead`
  min-width: 96rem;
  width: calc(100% - 16px);
  display: flex;
  justify-content: center;

  && > tr {
    height: 4rem;
    width: 100%;
    display: grid;
    grid-template-columns: 2fr 2fr 1fr 1fr 1fr;
    gap: 3rem;
  }

  && > tr > th {
    font: 400 1.8rem/2.4rem "Roboto", sans-serif;
    color: var(--color-title);

    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const TableBody = styled.tbody`
  min-width: 96rem;
  max-height: 50vh;
  overflow-y: scroll;
  display: block;
`;

const Button = styled.div`
  width: 90vw;
  max-width: 17rem;
  height: 5rem;
  margin-top: 1rem;
  margin-bottom: 3rem;
  background: linear-gradient(94.19deg, #50ea43 0%, #499a41 100%);
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

export default AnnounceList;

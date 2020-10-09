import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { FaTrash, FaEdit, FaPlusCircle } from "react-icons/fa";

import AdminNavbar from "../../components/AdminNavbar";

const AnnounceList: React.FC = () => {
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
            <tr>
              <td>091282195218213</td>
              <td>Título do post de anúncio</td>
              <td>01/01/2020</td>
              <td>
                <FaEdit size={22} />
              </td>
              <td>
                <FaTrash size={18} />
              </td>
            </tr>

            <tr>
              <td>091282195218213</td>
              <td>Título do post de anúncio</td>
              <td>01/01/2020</td>
              <td>
                <FaEdit size={22} />
              </td>
              <td>
                <FaTrash size={18} />
              </td>
            </tr>

            <tr>
              <td>091282195218213</td>
              <td>Título do post de anúncio</td>
              <td>01/01/2020</td>
              <td>
                <FaEdit size={22} />
              </td>
              <td>
                <FaTrash size={18} />
              </td>
            </tr>

            <tr>
              <td>091282195218213</td>
              <td>Título do post de anúncio</td>
              <td>01/01/2020</td>
              <td>
                <FaEdit size={22} />
              </td>
              <td>
                <FaTrash size={18} />
              </td>
            </tr>

            <tr>
              <td>091282195218213</td>
              <td>Título do post de anúncio</td>
              <td>01/01/2020</td>
              <td>
                <FaEdit size={22} />
              </td>
              <td>
                <FaTrash size={18} />
              </td>
            </tr>

            <tr>
              <td>091282195218213</td>
              <td>Título do post de anúncio</td>
              <td>01/01/2020</td>
              <td>
                <FaEdit size={22} />
              </td>
              <td>
                <FaTrash size={18} />
              </td>
            </tr>

            <tr>
              <td>091282195218213</td>
              <td>Título do post de anúncio</td>
              <td>01/01/2020</td>
              <td>
                <FaEdit size={22} />
              </td>
              <td>
                <FaTrash size={18} />
              </td>
            </tr>

            <tr>
              <td>091282195218213</td>
              <td>Título do post de anúncio</td>
              <td>01/01/2020</td>
              <td>
                <FaEdit size={22} />
              </td>
              <td>
                <FaTrash size={18} />
              </td>
            </tr>

            <tr>
              <td>091282195218213</td>
              <td>Título do post de anúncio</td>
              <td>01/01/2020</td>
              <td>
                <FaEdit size={22} />
              </td>
              <td>
                <FaTrash size={18} />
              </td>
            </tr>

            <tr>
              <td>091282195218213</td>
              <td>Título do post de anúncio</td>
              <td>01/01/2020</td>
              <td>
                <FaEdit size={22} />
              </td>
              <td>
                <FaTrash size={18} />
              </td>
            </tr>
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
  width: 100%;
  display: block;
`;

const TableHeader = styled.thead`
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
  max-height: 50vh;
  overflow-y: scroll;
  display: block;

  && > tr {
    width: 100%;
    height: 7rem;
    background-color: #fff;
    display: grid;
    grid-template-columns: 2fr 2fr 1fr 1fr 1fr;
    gap: 3rem;
    border-radius: 1rem;
    margin-bottom: 3rem;

    table-layout: fixed;
  }

  && > tr > td {
    font: 400 1.6rem/2.4rem "Roboto", sans-serif;
    color: var(--color-text);
    border-radius: 1rem;
    border-bottom: 0.1rem solid #c8c9df;

    display: flex;
    align-items: center;
    justify-content: center;
  }

  && > tr > td:hover {
    transition: 1s;
    border: 0.1rem solid #c8c9df;
  }

  && > tr > td:nth-child(1) {
    color: var(--color-secundary-light);
  }

  && > tr > td:nth-child(4) {
    color: #f38230;
  }

  && > tr > td:nth-child(5) {
    color: #d5151a;
  }

  && > tr > td:nth-child(4):hover {
    background: rgba(253, 216, 53, 0.4);
    border-color: rgba(253, 216, 53, 0.4);
    transition: 0.3s;
    cursor: pointer;
  }

  && > tr > td:nth-child(5):hover {
    background: rgba(213, 21, 26, 0.2);
    border-color: rgba(213, 21, 26, 0.2);
    transition: 0.3s;
    cursor: pointer;
  }
`;

const Button = styled.a`
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

export default AnnounceList;

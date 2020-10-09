import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { FaTrash, FaEdit } from "react-icons/fa";

interface TableRow {
  id: string;
  title: string;
  date: string;
}

const TableRow: React.FC<TableRow> = (props) => {
  const { id, title, date } = props;
  return (
    <Row>
      <td>{id}</td>
      <td>{title}</td>
      <td>{date}</td>
      <td>
        <Link to={`/announces/edit/${id}`}>
          <FaEdit size={22} />
        </Link>
      </td>
      <td>
        <Link onClick={ (event) => {
          event.preventDefault();
          console.log("ok")
        } } to={`/announces/delete/${id}`}>
          <FaTrash size={18} />
        </Link>
      </td>
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
    border-bottom: 0.1rem solid #c8c9df;

    display: flex;
    align-items: center;
    justify-content: center;
  }

  && > td:hover {
    transition: 1s;
    border: 0.1rem solid #c8c9df;
  }

  && > td:nth-child(1) {
    color: var(--color-secundary-light);
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

export default TableRow;

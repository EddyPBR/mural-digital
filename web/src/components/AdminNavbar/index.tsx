import React from "react";
import styled from "styled-components";
import { Link, useHistory } from "react-router-dom";
import { FaUser, FaSignOutAlt } from "react-icons/fa";

import { logout } from "../../utils/Login";

const AdminNavbar: React.FC = () => {
  const history = useHistory();

  const handleLogout = (event: any) => {
    event.preventDefault();
    logout();
    history.push("/admin");
  };

  return (
    <Header>
      <Container>
        <Info>
          <FaUser size={18} />
          <span>bem vindo, </span>
          <Link to="/admin/announces">Administrador</Link>
        </Info>
        <Logout>
          <Link onClick={(event) => handleLogout(event)} to="/admin/logout">
            <FaSignOutAlt size={20} />
            <span>Sair</span>
          </Link>
        </Logout>
      </Container>
    </Header>
  );
};

const Header = styled.header`
  height: 7rem;
  width: 100%;
  background: #ffffff;
  box-shadow: 2px 2px 6px 2px rgba(0, 0, 0, 0.25);
  display: flex;
  justify-content: center;
`;

const Container = styled.div`
  width: 90vw;
  max-width: 117rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const Info = styled.div`
  display: flex;
  align-items: center;
  font: 400 1.4rem "Roboto", sans-serif;
  && > svg {
    color: var(--color-secundary);
    filter: brightness(1.5);
    margin-right: 0.8rem;
  }
  && > span {
    color: var(--color-text);
  }
  && > a {
    margin-left: 0.3rem;
    text-decoration: none;
    color: var(--color-secundary);
    transition: 0.5s;
    filter: brightness(1.5);
  }
  && > a:hover {
    text-decoration: underline;
  }
`;

const Logout = styled.div`
  && > a {
    text-decoration: none;
    width: 100%;
    height: 100%;
    font: 400 1.4rem "Roboto", sans-serif;
    color: var(--color-primary);
    cursor: pointer;
    transition: 0.5s;
    display: flex;
    align-items: center;
  }
  && > a > svg {
    margin-right: 0.8rem;
  }
  && > a:hover {
    filter: brightness(1.2);
    transform: scale(1.1);
  }
`;

export default AdminNavbar;

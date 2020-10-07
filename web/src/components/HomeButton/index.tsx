import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import { FaHome } from "react-icons/fa";

const HomeButton: React.FC = () => {
  return (
    <Button>
      <Link to="/">
        <FaHome size={32} />
      </Link>
    </Button>
  );
};

const Button = styled.nav`
  width: 6rem;
  height: 6rem;
  border-radius: 50%;
  background-color: var(--color-primary);

  display: flex;
  justify-content: center;
  align-items: center;

  position: fixed;
  right: 2rem;
  bottom: 4rem;

  transition: .3s filter;
  z-index: 10;

  &&:hover {
    filter: brightness(1.1);
  }

  && > a {
    width: 100%;
    height: 100%;

    display: flex;
    justify-content: center;
    align-items: center;

    color: var(--color-background);
    text-decoration: none;
  }
`;

export default HomeButton;

import React from "react";
import styled from "styled-components";

const Footer: React.FC = () => {
  return (
    <FooterContent>
      <span>Desenvolvido por: </span>
      <a
        href="https://www.instagram.com/edvaldo_junior_dev/"
        target="_blank"
        rel="noopener noreferrer"
      >
        Edvaldo Junior
      </a>
    </FooterContent>
  );
};

const FooterContent = styled.div`
  width: 100%;
  height: 3rem;
  background: linear-gradient(92.57deg, #2f2e41 0%, #3f3d56 100%);
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  && > span {
    font: 400 1.2rem "Roboto", sans-serif;
    color: var(--color-background);
  }
  && > a {
    font: 700 1.2rem "Open Sans", sans-serif;
    color: var(--color-background);
    margin-left: 0.5rem;
    text-decoration: none;
    transition: 0.3s color;
  }
  && > a:hover {
    color: var(--color-primary);
  }
`;

export default Footer;
